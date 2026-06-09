/**
 * 群星 AI 教育平台 — AI实践框 & 奖励系统
 * 在每个课程页面注入交互式AI实践工坊
 */
(function () {
  'use strict';

  // ============ 配置 ============
  const API_BASE = 'https://thestars-ai.vercel.app/api/chat';

  // 6门课程的实践任务配置
  const COURSES = {
    'AI是什么': {
      aiPrompt: '你是群星AI教育平台的实践导师。用户刚学完"AI是什么"课程，需要完成3个递进式练习任务来巩固知识。请用通俗易懂、鼓励性的语言引导用户。对于学生友好的回答，适当给予肯定。每次回复控制在200字以内。',
      tasks: [
        {
          id: 'task1',
          title: '比喻大师',
          desc: '向AI提问，让它用生活中的比喻解释什么是人工智能',
          instruction: '现在请你完成第一个练习：向我提问"请用生活中的比喻解释什么是人工智能"，我会给你一个生动的回答。然后你用自己的话复述一遍，看看你理解了多少。准备好了吗？',
          evaluator: '当用户能够用自己的话复述AI的概念并且大致正确时，回复"通过！"并给出简要点评。如果理解有偏差，温和纠正并鼓励再试。'
        },
        {
          id: 'task2',
          title: '边界探索',
          desc: '和AI讨论人工智能能做什么、不能做什么',
          instruction: '第二个练习：请你列出3件你认为AI能做好的事和3件AI做不好的事。然后我们一起来讨论，看看你的判断是否准确。开始吧！',
          evaluator: '用户列出至少6项且大部分判断合理时通过。给出1-2句反馈然后说"通过！"。'
        },
        {
          id: 'task3',
          title: '定义挑战',
          desc: '用你自己的话写一段AI的定义（不超过100字）',
          instruction: '最后一个挑战：请用不超过100字，写一段你对人工智能的定义。不能照搬课本，必须是你自己的理解。写好后发给我，我来点评。',
          evaluator: '用户写出原创定义且无明显错误时通过。评价亮点后说"通过！恭喜完成全部练习！"'
        }
      ]
    },
    'AI基础知识': {
      aiPrompt: '你是群星AI教育平台的实践导师。用户刚学完"AI基础知识"课程（含数据、机器学习范式、神经网络、深度学习等）。请用专业但易懂的语言引导练习。每次回复控制在200字以内。',
      tasks: [
        {
          id: 'task1',
          title: '范式辨析',
          desc: '让AI用例子对比监督学习、无监督学习和强化学习',
          instruction: '第一个练习：请你用自己的话分别举一个生活例子，说明什么是监督学习、无监督学习和强化学习。写好后发给我！',
          evaluator: '用户举出的3个例子基本正确（不要求完美）即通过。如果混淆了概念，温和纠正。通过时回复"通过！"加简要点评。'
        },
        {
          id: 'task2',
          title: '神经想象',
          desc: '请AI用生活中的故事解释神经网络如何工作',
          instruction: '第二个练习：请你想象一个生活中的场景（比如识别水果、推荐电影），用通俗语言描述神经网络在这个场景中是如何一步步处理的。发挥你的想象力！',
          evaluator: '用户能描述出输入→处理层→输出的基本流程即通过。鼓励创意表达。通过时回复"通过！"'
        },
        {
          id: 'task3',
          title: '自我测验',
          desc: '让AI出3道题来测试你对AI基础知识的理解',
          instruction: '最后一道练习：请我对你进行一个小测验！我会出3道关于AI基础知识的题目，你来回答。准备好了就说"开始"。',
          evaluator: '3题中答对至少2题即通过。答完后给出总分和鼓励。'
        }
      ]
    },
    'AI绘画实战': {
      aiPrompt: '你是群星AI教育平台的实践导师。用户刚学完"AI绘画实战"课程，需要练习Prompt写作、风格控制和商业思维。请以专业AI绘画导师的身份引导练习。每次回复控制在200字以内。',
      tasks: [
        {
          id: 'task1',
          title: 'Prompt工坊',
          desc: '写一段AI绘画Prompt，让AI来评分和优化建议',
          instruction: '第一个练习：请写一段AI绘画Prompt，描述你想生成的画面。包含：主体 + 风格 + 细节 + 画质关键词。写好后发给我，我来评分并给出优化建议！',
          evaluator: '用户的Prompt包含至少3个要素（主体/风格/细节/画质）即通过。给出1-2条优化建议后说"通过！"'
        },
        {
          id: 'task2',
          title: '风格指挥官',
          desc: '描述你想要的画面风格，让AI推荐最佳参数组合',
          instruction: '第二个练习：描述一种你想实现的画面风格（比如"宫崎骏动画风"、"赛博朋克"、"水墨画"等），越具体越好。我会为你推荐最适合的AI绘画参数和关键词。',
          evaluator: '用户清晰描述了风格特征即通过。给出具体参数建议后说"通过！"'
        },
        {
          id: 'task3',
          title: '商业脑暴',
          desc: '设计一个AI绘画变现方案，让AI评估可行性',
          instruction: '最后一个练习：请设计一个利用AI绘画技能赚钱的小方案。可以是想接什么类型的单、做什么产品、用什么平台。不用很完整，有想法就行。写好后我来帮你评估可行性！',
          evaluator: '用户提出了至少一个有可行性的想法即通过。给出建设性反馈后说"通过！恭喜完成！"'
        }
      ]
    },
    'AI文案实战': {
      aiPrompt: '你是群星AI教育平台的实践导师。用户刚学完"AI文案实战"课程（含LLM理解、Prompt工程、五大文案场景）。请以文案导师的身份引导练习，点评专业但不苛刻。每次回复控制在200字以内。',
      tasks: [
        {
          id: 'task1',
          title: '文案精修师',
          desc: '写一段产品文案，然后让AI帮你改写润色',
          instruction: '第一个练习：请写一段简单的产品文案（50字左右即可，什么产品都行——可以是你的网站、一个APP、一本书）。写好后发给我，我会帮你润色并解释修改理由。',
          evaluator: '用户写出了产品文案（不要求质量）即通过。润色后解释1-2个修改理由，然后说"通过！"'
        },
        {
          id: 'task2',
          title: '思维链写作',
          desc: '用思维链方法让AI一步步帮你写一篇文章',
          instruction: '第二个练习：我们来用思维链方法写文章。请你选一个话题（任何你感兴趣的），然后告诉我。我会用"第一步…第二步…"的方式，一步步引导你完成一篇文章。',
          evaluator: '用户完成至少2步的思维链写作流程即通过。肯定参与度后说"通过！"'
        },
        {
          id: 'task3',
          title: '翻译对比',
          desc: '写一段中文，让AI翻译成英文，对比质量',
          instruction: '最后一个练习：请写一段中文（3-5句话即可，关于任何话题）。我会把它翻译成英文，然后你对比一下AI翻译和人工翻译的差异，说说你的发现。',
          evaluator: '用户能说出至少1个AI翻译的优点或不足即通过。肯定观察力后说"通过！恭喜！"'
        }
      ]
    },
    'AI原理实战': {
      aiPrompt: '你是群星AI教育平台的实践导师。用户刚学完"AI原理实战"课程（环境搭建、数据预处理、模型训练、评估等）。请以技术导师身份引导，适量使用专业术语但保持易懂。每次回复控制在200字以内。',
      tasks: [
        {
          id: 'task1',
          title: '原理解码',
          desc: '用自己的话向AI解释梯度下降的原理',
          instruction: '第一个练习：请你用自己的话，向我解释什么是"梯度下降"。想象你在教一个完全不懂编程的朋友。不要背定义，用你理解的方式说。',
          evaluator: '用户能表达出"逐步调整参数以减小误差"的核心意思即通过。如果关键点遗漏，温和补充后通过。回复"通过！"'
        },
        {
          id: 'task2',
          title: '特征工程师',
          desc: '描述一个数据集场景，让AI帮你设计特征工程方案',
          instruction: '第二个练习：想象你要训练一个模型来预测"学生考试分数"。你会收集哪些数据？如何处理这些数据让模型更好用？描述你的想法，我来帮你完善特征工程方案。',
          evaluator: '用户能列出至少3种有意义的特征即通过。补充建议后说"通过！"'
        },
        {
          id: 'task3',
          title: '调参高手',
          desc: '让AI模拟一个调参场景，你来判断策略',
          instruction: '最后一个练习：我来模拟一个模型训练场景——训练准确率卡在85%上不去了。请你想出至少2种调参策略来解决这个问题，我来评估你的方案是否合理。',
          evaluator: '用户提出至少2种合理策略（如调整学习率/增加数据/正则化等）即通过。点评后说"通过！恭喜完成！"'
        }
      ]
    },
    '如何与AI对话': {
      aiPrompt: '你是群星AI教育平台的实践导师。用户刚学完"如何与AI对话"课程（Transformer、注意力机制、Prompt工程、多轮对话等）。请帮助用户通过实践掌握AI对话技巧。每次回复控制在200字以内。',
      tasks: [
        {
          id: 'task1',
          title: 'Prompt对决',
          desc: '分别用基础Prompt和优化Prompt向AI提问，对比结果',
          instruction: '第一个练习：先用一个简单粗糙的Prompt问我一个问题（比如"写一篇关于环保的文章"），看看回答质量。然后你再优化这个Prompt（加入角色、要求、格式等），我们再对比两次回答的差异。先发你的基础Prompt吧！',
          evaluator: '用户完成了基础Prompt和优化Prompt的对比并注意到差异即通过。简要总结优化要点后说"通过！"'
        },
        {
          id: 'task2',
          title: '记忆挑战',
          desc: '进行多轮对话，测试AI能否记住你之前说的内容',
          instruction: '第二个练习：我们来玩一个记忆游戏。你先告诉我3个关于你的事实（可以是真实的也可以是编的），然后我们聊点别的。过几轮对话后，我会被"测试"是否还记得这3个事实。准备好了就告诉我你的3个事实吧！',
          evaluator: '用户成功完成多轮对话且AI能回忆起至少2个事实即通过。鼓励用户理解上下文窗口概念后说"通过！"'
        },
        {
          id: 'task3',
          title: '角色扮演',
          desc: '让AI扮演一个角色（如老师、教练、朋友），体验情境对话',
          instruction: '最后一个练习：请让AI扮演一个你需要的角色——可以是数学老师、健身教练、面试官、或者任何你需要的。设定好角色后，进行一段有意义的对话。开始告诉我你想让我扮演谁！',
          evaluator: '用户完成一段有意义的角色扮演对话（至少3轮）即通过。肯定创造力后说"通过！恭喜完成全部练习！"'
        }
      ]
    }
  };

  // ============ 状态管理 ============
  let courseName = '';
  let activeTaskId = null;
  let chatHistory = [];
  let rewardData = {};

  const API_USER_BASE = 'https://thestars-ai.vercel.app/api/user';

  function getToken() {
    try {
      const raw = localStorage.getItem('stars_token');
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  async function apiPut(path, body) {
    const token = getToken();
    if (!token) throw new Error('not_logged_in');
    const res = await fetch(API_USER_BASE + path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token.token
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error('api_error');
    return res.json();
  }

  async function loadRewards() {
    const token = getToken();
    if (token) {
      try {
        const res = await fetch(API_USER_BASE + '/progress', {
          headers: { 'Authorization': 'Bearer ' + token.token }
        });
        if (res.ok) {
          const data = await res.json();
          const progress = data.progress || {};
          // Map progress to rewards format
          const r = {};
          const courseNames = Object.keys(COURSES);
          for (let i = 0; i < courseNames.length; i++) {
            r[courseNames[i]] = { stars: progress[i] || 0, completed: [], unlockedAt: null };
          }
          return r;
        }
      } catch (e) {
        console.warn('StarsPractice: API failed, falling back to localStorage');
      }
    }
    // Fallback to localStorage
    try {
      const raw = localStorage.getItem('stars_practice_rewards');
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  async function saveRewards() {
    // Save to localStorage as fallback
    try {
      localStorage.setItem('stars_practice_rewards', JSON.stringify(rewardData));
    } catch (e) {}

    // Sync to API
    const token = getToken();
    if (!token) return;
    const progress = {};
    const courseNames = Object.keys(COURSES);
    for (let i = 0; i < courseNames.length; i++) {
      const cr = rewardData[courseNames[i]];
      progress[i] = cr ? cr.stars : 0;
    }
    try {
      await apiPut('/progress', { progress });
    } catch (e) { /* silent */ }
  }

  function getCourseRewards() {
    if (!rewardData[courseName]) {
      rewardData[courseName] = { stars: 0, completed: [], unlockedAt: null };
    }
    return rewardData[courseName];
  }

  function completeTask(taskId) {
    const cr = getCourseRewards();
    if (cr.completed.includes(taskId)) return;
    cr.completed.push(taskId);
    cr.stars = cr.completed.length;
    if (cr.stars === 3 && !cr.unlockedAt) {
      cr.unlockedAt = Date.now();
    }
    saveRewards();
    updateStarDisplay();
    updateTaskCards();
    // 检查是否需要庆祝
    if (cr.stars === 3) {
      setTimeout(showCelebration, 600);
    }
  }

  // ============ DOM 渲染 ============
  function injectPracticeBox() {
    const modulesSection = document.querySelector('#modules');
    if (!modulesSection) return;

    const box = document.createElement('section');
    box.className = 'content-section alt';
    box.id = 'practice-box';
    box.innerHTML = `
      <div class="max-w-4xl mx-auto px-8">
        <p class="section-label">AI Workshop</p>
        <h2 class="section-heading">AI 实践工坊</h2>
        <p style="font-size:14px;color:#A0A8B8;margin-bottom:28px">学完课程，立刻动手练习。完成全部3个任务解锁星座徽章。</p>

        <div class="practice-tasks" id="practiceTasks"></div>

        <div class="practice-chat" id="practiceChat" style="display:none;margin-top:28px">
          <div class="practice-chat-header">
            <span id="practiceChatTitle" style="font-size:15px;font-weight:500;color:#F0C850"></span>
            <span id="practiceChatDesc" style="font-size:12px;color:#8890B0"></span>
          </div>
          <div class="practice-chat-messages" id="practiceMessages"></div>
          <div class="practice-chat-input">
            <input type="text" id="practiceInput" placeholder="输入你的回答..." autocomplete="off">
            <button id="practiceSend">发送</button>
          </div>
        </div>

        <div class="practice-rewards" id="practiceRewards">
          <div style="display:flex;align-items:center;gap:16px">
            <span style="font-size:13px;color:#8890B0">练习进度</span>
            <div class="practice-stars" id="practiceStars">
              <span class="star-icon" data-star="1">&#9734;</span>
              <span class="star-icon" data-star="2">&#9734;</span>
              <span class="star-icon" data-star="3">&#9734;</span>
            </div>
            <span id="practiceBadge" style="font-size:12px;color:#555D80"></span>
          </div>
        </div>
      </div>
    `;

    // 插入到课节列表section后面（CTA section前面）
    const ctaSection = modulesSection.nextElementSibling;
    if (ctaSection) {
      modulesSection.parentNode.insertBefore(box, ctaSection);
    } else {
      modulesSection.parentNode.appendChild(box);
    }

    renderTasks();
    updateStarDisplay();
    bindEvents();
  }

  function renderTasks() {
    const cfg = COURSES[courseName];
    if (!cfg) return;
    const cr = getCourseRewards();

    const container = document.getElementById('practiceTasks');
    if (!container) return;

    container.innerHTML = cfg.tasks.map((t, i) => {
      const done = cr.completed.includes(t.id);
      const active = t.id === activeTaskId;
      return `
        <div class="practice-task-card ${done ? 'done' : ''} ${active ? 'active' : ''}" data-task="${t.id}">
          <div class="task-number">${done ? '&#10003;' : String(i + 1).padStart(2, '0')}</div>
          <div class="task-info">
            <div class="task-title">${t.title}</div>
            <div class="task-desc">${t.desc}</div>
          </div>
          <div class="task-status">
            ${done ? '<span class="task-done-badge">已完成</span>' : (active ? '<span class="task-active-badge">进行中</span>' : '<span class="task-play-icon">&#9654;</span>')}
          </div>
        </div>
      `;
    }).join('');

    // 绑定任务卡片点击
    container.querySelectorAll('.practice-task-card').forEach(card => {
      card.addEventListener('click', function () {
        const taskId = this.dataset.task;
        const cr = getCourseRewards();
        if (cr.completed.includes(taskId)) return;
        startTask(taskId);
      });
    });
  }

  function updateTaskCards() {
    renderTasks();
  }

  function updateStarDisplay() {
    const cr = getCourseRewards();
    const starsContainer = document.getElementById('practiceStars');
    const badge = document.getElementById('practiceBadge');
    if (!starsContainer || !badge) return;

    const starEls = starsContainer.querySelectorAll('.star-icon');
    starEls.forEach((el, i) => {
      if (i < cr.stars) {
        el.innerHTML = '&#9733;';
        el.classList.add('lit');
      } else {
        el.innerHTML = '&#9734;';
        el.classList.remove('lit');
      }
    });

    const badges = ['', '铜星徽章', '银星徽章', '金星徽章'];
    badge.textContent = cr.stars > 0 ? badges[cr.stars] : '';
    if (cr.stars >= 3) {
      badge.textContent = '金星徽章 — 全部解锁！';
      badge.style.color = '#F0C850';
    }
  }

  function startTask(taskId) {
    const cfg = COURSES[courseName];
    if (!cfg) return;
    const task = cfg.tasks.find(t => t.id === taskId);
    if (!task) return;

    activeTaskId = taskId;
    chatHistory = [];
    updateTaskCards();

    const chatContainer = document.getElementById('practiceChat');
    const chatTitle = document.getElementById('practiceChatTitle');
    const chatDesc = document.getElementById('practiceChatDesc');
    const messagesContainer = document.getElementById('practiceMessages');

    chatContainer.style.display = 'block';
    chatTitle.textContent = task.title;
    chatDesc.textContent = task.desc;
    messagesContainer.innerHTML = '';

    // AI先打招呼
    appendMessage('ai', task.instruction);
    chatContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('practiceInput').focus();
  }

  function appendMessage(role, text) {
    const container = document.getElementById('practiceMessages');
    if (!container) return;
    const div = document.createElement('div');
    div.className = 'practice-msg practice-msg-' + role;
    div.innerHTML = `
      <div class="msg-avatar">${role === 'ai' ? '✦' : '你'}</div>
      <div class="msg-content">${escapeHtml(text)}</div>
    `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  async function sendMessage() {
    const input = document.getElementById('practiceInput');
    const button = document.getElementById('practiceSend');
    const msg = input.value.trim();
    if (!msg) return;

    appendMessage('user', msg);
    input.value = '';
    button.disabled = true;
    button.textContent = '…';

    const cfg = COURSES[courseName];
    const task = cfg.tasks.find(t => t.id === activeTaskId);
    if (!task) return;

    // 构建发给AI的消息
    const systemPrompt = cfg.aiPrompt + ' 当前任务：' + task.title + '。评估标准：' + task.evaluator;
    const messages = [
      { role: 'system', content: systemPrompt },
      ...chatHistory,
      { role: 'user', content: msg }
    ];

    try {
      const resp = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          systemPrompt: systemPrompt,
          history: chatHistory
        })
      });

      if (!resp.ok) {
        throw new Error('API error: ' + resp.status);
      }

      const data = await resp.json();
      const reply = data.reply || 'AI暂时无法响应，请稍后再试。';

      chatHistory.push({ role: 'user', content: msg });
      chatHistory.push({ role: 'assistant', content: reply });

      appendMessage('ai', reply);

      // 检测是否通过
      if (reply.includes('通过！') || reply.includes('通过!')) {
        setTimeout(() => {
          completeTask(activeTaskId);
          activeTaskId = null;
          chatHistory = [];
          document.getElementById('practiceChat').style.display = 'none';
          updateTaskCards();
        }, 1000);
      }

    } catch (e) {
      appendMessage('ai', 'AI助手暂时离线，请稍后再试。错误：' + e.message);
    } finally {
      button.disabled = false;
      button.textContent = '发送';
    }
  }

  function showCelebration() {
    const box = document.getElementById('practice-box');
    if (!box) return;

    // 创建庆祝粒子
    const particles = document.createElement('div');
    particles.className = 'celebration-particles';
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'celebration-particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 1.5 + 's';
      p.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
      p.style.width = (Math.random() * 8 + 4) + 'px';
      p.style.height = p.style.width;
      p.style.background = i % 3 === 0 ? '#F0C850' : (i % 3 === 1 ? '#F8E090' : '#A08030');
      particles.appendChild(p);
    }
    box.appendChild(particles);

    // 显示祝贺提示
    const toast = document.createElement('div');
    toast.className = 'celebration-toast';
    toast.innerHTML = '&#127775; 恭喜！你已完成「' + courseName + '」全部练习，获得金星徽章！';
    box.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    // 5秒后清理
    setTimeout(() => {
      particles.remove();
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 5000);
  }

  function bindEvents() {
    document.getElementById('practiceSend').addEventListener('click', sendMessage);
    document.getElementById('practiceInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // ============ 注入 CSS ============
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* 实践任务卡片 */
      .practice-tasks {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 14px;
      }
      .practice-task-card {
        background: #181E40;
        border: 1px solid rgba(240,200,80,.1);
        border-radius: 16px;
        padding: 24px 20px;
        cursor: pointer;
        transition: all .45s cubic-bezier(.16,1,.3,1);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        gap: 14px;
        opacity: 0;
        animation: taskFadeIn .5s ease-out forwards;
      }
      .practice-task-card:nth-child(1) { animation-delay: 0s; }
      .practice-task-card:nth-child(2) { animation-delay: .1s; }
      .practice-task-card:nth-child(3) { animation-delay: .2s; }
      @keyframes taskFadeIn {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .practice-task-card:hover {
        border-color: rgba(240,200,80,.25);
        transform: translateY(-3px);
        box-shadow: 0 12px 36px rgba(0,0,0,.3);
        background: #1C2246;
      }
      .practice-task-card.active {
        border-color: rgba(240,200,80,.5);
        box-shadow: 0 0 0 1px rgba(240,200,80,.2), 0 8px 32px rgba(240,200,80,.08);
        background: #1E2448;
      }
      .practice-task-card.done {
        border-color: rgba(240,200,80,.08);
        opacity: .6;
        cursor: default;
        background: #141832;
      }
      .practice-task-card.done:hover {
        transform: none;
        box-shadow: none;
      }
      .task-number {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 28px;
        font-weight: 700;
        color: rgba(240,200,80,.5);
        line-height: 1;
      }
      .practice-task-card.done .task-number {
        color: #4CAF50;
        font-size: 22px;
      }
      .task-title {
        font-size: 15px;
        font-weight: 500;
        color: #E8ECF1;
        margin-bottom: 6px;
      }
      .task-desc {
        font-size: 12px;
        color: #8890B0;
        line-height: 1.6;
      }
      .task-status {
        margin-top: auto;
      }
      .task-done-badge {
        font-size: 11px;
        color: #4CAF50;
        background: rgba(76,175,80,.1);
        padding: 4px 10px;
        border-radius: 20px;
        border: 1px solid rgba(76,175,80,.15);
      }
      .task-active-badge {
        font-size: 11px;
        color: #F0C850;
        background: rgba(240,200,80,.1);
        padding: 4px 10px;
        border-radius: 20px;
        border: 1px solid rgba(240,200,80,.15);
      }
      .task-play-icon {
        font-size: 14px;
        color: rgba(240,200,80,.3);
        transition: color .3s;
      }
      .practice-task-card:hover .task-play-icon {
        color: rgba(240,200,80,.7);
      }

      /* 聊天区 */
      .practice-chat {
        background: #141832;
        border: 1px solid rgba(240,200,80,.12);
        border-radius: 18px;
        overflow: hidden;
        animation: fadeSlideIn .4s cubic-bezier(.16,1,.3,1);
      }
      @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .practice-chat-header {
        padding: 16px 20px;
        border-bottom: 1px solid rgba(240,200,80,.06);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .practice-chat-messages {
        max-height: 360px;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .practice-chat-messages::-webkit-scrollbar {
        width: 4px;
      }
      .practice-chat-messages::-webkit-scrollbar-track {
        background: transparent;
      }
      .practice-chat-messages::-webkit-scrollbar-thumb {
        background: rgba(240,200,80,.15);
        border-radius: 2px;
      }
      .practice-msg {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        animation: msgIn .3s ease-out;
      }
      @keyframes msgIn {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .msg-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: 600;
        flex-shrink: 0;
      }
      .practice-msg-ai .msg-avatar {
        background: rgba(240,200,80,.12);
        color: #F0C850;
      }
      .practice-msg-user .msg-avatar {
        background: rgba(136,144,176,.12);
        color: #8890B0;
      }
      .msg-content {
        font-size: 13px;
        color: #D0D6E0;
        line-height: 1.8;
        padding-top: 6px;
        white-space: pre-wrap;
        word-break: break-word;
      }
      .practice-chat-input {
        display: flex;
        gap: 10px;
        padding: 14px 20px;
        border-top: 1px solid rgba(240,200,80,.06);
        background: #111636;
      }
      .practice-chat-input input {
        flex: 1;
        background: #181E40;
        border: 1px solid rgba(240,200,80,.1);
        border-radius: 24px;
        padding: 12px 18px;
        color: #E8ECF1;
        font-size: 13px;
        font-family: inherit;
        outline: none;
        transition: border-color .3s;
      }
      .practice-chat-input input:focus {
        border-color: rgba(240,200,80,.35);
      }
      .practice-chat-input input::placeholder {
        color: #555D80;
      }
      .practice-chat-input button {
        background: linear-gradient(135deg, #F0C850, #F8E090);
        border: none;
        border-radius: 24px;
        padding: 12px 24px;
        color: #0A0E27;
        font-size: 13px;
        font-weight: 600;
        font-family: inherit;
        cursor: pointer;
        transition: all .3s;
        white-space: nowrap;
      }
      .practice-chat-input button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 20px rgba(240,200,80,.25);
      }
      .practice-chat-input button:disabled {
        opacity: .5;
        transform: none;
        box-shadow: none;
        cursor: not-allowed;
      }

      /* 奖励进度 */
      .practice-rewards {
        margin-top: 32px;
        padding: 20px 24px;
        background: #141832;
        border: 1px solid rgba(240,200,80,.08);
        border-radius: 16px;
      }
      .practice-stars {
        display: flex;
        gap: 6px;
      }
      .star-icon {
        font-size: 22px;
        color: #3A3E55;
        transition: all .5s cubic-bezier(.16,1,.3,1);
      }
      .star-icon.lit {
        color: #F0C850;
        text-shadow: 0 0 12px rgba(240,200,80,.4);
        animation: starGlow .8s ease-out;
      }
      @keyframes starGlow {
        0% { transform: scale(1.6); text-shadow: 0 0 30px rgba(240,200,80,.8); }
        100% { transform: scale(1); text-shadow: 0 0 12px rgba(240,200,80,.4); }
      }

      /* 庆祝特效 */
      .celebration-particles {
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 10;
        overflow: hidden;
      }
      .celebration-particle {
        position: absolute;
        bottom: -20px;
        border-radius: 50%;
        animation: particleRise 2s ease-out forwards;
      }
      @keyframes particleRise {
        0% { bottom: -20px; opacity: 1; transform: translateX(0) rotate(0deg); }
        100% { bottom: 110%; opacity: 0; transform: translateX(40px) rotate(360deg); }
      }
      .celebration-toast {
        position: fixed;
        top: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, #1a2248, #181E40);
        border: 1px solid rgba(240,200,80,.3);
        border-radius: 24px;
        padding: 16px 32px;
        color: #F0C850;
        font-size: 14px;
        font-weight: 500;
        font-family: 'Space Grotesk', 'Noto Sans SC', sans-serif;
        z-index: 999;
        transition: transform .5s cubic-bezier(.16,1,.3,1);
        box-shadow: 0 8px 48px rgba(0,0,0,.5);
        white-space: nowrap;
      }
      .celebration-toast.show {
        transform: translateX(-50%) translateY(0);
      }

      /* 响应式 */
      @media(max-width:1024px) {
        .practice-tasks { grid-template-columns: repeat(2, 1fr); }
      }
      @media(max-width:768px) {
        .practice-tasks { grid-template-columns: 1fr; }
        .practice-chat-messages { max-height: 280px; }
        .celebration-toast { font-size: 12px; padding: 12px 20px; white-space: normal; text-align: center; width: 90%; }
      }
    `;
    document.head.appendChild(style);
  }

  // ============ 初始化入口 ============
  window.StarsPractice = {
    init: function (config) {
      courseName = config.course || '';
      if (!courseName || !COURSES[courseName]) {
        console.warn('StarsPractice: unknown course "' + courseName + '"');
        return;
      }
      rewardData = loadRewards();
      injectStyles();
      injectPracticeBox();
    }
  };

})();
