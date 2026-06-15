/**
 * 群星AI教育平台 - 登录守卫
 * 未登录用户自动跳转到登录页
 * 例外：about.html 不加载此脚本
 */
(function(){
  // 如果当前在 profile.html，不需要守卫（避免死循环）
  if (window.location.pathname.includes('profile.html')) return;

  // 检查登录状态
  function getToken() {
    try {
      var data = JSON.parse(localStorage.getItem('stars_token'));
      return data && data.token ? data.token : null;
    } catch(e) { return null; }
  }

  function isLoggedIn() {
    return !!getToken();
  }

  // 未登录 → 跳转
  if (!isLoggedIn()) {
    // 保存当前页面URL，登录后跳回
    var currentUrl = window.location.href;
    try {
      localStorage.setItem('stars_redirect', currentUrl);
    } catch(e) {}
    window.location.href = 'profile.html';
    return;
  }

  // 可选：验证 token 有效性（后台异步，不阻塞）
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.thestars-ai.com/api/auth/me');
    xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    xhr.timeout = 5000;
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 401) {
        // Token 过期，清除并跳转
        localStorage.removeItem('stars_token');
        window.location.href = 'profile.html';
      }
    };
    xhr.send();
  } catch(e) {}
})();
