(function () {
  "use strict";

  document.documentElement.classList.add("stars-apple-ready");

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function addOrbit() {
    if (document.querySelector(".stars-orbit")) return;
    var orbit = document.createElement("div");
    orbit.className = "stars-orbit";
    document.body.appendChild(orbit);
  }

  function markActiveNav() {
    var page = decodeURIComponent((window.location.pathname.split("/").pop() || "index.html"));
    document.querySelectorAll(".icon-nav .in-item, .site-rail .rail-item").forEach(function (item) {
      var href = decodeURIComponent(item.getAttribute("href") || "");
      if (href === page || (page === "" && href === "index.html")) item.classList.add("active");
      if (href === "profile.html") {
        try {
          var token = JSON.parse(localStorage.getItem("stars_token"));
          if (token && token.token) item.classList.add("logged-in");
        } catch (e) {}
      }
    });
  }

  function revealOnScroll() {
    var selectors = [
      ".hero-content",
      ".mission-card",
      ".news-header-row",
      ".news-card",
      ".news-card-h",
      ".bento-card",
      ".course-card",
      ".hub-card",
      ".ws-card",
      ".h-acc-item",
      ".coming-panel",
      ".cta-card",
      ".policy-card",
      ".content-block",
      ".goal-card",
      ".module-item",
      ".post-card",
      ".create-card",
      ".feature-card",
      ".feature",
      ".article-body",
      ".profile-bento > *"
    ].join(",");

    var nodes = Array.prototype.slice.call(document.querySelectorAll(selectors));
    nodes.forEach(function (node) {
      if (!node.classList.contains("stars-reveal")) node.classList.add("stars-reveal");
    });

    if (!("IntersectionObserver" in window)) {
      nodes.forEach(function (node) { node.classList.add("visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    nodes.forEach(function (node, index) {
      node.style.transitionDelay = Math.min(index % 8, 5) * 45 + "ms";
      io.observe(node);
    });
  }

  function pointerDepth() {
    if (reduceMotion) return;
    var root = document.documentElement;
    var raf = null;
    window.addEventListener("pointermove", function (event) {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var x = (event.clientX / Math.max(window.innerWidth, 1) - 0.5).toFixed(4);
        var y = (event.clientY / Math.max(window.innerHeight, 1) - 0.5).toFixed(4);
        root.style.setProperty("--stars-px", x);
        root.style.setProperty("--stars-py", y);
      });
    }, { passive: true });
  }

  function interactiveSpotlight() {
    if (reduceMotion) return;
    var targets = document.querySelectorAll(".bento-card,.news-card,.news-card-h,.ws-card,.h-acc-item,.coming-panel,.post-card,.course-card,.feature-card,.feature,.module-item,.hub-card,.mission-card");
    targets.forEach(function (target) {
      target.addEventListener("pointermove", function (event) {
        var rect = target.getBoundingClientRect();
        target.style.setProperty("--spot-x", (((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100).toFixed(2) + "%");
        target.style.setProperty("--spot-y", (((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100).toFixed(2) + "%");
      }, { passive: true });
    });
  }

  function imageFallbacks() {
    document.querySelectorAll("img").forEach(function (img) {
      if (!img.hasAttribute("loading")) img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
      img.addEventListener("error", function () {
        img.style.opacity = "0";
        var parent = img.parentElement;
        if (parent) {
          parent.style.backgroundImage = "linear-gradient(135deg, rgba(157,199,255,.16), rgba(232,201,111,.08)), url('images/real/course-ai-what.jpg')";
          parent.style.backgroundSize = "cover";
          parent.style.backgroundPosition = "center";
        }
      }, { once: true });
    });
  }

  function createParticleField() {
    if (reduceMotion || document.querySelector(".stars-particle-canvas")) return;
    var canvas = document.createElement("canvas");
    canvas.className = "stars-particle-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.prepend(canvas);
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var pointer = { x: -9999, y: -9999 };
    var particles = [];

    function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(70, Math.min(150, Math.floor((w * h) / 10500)));
      particles = Array.from({ length: count }, function (_, i) {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.6 + .35,
          vx: (Math.random() - .5) * .12,
          vy: (Math.random() - .5) * .10,
          hue: i % 5 === 0 ? "232,201,111" : "157,199,255",
          phase: Math.random() * Math.PI * 2
        };
      });
    }

    function tick(t) {
      var w = window.innerWidth;
      var h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      particles.forEach(function (p, i) {
        var dx = p.x - pointer.x;
        var dy = p.y - pointer.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x += dx / Math.max(dist, 1) * .16;
          p.y += dy / Math.max(dist, 1) * .16;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        var alpha = .16 + Math.pow((Math.sin(t * .0012 + p.phase) + 1) / 2, 2) * .72;
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + p.hue + "," + alpha.toFixed(3) + ")";
        ctx.shadowColor = "rgba(" + p.hue + ",.7)";
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        if (i % 7 === 0) {
          for (var j = i + 1; j < Math.min(i + 12, particles.length); j++) {
            var q = particles[j];
            var lx = p.x - q.x;
            var ly = p.y - q.y;
            var ld = Math.sqrt(lx * lx + ly * ly);
            if (ld < 118) {
              ctx.strokeStyle = "rgba(157,199,255," + ((1 - ld / 118) * .13).toFixed(3) + ")";
              ctx.lineWidth = .6;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.stroke();
            }
          }
        }
      });
      requestAnimationFrame(tick);
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", function (event) {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    }, { passive: true });
    resize();
    requestAnimationFrame(tick);
  }

  function createHeroGalaxy() {
    var canvas = document.getElementById("heroGalaxyCanvas");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var stars = [];
    var pointer = { x: 0, y: 0 };

    function resize() {
      var rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.max(420, Math.floor(rect.width * rect.height / 740));
      stars = Array.from({ length: count }, function (_, i) {
        var arm = i % 4;
        var radius = Math.pow(Math.random(), .56) * Math.min(rect.width, rect.height) * .48;
        var angle = arm * Math.PI / 2 + radius * .021 + (Math.random() - .5) * .72;
        return {
          r: radius,
          a: angle,
          s: Math.random() * 1.5 + .25,
          hue: i % 9 === 0 ? "232,201,111" : (i % 3 === 0 ? "190,214,255" : "120,158,255"),
          phase: Math.random() * Math.PI * 2
        };
      });
    }

    function draw(t) {
      var rect = canvas.getBoundingClientRect();
      var cx = rect.width * (.52 + pointer.x * .022);
      var cy = rect.height * (.47 + pointer.y * .022);
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.globalCompositeOperation = "lighter";
      var core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(rect.width, rect.height) * .34);
      core.addColorStop(0, "rgba(255,255,255,.78)");
      core.addColorStop(.12, "rgba(232,201,111,.28)");
      core.addColorStop(.38, "rgba(157,199,255,.13)");
      core.addColorStop(1, "rgba(2,4,10,0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(rect.width, rect.height) * .38, 0, Math.PI * 2);
      ctx.fill();
      stars.forEach(function (p) {
        var spin = t * .000075;
        var a = p.a + spin * (1 + p.r * .006);
        var squash = .38;
        var x = cx + Math.cos(a) * p.r;
        var y = cy + Math.sin(a) * p.r * squash;
        var alpha = .24 + Math.sin(t * .002 + p.phase) * .18 + (1 - p.r / (Math.min(rect.width, rect.height) * .5)) * .34;
        ctx.fillStyle = "rgba(" + p.hue + "," + Math.max(.06, alpha).toFixed(3) + ")";
        ctx.beginPath();
        ctx.arc(x, y, p.s, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = "source-over";
      requestAnimationFrame(draw);
    }

    canvas.parentElement.addEventListener("pointermove", function (event) {
      var rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX / Math.max(rect.width, 1) - .5;
      pointer.y = event.clientY / Math.max(rect.height, 1) - .5;
    }, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    resize();
    requestAnimationFrame(draw);
  }

  function boot() {
    addOrbit();
    markActiveNav();
    revealOnScroll();
    pointerDepth();
    interactiveSpotlight();
    imageFallbacks();
    createParticleField();
    createHeroGalaxy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

