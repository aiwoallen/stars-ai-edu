/*
  群星网站部署脚本
  通过 GitHub API 创建仓库并推送所有文件
  需要 GitHub 个人访问令牌 (Personal Access Token)
*/
const https = require('https');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const DEPLOY_DIR = 'D:\\网站开发\\deploy';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USER = process.env.GITHUB_USER;

if (!GITHUB_TOKEN || !GITHUB_USER) {
  console.log('=== 群星网站部署 ===');
  console.log('');
  console.log('请先在 GitHub 创建 Personal Access Token:');
  console.log('  1. 打开 https://github.com/settings/tokens');
  console.log('  2. 点 "Generate new token (classic)"');
  console.log('  3. 勾选 "repo" 权限');
  console.log('  4. 生成后复制 Token');
  console.log('');
  console.log('然后在终端运行:');
  console.log('  set GITHUB_TOKEN=你的token');
  console.log('  set GITHUB_USER=你的GitHub用户名');
  console.log('  node 部署脚本.js');
  process.exit(0);
}

// GitHub API helper
function githubRequest(method, urlPath, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: urlPath,
      method: method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'User-Agent': 'stars-deploy',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, data: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function deploy() {
  const repoName = 'stars-ai-edu';
  
  console.log('1. 创建 GitHub 仓库...');
  let repo = await githubRequest('POST', `/user/repos`, {
    name: repoName,
    description: '群星 AI 教育平台',
    homepage: `https://${GITHUB_USER}.github.io/${repoName}`,
    auto_init: false,
    private: false,
  });
  
  if (repo.status === 422) {
    console.log('   仓库已存在，跳过创建');
    repo = await githubRequest('GET', `/repos/${GITHUB_USER}/${repoName}`);
  }
  console.log(`   ✓ ${repo.data.html_url}`);
  
  // Collect all files
  const files = [];
  function walk(dir, prefix) {
    const entries = fs.readdirSync(dir);
    for (const entry of entries) {
      const fullPath = path.join(dir, entry);
      const stat = fs.statSync(fullPath);
      if (stat.isFile()) {
        const content = fs.readFileSync(fullPath);
        files.push({ path: prefix + entry, content: content.toString('base64') });
      }
    }
  }
  walk(DEPLOY_DIR, '');
  
  console.log(`2. 准备 ${files.length} 个文件...`);
  
  // Create blobs and build tree
  const tree = [];
  for (const file of files) {
    const blob = await githubRequest('POST', `/repos/${GITHUB_USER}/${repoName}/git/blobs`, {
      content: file.content,
      encoding: 'base64',
    });
    tree.push({
      path: file.path,
      mode: '100644',
      type: 'blob',
      sha: blob.data.sha,
    });
    process.stdout.write('.');
  }
  console.log('\n   ✓ 所有文件已上传');
  
  // Create tree
  console.log('3. 创建文件树...');
  const treeResult = await githubRequest('POST', `/repos/${GITHUB_USER}/${repoName}/git/trees`, { tree });
  const treeSha = treeResult.data.sha;
  console.log(`   ✓ Tree: ${treeSha}`);
  
  // Create commit
  console.log('4. 创建提交...');
  const commit = await githubRequest('POST', `/repos/${GITHUB_USER}/${repoName}/git/commits`, {
    message: 'Deploy: 群星 AI 教育平台',
    tree: treeSha,
    parents: [],
  });
  console.log(`   ✓ Commit: ${commit.data.sha}`);
  
  // Update ref
  console.log('5. 推送代码...');
  await githubRequest('PATCH', `/repos/${GITHUB_USER}/${repoName}/git/refs/heads/main`, {
    sha: commit.data.sha,
    force: true,
  });
  console.log('   ✓ 已推送到 main 分支');
  
  // Enable GitHub Pages
  console.log('6. 启用 GitHub Pages...');
  await githubRequest('POST', `/repos/${GITHUB_USER}/${repoName}/pages`, {
    source: { branch: 'main', path: '/' },
  });
  console.log('   ✓ Pages 已启用（可能需要1-2分钟生效）');
  
  console.log(`\n✨ 部署完成！`);
  console.log(`   网站地址: https://${GITHUB_USER}.github.io/${repoName}`);
  console.log(`   源码: https://github.com/${GITHUB_USER}/${repoName}`);
  console.log(`\n下一步：去阿里云 DNS 后台添加 CNAME 记录指向你的域名`);
}

deploy().catch(err => {
  console.error('部署失败:', err.message);
  process.exit(1);
});
