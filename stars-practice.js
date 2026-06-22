(function () {
  "use strict";

  var PRACTICE = window.StarsPractice = window.StarsPractice || {};
  var state = { scope: "", lesson: false };

  function text(value) {
    return String(value == null ? "" : value);
  }

  function makeTasks(name, isLesson) {
    if (isLesson) {
      return [
        {
          title: "核心概念复述",
          desc: "用自己的话总结本课最重要的一个概念。",
          prompt: "请写下你对《" + name + "》中最关键概念的理解，并举一个生活或学习中的例子。"
        },
        {
          title: "迁移应用",
          desc: "把本课方法应用到一个真实场景。",
          prompt: "请选择一个你熟悉的场景，说明本课知识可以怎样帮助你分析、判断或解决问题。"
        }
      ];
    }
    return [
      {
        title: "课程地图",
        desc: "梳理这门课的知识结构和学习目标。",
        prompt: "请用三句话说明你为什么要学习《" + name + "》，以及最想掌握的能力。"
      },
      {
        title: "学习计划",
        desc: "给自己安排一条可执行的学习路径。",
        prompt: "请为《" + name + "》制定一个三步学习计划：先学什么、重点练什么、如何检验自己学会了。"
      }
    ];
  }

  function removeExisting() {
    var old = document.getElementById("practiceWorkshop");
    if (old && old.parentNode) old.parentNode.removeChild(old);
  }

  function inject(name, isLesson) {
    removeExisting();
    var tasks = makeTasks(name, isLesson);
    var section = document.createElement("section");
    section.id = "practiceWorkshop";
    section.className = "content-section";
    section.style.cssText = "position:relative;z-index:2;padding:64px 0 76px";
    section.innerHTML =
      '<div class="max-w-6xl mx-auto px-8" style="max-width:72rem;margin:0 auto;padding:0 2rem">' +
      '<p class="section-label" style="font-family:Space Grotesk,Noto Sans SC,sans-serif;font-size:10px;font-weight:600;letter-spacing:4px;color:rgba(240,200,80,.5);margin-bottom:14px">Practice Lab</p>' +
      '<h2 style="font-size:clamp(1.7rem,3vw,2.35rem);font-weight:500;color:#F0C850;margin-bottom:8px">实践工坊</h2>' +
      '<p style="font-size:14px;color:#A0A8B8;margin-bottom:28px;line-height:1.8">完成一个小练习，把课程文本转化成自己的理解。</p>' +
      '<div class="practice-grid" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px"></div>' +
      '<div id="practicePrompt" style="display:none;margin-top:18px;background:rgba(240,200,80,.06);border:1px solid rgba(240,200,80,.14);border-radius:18px;padding:20px;color:#D8DFEA;line-height:1.8;font-size:14px"></div>' +
      '</div>';

    var grid = section.querySelector(".practice-grid");
    tasks.forEach(function (task, index) {
      var card = document.createElement("button");
      card.type = "button";
      card.style.cssText = "text-align:left;background:rgba(20,24,50,.56);border:1px solid rgba(240,200,80,.12);border-radius:20px;padding:24px;cursor:pointer;color:inherit;transition:transform .25s,border-color .25s,background .25s";
      card.innerHTML =
        '<div style="font-family:Space Grotesk,sans-serif;font-size:28px;font-weight:700;color:rgba(240,200,80,.55);margin-bottom:12px">' + String(index + 1).padStart(2, "0") + '</div>' +
        '<h3 style="font-size:16px;color:#fff;margin-bottom:8px">' + text(task.title) + '</h3>' +
        '<p style="font-size:13px;color:#A0A8B8;line-height:1.7">' + text(task.desc) + '</p>';
      card.addEventListener("mouseenter", function () {
        card.style.transform = "translateY(-3px)";
        card.style.borderColor = "rgba(240,200,80,.32)";
        card.style.background = "rgba(28,34,70,.72)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
        card.style.borderColor = "rgba(240,200,80,.12)";
        card.style.background = "rgba(20,24,50,.56)";
      });
      card.addEventListener("click", function () {
        var prompt = section.querySelector("#practicePrompt");
        prompt.textContent = task.prompt;
        prompt.style.display = "block";
      });
      grid.appendChild(card);
    });

    var target = null;
    if (isLesson) {
      target = document.querySelector(".lesson-nav") || document.querySelector(".site-footer,footer");
    } else {
      var modules = document.getElementById("modules");
      target = modules ? modules.nextSibling : document.querySelector(".site-footer,footer");
    }

    if (target && target.parentNode) {
      target.parentNode.insertBefore(section, target);
    } else {
      document.body.appendChild(section);
    }
  }

  PRACTICE.init = function (opts) {
    var name = text(opts && opts.course);
    if (!name) return;
    state.scope = name;
    state.lesson = false;
    inject(name, false);
  };

  PRACTICE.initLesson = function (lessonName) {
    var name = text(lessonName);
    if (!name) return;
    state.scope = name;
    state.lesson = true;
    inject(name, true);
  };
})();
