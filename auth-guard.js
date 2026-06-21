/**
 * 群星 AI 教育平台 - 课程认证守卫
 * 所有课程/课节页面加载此脚本后，未登录用户将看到登录弹窗，
 * 登录后方可访问课程内容。
 * 
 * API_BASE 由各页面自行定义，默认使用生产环境地址。
 */
(function() {
  'use strict';

  var API_BASE = window.API_BASE || 'https://api.thestars-ai.com';

  // ============================================
  // Token Helpers
  // ============================================
  function getToken() {
    try { return JSON.parse(localStorage.getItem('stars_token')); } catch(e) { return null; }
  }
  function saveToken(token) {
    localStorage.setItem('stars_token', JSON.stringify({ token: token, ts: Date.now() }));
  }
  function clearToken() {
    localStorage.removeItem('stars_token');
    localStorage.removeItem('stars_user');
  }
  function getCachedUser() {
    try { return JSON.parse(localStorage.getItem('stars_user')); } catch(e) { return null; }
  }
  function saveCachedUser(user) {
    try { localStorage.setItem('stars_user', JSON.stringify(user)); } catch(e) {}
  }

  async function apiFetch(path, options) {
    options = options || {};
    var token = getToken();
    var headers = { 'Content-Type': 'application/json' };
    if (options.headers) {
      for (var k in options.headers) headers[k] = options.headers[k];
    }
    if (token) headers['Authorization'] = 'Bearer ' + token.token;
    var res = await fetch(API_BASE + path, { method: options.method || 'GET', headers: headers, body: options.body });
    var data = await res.json().catch(function() { return {}; });
    if (!res.ok) throw new Error(data.error || '请求失败');
    return data;
  }

  // ============================================
  // Inject Styles
  // ============================================
  var style = document.createElement('style');
  style.textContent = [
    '.ag-overlay{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(5,8,22,.92);opacity:0;pointer-events:none;transition:opacity .45s cubic-bezier(.16,1,.3,1)}',
    '.ag-overlay.visible{opacity:1;pointer-events:all}',
    '.ag-card{background:#141832;border:1px solid rgba(240,200,80,.14);border-radius:28px;padding:48px 44px;width:100%;max-width:440px;position:relative;transform:translateY(24px) scale(.96);transition:transform .5s cubic-bezier(.16,1,.3,1);box-shadow:0 40px 100px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.04);max-height:92vh;overflow-y:auto}',
    '.ag-overlay.visible .ag-card{transform:translateY(0) scale(1)}',
    '.ag-card::-webkit-scrollbar{width:4px}',
    '.ag-card::-webkit-scrollbar-thumb{background:rgba(240,200,80,.15);border-radius:2px}',
    '.ag-title{font-family:"Space Grotesk",sans-serif;font-size:clamp(1.5rem,2.5vw,1.9rem);font-weight:600;color:#F0C850;margin-bottom:8px;letter-spacing:1px}',
    '.ag-sub{font-size:13px;color:#8890B0;margin-bottom:32px;line-height:1.6}',
    '.ag-tabs{display:flex;background:#0A0E27;border-radius:50px;padding:4px;margin-bottom:28px;border:1px solid rgba(240,200,80,.1)}',
    '.ag-tab{flex:1;padding:10px;border-radius:46px;border:none;font-size:13px;font-weight:500;cursor:pointer;transition:all .35s;font-family:inherit;background:transparent;color:#555D80}',
    '.ag-tab.active{background:linear-gradient(135deg,rgba(240,200,80,.15),rgba(240,200,80,.08));color:#F0C850;border:1px solid rgba(240,200,80,.2)}',
    '.ag-group{margin-bottom:18px}',
    '.ag-label{font-size:11px;font-weight:500;color:#8890B0;letter-spacing:.8px;text-transform:uppercase;display:block;margin-bottom:6px}',
    '.ag-input{width:100%;background:#0A0E27;border:1px solid rgba(240,200,80,.15);border-radius:14px;padding:13px 16px;font-size:14px;color:#E8ECF1;font-family:inherit;outline:none;transition:border-color .3s;box-shadow:inset 0 1px 3px rgba(0,0,0,.3)}',
    '.ag-input::placeholder{color:#555D80}',
    '.ag-input:focus{border-color:rgba(240,200,80,.4)}',
    '.ag-input.error{border-color:rgba(255,90,90,.45)}',
    '.ag-err{font-size:11px;color:#ff7070;margin-top:5px;display:none}',
    '.ag-err.show{display:block}',
    '.ag-pwd-wrap{position:relative}',
    '.ag-pwd-wrap .ag-input{padding-right:44px}',
    '.ag-eye{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:none;border:none;color:#555D80;cursor:pointer;padding:4px;font-size:16px}',
    '.ag-eye:hover{color:#8890B0}',
    '.ag-btn{width:100%;padding:14px;border-radius:48px;font-size:14px;font-weight:600;letter-spacing:.8px;border:none;cursor:pointer;background:linear-gradient(135deg,#F0C850,#F8E090);color:#0A0E27;transition:all .35s;font-family:inherit;margin-top:6px}',
    '.ag-btn:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(240,200,80,.3)}',
    '.ag-btn:active{transform:translateY(0)}',
    '.ag-switch{text-align:center;margin-top:22px;font-size:13px;color:#555D80}',
    '.ag-switch a{color:#F0C850;text-decoration:none;cursor:pointer;font-weight:500}',
    '.ag-switch a:hover{opacity:.8}',
    '.ag-close{position:absolute;top:18px;right:18px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.04);border:none;color:#8890B0;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s;line-height:1}',
    '.ag-close:hover{background:rgba(255,255,255,.1);color:#E8ECF1}',
    '.ag-msg{text-align:center;padding:20px 0;color:#8890B0;font-size:13px}',
    '.ag-msg-title{font-size:16px;color:#F0C850;font-weight:500;margin-bottom:8px}',
    '.ag-toast{position:fixed;top:24px;left:50%;transform:translateX(-50%);z-index:99999;padding:12px 28px;border-radius:40px;font-size:13px;font-weight:500;background:#141832;border:1px solid rgba(240,200,80,.3);color:#F0C850;opacity:0;transition:opacity .4s;pointer-events:none}',
    '.ag-toast.show{opacity:1}',
    '.ag-toast.error{border-color:rgba(255,90,90,.4);color:#ff7070}',
    '.ag-pwd-hints{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}',
    '.ag-hint{font-size:10px;color:#555D80;padding:3px 8px;border-radius:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);transition:all .35s}',
    '.ag-hint.ok{color:#60d080;border-color:rgba(96,208,128,.35);background:rgba(96,208,128,.08)}',
  ].join('\n');
  document.head.appendChild(style);

  // ============================================
  // Toast
  // ============================================
  var toastTimer = null;
  function showToast(msg, type) {
    var t = document.getElementById('agToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'agToast';
      t.className = 'ag-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = 'ag-toast ' + (type || '');
    void t.offsetWidth;
    t.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function() { t.classList.remove('show'); }, 3000);
  }

  // ============================================
  // Build Auth Modal HTML
  // ============================================
  var overlay = document.createElement('div');
  overlay.className = 'ag-overlay';
  overlay.id = 'agOverlay';
  overlay.innerHTML = [
    '<div class="ag-card" id="agCard">',
      '<button class="ag-close" id="agClose">&times;</button>',
      '<div class="ag-tabs" id="agTabs">',
        '<button class="ag-tab active" data-tab="login">登录</button>',
        '<button class="ag-tab" data-tab="register">注册</button>',
      '</div>',
      // Login Form
      '<div id="agLoginForm">',
        '<h2 class="ag-title">欢迎回来</h2>',
        '<p class="ag-sub">登录你的群星账号，继续你的 AI 学习之旅。</p>',
        '<div class="ag-group">',
          '<label class="ag-label">邮箱</label>',
          '<input type="email" class="ag-input" id="agLoginEmail" placeholder="your@email.com" autocomplete="email">',
          '<div class="ag-err" id="agLoginEmailErr"></div>',
        '</div>',
        '<div class="ag-group">',
          '<label class="ag-label">密码</label>',
          '<div class="ag-pwd-wrap">',
            '<input type="password" class="ag-input" id="agLoginPassword" placeholder="输入密码" autocomplete="current-password">',
            '<button class="ag-eye" onclick="window._agTogglePwd(\'agLoginPassword\',this)" type="button">&#128065;</button>',
          '</div>',
          '<div class="ag-err" id="agLoginPasswordErr"></div>',
        '</div>',
        '<button class="ag-btn" onclick="window._agHandleLogin()">登 录</button>',
        '<div class="ag-switch">还没有账号？<a onclick="window._agSwitchTab(\'register\')">立即注册</a></div>',
      '</div>',
      // Register Form
      '<div id="agRegisterForm" style="display:none">',
        '<h2 class="ag-title">加入群星</h2>',
        '<p class="ag-sub">用邮箱注册，开启你的 AI 探索之旅。</p>',
        '<div class="ag-group">',
          '<label class="ag-label">昵称</label>',
          '<input type="text" class="ag-input" id="agRegNickname" placeholder="你的昵称" autocomplete="username">',
          '<div class="ag-err" id="agRegNicknameErr"></div>',
        '</div>',
        '<div class="ag-group">',
          '<label class="ag-label">邮箱</label>',
          '<input type="email" class="ag-input" id="agRegEmail" placeholder="your@email.com" autocomplete="email">',
          '<div class="ag-err" id="agRegEmailErr"></div>',
        '</div>',
        '<div class="ag-group">',
          '<label class="ag-label">密码</label>',
          '<div class="ag-pwd-wrap">',
            '<input type="password" class="ag-input" id="agRegPassword" placeholder="8 位以上，含大小写字母和数字" autocomplete="new-password" oninput="window._agUpdatePwdHints(this.value)">',
            '<button class="ag-eye" onclick="window._agTogglePwd(\'agRegPassword\',this)" type="button">&#128065;</button>',
          '</div>',
          '<div class="ag-pwd-hints">',
            '<span class="ag-hint" id="agHintLen">8+ 个字符</span>',
            '<span class="ag-hint" id="agHintUpper">大写字母</span>',
            '<span class="ag-hint" id="agHintLower">小写字母</span>',
            '<span class="ag-hint" id="agHintNum">数字</span>',
          '</div>',
          '<div class="ag-err" id="agRegPasswordErr"></div>',
        '</div>',
        '<div class="ag-group">',
          '<label class="ag-label">确认密码</label>',
          '<div class="ag-pwd-wrap">',
            '<input type="password" class="ag-input" id="agRegConfirm" placeholder="再次输入密码" autocomplete="new-password">',
            '<button class="ag-eye" onclick="window._agTogglePwd(\'agRegConfirm\',this)" type="button">&#128065;</button>',
          '</div>',
          '<div class="ag-err" id="agRegConfirmErr"></div>',
        '</div>',
        '<button class="ag-btn" onclick="window._agHandleRegister()">注 册</button>',
        '<div class="ag-switch">已有账号？<a onclick="window._agSwitchTab(\'login\')">立即登录</a></div>',
      '</div>',
      // Loading message
      '<div class="ag-msg" id="agLoading" style="display:none">',
        '<div class="ag-msg-title">验证中...</div>',
      '</div>',
    '</div>',
  ].join('');
  document.body.appendChild(overlay);

  // ============================================
  // UI Helpers
  // ============================================
  function clearErrors() {
    var errs = overlay.querySelectorAll('.ag-err');
    for (var i = 0; i < errs.length; i++) errs[i].classList.remove('show');
    var inputs = overlay.querySelectorAll('.ag-input');
    for (var j = 0; j < inputs.length; j++) inputs[j].classList.remove('error');
  }

  function showFieldError(inputId, errId, msg) {
    var inp = document.getElementById(inputId);
    var err = document.getElementById(errId);
    if (inp) inp.classList.add('error');
    if (err) { err.textContent = msg || ''; err.classList.add('show'); }
  }

  function openAuth(tab) {
    overlay.classList.add('visible');
    switchTab(tab || 'login');
    document.body.style.overflow = 'hidden';
  }

  function closeAuth() {
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
    // If user dismisses auth modal, redirect to homepage
    window.location.href = 'index.html';
  }

  function switchTab(tab) {
    var isLogin = tab === 'login';
    var loginForm = document.getElementById('agLoginForm');
    var regForm = document.getElementById('agRegisterForm');
    var tabs = overlay.querySelectorAll('.ag-tab');
    loginForm.style.display = isLogin ? 'block' : 'none';
    regForm.style.display = isLogin ? 'none' : 'block';
    tabs[0].classList.toggle('active', isLogin);
    tabs[1].classList.toggle('active', !isLogin);
    clearErrors();
  }

  function togglePwd(inputId, btn) {
    var inp = document.getElementById(inputId);
    if (!inp) return;
    inp.type = inp.type === 'text' ? 'password' : 'text';
    btn.innerHTML = inp.type === 'password' ? '&#128065;' : '&#128064;';
  }

  // Password hint live update
  function updatePwdHints(pw) {
    var hints = {
      len: document.getElementById('agHintLen'),
      upper: document.getElementById('agHintUpper'),
      lower: document.getElementById('agHintLower'),
      num: document.getElementById('agHintNum')
    };
    function setHint(el, ok) {
      if (!el) return;
      if (ok) {
        el.style.color = '#60d080';
        el.style.borderColor = 'rgba(96,208,128,.35)';
        el.style.background = 'rgba(96,208,128,.08)';
      } else {
        el.style.color = '#555D80';
        el.style.borderColor = 'rgba(255,255,255,.06)';
        el.style.background = 'rgba(255,255,255,.03)';
      }
    }
    setHint(hints.len, pw.length >= 8);
    setHint(hints.upper, /[A-Z]/.test(pw));
    setHint(hints.lower, /[a-z]/.test(pw));
    setHint(hints.num, /[0-9]/.test(pw));
  }

  // ============================================
  // Auth Handlers
  // ============================================
  async function handleRegister() {
    clearErrors();
    var nickname = document.getElementById('agRegNickname').value.trim();
    var email = document.getElementById('agRegEmail').value.trim().toLowerCase();
    var password = document.getElementById('agRegPassword').value;
    var confirm = document.getElementById('agRegConfirm').value;
    var valid = true;

    if (!nickname) { showFieldError('agRegNickname', 'agRegNicknameErr', '昵称不能为空'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError('agRegEmail', 'agRegEmailErr', '请输入有效的邮箱地址'); valid = false; }
    if (password.length < 8) { showFieldError('agRegPassword', 'agRegPasswordErr', '密码至少需要 8 个字符'); valid = false; }
    else if (!/[a-z]/.test(password)) { showFieldError('agRegPassword', 'agRegPasswordErr', '密码需要包含小写字母'); valid = false; }
    else if (!/[A-Z]/.test(password)) { showFieldError('agRegPassword', 'agRegPasswordErr', '密码需要包含大写字母'); valid = false; }
    else if (!/[0-9]/.test(password)) { showFieldError('agRegPassword', 'agRegPasswordErr', '密码需要包含数字'); valid = false; }
    if (password !== confirm) { showFieldError('agRegConfirm', 'agRegConfirmErr', '两次密码不一致'); valid = false; }
    if (!valid) return;

    // Show loading state
    var btn = overlay.querySelector('.ag-btn');
    var origText = btn.textContent;
    btn.textContent = '注册中...';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    try {
      var data = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password, nickname: nickname })
      });
      saveToken(data.token);
      saveCachedUser(data.user);
      showToast('注册成功，欢迎加入群星！');
      // Reload page to show content (no redirect to index)
      setTimeout(function() { window.location.reload(); }, 800);
    } catch(e) {
      var msg = e.message || '';
      btn.textContent = origText;
      btn.style.pointerEvents = '';
      btn.style.opacity = '1';
      // Smart error routing: route to correct field
      if (msg.indexOf('密码') !== -1) {
        showFieldError('agRegPassword', 'agRegPasswordErr', msg);
      } else if (msg.indexOf('邮箱') !== -1 || msg.indexOf('已注册') !== -1) {
        showFieldError('agRegEmail', 'agRegEmailErr', msg);
      } else {
        showFieldError('agRegEmail', 'agRegEmailErr', msg);
      }
    }
  }

  async function handleLogin() {
    clearErrors();
    var email = document.getElementById('agLoginEmail').value.trim().toLowerCase();
    var password = document.getElementById('agLoginPassword').value;
    var valid = true;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError('agLoginEmail', 'agLoginEmailErr', '请输入有效的邮箱地址'); valid = false; }
    if (!password) { showFieldError('agLoginPassword', 'agLoginPasswordErr', '请输入密码'); valid = false; }
    if (!valid) return;

    // Show loading state
    var btn = overlay.querySelector('#agLoginForm .ag-btn');
    var origText = btn.textContent;
    btn.textContent = '登录中...';
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.7';

    try {
      var data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password })
      });
      saveToken(data.token);
      saveCachedUser(data.user);
      showToast('登录成功！');
      // Reload page to show content
      setTimeout(function() { window.location.reload(); }, 800);
    } catch(e) {
      btn.textContent = origText;
      btn.style.pointerEvents = '';
      btn.style.opacity = '1';
      showFieldError('agLoginEmail', 'agLoginEmailErr', e.message);
      showFieldError('agLoginPassword', 'agLoginPasswordErr', e.message);
    }
  }

  // ============================================
  // Expose to global scope for onclick handlers
  // ============================================
  window._agSwitchTab = switchTab;
  window._agHandleLogin = handleLogin;
  window._agHandleRegister = handleRegister;
  window._agTogglePwd = togglePwd;
  window._agCloseAuth = closeAuth;
  window._agUpdatePwdHints = updatePwdHints;

  // ============================================
  // Event Listeners
  // ============================================
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeAuth();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) closeAuth();
  });

  // Close button
  var closeBtn = overlay.querySelector('#agClose');
  if (closeBtn) closeBtn.addEventListener('click', closeAuth);

  // ============================================
  // Auth Guard: Check & Gate
  // ============================================
  function checkAuth() {
    var token = getToken();
    return token && token.token;
  }

  // Main entry: if not logged in, show auth modal
  if (!checkAuth()) {
    // Delay slightly so page layout is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        openAuth('login');
      });
    } else {
      openAuth('login');
    }
  }
  // If already logged in, do nothing — page loads normally

})();
