/**
 * Our Dev Wall — App
 *
 * Automatically discovers student profiles from the students/ directory
 * using the GitHub Contents API, then renders them as cards.
 */

(function () {
  "use strict";

  var API_BASE = "https://api.github.com";
  var students = [];
  var allTechs = [];

  // ── DOM refs ──────────────────────────────────────

  var grid = document.getElementById("student-grid");
  var searchInput = document.getElementById("search-input");
  var techFilter = document.getElementById("tech-filter");
  var loadingEl = document.getElementById("loading-state");
  var emptyEl = document.getElementById("empty-state");
  var statStudents = document.getElementById("stat-students");
  var statProfiles = document.getElementById("stat-profiles");
  var statPrs = document.getElementById("stat-prs");

  // ── GitHub API helpers ────────────────────────────

  function apiUrl(path) {
    return API_BASE + "/repos/" + CONFIG.owner + "/" + CONFIG.repo + "/contents/" + path + "?ref=" + CONFIG.branch;
  }

  function fetchJSON(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error("GitHub API error " + res.status);
      return res.json();
    });
  }

  function decodeContent(file) {
    try {
      return JSON.parse(atob(file.content));
    } catch (e) {
      return null;
    }
  }

  // ── Cache ─────────────────────────────────────────

  function getCache() {
    try {
      var raw = localStorage.getItem("devwall-cache");
      if (!raw) return null;
      var data = JSON.parse(raw);
      var age = (Date.now() - data.ts) / 60000;
      if (age > CONFIG.cacheMinutes) return null;
      return data.profiles;
    } catch (e) {
      return null;
    }
  }

  function setCache(profiles) {
    try {
      localStorage.setItem("devwall-cache", JSON.stringify({
        profiles: profiles,
        ts: Date.now()
      }));
    } catch (e) { /* ignore */ }
  }

  // ── Load profiles ─────────────────────────────────

  function loadProfiles() {
    // Try cache first
    var cached = getCache();
    if (cached && cached.length > 0) {
      return Promise.resolve(cached);
    }

    return fetchJSON(apiUrl("students")).then(function (entries) {
      var dirs = entries.filter(function (e) {
        return e.type === "dir" && e.name !== ".gitkeep";
      });

      var promises = dirs.map(function (dir) {
        return fetchJSON(apiUrl("students/" + dir.name + "/profile.json"))
          .then(function (file) {
            var profile = decodeContent(file);
            if (!profile) return null;
            profile._folder = dir.name;
            // If no image field or image is empty, mark it
            if (!profile.image || profile.image.trim() === "") {
              profile._noImage = true;
            } else {
              // Build raw GitHub URL for the image
              profile._imageUrl = "https://raw.githubusercontent.com/" +
                CONFIG.owner + "/" + CONFIG.repo + "/" + CONFIG.branch +
                "/students/" + dir.name + "/" + profile.image.replace("./", "");
            }
            return profile;
          })
          .catch(function () {
            return null;
          });
      });

      return Promise.all(promises).then(function (results) {
        var profiles = results.filter(Boolean);
        // Sort alphabetically by name
        profiles.sort(function (a, b) {
          return (a.name || "").localeCompare(b.name || "");
        });
        setCache(profiles);
        return profiles;
      });
    });
  }

  // ── Render ────────────────────────────────────────

  function getInitials(name) {
    if (!name) return "?";
    var parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  }

  function escapeHtml(text) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(text || ""));
    return div.innerHTML;
  }

  function createCard(student) {
    var card = document.createElement("div");
    card.className = "student-card";
    card.setAttribute("data-tech", (student.favoriteTech || "").toLowerCase());
    card.setAttribute("data-name", (student.name || "").toLowerCase());
    card.setAttribute("data-about", (student.about || "").toLowerCase());

    var photoHtml;
    if (student._noImage) {
      photoHtml = '<div class="card-initials">' + escapeHtml(getInitials(student.name)) + '</div>';
    } else {
      var initials = escapeHtml(getInitials(student.name));
      photoHtml = '<img class="card-photo" src="' + escapeHtml(student._imageUrl) +
        '" alt="' + escapeHtml(student.name) + '" loading="lazy" ' +
        'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<div class="card-initials" style="display:none">' + initials + '</div>';
    }

    var techHtml = "";
    if (student.favoriteTech) {
      techHtml = '<span class="card-tech">' + escapeHtml(student.favoriteTech) + '</span>';
    }

    var linkHtml = "";
    if (student.github) {
      linkHtml = '<a class="card-link" href="https://github.com/' +
        escapeHtml(student.github) +
        '" target="_blank" rel="noopener" title="GitHub profile">' +
        '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>' +
        '↗</a>';
    }

    var certUrl = "certificate.html?name=" + encodeURIComponent(student.name || "") +
      (student.github ? "&github=" + encodeURIComponent(student.github) : "");
    var shareHtml = '<a class="card-share" href="' + certUrl + '" title="Get certificate">\u{1F3C6}</a>';

    card.innerHTML =
      photoHtml +
      '<h3 class="card-name">' + escapeHtml(student.name || "Anonymous") + '</h3>' +
      '<div class="card-github">@' + escapeHtml(student.github || "unknown") + '</div>' +
      (student.about ? '<p class="card-about">"' + escapeHtml(student.about) + '"</p>' : '<p class="card-about"></p>') +
      '<div class="card-tech-row">' + techHtml + linkHtml + shareHtml + '</div>';

    return card;
  }

  function renderCards(list) {
    grid.innerHTML = "";
    emptyEl.style.display = "none";

    if (list.length === 0) {
      emptyEl.style.display = "block";
      return;
    }

    list.forEach(function (student) {
      grid.appendChild(createCard(student));
    });
  }

  function updateStats() {
    statStudents.textContent = students.length;
    statProfiles.textContent = students.length;
    statPrs.textContent = students.length;

    // Update progress bar
    var total = CONFIG.totalStudents || 90;
    var count = students.length;
    var pct = Math.min(Math.round((count / total) * 100), 100);
    var progressText = document.getElementById("progress-text");
    var progressCount = document.getElementById("progress-count");
    var progressFill = document.getElementById("progress-fill");
    if (progressText) progressText.textContent = "Class progress";
    if (progressCount) progressCount.textContent = count + " / " + total + " students";
    if (progressFill) {
      // Animate after a short delay
      setTimeout(function () {
        progressFill.style.width = pct + "%";
      }, 100);
    }
  }

  function buildTechFilter() {
    var techSet = {};
    students.forEach(function (s) {
      if (s.favoriteTech) techSet[s.favoriteTech] = true;
    });
    allTechs = Object.keys(techSet).sort();

    allTechs.forEach(function (tech) {
      var opt = document.createElement("option");
      opt.value = tech;
      opt.textContent = tech;
      techFilter.appendChild(opt);
    });
  }

  // ── Filtering ─────────────────────────────────────

  function getFiltered() {
    var query = (searchInput.value || "").toLowerCase().trim();
    var tech = techFilter.value;

    return students.filter(function (s) {
      var matchesTech = !tech || (s.favoriteTech || "").toLowerCase() === tech.toLowerCase();
      if (!matchesTech) return false;
      if (!query) return true;
      return (s.name || "").toLowerCase().indexOf(query) !== -1 ||
        (s.github || "").toLowerCase().indexOf(query) !== -1 ||
        (s.about || "").toLowerCase().indexOf(query) !== -1 ||
        (s.favoriteTech || "").toLowerCase().indexOf(query) !== -1;
    });
  }

  function applyFilters() {
    renderCards(getFiltered());
  }

  // ── Init ──────────────────────────────────────────

  function init() {
    loadingEl.style.display = "block";

    loadProfiles()
      .then(function (data) {
        students = data;
        loadingEl.style.display = "none";
        updateStats();
        buildTechFilter();
        renderCards(students);
      })
      .catch(function (err) {
        // Fallback to local data if API unavailable (e.g. opening file locally)
        if (typeof LOCAL_PROFILES !== "undefined" && LOCAL_PROFILES.length > 0) {
          students = LOCAL_PROFILES;
          loadingEl.style.display = "none";
          updateStats();
          buildTechFilter();
          renderCards(students);
        } else {
          loadingEl.innerHTML = '<p>Could not load profiles. Check the repository configuration in <code>js/config.js</code>.</p>';
        }
        console.error("DevWall error:", err);
      });

    searchInput.addEventListener("input", applyFilters);
    techFilter.addEventListener("change", applyFilters);

    // Mobile menu
    var menuBtn = document.getElementById("mobile-menu-btn");
    var nav = document.querySelector(".header-nav");
    if (menuBtn && nav) {
      menuBtn.addEventListener("click", function () {
        nav.classList.toggle("open");
      });
    }

    // Dark mode toggle
    var themeBtn = document.getElementById("theme-toggle");
    var savedTheme = localStorage.getItem("devwall-theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.body.classList.add("dark");
    }
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        localStorage.setItem("devwall-theme", document.body.classList.contains("dark") ? "dark" : "light");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
