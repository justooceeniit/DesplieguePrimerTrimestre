(function () {
  "use strict";

  const DATA = window.APP_DATA;
  const STORAGE_KEY = "daw_despliegue_progress_v1";

  // =========================================================================
  // 1. PERSISTENCE & STATE
  // =========================================================================
  function createDefaultProgress() {
    return {
      history: [],
      testStats: {},
      failedTests: {},
      flaggedReview: { theory: [], practical: [] },
      streak: { count: 0, lastDate: null }
    };
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return createDefaultProgress();
      const parsed = JSON.parse(raw);
      return {
        history: Array.isArray(parsed.history) ? parsed.history : [],
        testStats: parsed.testStats && typeof parsed.testStats === "object" ? parsed.testStats : {},
        failedTests: parsed.failedTests && typeof parsed.failedTests === "object" ? parsed.failedTests : {},
        flaggedReview: {
          theory: Array.isArray(parsed.flaggedReview?.theory) ? parsed.flaggedReview.theory : [],
          practical: Array.isArray(parsed.flaggedReview?.practical) ? parsed.flaggedReview.practical : []
        },
        streak: parsed.streak && typeof parsed.streak === "object"
          ? { count: Number(parsed.streak.count) || 0, lastDate: parsed.streak.lastDate || null }
          : { count: 0, lastDate: null }
      };
    } catch (e) {
      return createDefaultProgress();
    }
  }

  let progress = loadProgress();

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      showToast("No se pudo guardar en localStorage.", "danger");
    }
    updateFailedBadge();
  }

  function getLocalDateStr(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function touchStudyStreak() {
    const today = getLocalDateStr();
    const last = progress.streak.lastDate;
    if (last === today) return;

    if (last) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (last === getLocalDateStr(yesterday)) {
        progress.streak.count += 1;
      } else {
        progress.streak.count = 1;
      }
    } else {
      progress.streak.count = 1;
    }
    progress.streak.lastDate = today;
    saveProgress();
  }

  function recordTestAttempt(questionId, isCorrect) {
    const key = String(questionId);
    if (!progress.testStats[key]) {
      progress.testStats[key] = { attempts: 0, correct: 0, lastCorrect: false };
    }
    progress.testStats[key].attempts += 1;
    if (isCorrect) {
      progress.testStats[key].correct += 1;
    }
    progress.testStats[key].lastCorrect = isCorrect;

    let failStatus = "unchanged";
    if (!isCorrect) {
      progress.failedTests[key] = {
        consecutiveCorrect: 0,
        addedAt: Date.now()
      };
      failStatus = "added";
    } else if (progress.failedTests[key]) {
      progress.failedTests[key].consecutiveCorrect += 1;
      if (progress.failedTests[key].consecutiveCorrect >= 2) {
        delete progress.failedTests[key];
        failStatus = "removed";
      } else {
        failStatus = "streak1";
      }
    }

    touchStudyStreak();
    saveProgress();
    return failStatus;
  }

  function toggleFlagged(kind, id) {
    const list = progress.flaggedReview[kind];
    const idx = list.indexOf(id);
    let added = false;
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(id);
      added = true;
    }
    saveProgress();
    return added;
  }

  function isFlagged(kind, id) {
    return progress.flaggedReview[kind].includes(id);
  }

  // =========================================================================
  // 2. SAFE FORMATTING, CODE RENDERING & UTILITIES
  // =========================================================================
  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlightEscapedText(escapedText, query) {
    if (!query || !query.trim()) return escapedText;
    const safeQ = escapeRegExp(escapeHtml(query.trim()));
    if (!safeQ) return escapedText;
    const regex = new RegExp(`(${safeQ})`, "gi");
    return escapedText.replace(regex, '<mark class="search-hl">$1</mark>');
  }

  function formatInlineProse(rawLine, highlightQuery = "") {
    const tokens = [];
    const makeToken = (html) => {
      const idx = tokens.length;
      tokens.push(html);
      return `\u0000TOK${idx}\u0000`;
    };

    const withCode = String(rawLine).replace(/`([^`]+)`/g, (_, inner) => {
      const esc = highlightEscapedText(escapeHtml(inner), highlightQuery);
      return makeToken(`<code class="inline-code">${esc}</code>`);
    });

    const withBold = withCode.replace(/\*\*([^*]+)\*\*/g, (_, inner) => {
      const esc = highlightEscapedText(escapeHtml(inner), highlightQuery);
      return makeToken(`<strong>${esc}</strong>`);
    });

    let result = highlightEscapedText(escapeHtml(withBold), highlightQuery);
    tokens.forEach((html, i) => {
      result = result.replace(`\u0000TOK${i}\u0000`, html);
    });
    return result;
  }

  function renderCodeBlock(code, lang = "text", title = "", showCopy = true, highlightQuery = "") {
    const id = "code_" + Math.random().toString(36).slice(2, 10);
    const escCode = highlightEscapedText(escapeHtml(code), highlightQuery);
    const headerTitle = title ? `${escapeHtml(title)} (${escapeHtml(lang)})` : escapeHtml(lang);
    return `
      <div class="code-wrapper">
        <div class="code-header">
          <span>${headerTitle}</span>
          ${showCopy ? `<button type="button" class="copy-code-btn" data-copy-target="${id}">Copiar código</button>` : ""}
        </div>
        <pre id="${id}" class="code-block"><code>${escCode}</code></pre>
      </div>
    `;
  }

  function formatRichText(text, withCopyBtn = false, highlightQuery = "") {
    if (!text) return "";
    const blocks = [];
    const normalized = String(text).replace(/\r\n/g, "\n");
    const withCodePlaceholders = normalized.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const token = `__CODE_BLOCK_${blocks.length}__`;
      blocks.push(renderCodeBlock(code.replace(/\n$/, ""), lang || "config", "", withCopyBtn, highlightQuery));
      return `\n${token}\n`;
    });

    const lines = withCodePlaceholders.split("\n");
    let html = "";
    let inList = false;

    const closeList = () => {
      if (inList) {
        html += "</ul>";
        inList = false;
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      const blockMatch = trimmed.match(/^__CODE_BLOCK_(\d+)__$/);
      if (blockMatch) {
        closeList();
        html += blocks[Number(blockMatch[1])];
        continue;
      }
      if (!trimmed) {
        closeList();
        continue;
      }
      if (trimmed.startsWith("- ")) {
        if (!inList) {
          html += '<ul class="rich-list">';
          inList = true;
        }
        html += `<li>${formatInlineProse(trimmed.slice(2), highlightQuery)}</li>`;
      } else {
        closeList();
        html += `<p class="rich-p">${formatInlineProse(trimmed, highlightQuery)}</p>`;
      }
    }
    closeList();
    return html;
  }

  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getBlock(blockId) {
    return DATA.blocks.find((b) => b.id === blockId) || { id: blockId, name: `Bloque ${blockId}`, shortName: `B${blockId}` };
  }

  function formatDuration(sec) {
    const s = Math.max(0, Math.floor(sec));
    const mins = Math.floor(s / 60);
    const rem = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(rem).padStart(2, "0")}`;
  }

  function roundTwo(val) {
    return Math.round(val * 100) / 100;
  }

  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3400);
  }

  function openModal(title, bodyHtml, footerButtons = []) {
    const overlay = document.getElementById("modal-overlay");
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-body").innerHTML = bodyHtml;
    const footer = document.getElementById("modal-footer");
    footer.innerHTML = "";
    footerButtons.forEach((btnCfg) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `btn ${btnCfg.className || "btn-secondary"}`;
      btn.textContent = btnCfg.label;
      btn.addEventListener("click", () => {
        if (btnCfg.onClick) btnCfg.onClick();
        if (btnCfg.close !== false) closeModal();
      });
      footer.appendChild(btn);
    });
    overlay.classList.remove("hidden");
  }

  function closeModal() {
    document.getElementById("modal-overlay").classList.add("hidden");
  }

  // =========================================================================
  // 3. NAVIGATION & GLOBAL EVENTS
  // =========================================================================
  let currentView = "dashboard";

  function switchView(viewName) {
    if (examState.phase === "active" && viewName !== "simulacro") {
      showToast("Entrega o sal del simulacro activo antes de cambiar de sección.", "warning");
      return;
    }

    currentView = viewName;
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    const target = document.getElementById(`view-${viewName}`);
    if (target) target.classList.add("active");

    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewName);
    });

    closeMobileSidebar();
    renderCurrentView();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderCurrentView() {
    if (currentView === "dashboard") renderDashboard();
    else if (currentView === "simulacro") renderSimulacro();
    else if (currentView === "bloques") renderBlockPractice();
    else if (currentView === "fallos") renderFailedReview();
    else if (currentView === "guia") renderStudyGuide();
  }

  function updateFailedBadge() {
    const badge = document.getElementById("nav-failed-badge");
    const count = Object.keys(progress.failedTests).length +
      progress.flaggedReview.theory.length +
      progress.flaggedReview.practical.length;
    badge.textContent = String(count);
    badge.classList.toggle("has-items", count > 0);
  }

  function closeMobileSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebar-backdrop").classList.remove("visible");
  }

  function setupGlobalEvents() {
    document.querySelectorAll(".nav-item").forEach((btn) => {
      btn.addEventListener("click", () => switchView(btn.dataset.view));
    });

    document.getElementById("menu-toggle").addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("open");
      document.getElementById("sidebar-backdrop").classList.toggle("visible");
    });

    document.getElementById("sidebar-backdrop").addEventListener("click", closeMobileSidebar);
    document.getElementById("modal-close").addEventListener("click", closeModal);
    document.getElementById("modal-overlay").addEventListener("click", (e) => {
      if (e.target.id === "modal-overlay") closeModal();
    });

    // Copy code button delegation (works even on file://)
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".copy-code-btn");
      if (!btn) return;
      const pre = document.getElementById(btn.dataset.copyTarget);
      if (!pre) return;
      const text = pre.textContent;
      const markCopied = () => {
        btn.textContent = "✓ Copiado";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copiar código";
          btn.classList.remove("copied");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(markCopied).catch(() => fallbackCopy(text, markCopied));
      } else {
        fallbackCopy(text, markCopied);
      }
    });

    // Tab indentation inside code textareas
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && e.target.classList.contains("code-textarea")) {
        e.preventDefault();
        const ta = e.target;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        ta.value = ta.value.substring(0, start) + "    " + ta.value.substring(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
        ta.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    // Export JSON
    document.getElementById("btn-export-json").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `daw_despliegue_progreso_${getLocalDateStr()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast("Progreso exportado en JSON.", "success");
    });

    // Import JSON
    const fileInput = document.getElementById("input-import-json");
    document.getElementById("btn-import-json").addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          if (!data || typeof data !== "object" || !Array.isArray(data.history)) {
            throw new Error("Formato inválido");
          }
          progress = {
            history: data.history,
            testStats: data.testStats || {},
            failedTests: data.failedTests || {},
            flaggedReview: {
              theory: Array.isArray(data.flaggedReview?.theory) ? data.flaggedReview.theory : [],
              practical: Array.isArray(data.flaggedReview?.practical) ? data.flaggedReview.practical : []
            },
            streak: data.streak || { count: 0, lastDate: null }
          };
          saveProgress();
          renderCurrentView();
          showToast("Progreso importado correctamente.", "success");
        } catch (err) {
          showToast("Archivo JSON no válido.", "danger");
        }
        fileInput.value = "";
      };
      reader.readAsText(file);
    });

    // Reset stats
    document.getElementById("btn-reset-stats").addEventListener("click", () => {
      openModal(
        "Resetear todo el progreso",
        "<p>Se borrarán tu historial de simulacros, estadísticas por bloque, preguntas falladas y racha de estudio. Esta acción no se puede deshacer.</p>",
        [
          { label: "Cancelar", className: "btn-secondary" },
          {
            label: "Sí, resetear todo",
            className: "btn-danger-ghost",
            onClick: () => {
              progress = createDefaultProgress();
              saveProgress();
              renderCurrentView();
              showToast("Progreso reseteado.", "warning");
            }
          }
        ]
      );
    });
  }

  function fallbackCopy(text, onSuccess) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      onSuccess();
    } catch (err) {
      showToast("No se pudo copiar automáticamente.", "warning");
    }
    ta.remove();
  }

  // =========================================================================
  // 4. SHARED GUIDED SELF-EVALUATION WIDGET
  // =========================================================================
  function renderGuidedEvalCard({
    uid,
    badgeText,
    title,
    contextHtml = "",
    promptText,
    userAnswer,
    modelAnswer,
    criteriaText,
    criteria,
    currentScore,
    maxPoints = 1,
    flagKind = null,
    flagId = null,
    onScoreChange
  }) {
    const flagged = flagKind ? isFlagged(flagKind, flagId) : false;
    const scoreVal = typeof currentScore === "number" ? roundTwo(currentScore) : 0;

    const criteriaHtml = criteria.map((c, idx) => `
      <div class="criteria-row" data-crit-wrap="${uid}-${idx}">
        <span style="font-size:0.86rem;">
          ${escapeHtml(c.label)} <span class="badge badge-neutral">${c.maxPoints.toFixed(2).replace(".", ",")} pts</span>
        </span>
        <div class="criteria-btns">
          <button type="button" class="crit-btn" data-crit-uid="${uid}" data-crit-idx="${idx}" data-crit-val="0">0</button>
          <button type="button" class="crit-btn" data-crit-uid="${uid}" data-crit-idx="${idx}" data-crit-val="${roundTwo(c.maxPoints / 2)}">½</button>
          <button type="button" class="crit-btn" data-crit-uid="${uid}" data-crit-idx="${idx}" data-crit-val="${c.maxPoints}">✓ ${c.maxPoints}</button>
        </div>
      </div>
    `).join("");

    const cardHtml = `
      <div class="card" id="eval-card-${uid}">
        <div class="card-header">
          <div>
            <span class="badge badge-cyan">${escapeHtml(badgeText)}</span>
            <h4 style="margin:6px 0 0; font-size:1.02rem;">${escapeHtml(title)}</h4>
          </div>
          ${flagKind ? `
            <button type="button" class="btn btn-sm btn-warning ${flagged ? "active" : ""}" data-toggle-flag="${flagKind}:${flagId}">
              ${flagged ? "★ Marcado para repasar" : "☆ Marcar para repasar"}
            </button>
          ` : ""}
        </div>
        ${contextHtml}
        <p style="margin:0 0 10px;">${formatInlineProse(promptText)}</p>

        <div class="grading-split">
          <div class="grading-pane">
            <div class="grading-pane-title">Tu respuesta</div>
            ${userAnswer && userAnswer.trim()
              ? `<pre class="user-answer-preview">${escapeHtml(userAnswer)}</pre>`
              : `<span style="color:var(--text-muted); font-style:italic;">(Sin respuesta escrita)</span>`}
          </div>
          <div class="grading-pane">
            <div class="grading-pane-title" style="color:var(--success);">Respuesta modelo oficial</div>
            <div class="model-answer-body">${formatRichText(modelAnswer, true)}</div>
          </div>
        </div>

        <div class="criteria-box">
          <div style="font-size:0.84rem; color:var(--warning); font-weight:600; margin-bottom:8px;">
            ${escapeHtml(criteriaText)}
          </div>
          ${criteriaHtml}
          <div class="score-slider-row">
            <span style="font-size:0.86rem; font-weight:600;">Puntuación asignada:</span>
            <button type="button" class="btn btn-sm btn-secondary" data-quick-score="${uid}:0">0</button>
            <button type="button" class="btn btn-sm btn-secondary" data-quick-score="${uid}:${roundTwo(maxPoints / 2)}">0,5</button>
            <button type="button" class="btn btn-sm btn-secondary" data-quick-score="${uid}:${maxPoints}">${maxPoints}</button>
            <input type="range" min="0" max="${maxPoints}" step="0.05" value="${scoreVal}" data-score-slider="${uid}">
            <span class="score-pill" id="score-label-${uid}">${scoreVal.toFixed(2)} / ${maxPoints}</span>
          </div>
        </div>
      </div>
    `;

    return {
      html: cardHtml,
      bind: (container) => {
        const card = container.querySelector(`#eval-card-${uid}`);
        if (!card) return;
        const critValues = criteria.map(() => 0);
        const slider = card.querySelector(`[data-score-slider="${uid}"]`);
        const label = card.querySelector(`#score-label-${uid}`);

        const applyScore = (val) => {
          const clamped = Math.min(maxPoints, Math.max(0, roundTwo(val)));
          slider.value = clamped;
          label.textContent = `${clamped.toFixed(2)} / ${maxPoints}`;
          onScoreChange(clamped);
        };

        card.querySelectorAll(`[data-crit-uid="${uid}"]`).forEach((btn) => {
          btn.addEventListener("click", () => {
            const idx = Number(btn.dataset.critIdx);
            const val = Number(btn.dataset.critVal);
            critValues[idx] = val;
            card.querySelectorAll(`[data-crit-uid="${uid}"][data-crit-idx="${idx}"]`).forEach((b) => {
              b.classList.toggle("active", b === btn);
            });
            const sum = critValues.reduce((acc, v) => acc + v, 0);
            applyScore(sum);
          });
        });

        card.querySelectorAll(`[data-quick-score^="${uid}:"]`).forEach((btn) => {
          btn.addEventListener("click", () => {
            const val = Number(btn.dataset.quickScore.split(":")[1]);
            card.querySelectorAll(`[data-crit-uid="${uid}"]`).forEach((b) => b.classList.remove("active"));
            applyScore(val);
          });
        });

        slider.addEventListener("input", () => {
          card.querySelectorAll(`[data-crit-uid="${uid}"]`).forEach((b) => b.classList.remove("active"));
          applyScore(Number(slider.value));
        });

        const flagBtn = card.querySelector("[data-toggle-flag]");
        if (flagBtn) {
          flagBtn.addEventListener("click", () => {
            const [kind, idStr] = flagBtn.dataset.toggleFlag.split(":");
            const nowFlagged = toggleFlagged(kind, Number(idStr));
            flagBtn.classList.toggle("active", nowFlagged);
            flagBtn.textContent = nowFlagged ? "★ Marcado para repasar" : "☆ Marcar para repasar";
            showToast(nowFlagged ? "Añadido a Repasar Fallos." : "Quitado de la lista de repaso.", "info");
          });
        }
      }
    };
  }

  // =========================================================================
  // 5. VIEW A: DASHBOARD
  // =========================================================================
  function computeBlockStats() {
    return DATA.blocks.map((block) => {
      const qs = DATA.testQuestions.filter((q) => q.block === block.id);
      let mastered = 0;
      let attempts = 0;
      let correct = 0;
      qs.forEach((q) => {
        const st = progress.testStats[String(q.id)];
        if (st) {
          if (st.correct > 0) mastered += 1;
          attempts += st.attempts;
          correct += st.correct;
        }
      });
      const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : null;
      return {
        block,
        totalQuestions: qs.length,
        mastered,
        attempts,
        correct,
        accuracy
      };
    });
  }

  function renderDashboard() {
    const container = document.getElementById("view-dashboard");
    const blockStats = computeBlockStats();

    const masteredTotal = Object.values(progress.testStats).filter((s) => s.correct > 0).length;
    const masteredPct = Math.round((masteredTotal / DATA.testQuestions.length) * 100);

    const grades = progress.history.map((h) => Number(h.finalGrade));
    const avgGrade = grades.length
      ? (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(2)
      : "—";
    const bestGrade = grades.length ? Math.max(...grades).toFixed(2) : null;

    const attemptedBlocks = blockStats.filter((b) => b.attempts > 0);
    let weakest = null;
    if (attemptedBlocks.length > 0) {
      weakest = attemptedBlocks.slice().sort((a, b) => a.accuracy - b.accuracy || a.mastered - b.mastered)[0];
    }

    const failedCount = Object.keys(progress.failedTests).length;
    const flaggedCount = progress.flaggedReview.theory.length + progress.flaggedReview.practical.length;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Dashboard · Despliegue de Aplicaciones Web</h1>
          <p class="page-subtitle">Seguimiento de dominio del banco de 100 test, 16 preguntas de teoría y 11 casos prácticos.</p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button id="dash-start-exam" class="btn btn-primary">⏱ Iniciar Simulacro</button>
          <button id="dash-go-guide" class="btn btn-secondary">⌘ Chuleta Rápida</button>
        </div>
      </div>

      <div class="grid-4">
        <div class="kpi-card">
          <span class="kpi-label">Test Dominadas</span>
          <span class="kpi-value accent">${masteredPct}%</span>
          <span class="kpi-meta">${masteredTotal} de ${DATA.testQuestions.length} preguntas acertadas</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Nota Media Simulacros</span>
          <span class="kpi-value ${avgGrade !== "—" && Number(avgGrade) >= 5 ? "success" : "warning"}">${avgGrade}${avgGrade !== "—" ? "/10" : ""}</span>
          <span class="kpi-meta">${grades.length} simulacro(s)${bestGrade ? ` · Mejor: ${bestGrade}` : ""}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Racha de Estudio</span>
          <span class="kpi-value success">${progress.streak.count} ${progress.streak.count === 1 ? "día" : "días"}</span>
          <span class="kpi-meta">${progress.streak.lastDate ? `Última actividad: ${progress.streak.lastDate}` : "Empieza hoy un test o simulacro"}</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Bloque Más Flojo</span>
          <span class="kpi-value ${weakest && weakest.accuracy < 60 ? "danger" : "warning"}" style="font-size:1.15rem; line-height:1.3;">
            ${weakest ? escapeHtml(weakest.block.shortName) : "Sin datos"}
          </span>
          <span class="kpi-meta">
            ${weakest ? `${weakest.accuracy}% acierto (${weakest.correct}/${weakest.attempts})` : "Haz un test para detectarlo"}
          </span>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Accesos rápidos</h3>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:10px;">
          <button class="btn btn-primary" data-dash-nav="simulacro">⏱ Nuevo Simulacro Oficial</button>
          <button class="btn ${failedCount + flaggedCount > 0 ? "btn-warning" : "btn-secondary"}" data-dash-nav="fallos">
            ⚑ Repasar Fallos (${failedCount} test · ${flaggedCount} marcados)
          </button>
          ${weakest ? `<button class="btn btn-secondary" id="dash-practice-weakest">◫ Reforzar: ${escapeHtml(weakest.block.shortName)}</button>` : ""}
          <button class="btn btn-secondary" data-dash-nav="bloques">◫ Practicar los 8 Bloques</button>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Rendimiento por Bloque Temático</h3>
            <span class="badge badge-neutral">100 preguntas test</span>
          </div>
          ${blockStats.map((bs) => {
            const pct = bs.accuracy !== null ? bs.accuracy : 0;
            const color = bs.accuracy === null
              ? "var(--border-light)"
              : pct >= 75
              ? "var(--success)"
              : pct >= 50
              ? "var(--warning)"
              : "var(--danger)";
            return `
              <div class="progress-row">
                <div class="progress-header">
                  <span>
                    <strong>B${bs.block.id}.</strong> ${escapeHtml(bs.block.shortName)}
                    <span style="color:var(--text-muted); font-size:0.8rem;">(${bs.mastered}/${bs.totalQuestions} dominadas)</span>
                  </span>
                  <span style="font-family:var(--font-mono); font-size:0.82rem; color:${bs.accuracy === null ? "var(--text-muted)" : color};">
                    ${bs.accuracy !== null ? `${bs.accuracy}% acierto` : "Sin intentos"}
                  </span>
                </div>
                <div class="progress-track">
                  <div class="progress-fill" style="width:${bs.accuracy !== null ? pct : 0}%; background:${color};"></div>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Historial de Simulacros</h3>
            <span class="badge badge-cyan">${progress.history.length} guardados</span>
          </div>
          ${progress.history.length === 0
            ? `<div class="empty-state">
                <p>Todavía no has completado ningún simulacro.</p>
                <button class="btn btn-primary btn-sm" data-dash-nav="simulacro">Hacer primer simulacro</button>
              </div>`
            : `<div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Formato</th>
                      <th>Desglose</th>
                      <th>Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${progress.history.slice().reverse().map((h) => {
                      const gradeNum = Number(h.finalGrade);
                      const badgeCls = gradeNum >= 7 ? "badge-success" : gradeNum >= 5 ? "badge-cyan" : "badge-danger";
                      return `
                        <tr>
                          <td style="font-size:0.82rem;">${escapeHtml(h.date)}</td>
                          <td style="font-size:0.82rem;">${h.numCases} ${h.numCases === 1 ? "caso" : "casos"} · ${formatDuration(h.timeUsedSec || 0)}</td>
                          <td style="font-size:0.8rem; font-family:var(--font-mono);">
                            T:${h.testCorrect}/20 · D:${Number(h.theoryPts).toFixed(1)}/3 · P:${Number(h.practicalPts).toFixed(1)}/${h.practicalMax}
                          </td>
                          <td><span class="badge ${badgeCls}">${gradeNum.toFixed(2)}</span></td>
                        </tr>
                      `;
                    }).join("")}
                  </tbody>
                </table>
              </div>`}
        </div>
      </div>
    `;

    container.querySelector("#dash-start-exam").addEventListener("click", () => switchView("simulacro"));
    container.querySelector("#dash-go-guide").addEventListener("click", () => switchView("guia"));
    container.querySelectorAll("[data-dash-nav]").forEach((btn) => {
      btn.addEventListener("click", () => switchView(btn.dataset.dashNav));
    });
    const weakBtn = container.querySelector("#dash-practice-weakest");
    if (weakBtn && weakest) {
      weakBtn.addEventListener("click", () => {
        blockState.selectedBlock = weakest.block.id;
        blockState.tab = "test";
        switchView("bloques");
      });
    }
  }

  // =========================================================================
  // 6. VIEW B: MODO SIMULACRO DE EXAMEN
  // =========================================================================
  const examState = {
    phase: "config", // 'config' | 'active' | 'grading'
    config: {
      numCases: 1,
      durationMin: 90
    },
    testItems: [],
    theoryItems: [],
    practicalItems: [],
    flatNav: [],
    currentNavIdx: 0,
    answers: {
      test: {}, // qId -> 'a'|'b'|'c'|'d'
      theory: {}, // tId -> string
      practical: {} // `${cId}_${partNumber}` -> string
    },
    flags: {}, // navKey -> boolean
    selfScores: {
      theory: {}, // tId -> number (0..1)
      practical: {} // `${cId}_${partNumber}` -> number (0..1)
    },
    testResults: null,
    timerId: null,
    remainingSec: 0,
    elapsedSec: 0,
    paused: false,
    timerHidden: false,
    savedToHistory: false
  };

  function stopExamTimer() {
    if (examState.timerId) {
      clearInterval(examState.timerId);
      examState.timerId = null;
    }
  }

  function startExamSession() {
    const numCases = examState.config.numCases;
    const durationMin = examState.config.durationMin;

    examState.testItems = shuffleArray(DATA.testQuestions).slice(0, 20);
    examState.theoryItems = shuffleArray(DATA.theoryQuestions).slice(0, 3);
    examState.practicalItems = shuffleArray(DATA.practicalCases).slice(0, numCases);

    const nav = [];
    examState.testItems.forEach((q, idx) => {
      nav.push({ key: `test_${q.id}`, type: "test", label: `T${idx + 1}`, indexLabel: `Test ${idx + 1}/20`, item: q });
    });
    examState.theoryItems.forEach((t, idx) => {
      nav.push({ key: `theory_${t.id}`, type: "theory", label: `D${idx + 1}`, indexLabel: `Teoría ${idx + 1}/3`, item: t });
    });
    examState.practicalItems.forEach((c, cIdx) => {
      c.parts.forEach((p) => {
        nav.push({
          key: `prac_${c.id}_${p.partNumber}`,
          type: "practical",
          label: `C${cIdx + 1}.${p.partNumber}`,
          indexLabel: `Caso ${cIdx + 1} · Apartado ${p.partNumber}`,
          caseObj: c,
          partObj: p
        });
      });
    });

    examState.flatNav = nav;
    examState.currentNavIdx = 0;
    examState.answers = { test: {}, theory: {}, practical: {} };
    examState.flags = {};
    examState.selfScores = { theory: {}, practical: {} };
    examState.testResults = null;
    examState.paused = false;
    examState.timerHidden = false;
    examState.savedToHistory = false;
    examState.elapsedSec = 0;
    examState.remainingSec = durationMin > 0 ? durationMin * 60 : 0;
    examState.phase = "active";

    document.body.classList.add("exam-focus-mode");
    stopExamTimer();
    examState.timerId = setInterval(() => {
      if (examState.paused || examState.phase !== "active") return;
      examState.elapsedSec += 1;
      if (examState.config.durationMin > 0) {
        examState.remainingSec -= 1;
        updateTimerDom();
        if (examState.remainingSec <= 0) {
          stopExamTimer();
          showToast("¡Tiempo agotado! Se procede a corregir el simulacro.", "warning");
          finishExam();
        }
      } else {
        updateTimerDom();
      }
    }, 1000);

    renderSimulacro();
  }

  function updateTimerDom() {
    const el = document.getElementById("exam-timer-display");
    if (!el) return;
    if (examState.timerHidden) {
      el.textContent = "••:••";
      el.className = "exam-timer";
      return;
    }
    if (examState.config.durationMin > 0) {
      el.textContent = formatDuration(examState.remainingSec);
      el.className = "exam-timer" + (examState.remainingSec <= 300 ? " danger" : examState.remainingSec <= 600 ? " warning" : "");
    } else {
      el.textContent = formatDuration(examState.elapsedSec);
      el.className = "exam-timer";
    }
  }

  function isNavItemAnswered(navItem) {
    if (navItem.type === "test") return Boolean(examState.answers.test[navItem.item.id]);
    if (navItem.type === "theory") return Boolean((examState.answers.theory[navItem.item.id] || "").trim());
    const pKey = `${navItem.caseObj.id}_${navItem.partObj.partNumber}`;
    return Boolean((examState.answers.practical[pKey] || "").trim());
  }

  function finishExam() {
    stopExamTimer();
    document.body.classList.remove("exam-focus-mode");

    let testCorrect = 0;
    const details = examState.testItems.map((q) => {
      const userAns = examState.answers.test[q.id] || null;
      const isCorrect = userAns === q.correct;
      if (isCorrect) testCorrect += 1;
      if (userAns) {
        recordTestAttempt(q.id, isCorrect);
      } else {
        recordTestAttempt(q.id, false);
      }
      return { q, userAns, isCorrect };
    });

    examState.testResults = { correctCount: testCorrect, total: examState.testItems.length, details };
    examState.theoryItems.forEach((t) => {
      if (typeof examState.selfScores.theory[t.id] !== "number") examState.selfScores.theory[t.id] = 0;
    });
    examState.practicalItems.forEach((c) => {
      c.parts.forEach((p) => {
        const k = `${c.id}_${p.partNumber}`;
        if (typeof examState.selfScores.practical[k] !== "number") examState.selfScores.practical[k] = 0;
      });
    });

    examState.phase = "grading";
    renderSimulacro();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function computeExamGrades() {
    const testCorrect = examState.testResults ? examState.testResults.correctCount : 0;
    const theoryPts = examState.theoryItems.reduce((acc, t) => acc + (examState.selfScores.theory[t.id] || 0), 0);
    let practicalPts = 0;
    examState.practicalItems.forEach((c) => {
      c.parts.forEach((p) => {
        practicalPts += examState.selfScores.practical[`${c.id}_${p.partNumber}`] || 0;
      });
    });
    const numCases = examState.practicalItems.length;
    const practicalMax = numCases * 3;

    let finalGrade = 0;
    if (numCases === 1) {
      // 40% Test + 30% Teoría + 30% Práctica
      finalGrade = (testCorrect / 20) * 4 + theoryPts + practicalPts;
    } else {
      // 30% Test + 20% Teoría + 50% Práctica
      finalGrade = (testCorrect / 20) * 3 + (theoryPts / 3) * 2 + (practicalPts / 6) * 5;
    }

    return {
      testCorrect,
      theoryPts: roundTwo(theoryPts),
      practicalPts: roundTwo(practicalPts),
      practicalMax,
      finalGrade: roundTwo(finalGrade)
    };
  }

  function renderSimulacro() {
    const container = document.getElementById("view-simulacro");

    if (examState.phase === "config") {
      document.body.classList.remove("exam-focus-mode");
      container.innerHTML = `
        <div class="page-header">
          <div>
            <h1 class="page-title">Simulacro Oficial de Examen</h1>
            <p class="page-subtitle">Estructura real: 20 preguntas tipo test + 3 preguntas cortas de desarrollo + 1 o 2 casos prácticos.</p>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Configurar nuevo simulacro</h3>
            <span class="badge badge-cyan">Selección aleatoria sin repetición</span>
          </div>

          <div class="grid-3">
            <div class="card-elevated">
              <div class="kpi-label">Parte 1 · Tipo Test</div>
              <div style="font-size:1.25rem; font-weight:700; margin:4px 0;">20 preguntas</div>
              <div style="font-size:0.84rem; color:var(--text-secondary);">Extraídas aleatoriamente del banco de 100. Corrección automática con explicaciones.</div>
            </div>
            <div class="card-elevated">
              <div class="kpi-label">Parte 2 · Teoría Corta</div>
              <div style="font-size:1.25rem; font-weight:700; margin:4px 0;">3 ejercicios</div>
              <div style="font-size:0.84rem; color:var(--text-secondary);">Extraídos de los 16 ejercicios de desarrollo (1 punto c/u). Autoevaluación guiada.</div>
            </div>
            <div class="card-elevated">
              <div class="kpi-label">Parte 3 · Casos Prácticos</div>
              <div style="font-size:1.25rem; font-weight:700; margin:4px 0;">1 o 2 casos</div>
              <div style="font-size:0.84rem; color:var(--text-secondary);">De los 11 casos completos (3 apartados de 1 punto por caso).</div>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Número de casos prácticos (y ponderación sobre 10)</label>
            <div class="radio-cards">
              <label class="radio-card ${examState.config.numCases === 1 ? "selected" : ""}">
                <input type="radio" name="cfg-cases" value="1" ${examState.config.numCases === 1 ? "checked" : ""}>
                <strong>1 Caso Práctico (3 apartados / 3 pts)</strong>
                <span style="font-size:0.82rem; color:var(--text-secondary);">Ponderación: Test 40% (4 pts) + Teoría 30% (3 pts) + Práctica 30% (3 pts)</span>
              </label>
              <label class="radio-card ${examState.config.numCases === 2 ? "selected" : ""}">
                <input type="radio" name="cfg-cases" value="2" ${examState.config.numCases === 2 ? "checked" : ""}>
                <strong>2 Casos Prácticos (6 apartados / 6 pts)</strong>
                <span style="font-size:0.82rem; color:var(--text-secondary);">Ponderación: Test 30% (3 pts) + Teoría 20% (2 pts) + Práctica 50% (5 pts)</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Temporizador</label>
            <div class="radio-cards">
              ${[
                { min: 60, label: "60 minutos", desc: "Ritmo rápido" },
                { min: 90, label: "90 minutos (Recomendado)", desc: "Duración estándar de examen" },
                { min: 120, label: "120 minutos", desc: "Con 2 casos prácticos" },
                { min: 0, label: "Sin límite", desc: "Cronómetro informativo" }
              ].map((opt) => `
                <label class="radio-card ${examState.config.durationMin === opt.min ? "selected" : ""}">
                  <input type="radio" name="cfg-dur" value="${opt.min}" ${examState.config.durationMin === opt.min ? "checked" : ""}>
                  <strong>${opt.label}</strong>
                  <span style="font-size:0.82rem; color:var(--text-secondary);">${opt.desc}</span>
                </label>
              `).join("")}
            </div>
          </div>

          <div style="margin-top:20px; display:flex; justify-content:flex-end;">
            <button id="btn-launch-exam" class="btn btn-primary btn-lg">▶ Comenzar Simulacro</button>
          </div>
        </div>
      `;

      container.querySelectorAll('input[name="cfg-cases"]').forEach((inp) => {
        inp.addEventListener("change", () => {
          examState.config.numCases = Number(inp.value);
          renderSimulacro();
        });
      });
      container.querySelectorAll('input[name="cfg-dur"]').forEach((inp) => {
        inp.addEventListener("change", () => {
          examState.config.durationMin = Number(inp.value);
          renderSimulacro();
        });
      });
      container.querySelector("#btn-launch-exam").addEventListener("click", startExamSession);
      return;
    }

    if (examState.phase === "active") {
      const navItem = examState.flatNav[examState.currentNavIdx];
      const answeredCount = examState.flatNav.filter(isNavItemAnswered).length;

      let questionBodyHtml = "";
      if (navItem.type === "test") {
        const q = navItem.item;
        const selected = examState.answers.test[q.id];
        questionBodyHtml = `
          <div class="card-header">
            <div>
              <span class="badge badge-cyan">${escapeHtml(navItem.indexLabel)}</span>
              <span class="badge badge-neutral">${escapeHtml(getBlock(q.block).shortName)}</span>
            </div>
            <button type="button" id="btn-flag-current" class="btn btn-sm btn-warning ${examState.flags[navItem.key] ? "active" : ""}">
              ${examState.flags[navItem.key] ? "⚑ Marcada para revisar" : "⚐ Marcar para revisar"}
            </button>
          </div>
          <h3 style="margin:8px 0 14px; font-size:1.12rem;">${formatInlineProse(q.question)}</h3>
          <div class="options-list">
            ${["a", "b", "c", "d"].map((letter) => `
              <button type="button" class="option-btn ${selected === letter ? "selected" : ""}" data-exam-opt="${letter}">
                <span class="option-letter">${letter}</span>
                <span>${formatInlineProse(q.options[letter])}</span>
              </button>
            `).join("")}
          </div>
        `;
      } else if (navItem.type === "theory") {
        const t = navItem.item;
        const val = examState.answers.theory[t.id] || "";
        questionBodyHtml = `
          <div class="card-header">
            <div>
              <span class="badge badge-cyan">${escapeHtml(navItem.indexLabel)}</span>
              <span class="badge badge-neutral">1 punto · ${escapeHtml(getBlock(t.block).shortName)}</span>
            </div>
            <button type="button" id="btn-flag-current" class="btn btn-sm btn-warning ${examState.flags[navItem.key] ? "active" : ""}">
              ${examState.flags[navItem.key] ? "⚑ Marcada para revisar" : "⚐ Marcar para revisar"}
            </button>
          </div>
          <h3 style="margin:6px 0 10px;">${escapeHtml(t.title)}</h3>
          <p style="margin:0 0 14px;">${formatInlineProse(t.prompt)}</p>
          <label class="form-label" style="font-size:0.84rem; color:var(--text-secondary);">Tu respuesta (fuente monoespaciada · puedes usar Tabulador):</label>
          <textarea id="exam-textarea" class="code-textarea" rows="8" placeholder="Escribe tu respuesta y las directivas o comandos necesarios...">${escapeHtml(val)}</textarea>
        `;
      } else {
        const c = navItem.caseObj;
        const p = navItem.partObj;
        const pKey = `${c.id}_${p.partNumber}`;
        const val = examState.answers.practical[pKey] || "";
        questionBodyHtml = `
          <div class="card-header">
            <div>
              <span class="badge badge-cyan">${escapeHtml(navItem.indexLabel)}</span>
              <span class="badge badge-neutral">1 punto · ${escapeHtml(getBlock(c.block).shortName)}</span>
            </div>
            <button type="button" id="btn-flag-current" class="btn btn-sm btn-warning ${examState.flags[navItem.key] ? "active" : ""}">
              ${examState.flags[navItem.key] ? "⚑ Marcada para revisar" : "⚐ Marcar para revisar"}
            </button>
          </div>
          <div class="card-elevated" style="margin-bottom:14px;">
            <div style="font-weight:700; color:var(--accent); margin-bottom:4px;">${escapeHtml(c.title)}</div>
            <div style="font-size:0.9rem; color:var(--text-secondary);">${formatInlineProse(c.context)}</div>
          </div>
          <h4 style="margin:0 0 10px;">Apartado ${p.partNumber} (1 punto)</h4>
          <p style="margin:0 0 14px;">${formatInlineProse(p.prompt)}</p>
          <label class="form-label" style="font-size:0.84rem; color:var(--text-secondary);">Tu solución técnica (directivas, configuración, comandos):</label>
          <textarea id="exam-textarea" class="code-textarea" rows="9" placeholder="<VirtualHost *:80>&#10;    ...&#10;</VirtualHost>">${escapeHtml(val)}</textarea>
        `;
      }

      const testNavs = examState.flatNav.filter((n) => n.type === "test");
      const theoryNavs = examState.flatNav.filter((n) => n.type === "theory");
      const pracNavs = examState.flatNav.filter((n) => n.type === "practical");

      const renderPaletteGroup = (title, items) => `
        <div class="palette-group-title">${title}</div>
        <div class="palette-grid">
          ${items.map((item) => {
            const idx = examState.flatNav.indexOf(item);
            const cls = [
              "palette-pill",
              idx === examState.currentNavIdx ? "current" : "",
              isNavItemAnswered(item) ? "answered" : "",
              examState.flags[item.key] ? "flagged" : ""
            ].filter(Boolean).join(" ");
            return `<button type="button" class="${cls}" data-nav-idx="${idx}">${escapeHtml(item.label)}</button>`;
          }).join("")}
        </div>
      `;

      container.innerHTML = `
        <div class="exam-topbar">
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <strong>Simulacro en curso</strong>
            <span class="badge badge-neutral">${answeredCount} / ${examState.flatNav.length} respondidas</span>
          </div>
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span id="exam-timer-display" class="exam-timer">--:--</span>
            <button type="button" id="btn-pause-timer" class="btn btn-sm btn-secondary">
              ${examState.paused ? "▶ Reanudar" : "⏸ Pausar"}
            </button>
            <button type="button" id="btn-toggle-timer" class="btn btn-sm btn-secondary">
              ${examState.timerHidden ? "👁 Mostrar reloj" : "🙈 Ocultar"}
            </button>
            <button type="button" id="btn-abort-exam" class="btn btn-sm btn-danger-ghost">Salir</button>
            <button type="button" id="btn-finish-exam" class="btn btn-sm btn-success">✓ Entregar Examen</button>
          </div>
        </div>

        ${examState.paused ? `
          <div class="card" style="text-align:center; padding:50px 20px;">
            <h2>Simulacro en pausa</h2>
            <p style="color:var(--text-secondary);">El temporizador está detenido. Pulsa Reanudar cuando quieras continuar.</p>
            <button type="button" id="btn-resume-overlay" class="btn btn-primary btn-lg">▶ Reanudar Simulacro</button>
          </div>
        ` : `
          <div class="exam-layout">
            <div class="card">
              ${questionBodyHtml}
              <div style="display:flex; justify-content:space-between; margin-top:20px; padding-top:14px; border-top:1px solid var(--border);">
                <button type="button" id="btn-prev-q" class="btn btn-secondary" ${examState.currentNavIdx === 0 ? "disabled" : ""}>← Anterior</button>
                <button type="button" id="btn-next-q" class="btn btn-primary" ${examState.currentNavIdx === examState.flatNav.length - 1 ? "disabled" : ""}>Siguiente →</button>
              </div>
            </div>

            <div class="card palette-card">
              <div class="card-header" style="margin-bottom:6px;">
                <h4 class="card-title" style="font-size:0.95rem;">Navegación rápida</h4>
              </div>
              <div style="font-size:0.76rem; color:var(--text-muted); margin-bottom:8px;">
                Verde: respondida · Punto naranja: revisar
              </div>
              ${renderPaletteGroup("Test (20)", testNavs)}
              ${renderPaletteGroup("Preguntas Cortas (3)", theoryNavs)}
              ${renderPaletteGroup(`Casos Prácticos (${pracNavs.length} apartados)`, pracNavs)}
            </div>
          </div>
        `}
      `;

      updateTimerDom();

      container.querySelector("#btn-pause-timer").addEventListener("click", () => {
        examState.paused = !examState.paused;
        renderSimulacro();
      });
      const resumeOv = container.querySelector("#btn-resume-overlay");
      if (resumeOv) {
        resumeOv.addEventListener("click", () => {
          examState.paused = false;
          renderSimulacro();
        });
      }
      container.querySelector("#btn-toggle-timer").addEventListener("click", () => {
        examState.timerHidden = !examState.timerHidden;
        renderSimulacro();
      });
      container.querySelector("#btn-abort-exam").addEventListener("click", () => {
        openModal(
          "Abandonar simulacro",
          "<p>¿Seguro que quieres salir del simulacro actual? Se perderán las respuestas de este intento.</p>",
          [
            { label: "Seguir en el examen", className: "btn-secondary" },
            {
              label: "Salir al configurador",
              className: "btn-danger-ghost",
              onClick: () => {
                stopExamTimer();
                document.body.classList.remove("exam-focus-mode");
                examState.phase = "config";
                renderSimulacro();
              }
            }
          ]
        );
      });
      container.querySelector("#btn-finish-exam").addEventListener("click", () => {
        const missing = examState.flatNav.length - answeredCount;
        openModal(
          "Entregar simulacro",
          missing > 0
            ? `<p>Has respondido <strong>${answeredCount}</strong> de <strong>${examState.flatNav.length}</strong> apartados (quedan ${missing} sin responder). ¿Quieres entregar igualmente y pasar a la corrección?</p>`
            : `<p>Has respondido todos los apartados. ¿Entregar el examen para corregir el test y comenzar la autoevaluación guiada?</p>`,
          [
            { label: "Seguir revisando", className: "btn-secondary" },
            { label: "Entregar ahora", className: "btn-success", onClick: finishExam }
          ]
        );
      });

      if (!examState.paused) {
        container.querySelectorAll("[data-exam-opt]").forEach((btn) => {
          btn.addEventListener("click", () => {
            examState.answers.test[navItem.item.id] = btn.dataset.examOpt;
            renderSimulacro();
          });
        });

        const ta = container.querySelector("#exam-textarea");
        if (ta) {
          ta.addEventListener("input", () => {
            if (navItem.type === "theory") {
              examState.answers.theory[navItem.item.id] = ta.value;
            } else {
              const pKey = `${navItem.caseObj.id}_${navItem.partObj.partNumber}`;
              examState.answers.practical[pKey] = ta.value;
            }
            const pill = container.querySelector(`[data-nav-idx="${examState.currentNavIdx}"]`);
            if (pill) pill.classList.toggle("answered", Boolean(ta.value.trim()));
          });
        }

        container.querySelector("#btn-flag-current").addEventListener("click", () => {
          examState.flags[navItem.key] = !examState.flags[navItem.key];
          renderSimulacro();
        });

        container.querySelector("#btn-prev-q").addEventListener("click", () => {
          if (examState.currentNavIdx > 0) {
            examState.currentNavIdx -= 1;
            renderSimulacro();
          }
        });
        container.querySelector("#btn-next-q").addEventListener("click", () => {
          if (examState.currentNavIdx < examState.flatNav.length - 1) {
            examState.currentNavIdx += 1;
            renderSimulacro();
          }
        });
        container.querySelectorAll("[data-nav-idx]").forEach((pill) => {
          pill.addEventListener("click", () => {
            examState.currentNavIdx = Number(pill.dataset.navIdx);
            renderSimulacro();
          });
        });
      }
      return;
    }

    // Phase: 'grading' (Autoevaluación Guiada + Nota Final)
    const grades = computeExamGrades();
    const numCases = examState.practicalItems.length;
    const weightInfo = numCases === 1
      ? "Ponderación: Test 40% + Teoría 30% + Práctica 30%"
      : "Ponderación: Test 30% + Teoría 20% + Práctica 50%";

    const theoryWidgets = examState.theoryItems.map((t, idx) =>
      renderGuidedEvalCard({
        uid: `sim_th_${t.id}`,
        badgeText: `Teoría ${idx + 1}/3 · ${getBlock(t.block).shortName}`,
        title: t.title,
        promptText: t.prompt,
        userAnswer: examState.answers.theory[t.id] || "",
        modelAnswer: t.modelAnswer,
        criteriaText: t.criteriaText,
        criteria: t.criteria,
        currentScore: examState.selfScores.theory[t.id] || 0,
        maxPoints: 1,
        flagKind: "theory",
        flagId: t.id,
        onScoreChange: (val) => {
          examState.selfScores.theory[t.id] = val;
          refreshGradingSummary();
        }
      })
    );

    const practicalWidgets = [];
    examState.practicalItems.forEach((c, cIdx) => {
      c.parts.forEach((p) => {
        const pKey = `${c.id}_${p.partNumber}`;
        practicalWidgets.push(
          renderGuidedEvalCard({
            uid: `sim_pr_${pKey}`,
            badgeText: `Caso ${cIdx + 1} · Apartado ${p.partNumber}/3 · ${getBlock(c.block).shortName}`,
            title: c.title,
            contextHtml: `<div class="card-elevated" style="margin-bottom:10px; font-size:0.86rem; color:var(--text-secondary);">${formatInlineProse(c.context)}</div>`,
            promptText: p.prompt,
            userAnswer: examState.answers.practical[pKey] || "",
            modelAnswer: p.modelAnswer,
            criteriaText: p.criteriaText,
            criteria: p.criteria,
            currentScore: examState.selfScores.practical[pKey] || 0,
            maxPoints: 1,
            flagKind: "practical",
            flagId: c.id,
            onScoreChange: (val) => {
              examState.selfScores.practical[pKey] = val;
              refreshGradingSummary();
            }
          })
        );
      });
    });

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Corrección y Autoevaluación Guiada</h1>
          <p class="page-subtitle">${escapeHtml(weightInfo)} · Tiempo empleado: ${formatDuration(examState.elapsedSec)}</p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button type="button" id="btn-save-exam-history" class="btn btn-success" ${examState.savedToHistory ? "disabled" : ""}>
            ${examState.savedToHistory ? "✓ Guardado en Historial" : "💾 Guardar Nota en Historial"}
          </button>
          <button type="button" id="btn-new-simulacro" class="btn btn-secondary">↻ Nuevo Simulacro</button>
        </div>
      </div>

      <div class="grid-4" id="grading-summary-cards">
        <div class="kpi-card">
          <span class="kpi-label">Test (Auto)</span>
          <span class="kpi-value accent">${grades.testCorrect} / 20</span>
          <span class="kpi-meta">${Math.round((grades.testCorrect / 20) * 100)}% acierto (fallos guardados)</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Teoría Corta</span>
          <span class="kpi-value" id="sum-theory-pts">${grades.theoryPts.toFixed(2)} / 3</span>
          <span class="kpi-meta">Autoevaluación de los 3 ejercicios</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Casos Prácticos</span>
          <span class="kpi-value" id="sum-pract-pts">${grades.practicalPts.toFixed(2)} / ${grades.practicalMax}</span>
          <span class="kpi-meta">${numCases} ${numCases === 1 ? "caso" : "casos"} (${grades.practicalMax} apartados)</span>
        </div>
        <div class="kpi-card">
          <span class="kpi-label">Nota Final Ponderada</span>
          <span class="kpi-value ${grades.finalGrade >= 5 ? "success" : "danger"}" id="sum-final-grade">${grades.finalGrade.toFixed(2)} / 10</span>
          <span class="kpi-meta" id="sum-status-text">${grades.finalGrade >= 5 ? "Aprobado" : "Suspenso (sigue repasando)"}</span>
        </div>
      </div>

      <div class="tabs" id="grading-tabs">
        <button type="button" class="tab-btn active" data-gtab="theory">2. Teoría Corta (3)</button>
        <button type="button" class="tab-btn" data-gtab="practical">3. Casos Prácticos (${practicalWidgets.length} apt.)</button>
        <button type="button" class="tab-btn" data-gtab="test">1. Revisión Test (${grades.testCorrect}/20)</button>
      </div>

      <div id="gtab-theory">${theoryWidgets.map((w) => w.html).join("")}</div>
      <div id="gtab-practical" style="display:none;">${practicalWidgets.map((w) => w.html).join("")}</div>
      <div id="gtab-test" style="display:none;">
        ${examState.testResults.details.map((d, i) => `
          <div class="card">
            <div class="card-header">
              <div>
                <span class="badge ${d.isCorrect ? "badge-success" : "badge-danger"}">
                  Test ${i + 1} · ${d.isCorrect ? "✓ Correcta" : "✕ Fallada"}
                </span>
                <span class="badge badge-neutral">${escapeHtml(getBlock(d.q.block).shortName)}</span>
              </div>
              <span style="font-family:var(--font-mono); font-size:0.82rem; color:var(--text-secondary);">
                Tu respuesta: <strong>${d.userAns ? d.userAns.toUpperCase() : "En blanco"}</strong> · Correcta: <strong style="color:var(--success);">${d.q.correct.toUpperCase()}</strong>
              </span>
            </div>
            <p style="margin:0 0 8px; font-weight:600;">${formatInlineProse(d.q.question)}</p>
            <div style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:8px;">
              Opción correcta (${d.q.correct}): <strong style="color:var(--text-primary);">${formatInlineProse(d.q.options[d.q.correct])}</strong>
            </div>
            <div class="explanation-box">${formatInlineProse(d.q.explanation)}</div>
          </div>
        `).join("")}
      </div>
    `;

    theoryWidgets.forEach((w) => w.bind(container));
    practicalWidgets.forEach((w) => w.bind(container));

    function refreshGradingSummary() {
      const g = computeExamGrades();
      const tEl = container.querySelector("#sum-theory-pts");
      const pEl = container.querySelector("#sum-pract-pts");
      const fEl = container.querySelector("#sum-final-grade");
      const sEl = container.querySelector("#sum-status-text");
      if (tEl) tEl.textContent = `${g.theoryPts.toFixed(2)} / 3`;
      if (pEl) pEl.textContent = `${g.practicalPts.toFixed(2)} / ${g.practicalMax}`;
      if (fEl) {
        fEl.textContent = `${g.finalGrade.toFixed(2)} / 10`;
        fEl.className = `kpi-value ${g.finalGrade >= 5 ? "success" : "danger"}`;
      }
      if (sEl) sEl.textContent = g.finalGrade >= 5 ? "Aprobado" : "Suspenso (sigue repasando)";
    }

    container.querySelectorAll("[data-gtab]").forEach((tab) => {
      tab.addEventListener("click", () => {
        container.querySelectorAll("[data-gtab]").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.gtab;
        container.querySelector("#gtab-theory").style.display = target === "theory" ? "block" : "none";
        container.querySelector("#gtab-practical").style.display = target === "practical" ? "block" : "none";
        container.querySelector("#gtab-test").style.display = target === "test" ? "block" : "none";
      });
    });

    container.querySelector("#btn-save-exam-history").addEventListener("click", (e) => {
      if (examState.savedToHistory) return;
      const g = computeExamGrades();
      progress.history.push({
        id: Date.now(),
        date: new Date().toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }),
        numCases,
        testCorrect: g.testCorrect,
        theoryPts: g.theoryPts,
        practicalPts: g.practicalPts,
        practicalMax: g.practicalMax,
        finalGrade: g.finalGrade,
        timeUsedSec: examState.elapsedSec
      });
      touchStudyStreak();
      saveProgress();
      examState.savedToHistory = true;
      e.target.disabled = true;
      e.target.textContent = "✓ Guardado en Historial";
      showToast(`Simulacro guardado con nota ${g.finalGrade.toFixed(2)} / 10.`, "success");
    });

    container.querySelector("#btn-new-simulacro").addEventListener("click", () => {
      examState.phase = "config";
      renderSimulacro();
    });
  }

  // =========================================================================
  // 7. VIEW C: PRÁCTICA POR BLOQUES / TEMAS
  // =========================================================================
  const blockState = {
    selectedBlock: "all", // 'all' | 1..8
    tab: "test", // 'test' | 'theory' | 'practical'
    testConfig: {
      mode: "immediate", // 'immediate' | 'end'
      order: "ordered" // 'ordered' | 'random'
    },
    testSession: null, // { items, idx, answers, revealed, finished }
    activeTheoryId: null,
    theoryDraft: "",
    theoryEvalOpen: false,
    theoryScore: 0,
    activeCaseId: null,
    caseDrafts: {},
    caseEvalOpen: false,
    caseScores: {}
  };

  function getFilteredItems(kind) {
    const b = blockState.selectedBlock;
    const list = kind === "test" ? DATA.testQuestions : kind === "theory" ? DATA.theoryQuestions : DATA.practicalCases;
    if (b === "all") return list;
    return list.filter((item) => item.block === Number(b));
  }

  function renderBlockPractice() {
    const container = document.getElementById("view-bloques");
    const tests = getFilteredItems("test");
    const theories = getFilteredItems("theory");
    const practicals = getFilteredItems("practical");

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Práctica por Bloques y Temas</h1>
          <p class="page-subtitle">Entrena test, preguntas cortas o casos prácticos filtrados por cualquiera de los 8 bloques.</p>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <label for="block-filter-select" style="font-size:0.86rem; color:var(--text-secondary);">Bloque:</label>
          <select id="block-filter-select" class="select-input">
            <option value="all" ${blockState.selectedBlock === "all" ? "selected" : ""}>Todos los bloques (100 Test · 16 Teoría · 11 Casos)</option>
            ${DATA.blocks.map((b) => {
              const tc = DATA.testQuestions.filter((x) => x.block === b.id).length;
              const dc = DATA.theoryQuestions.filter((x) => x.block === b.id).length;
              const pc = DATA.practicalCases.filter((x) => x.block === b.id).length;
              return `<option value="${b.id}" ${Number(blockState.selectedBlock) === b.id ? "selected" : ""}>
                Bloque ${b.id}. ${escapeHtml(b.name)} (${tc}T / ${dc}D / ${pc}C)
              </option>`;
            }).join("")}
          </select>
        </div>
      </div>

      <div class="tabs">
        <button type="button" class="tab-btn ${blockState.tab === "test" ? "active" : ""}" data-btab="test">Tipo Test (${tests.length})</button>
        <button type="button" class="tab-btn ${blockState.tab === "theory" ? "active" : ""}" data-btab="theory">Preguntas Cortas (${theories.length})</button>
        <button type="button" class="tab-btn ${blockState.tab === "practical" ? "active" : ""}" data-btab="practical">Casos Prácticos (${practicals.length})</button>
      </div>

      <div id="block-tab-body"></div>
    `;

    container.querySelector("#block-filter-select").addEventListener("change", (e) => {
      blockState.selectedBlock = e.target.value === "all" ? "all" : Number(e.target.value);
      blockState.testSession = null;
      blockState.activeTheoryId = null;
      blockState.activeCaseId = null;
      renderBlockPractice();
    });

    container.querySelectorAll("[data-btab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        blockState.tab = btn.dataset.btab;
        renderBlockPractice();
      });
    });

    const body = container.querySelector("#block-tab-body");
    if (blockState.tab === "test") renderBlockTestTab(body, tests);
    else if (blockState.tab === "theory") renderBlockTheoryTab(body, theories);
    else renderBlockPracticalTab(body, practicals);
  }

  function renderBlockTestTab(body, tests) {
    const sess = blockState.testSession;
    if (!sess) {
      body.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Configurar práctica de Test (${tests.length} preguntas disponibles)</h3>
          </div>
          <div class="grid-2">
            <div class="form-group">
              <label class="form-label">Modo de corrección</label>
              <div class="radio-cards">
                <label class="radio-card ${blockState.testConfig.mode === "immediate" ? "selected" : ""}">
                  <input type="radio" name="b-tmode" value="immediate" ${blockState.testConfig.mode === "immediate" ? "checked" : ""}>
                  <strong>Corrección inmediata</strong>
                  <span style="font-size:0.8rem; color:var(--text-secondary);">Muestra la solución y explicación tras cada pregunta.</span>
                </label>
                <label class="radio-card ${blockState.testConfig.mode === "end" ? "selected" : ""}">
                  <input type="radio" name="b-tmode" value="end" ${blockState.testConfig.mode === "end" ? "checked" : ""}>
                  <strong>Corrección al final</strong>
                  <span style="font-size:0.8rem; color:var(--text-secondary);">Responde todas y corrige al entregar.</span>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Orden</label>
              <div class="radio-cards">
                <label class="radio-card ${blockState.testConfig.order === "ordered" ? "selected" : ""}">
                  <input type="radio" name="b-torder" value="ordered" ${blockState.testConfig.order === "ordered" ? "checked" : ""}>
                  <strong>En orden oficial</strong>
                  <span style="font-size:0.8rem; color:var(--text-secondary);">Ideal para repasar las 100 seguidas.</span>
                </label>
                <label class="radio-card ${blockState.testConfig.order === "random" ? "selected" : ""}">
                  <input type="radio" name="b-torder" value="random" ${blockState.testConfig.order === "random" ? "checked" : ""}>
                  <strong>Aleatorio</strong>
                  <span style="font-size:0.8rem; color:var(--text-secondary);">Baraja las preguntas del bloque.</span>
                </label>
              </div>
            </div>
          </div>
          <button type="button" id="btn-start-block-test" class="btn btn-primary">▶ Empezar Test (${tests.length} preguntas)</button>
        </div>
      `;

      body.querySelectorAll('input[name="b-tmode"]').forEach((inp) => {
        inp.addEventListener("change", () => {
          blockState.testConfig.mode = inp.value;
          renderBlockTestTab(body, tests);
        });
      });
      body.querySelectorAll('input[name="b-torder"]').forEach((inp) => {
        inp.addEventListener("change", () => {
          blockState.testConfig.order = inp.value;
          renderBlockTestTab(body, tests);
        });
      });
      body.querySelector("#btn-start-block-test").addEventListener("click", () => {
        const items = blockState.testConfig.order === "random" ? shuffleArray(tests) : tests.slice();
        blockState.testSession = {
          items,
          idx: 0,
          answers: {},
          revealed: {},
          finished: false
        };
        renderBlockTestTab(body, tests);
      });
      return;
    }

    if (sess.finished) {
      let ok = 0;
      sess.items.forEach((q) => {
        if (sess.answers[q.id] === q.correct) ok += 1;
      });
      body.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Resultado de la práctica</h3>
            <span class="badge ${ok / sess.items.length >= 0.5 ? "badge-success" : "badge-danger"}">
              ${ok} / ${sess.items.length} (${Math.round((ok / sess.items.length) * 100)}%)
            </span>
          </div>
          <button type="button" id="btn-reset-btest" class="btn btn-primary btn-sm">Volver a configurar otro test</button>
        </div>
        ${sess.items.map((q) => {
          const ua = sess.answers[q.id];
          const right = ua === q.correct;
          return `
            <div class="card">
              <div class="card-header">
                <span class="badge ${right ? "badge-success" : "badge-danger"}">
                  #${q.id} · ${right ? "✓ Acierto" : "✕ Fallo"}
                </span>
                <span style="font-size:0.82rem; font-family:var(--font-mono);">
                  Tu respuesta: ${ua ? ua.toUpperCase() : "—"} · Correcta: ${q.correct.toUpperCase()}
                </span>
              </div>
              <p style="font-weight:600; margin:0 0 8px;">${formatInlineProse(q.question)}</p>
              <p style="font-size:0.88rem; margin:0 0 6px;">Respuesta correcta: <strong>${q.correct}) ${formatInlineProse(q.options[q.correct])}</strong></p>
              <div class="explanation-box">${formatInlineProse(q.explanation)}</div>
            </div>
          `;
        }).join("")}
      `;
      body.querySelector("#btn-reset-btest").addEventListener("click", () => {
        blockState.testSession = null;
        renderBlockTestTab(body, tests);
      });
      return;
    }

    const q = sess.items[sess.idx];
    const ua = sess.answers[q.id];
    const isRevealed = Boolean(sess.revealed[q.id]);
    const answeredCount = Object.keys(sess.answers).length;

    body.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <span class="badge badge-cyan">Pregunta ${sess.idx + 1} / ${sess.items.length} (ID #${q.id})</span>
            <span class="badge badge-neutral">${escapeHtml(getBlock(q.block).shortName)}</span>
          </div>
          <div style="display:flex; gap:8px;">
            <span class="badge badge-neutral">Respondidas: ${answeredCount}/${sess.items.length}</span>
            <button type="button" id="btn-finish-btest" class="btn btn-sm btn-success">Finalizar y ver resumen</button>
            <button type="button" id="btn-quit-btest" class="btn btn-sm btn-secondary">Salir</button>
          </div>
        </div>

        <h3 style="margin:10px 0 14px;">${formatInlineProse(q.question)}</h3>

        <div class="options-list">
          ${["a", "b", "c", "d"].map((letter) => {
            let cls = "option-btn";
            if (isRevealed) {
              if (letter === q.correct) cls += " correct";
              else if (ua === letter && letter !== q.correct) cls += " wrong";
            } else if (ua === letter) {
              cls += " selected";
            }
            return `
              <button type="button" class="${cls}" data-btest-opt="${letter}" ${isRevealed ? "disabled" : ""}>
                <span class="option-letter">${letter}</span>
                <span>${formatInlineProse(q.options[letter])}</span>
              </button>
            `;
          }).join("")}
        </div>

        ${isRevealed ? `
          <div class="explanation-box">
            <strong>${ua === q.correct ? "✓ ¡Correcto!" : `✕ Incorrecto (Correcta: ${q.correct.toUpperCase()})`}</strong><br>
            ${formatInlineProse(q.explanation)}
          </div>
        ` : ""}

        <div style="display:flex; justify-content:space-between; margin-top:18px; padding-top:14px; border-top:1px solid var(--border);">
          <button type="button" id="btn-btest-prev" class="btn btn-secondary" ${sess.idx === 0 ? "disabled" : ""}>← Anterior</button>
          ${sess.idx < sess.items.length - 1
            ? `<button type="button" id="btn-btest-next" class="btn btn-primary">Siguiente →</button>`
            : `<button type="button" id="btn-btest-end" class="btn btn-success">✓ Finalizar Test</button>`}
        </div>
      </div>
    `;

    body.querySelectorAll("[data-btest-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.dataset.btestOpt;
        sess.answers[q.id] = chosen;
        if (blockState.testConfig.mode === "immediate") {
          sess.revealed[q.id] = true;
          const res = recordTestAttempt(q.id, chosen === q.correct);
          if (res === "removed") showToast("¡Acertada 2 veces seguidas! Eliminada de Repasar Fallos.", "success");
        }
        renderBlockTestTab(body, tests);
      });
    });

    const finalizeBlockTest = () => {
      if (blockState.testConfig.mode === "end") {
        sess.items.forEach((item) => {
          const ans = sess.answers[item.id];
          if (ans) recordTestAttempt(item.id, ans === item.correct);
        });
      }
      sess.finished = true;
      renderBlockTestTab(body, tests);
    };

    body.querySelector("#btn-finish-btest").addEventListener("click", finalizeBlockTest);
    const endBtn = body.querySelector("#btn-btest-end");
    if (endBtn) endBtn.addEventListener("click", finalizeBlockTest);
    body.querySelector("#btn-quit-btest").addEventListener("click", () => {
      blockState.testSession = null;
      renderBlockTestTab(body, tests);
    });
    body.querySelector("#btn-btest-prev").addEventListener("click", () => {
      if (sess.idx > 0) {
        sess.idx -= 1;
        renderBlockTestTab(body, tests);
      }
    });
    const nextBtn = body.querySelector("#btn-btest-next");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        sess.idx += 1;
        renderBlockTestTab(body, tests);
      });
    }
  }

  function renderBlockTheoryTab(body, theories) {
    if (theories.length === 0) {
      body.innerHTML = `<div class="card empty-state">No hay preguntas cortas asignadas específicamente a este bloque. Prueba "Todos los bloques" o "Tipo Test".</div>`;
      return;
    }

    if (blockState.activeTheoryId) {
      const t = theories.find((x) => x.id === blockState.activeTheoryId) || theories[0];
      if (blockState.theoryEvalOpen) {
        const widget = renderGuidedEvalCard({
          uid: `blk_th_${t.id}`,
          badgeText: `Pregunta Corta · ${getBlock(t.block).shortName}`,
          title: t.title,
          promptText: t.prompt,
          userAnswer: blockState.theoryDraft,
          modelAnswer: t.modelAnswer,
          criteriaText: t.criteriaText,
          criteria: t.criteria,
          currentScore: blockState.theoryScore,
          maxPoints: 1,
          flagKind: "theory",
          flagId: t.id,
          onScoreChange: (val) => { blockState.theoryScore = val; }
        });
        body.innerHTML = `
          <div style="margin-bottom:12px;">
            <button type="button" id="btn-back-th-list" class="btn btn-secondary btn-sm">← Volver al listado de teoría</button>
          </div>
          ${widget.html}
        `;
        widget.bind(body);
        body.querySelector("#btn-back-th-list").addEventListener("click", () => {
          blockState.activeTheoryId = null;
          blockState.theoryEvalOpen = false;
          renderBlockTheoryTab(body, theories);
        });
        return;
      }

      body.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <span class="badge badge-cyan">${escapeHtml(getBlock(t.block).shortName)}</span>
              <h3 style="margin:6px 0 0;">${escapeHtml(t.title)}</h3>
            </div>
            <button type="button" id="btn-back-th-list" class="btn btn-secondary btn-sm">← Volver</button>
          </div>
          <p>${formatInlineProse(t.prompt)}</p>
          <textarea id="blk-th-ta" class="code-textarea" rows="8" placeholder="Escribe tu respuesta aquí...">${escapeHtml(blockState.theoryDraft)}</textarea>
          <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:14px;">
            <button type="button" id="btn-eval-th" class="btn btn-primary">✓ Corregir y ver Respuesta Modelo</button>
          </div>
        </div>
      `;
      body.querySelector("#blk-th-ta").addEventListener("input", (e) => {
        blockState.theoryDraft = e.target.value;
      });
      body.querySelector("#btn-eval-th").addEventListener("click", () => {
        touchStudyStreak();
        blockState.theoryEvalOpen = true;
        blockState.theoryScore = 0;
        renderBlockTheoryTab(body, theories);
      });
      body.querySelector("#btn-back-th-list").addEventListener("click", () => {
        blockState.activeTheoryId = null;
        renderBlockTheoryTab(body, theories);
      });
      return;
    }

    body.innerHTML = `
      <div class="grid-2">
        ${theories.map((t) => `
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="badge badge-cyan">${escapeHtml(getBlock(t.block).shortName)}</span>
                ${isFlagged("theory", t.id) ? `<span class="badge badge-warning">★ Repasar</span>` : ""}
              </div>
              <h4 style="margin:0 0 8px;">${escapeHtml(t.title)}</h4>
              <p style="font-size:0.88rem; color:var(--text-secondary); margin:0 0 14px;">${escapeHtml(t.prompt)}</p>
            </div>
            <button type="button" class="btn btn-primary btn-sm" data-open-theory="${t.id}">Practicar ejercicio →</button>
          </div>
        `).join("")}
      </div>
    `;

    body.querySelectorAll("[data-open-theory]").forEach((btn) => {
      btn.addEventListener("click", () => {
        blockState.activeTheoryId = Number(btn.dataset.openTheory);
        blockState.theoryDraft = "";
        blockState.theoryEvalOpen = false;
        blockState.theoryScore = 0;
        renderBlockTheoryTab(body, theories);
      });
    });
  }

  function renderBlockPracticalTab(body, practicals) {
    if (practicals.length === 0) {
      body.innerHTML = `<div class="card empty-state">No hay casos prácticos asignados específicamente a este bloque. Prueba "Todos los bloques" o "Tipo Test".</div>`;
      return;
    }

    if (blockState.activeCaseId) {
      const c = practicals.find((x) => x.id === blockState.activeCaseId) || practicals[0];
      if (blockState.caseEvalOpen) {
        const widgets = c.parts.map((p) =>
          renderGuidedEvalCard({
            uid: `blk_pr_${c.id}_${p.partNumber}`,
            badgeText: `${c.title} · Apartado ${p.partNumber}/3`,
            title: `Apartado ${p.partNumber} (1 punto)`,
            promptText: p.prompt,
            userAnswer: blockState.caseDrafts[p.partNumber] || "",
            modelAnswer: p.modelAnswer,
            criteriaText: p.criteriaText,
            criteria: p.criteria,
            currentScore: blockState.caseScores[p.partNumber] || 0,
            maxPoints: 1,
            flagKind: p.partNumber === 1 ? "practical" : null,
            flagId: c.id,
            onScoreChange: (val) => {
              blockState.caseScores[p.partNumber] = val;
              const total = c.parts.reduce((acc, part) => acc + (blockState.caseScores[part.partNumber] || 0), 0);
              const badge = body.querySelector("#blk-case-total-badge");
              if (badge) badge.textContent = `Nota del caso: ${total.toFixed(2)} / 3.00`;
            }
          })
        );

        const total = c.parts.reduce((acc, part) => acc + (blockState.caseScores[part.partNumber] || 0), 0);
        body.innerHTML = `
          <div class="card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <button type="button" id="btn-back-pr-list" class="btn btn-secondary btn-sm">← Volver a casos prácticos</button>
            <span id="blk-case-total-badge" class="badge badge-cyan" style="font-size:0.95rem; padding:6px 12px;">Nota del caso: ${total.toFixed(2)} / 3.00</span>
          </div>
          ${widgets.map((w) => w.html).join("")}
        `;
        widgets.forEach((w) => w.bind(body));
        body.querySelector("#btn-back-pr-list").addEventListener("click", () => {
          blockState.activeCaseId = null;
          blockState.caseEvalOpen = false;
          renderBlockPracticalTab(body, practicals);
        });
        return;
      }

      body.innerHTML = `
        <div class="card">
          <div class="card-header">
            <div>
              <span class="badge badge-cyan">${escapeHtml(getBlock(c.block).shortName)}</span>
              <h3 style="margin:6px 0 0;">${escapeHtml(c.title)} (3 puntos)</h3>
            </div>
            <button type="button" id="btn-back-pr-list" class="btn btn-secondary btn-sm">← Volver</button>
          </div>
          <div class="card-elevated" style="margin-bottom:16px;">${formatInlineProse(c.context)}</div>

          ${c.parts.map((p) => `
            <div style="margin-bottom:18px;">
              <h4 style="margin:0 0 6px;">Apartado ${p.partNumber} (1 punto)</h4>
              <p style="margin:0 0 8px;">${formatInlineProse(p.prompt)}</p>
              <textarea class="code-textarea" rows="6" data-case-part="${p.partNumber}" placeholder="Escribe las directivas, configuración o comandos...">${escapeHtml(blockState.caseDrafts[p.partNumber] || "")}</textarea>
            </div>
          `).join("")}

          <div style="display:flex; justify-content:flex-end;">
            <button type="button" id="btn-eval-case" class="btn btn-primary btn-lg">✓ Autoevaluar Caso Completo</button>
          </div>
        </div>
      `;

      body.querySelectorAll("[data-case-part]").forEach((ta) => {
        ta.addEventListener("input", () => {
          blockState.caseDrafts[Number(ta.dataset.casePart)] = ta.value;
        });
      });
      body.querySelector("#btn-eval-case").addEventListener("click", () => {
        touchStudyStreak();
        blockState.caseEvalOpen = true;
        blockState.caseScores = { 1: 0, 2: 0, 3: 0 };
        renderBlockPracticalTab(body, practicals);
      });
      body.querySelector("#btn-back-pr-list").addEventListener("click", () => {
        blockState.activeCaseId = null;
        renderBlockPracticalTab(body, practicals);
      });
      return;
    }

    body.innerHTML = `
      <div class="grid-2">
        ${practicals.map((c) => `
          <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span class="badge badge-cyan">${escapeHtml(getBlock(c.block).shortName)}</span>
                ${isFlagged("practical", c.id) ? `<span class="badge badge-warning">★ Repasar</span>` : ""}
              </div>
              <h4 style="margin:0 0 8px;">${escapeHtml(c.title)}</h4>
              <p style="font-size:0.88rem; color:var(--text-secondary); margin:0 0 14px;">${escapeHtml(c.context)}</p>
            </div>
            <button type="button" class="btn btn-primary btn-sm" data-open-case="${c.id}">Resolver 3 apartados →</button>
          </div>
        `).join("")}
      </div>
    `;

    body.querySelectorAll("[data-open-case]").forEach((btn) => {
      btn.addEventListener("click", () => {
        blockState.activeCaseId = Number(btn.dataset.openCase);
        blockState.caseDrafts = { 1: "", 2: "", 3: "" };
        blockState.caseEvalOpen = false;
        blockState.caseScores = { 1: 0, 2: 0, 3: 0 };
        renderBlockPracticalTab(body, practicals);
      });
    });
  }

  // =========================================================================
  // 8. VIEW D: MODO "REPASAR FALLOS"
  // =========================================================================
  const reviewState = {
    tab: "tests", // 'tests' | 'flagged'
    session: null, // { queueIds, idx, answered, selected }
    flaggedPractice: null // { kind: 'theory'|'practical', id, drafts, evalOpen, scores }
  };

  function renderFailedReview() {
    const container = document.getElementById("view-fallos");
    const failedIds = Object.keys(progress.failedTests).map(Number);
    const flaggedTheoryIds = progress.flaggedReview.theory;
    const flaggedPracticalIds = progress.flaggedReview.practical;

    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Modo Repasar Fallos</h1>
          <p class="page-subtitle">Las preguntas tipo test falladas se eliminan automáticamente al acertarlas <strong>2 veces seguidas</strong>.</p>
        </div>
      </div>

      <div class="tabs">
        <button type="button" class="tab-btn ${reviewState.tab === "tests" ? "active" : ""}" data-rtab="tests">
          Test Fallados (${failedIds.length})
        </button>
        <button type="button" class="tab-btn ${reviewState.tab === "flagged" ? "active" : ""}" data-rtab="flagged">
          Ejercicios Marcados (${flaggedTheoryIds.length + flaggedPracticalIds.length})
        </button>
      </div>

      <div id="review-body"></div>
    `;

    container.querySelectorAll("[data-rtab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        reviewState.tab = btn.dataset.rtab;
        reviewState.session = null;
        reviewState.flaggedPractice = null;
        renderFailedReview();
      });
    });

    const body = container.querySelector("#review-body");

    if (reviewState.tab === "tests") {
      if (reviewState.session) {
        const s = reviewState.session;
        if (s.idx >= s.queueIds.length) {
          body.innerHTML = `
            <div class="card empty-state">
              <h3>Sesión de repaso completada</h3>
              <p>Quedan <strong>${Object.keys(progress.failedTests).length}</strong> preguntas en tu lista de fallos.</p>
              <div style="display:flex; justify-content:center; gap:10px; margin-top:14px;">
                <button type="button" id="btn-rev-back" class="btn btn-primary">Volver a la lista</button>
              </div>
            </div>
          `;
          body.querySelector("#btn-rev-back").addEventListener("click", () => {
            reviewState.session = null;
            renderFailedReview();
          });
          return;
        }

        const qId = s.queueIds[s.idx];
        const q = DATA.testQuestions.find((x) => x.id === qId);
        const failInfo = progress.failedTests[String(qId)];
        const streakCount = failInfo ? failInfo.consecutiveCorrect : 2;

        body.innerHTML = `
          <div class="card">
            <div class="card-header">
              <div>
                <span class="badge badge-cyan">Repaso ${s.idx + 1} / ${s.queueIds.length} (ID #${q.id})</span>
                <span class="badge badge-neutral">${escapeHtml(getBlock(q.block).shortName)}</span>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="badge ${streakCount >= 2 ? "badge-success" : "badge-warning"}">
                  Racha actual: ${streakCount}/2
                </span>
                <button type="button" id="btn-rev-exit" class="btn btn-sm btn-secondary">Salir</button>
              </div>
            </div>

            <h3 style="margin:8px 0 14px;">${formatInlineProse(q.question)}</h3>

            <div class="options-list">
              ${["a", "b", "c", "d"].map((letter) => {
                let cls = "option-btn";
                if (s.answered) {
                  if (letter === q.correct) cls += " correct";
                  else if (s.selected === letter) cls += " wrong";
                }
                return `
                  <button type="button" class="${cls}" data-rev-opt="${letter}" ${s.answered ? "disabled" : ""}>
                    <span class="option-letter">${letter}</span>
                    <span>${formatInlineProse(q.options[letter])}</span>
                  </button>
                `;
              }).join("")}
            </div>

            ${s.answered ? `
              <div class="explanation-box">
                <strong>${s.selected === q.correct
                  ? (streakCount >= 2 ? "✓ ¡Acertada 2 veces seguidas! Eliminada de la lista de fallos." : "✓ ¡Correcto! Racha: 1/2 (1 acierto más para superarla).")
                  : "✕ Incorrecto. La racha se reinicia a 0/2."}</strong><br>
                ${formatInlineProse(q.explanation)}
              </div>
              <div style="display:flex; justify-content:flex-end; margin-top:16px;">
                <button type="button" id="btn-rev-next" class="btn btn-primary">Siguiente →</button>
              </div>
            ` : ""}
          </div>
        `;

        body.querySelectorAll("[data-rev-opt]").forEach((btn) => {
          btn.addEventListener("click", () => {
            const chosen = btn.dataset.revOpt;
            s.selected = chosen;
            s.answered = true;
            const res = recordTestAttempt(q.id, chosen === q.correct);
            if (res === "removed") showToast("¡Pregunta superada! Eliminada de Repasar Fallos.", "success");
            renderFailedReview();
          });
        });
        body.querySelector("#btn-rev-exit").addEventListener("click", () => {
          reviewState.session = null;
          renderFailedReview();
        });
        const nextBtn = body.querySelector("#btn-rev-next");
        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            s.idx += 1;
            s.answered = false;
            s.selected = null;
            renderFailedReview();
          });
        }
        return;
      }

      if (failedIds.length === 0) {
        body.innerHTML = `
          <div class="card empty-state">
            <h3 style="color:var(--success);">¡Sin fallos pendientes!</h3>
            <p>No tienes ninguna pregunta tipo test en tu lista de fallos. Haz un simulacro o practica por bloques para ponerte a prueba.</p>
          </div>
        `;
        return;
      }

      body.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">${failedIds.length} pregunta(s) para repasar</h3>
            <button type="button" id="btn-launch-rev-test" class="btn btn-primary">▶ Iniciar Sesión Exclusiva de Fallos</button>
          </div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Bloque</th>
                  <th>Pregunta</th>
                  <th>Racha</th>
                </tr>
              </thead>
              <tbody>
                ${failedIds.map((id) => {
                  const q = DATA.testQuestions.find((x) => x.id === id);
                  const st = progress.failedTests[String(id)];
                  return `
                    <tr>
                      <td style="font-family:var(--font-mono);">#${id}</td>
                      <td><span class="badge badge-neutral">${escapeHtml(getBlock(q.block).shortName)}</span></td>
                      <td>${escapeHtml(q.question)}</td>
                      <td><span class="badge ${st.consecutiveCorrect === 1 ? "badge-cyan" : "badge-warning"}">${st.consecutiveCorrect}/2</span></td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;

      body.querySelector("#btn-launch-rev-test").addEventListener("click", () => {
        reviewState.session = {
          queueIds: shuffleArray(failedIds),
          idx: 0,
          answered: false,
          selected: null
        };
        renderFailedReview();
      });
      return;
    }

    // Tab: 'flagged' (Theory + Practical)
    if (reviewState.flaggedPractice) {
      const fp = reviewState.flaggedPractice;
      if (fp.kind === "theory") {
        const t = DATA.theoryQuestions.find((x) => x.id === fp.id);
        if (fp.evalOpen) {
          const widget = renderGuidedEvalCard({
            uid: `rev_th_${t.id}`,
            badgeText: `Repaso Teoría · ${getBlock(t.block).shortName}`,
            title: t.title,
            promptText: t.prompt,
            userAnswer: fp.drafts[1] || "",
            modelAnswer: t.modelAnswer,
            criteriaText: t.criteriaText,
            criteria: t.criteria,
            currentScore: fp.scores[1] || 0,
            maxPoints: 1,
            flagKind: "theory",
            flagId: t.id,
            onScoreChange: (val) => { fp.scores[1] = val; }
          });
          body.innerHTML = `<button type="button" id="btn-fp-back" class="btn btn-secondary btn-sm" style="margin-bottom:12px;">← Volver a marcados</button>${widget.html}`;
          widget.bind(body);
          body.querySelector("#btn-fp-back").addEventListener("click", () => {
            reviewState.flaggedPractice = null;
            renderFailedReview();
          });
          return;
        }
        body.innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3>${escapeHtml(t.title)}</h3>
              <button type="button" id="btn-fp-back" class="btn btn-secondary btn-sm">← Volver</button>
            </div>
            <p>${formatInlineProse(t.prompt)}</p>
            <textarea id="fp-ta" class="code-textarea" rows="8">${escapeHtml(fp.drafts[1] || "")}</textarea>
            <div style="display:flex; justify-content:flex-end; margin-top:12px;">
              <button type="button" id="btn-fp-eval" class="btn btn-primary">✓ Corregir</button>
            </div>
          </div>
        `;
        body.querySelector("#fp-ta").addEventListener("input", (e) => { fp.drafts[1] = e.target.value; });
        body.querySelector("#btn-fp-eval").addEventListener("click", () => {
          fp.evalOpen = true;
          renderFailedReview();
        });
        body.querySelector("#btn-fp-back").addEventListener("click", () => {
          reviewState.flaggedPractice = null;
          renderFailedReview();
        });
        return;
      } else {
        const c = DATA.practicalCases.find((x) => x.id === fp.id);
        if (fp.evalOpen) {
          const widgets = c.parts.map((p) =>
            renderGuidedEvalCard({
              uid: `rev_pr_${c.id}_${p.partNumber}`,
              badgeText: `${c.title} · Apartado ${p.partNumber}/3`,
              title: `Apartado ${p.partNumber}`,
              promptText: p.prompt,
              userAnswer: fp.drafts[p.partNumber] || "",
              modelAnswer: p.modelAnswer,
              criteriaText: p.criteriaText,
              criteria: p.criteria,
              currentScore: fp.scores[p.partNumber] || 0,
              maxPoints: 1,
              flagKind: p.partNumber === 1 ? "practical" : null,
              flagId: c.id,
              onScoreChange: (val) => { fp.scores[p.partNumber] = val; }
            })
          );
          body.innerHTML = `<button type="button" id="btn-fp-back" class="btn btn-secondary btn-sm" style="margin-bottom:12px;">← Volver a marcados</button>${widgets.map((w) => w.html).join("")}`;
          widgets.forEach((w) => w.bind(body));
          body.querySelector("#btn-fp-back").addEventListener("click", () => {
            reviewState.flaggedPractice = null;
            renderFailedReview();
          });
          return;
        }
        body.innerHTML = `
          <div class="card">
            <div class="card-header">
              <h3>${escapeHtml(c.title)}</h3>
              <button type="button" id="btn-fp-back" class="btn btn-secondary btn-sm">← Volver</button>
            </div>
            <div class="card-elevated" style="margin-bottom:14px;">${formatInlineProse(c.context)}</div>
            ${c.parts.map((p) => `
              <div style="margin-bottom:14px;">
                <h4>Apartado ${p.partNumber}</h4>
                <p>${formatInlineProse(p.prompt)}</p>
                <textarea class="code-textarea" rows="5" data-fp-part="${p.partNumber}">${escapeHtml(fp.drafts[p.partNumber] || "")}</textarea>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:flex-end;">
              <button type="button" id="btn-fp-eval" class="btn btn-primary">✓ Autoevaluar Caso</button>
            </div>
          </div>
        `;
        body.querySelectorAll("[data-fp-part]").forEach((ta) => {
          ta.addEventListener("input", () => { fp.drafts[Number(ta.dataset.fpPart)] = ta.value; });
        });
        body.querySelector("#btn-fp-eval").addEventListener("click", () => {
          fp.evalOpen = true;
          renderFailedReview();
        });
        body.querySelector("#btn-fp-back").addEventListener("click", () => {
          reviewState.flaggedPractice = null;
          renderFailedReview();
        });
        return;
      }
    }

    if (flaggedTheoryIds.length === 0 && flaggedPracticalIds.length === 0) {
      body.innerHTML = `
        <div class="card empty-state">
          <p>No tienes ejercicios de teoría ni casos prácticos marcados para repasar.</p>
          <p style="font-size:0.86rem;">Puedes marcar cualquiera durante la autoevaluación guiada con el botón "☆ Marcar para repasar".</p>
        </div>
      `;
      return;
    }

    body.innerHTML = `
      <div class="grid-2">
        ${flaggedTheoryIds.map((id) => {
          const t = DATA.theoryQuestions.find((x) => x.id === id);
          if (!t) return "";
          return `
            <div class="card">
              <div class="card-header">
                <span class="badge badge-warning">Teoría · ${escapeHtml(getBlock(t.block).shortName)}</span>
                <button type="button" class="btn btn-sm btn-secondary" data-unflag="theory:${id}">Quitar</button>
              </div>
              <h4 style="margin:0 0 8px;">${escapeHtml(t.title)}</h4>
              <p style="font-size:0.86rem; color:var(--text-secondary);">${escapeHtml(t.prompt)}</p>
              <button type="button" class="btn btn-primary btn-sm" data-practice-flag="theory:${id}">Practicar ahora →</button>
            </div>
          `;
        }).join("")}
        ${flaggedPracticalIds.map((id) => {
          const c = DATA.practicalCases.find((x) => x.id === id);
          if (!c) return "";
          return `
            <div class="card">
              <div class="card-header">
                <span class="badge badge-warning">Caso Práctico · ${escapeHtml(getBlock(c.block).shortName)}</span>
                <button type="button" class="btn btn-sm btn-secondary" data-unflag="practical:${id}">Quitar</button>
              </div>
              <h4 style="margin:0 0 8px;">${escapeHtml(c.title)}</h4>
              <p style="font-size:0.86rem; color:var(--text-secondary);">${escapeHtml(c.context)}</p>
              <button type="button" class="btn btn-primary btn-sm" data-practice-flag="practical:${id}">Practicar caso →</button>
            </div>
          `;
        }).join("")}
      </div>
    `;

    body.querySelectorAll("[data-unflag]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [kind, idStr] = btn.dataset.unflag.split(":");
        toggleFlagged(kind, Number(idStr));
        renderFailedReview();
      });
    });

    body.querySelectorAll("[data-practice-flag]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const [kind, idStr] = btn.dataset.practiceFlag.split(":");
        reviewState.flaggedPractice = {
          kind,
          id: Number(idStr),
          drafts: { 1: "", 2: "", 3: "" },
          evalOpen: false,
          scores: { 1: 0, 2: 0, 3: 0 }
        };
        renderFailedReview();
      });
    });
  }

  // =========================================================================
  // 9. VIEW E: CHULETA Y GUÍA RÁPIDA (BUSCADOR INSTANTÁNEO)
  // =========================================================================
  const guideState = {
    tab: "temas", // 'temas' | 'refs' | 'errores' | 'perdido'
    mode: "full", // 'full' | 'cheat'
    search: "",
    selectedTopic: "all" // 'all' | 1..8
  };

  function renderTableHtml(table, query = "") {
    if (!table) return "";
    return `
      <div class="table-wrap">
        <table>
          <thead>
            <tr>${table.headers.map((h) => `<th>${highlightEscapedText(escapeHtml(h), query)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${table.rows.map((row) => `
              <tr>${row.map((cell) => `<td>${highlightEscapedText(escapeHtml(cell), query)}</td>`).join("")}</tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function topicMatchesQuery(topic, q) {
    if (!q) return true;
    const needle = q.toLowerCase();
    const haystack = [
      topic.title,
      topic.oneLiner,
      ...topic.cheatBullets,
      ...topic.theoryBlocks.flatMap((b) => [
        b.heading || "",
        b.text || "",
        ...(b.bullets || []),
        ...(b.table ? b.table.rows.flat() : [])
      ]),
      ...topic.practiceBlocks.flatMap((b) => [
        b.heading || "",
        b.text || "",
        b.code ? b.code.content : "",
        ...(b.table ? b.table.rows.flat() : [])
      ]),
      ...topic.checkYourself.flatMap((c) => [c.q, c.a])
    ].join(" ").toLowerCase();
    return haystack.includes(needle);
  }

  function renderStudyGuide() {
    const container = document.getElementById("view-guia");
    container.innerHTML = `
      <div class="page-header">
        <div>
          <h1 class="page-title">Chuleta y Guía Rápida (Temas 1–8)</h1>
          <p class="page-subtitle">Patrón del módulo: instalar → editar fichero → comprobar (nginx -t / configtest) → reiniciar → probar → revisar logs.</p>
        </div>
        <div class="search-bar-wrap">
          <span class="search-icon">⌕</span>
          <input type="search" id="guide-search-input" class="search-input" value="${escapeHtml(guideState.search)}" placeholder="Buscar al instante (ej: 403, htaccess, ProxyPass, 8080, AllowOverride)...">
        </div>
      </div>

      <div class="tabs">
        <button type="button" class="tab-btn ${guideState.tab === "temas" ? "active" : ""}" data-gt="temas">Temas 1–8</button>
        <button type="button" class="tab-btn ${guideState.tab === "refs" ? "active" : ""}" data-gt="refs">Puertos y Ficheros</button>
        <button type="button" class="tab-btn ${guideState.tab === "errores" ? "active" : ""}" data-gt="errores">Errores Típicos (${DATA.commonErrors.length})</button>
        <button type="button" class="tab-btn ${guideState.tab === "perdido" ? "active" : ""}" data-gt="perdido">¿Te has perdido?</button>
      </div>

      <div id="guide-body"></div>
    `;

    const searchInput = container.querySelector("#guide-search-input");
    searchInput.addEventListener("input", (e) => {
      guideState.search = e.target.value;
      renderGuideBody(container.querySelector("#guide-body"));
    });

    container.querySelectorAll("[data-gt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        guideState.tab = btn.dataset.gt;
        renderStudyGuide();
      });
    });

    renderGuideBody(container.querySelector("#guide-body"));
  }

  function renderGuideBody(body) {
    const q = guideState.search.trim();

    if (guideState.tab === "temas") {
      const filteredTopics = DATA.studyGuide.filter((t) => {
        if (guideState.selectedTopic !== "all" && t.id !== Number(guideState.selectedTopic)) return false;
        return topicMatchesQuery(t, q);
      });

      body.innerHTML = `
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:10px; margin-bottom:16px;">
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            <button type="button" class="btn btn-sm ${guideState.selectedTopic === "all" ? "btn-primary" : "btn-secondary"}" data-tfilter="all">Todos</button>
            ${DATA.studyGuide.map((t) => `
              <button type="button" class="btn btn-sm ${Number(guideState.selectedTopic) === t.id ? "btn-primary" : "btn-secondary"}" data-tfilter="${t.id}">T${t.id}</button>
            `).join("")}
          </div>
          <div style="display:flex; gap:6px;">
            <button type="button" class="btn btn-sm ${guideState.mode === "cheat" ? "btn-primary" : "btn-secondary"}" data-gmode="cheat">⚡ Solo Chuleta</button>
            <button type="button" class="btn btn-sm ${guideState.mode === "full" ? "btn-primary" : "btn-secondary"}" data-gmode="full">📘 Guía Completa</button>
          </div>
        </div>

        ${q ? `<p style="font-size:0.86rem; color:var(--accent); margin-bottom:12px;">Mostrando ${filteredTopics.length} tema(s) con coincidencias para «${escapeHtml(q)}»</p>` : ""}

        ${filteredTopics.length === 0
          ? `<div class="card empty-state">No hay coincidencias en los temas para «${escapeHtml(q)}». Prueba en la pestaña "Errores Típicos" o "Puertos y Ficheros".</div>`
          : filteredTopics.map((t) => `
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="font-size:1.18rem; color:var(--accent);">${highlightEscapedText(escapeHtml(t.title), q)}</h3>
                <span class="badge badge-neutral">Tema ${t.id}</span>
              </div>
              <div class="card-elevated" style="margin-bottom:14px; border-left:3px solid var(--accent);">
                <strong style="font-size:0.8rem; text-transform:uppercase; color:var(--accent);">La idea en una frase:</strong>
                <div style="margin-top:3px;">${highlightEscapedText(escapeHtml(t.oneLiner), q)}</div>
              </div>

              <div style="margin-bottom:14px;">
                <strong style="font-size:0.86rem; color:var(--success);">⚡ Puntos clave de la Chuleta:</strong>
                <ul style="margin:6px 0 0 18px; padding:0;">
                  ${t.cheatBullets.map((b) => `<li style="margin-bottom:4px;">${formatInlineProse(b, q)}</li>`).join("")}
                </ul>
              </div>

              ${guideState.mode === "full" ? `
                <div style="margin-top:18px;">
                  <h4 style="color:var(--text-secondary); text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em; border-bottom:1px solid var(--border); padding-bottom:6px;">
                    Teoría clave
                  </h4>
                  ${t.theoryBlocks.map((b) => `
                    <div style="margin:12px 0;">
                      ${b.heading ? `<h5 style="margin:0 0 6px; font-size:0.96rem;">${highlightEscapedText(escapeHtml(b.heading), q)}</h5>` : ""}
                      ${b.text ? `<p style="margin:0 0 8px; font-size:0.9rem;">${formatInlineProse(b.text, q)}</p>` : ""}
                      ${b.bullets ? `<ul style="margin:0 0 8px 18px; padding:0; font-size:0.9rem;">${b.bullets.map((li) => `<li style="margin-bottom:4px;">${formatInlineProse(li, q)}</li>`).join("")}</ul>` : ""}
                      ${renderTableHtml(b.table, q)}
                    </div>
                  `).join("")}
                </div>

                <div style="margin-top:18px;">
                  <h4 style="color:var(--text-secondary); text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em; border-bottom:1px solid var(--border); padding-bottom:6px;">
                    Práctica y comandos clave
                  </h4>
                  ${t.practiceBlocks.map((b) => `
                    <div style="margin:12px 0;">
                      ${b.heading ? `<h5 style="margin:0 0 6px; font-size:0.96rem;">${highlightEscapedText(escapeHtml(b.heading), q)}</h5>` : ""}
                      ${b.text ? `<p style="margin:0 0 8px; font-size:0.9rem;">${formatInlineProse(b.text, q)}</p>` : ""}
                      ${renderTableHtml(b.table, q)}
                      ${b.code ? renderCodeBlock(b.code.content, b.code.lang, b.code.title, true, q) : ""}
                    </div>
                  `).join("")}
                </div>

                <div style="margin-top:18px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <h4 style="margin:0; color:var(--text-secondary); text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em;">
                      Comprueba si lo sabes (${t.checkYourself.length} preguntas)
                    </h4>
                  </div>
                  ${t.checkYourself.map((item) => `
                    <div class="qa-item ${q ? "open" : ""}">
                      <button type="button" class="qa-question">
                        <span>${formatInlineProse(item.q, q)}</span>
                        <span style="color:var(--accent); font-family:var(--font-mono);">+</span>
                      </button>
                      <div class="qa-answer">${formatInlineProse(item.a, q)}</div>
                    </div>
                  `).join("")}
                </div>
              ` : ""}
            </div>
          `).join("")}
      `;

      body.querySelectorAll("[data-tfilter]").forEach((btn) => {
        btn.addEventListener("click", () => {
          guideState.selectedTopic = btn.dataset.tfilter === "all" ? "all" : Number(btn.dataset.tfilter);
          renderGuideBody(body);
        });
      });
      body.querySelectorAll("[data-gmode]").forEach((btn) => {
        btn.addEventListener("click", () => {
          guideState.mode = btn.dataset.gmode;
          renderGuideBody(body);
        });
      });
      body.querySelectorAll(".qa-question").forEach((btn) => {
        btn.addEventListener("click", () => {
          btn.parentElement.classList.toggle("open");
        });
      });
      return;
    }

    if (guideState.tab === "refs") {
      const needle = q.toLowerCase();
      const ports = DATA.referenceTables.ports.filter((r) =>
        !needle || [r.port, r.protocol, r.service, r.notes].join(" ").toLowerCase().includes(needle)
      );
      const files = DATA.referenceTables.configFiles.filter((r) =>
        !needle || [r.file, r.path, r.role].join(" ").toLowerCase().includes(needle)
      );

      body.innerHTML = `
        <div class="card">
          <div class="card-header"><h3 class="card-title">Tabla de Puertos Clave</h3></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Puerto</th><th>Protocolo</th><th>Servicio</th><th>Uso en el módulo</th></tr></thead>
              <tbody>
                ${ports.map((r) => `
                  <tr>
                    <td><code class="inline-code">${highlightEscapedText(escapeHtml(r.port), q)}</code></td>
                    <td>${highlightEscapedText(escapeHtml(r.protocol), q)}</td>
                    <td><strong>${highlightEscapedText(escapeHtml(r.service), q)}</strong></td>
                    <td>${highlightEscapedText(escapeHtml(r.notes), q)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="card-title">Ficheros de Configuración Fundamentales</h3></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Fichero</th><th>Ruta habitual</th><th>Para qué sirve</th></tr></thead>
              <tbody>
                ${files.map((r) => `
                  <tr>
                    <td><code class="inline-code">${highlightEscapedText(escapeHtml(r.file), q)}</code></td>
                    <td style="font-family:var(--font-mono); font-size:0.8rem;">${highlightEscapedText(escapeHtml(r.path), q)}</td>
                    <td>${highlightEscapedText(escapeHtml(r.role), q)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
      return;
    }

    if (guideState.tab === "errores") {
      const needle = q.toLowerCase();
      const rows = DATA.commonErrors.filter((r) =>
        !needle || [r.problem, r.cause, r.solution].join(" ").toLowerCase().includes(needle)
      );

      body.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Errores típicos y cómo arreglarlos</h3>
            <span class="badge badge-warning">${rows.length} mostrados</span>
          </div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Problema</th><th>Qué suele pasar</th><th>Cómo arreglarlo</th></tr></thead>
              <tbody>
                ${rows.map((r) => `
                  <tr>
                    <td><strong>${highlightEscapedText(escapeHtml(r.problem), q)}</strong></td>
                    <td style="color:var(--text-secondary);">${highlightEscapedText(escapeHtml(r.cause), q)}</td>
                    <td><code class="inline-code">${highlightEscapedText(escapeHtml(r.solution), q)}</code></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
      return;
    }

    // Tab: 'perdido'
    const needle = q.toLowerCase();
    const rows = DATA.quickIndex.filter((r) =>
      !needle || [r.question, r.topicLabel].join(" ").toLowerCase().includes(needle)
    );
    body.innerHTML = `
      <div class="card">
        <div class="card-header"><h3 class="card-title">¿Te has perdido? Empieza aquí</h3></div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Si te preguntas…</th><th>Mira</th><th>Acción</th></tr></thead>
            <tbody>
              ${rows.map((r) => `
                <tr>
                  <td>${highlightEscapedText(escapeHtml(r.question), q)}</td>
                  <td><span class="badge badge-cyan">${escapeHtml(r.topicLabel)}</span></td>
                  <td><button type="button" class="btn btn-sm btn-secondary" data-jump-topic="${r.topicId}">Ir al ${escapeHtml(r.topicLabel)} →</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
    body.querySelectorAll("[data-jump-topic]").forEach((btn) => {
      btn.addEventListener("click", () => {
        guideState.tab = "temas";
        guideState.selectedTopic = Number(btn.dataset.jumpTopic);
        renderStudyGuide();
      });
    });
  }

  // =========================================================================
  // 10. INIT
  // =========================================================================
  function init() {
    if (!DATA) {
      document.getElementById("main-content").innerHTML = "<div class='card'>Error: no se ha cargado js/data.js</div>";
      return;
    }
    setupGlobalEvents();
    updateFailedBadge();
    renderDashboard();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
