/* ============================================================================
 * OptiShift Stitch connector — the ONLY hand-written UI code in /stitch.
 *
 * The screens themselves (overview.html, schedule.html, team.html, …) are
 * byte-identical Stitch deliverables copied from the ui folder code.html
 * files. This file
 * only connects them to the real backend:
 *
 *   - talks to the backend API (default http://127.0.0.1:8002,
 *     override with ?api=… or localStorage.optishift_api)
 *   - fills the screens' EXISTING DOM ids (kpi-*, team-table-body, …)
 *     with live data — never invents numbers
 *   - binds primary actions (build/approve/add) to real endpoints
 *
 * Every boot function is id-guarded: it runs only when its anchor element
 * exists, and every step is wrapped so one screen can never break another.
 * ========================================================================== */
(function () {
  'use strict';

  var qs = new URLSearchParams(location.search);
  var API =
    localStorage.getItem('optishift_api') ||
    qs.get('api') ||
    'http://127.0.0.1:8002';
  var WEEK_START = qs.get('week') || '2024-12-09';

  function el(id) {
    return document.getElementById(id);
  }
  function setText(id, value) {
    var n = el(id);
    if (n) n.textContent = value;
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function inr(n) {
    var v = Number(n || 0);
    return '\u20B9' + v.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
  function initials(name) {
    return String(name || '?')
      .split(' ')
      .map(function (p) { return p[0]; })
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  async function api(path, opts) {
    var res = await fetch(API + path, Object.assign(
      { headers: { 'Content-Type': 'application/json' } },
      opts || {}
    ));
    var body = null;
    try { body = await res.json(); } catch (e) { /* non-JSON */ }
    if (!res.ok) {
      var detail = body && body.detail ? body.detail : 'Request failed (' + res.status + ')';
      throw new Error(typeof detail === 'string' ? detail : JSON.stringify(detail));
    }
    return body;
  }
  function get(p) { return api(p); }
  function post(p, b) { return api(p, { method: 'POST', body: JSON.stringify(b || {}) }); }

  var cache = { employees: null, shifts: null, result: null };

  async function employees() {
    if (!cache.employees) cache.employees = await get('/api/v1/employees/');
    return cache.employees;
  }
  async function shifts() {
    if (!cache.shifts) cache.shifts = await get('/api/v1/shifts/');
    return cache.shifts;
  }
  async function optimize() {
    var res = await post('/api/v1/optimize', {
      week_start: WEEK_START,
      approved_leave_ids: [],
      include_baseline: true,
    });
    cache.result = res;
    return res;
  }
  async function leaves() {
    try { return await get('/api/v1/leave/'); }
    catch (e) { return []; }
  }
  function empName(id, list) {
    var hit = (list || []).filter(function (e) { return e.id === id; })[0];
    return hit ? hit.name : id;
  }
  function availSummary(e) {
    var av = e.availability || [];
    if (!av.length) return 'Open availability';
    var days = av.filter(function (a) { return a.available; }).map(function (a) { return a.day; });
    if (!days.length) return 'Not available';
    if (days.length >= 7) return 'Every day';
    return days.slice(0, 3).join(', ') + (days.length > 3 ? ' +' + (days.length - 3) : '');
  }

  /* ------------------------------- OVERVIEW ------------------------------ */
  async function bootOverview() {
    var emps = await employees();
    setText('kpi-team', emps.length + (emps.length === 1 ? ' person' : ' people'));
    setText('header-context', 'UrbanBrew Caf\u00E9 \u00B7 Mumbai \u00B7 Week of ' + WEEK_START);
    var res = await optimize();
    if (res.status === 'feasible' && res.optimized_metrics) {
      var m = res.optimized_metrics;
      setText('kpi-coverage', Math.round((m.coverage || 0) * 100) + '%');
      setText('kpi-coverage-sub', 'Live roster from the optimizer');
      setText('kpi-cost', inr(m.labor_cost));
      setText('kpi-overtime', (m.overtime_hours || 0) + ' hrs');
      setText('kpi-balance', Math.round(m.fairness_score || 0) + ' / 100');
      setText('kpi-savings', m.savings != null ? inr(m.savings) : '\u2014');
      setText('primary-action-sub', 'Last built just now \u00B7 ' + inr(m.labor_cost));
    } else {
      setText('primary-action-sub', 'Could not build: ' + (res.infeasibility_causes || []).join(' '));
    }
    var btn = el('primary-action-btn');
    if (btn && !btn.dataset.connected) {
      btn.dataset.connected = '1';
      btn.addEventListener('click', async function () {
        setText('primary-action-sub', 'Building your schedule\u2026');
        try {
          var r = await optimize();
          if (r.status === 'feasible' && r.optimized_metrics) {
            setText('kpi-coverage', Math.round((r.optimized_metrics.coverage || 0) * 100) + '%');
            setText('kpi-cost', inr(r.optimized_metrics.labor_cost));
            setText('kpi-overtime', (r.optimized_metrics.overtime_hours || 0) + ' hrs');
            setText('kpi-balance', Math.round(r.optimized_metrics.fairness_score || 0) + ' / 100');
            setText('primary-action-sub', 'Last built just now \u00B7 ' + inr(r.optimized_metrics.labor_cost));
          } else {
            setText('primary-action-sub', 'Could not build: ' + (r.infeasibility_causes || []).join(' '));
          }
        } catch (e) {
          setText('primary-action-sub', 'Backend unreachable: ' + e.message);
        }
      });
    }
  }

  /* --------------------------------- TEAM -------------------------------- */
  function teamRow(e, hoursById) {
    var hours = hoursById[e.id] || 0;
    var skills = (e.skills || []).slice(0, 2).map(function (s) {
      return '<span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">' + esc(s) + '</span>';
    }).join('');
    if ((e.skills || []).length > 2) {
      skills += '<span class="px-1.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px]">+' + ((e.skills || []).length - 2) + '</span>';
    }
    return '<tr class="team-row hover:bg-surface-container-low/60 transition-colors" data-name="' + esc(e.name) + '" data-role="' + esc(e.role) + '" data-skills="' + esc((e.skills || []).join(', ')) + '">' +
      '<td class="py-space-md px-space-lg"><div class="flex items-center gap-space-md">' +
      '<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-label-md font-bold text-on-surface shrink-0">' + esc(initials(e.name)) + '</div>' +
      '<div class="min-w-0"><span class="font-label-md font-semibold text-on-surface block truncate">' + esc(e.name) + '</span>' +
      '<span class="font-body-sm text-body-sm text-on-surface-variant block truncate">' + esc(e.role) + '</span></div></div></td>' +
      '<td class="py-space-md px-space-md"><div class="flex flex-wrap gap-1 max-w-[200px]">' + (skills || '<span class="text-on-surface-variant">\u2014</span>') + '</div></td>' +
      '<td class="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant">' + esc(availSummary(e)) + '</td>' +
      '<td class="py-space-md px-space-md font-label-md text-label-md text-on-surface whitespace-nowrap">' + inr(e.hourly_rate) + '/hr</td>' +
      '<td class="py-space-md px-space-md font-body-sm text-body-sm text-on-surface-variant whitespace-nowrap">' + hours + 'h / ' + e.max_hours_per_week + 'h</td>' +
      '<td class="py-space-md px-space-md"><span class="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">Active</span></td>' +
      '<td class="py-space-md px-space-md"></td></tr>';
  }

  async function bootTeam() {
    var tbody = el('team-table-body');
    var emps = await employees();
    var hoursById = {};
    try {
      var res = await optimize();
      (res.assignments || []).forEach(function (a) {
        hoursById[a.employee_id] = (hoursById[a.employee_id] || 0) + (a.hours || 0);
      });
    } catch (e) { /* assigned column falls back to 0h */ }
    if (tbody) {
      tbody.innerHTML = emps.map(function (e) { return teamRow(e, hoursById); }).join('') ||
        '<tr><td class="py-space-md px-space-lg text-on-surface-variant">No team members yet.</td></tr>';
    }
    // Add-member modal: read its own inputs, POST a real employee, reload rows.
    var modal = el('add-modal') || el('modal-add-member');
    if (modal && !modal.dataset.connected) {
      modal.dataset.connected = '1';
      var saveBtn = Array.prototype.slice.call(modal.querySelectorAll('button'))
        .filter(function (b) { return /add|save|create/i.test(b.textContent || ''); })[0];
      if (saveBtn) saveBtn.addEventListener('click', async function () {
        try {
          var q = function (id) { var n = el(id); return n ? n.value : ''; };
          var name = (q('member-name-input') || '').trim();
          if (!name) throw new Error('Enter a name first.');
          var pay = parseFloat(q('member-pay-input')) || 0;
          var maxh = parseFloat(q('member-hours-input')) || 40;
          await post('/api/v1/employees/', {
            id: 'emp_' + Date.now().toString(36),
            name: name,
            role: q('member-role-input') || 'Barista',
            skills: [],
            hourly_rate: pay,
            max_weekly_hours: maxh,
            availability: [],
          });
          cache.employees = null;
          var list = await employees();
          var tb = el('team-table-body');
          if (tb) tb.innerHTML = list.map(function (e) { return teamRow(e, {}); }).join('');
          var toast = el('toast-notification'), msg = el('toast-message');
          if (msg) msg.textContent = name + ' added to the team.';
          if (toast) toast.style.display = 'block';
        } catch (e) {
          var msg2 = el('toast-message'), toast2 = el('toast-notification');
          if (msg2) msg2.textContent = 'Could not add member: ' + e.message;
          if (toast2) toast2.style.display = 'block';
        }
      });
    }
  }

  /* ------------------------------- WORKSPACE ------------------------------ */
  async function bootWorkspace() {
    var sched = null;
    try { sched = await get('/api/v1/schedule'); } catch (e) { sched = null; }
    var res = await optimize();
    var pct = res.status === 'feasible' && res.optimized_metrics
      ? Math.round((res.optimized_metrics.coverage || 0) * 100) : 0;
    setText('kpi-coverage-value', pct + '%');
    var loaded = el('workspace-loaded-view'), empty = el('workspace-empty-view');
    if (res.status === 'feasible') {
      if (loaded) loaded.style.display = '';
      if (empty) empty.style.display = 'none';
    } else if (loaded && empty) {
      loaded.style.display = 'none';
      empty.style.display = '';
    }
    void sched;
  }

  /* ------------------------------- TIME OFF ------------------------------ */
  async function bootTimeOff() {
    var all = await leaves();
    var pending = all.filter(function (l) { return l.status === 'pending'; });
    setText('metric-waiting-count', String(pending.length));
    setText('triage-badge', pending.length ? pending.length + ' waiting approval' : 'All clear');
    var grid = el('triage-grid'), empty = el('triage-empty');
    if (!pending.length) {
      if (grid) grid.style.display = 'none';
      if (empty) empty.style.display = '';
    } else {
      if (grid) grid.style.display = '';
      if (empty) empty.style.display = 'none';
    }
    // Approve flow: remember which card opened the modal (by employee name),
    // then the modal's confirm button approves THAT real leave + reoptimizes.
    var picked = null;
    if (grid && !grid.dataset.connected) {
      grid.dataset.connected = '1';
      grid.addEventListener('click', function (ev) {
        var card = ev.target && ev.target.closest ? ev.target.closest('[id^="card-"]') : null;
        if (!card) return;
        var text = card.textContent || '';
        var hit = pending.filter(function (l) {
          return text.indexOf(empName(l.employee_id, cache.employees)) !== -1;
        })[0];
        picked = hit || pending[0] || null;
      });
    }
    var modal = el('modal-approve-flow');
    if (modal && !modal.dataset.connected) {
      modal.dataset.connected = '1';
      var confirm = Array.prototype.slice.call(modal.querySelectorAll('button'))
        .filter(function (b) { return /approve/i.test(b.textContent || ''); })[0];
      if (confirm) confirm.addEventListener('click', async function () {
        try {
          var target = picked || pending[0];
          if (!target) throw new Error('No pending request.');
          await post('/api/v1/leave/' + encodeURIComponent(target.id) + '/approve', {});
          await post('/api/v1/reoptimize', { leave_id: target.id });
          var ok = el('toast-success');
          if (ok) ok.style.display = 'block';
          var fresh = await leaves();
          var stillPending = fresh.filter(function (l) { return l.status === 'pending'; });
          setText('metric-waiting-count', String(stillPending.length));
        } catch (e) {
          var bad = el('toast-conflict');
          if (bad) {
            bad.style.display = 'block';
            bad.textContent = 'Could not approve: ' + e.message;
          }
        }
      });
    }
    // Add-time-off modal: read its own fields generically, POST a real leave.
    var addModal = el('modal-add-timeoff');
    if (addModal && !addModal.dataset.connected) {
      addModal.dataset.connected = '1';
      var save = Array.prototype.slice.call(addModal.querySelectorAll('button'))
        .filter(function (b) { return /save|add|create|submit/i.test(b.textContent || ''); })[0];
      if (save) save.addEventListener('click', async function () {
        try {
          var sel = addModal.querySelector('select');
          var dates = addModal.querySelectorAll('input[type="date"]');
          var who = sel && sel.selectedOptions.length
            ? sel.selectedOptions[0].textContent || ''
            : '';
          var match = (cache.employees || []).filter(function (e) {
            return who.indexOf(e.name) !== -1;
          })[0];
          if (!match) throw new Error('Pick a team member first.');
          var s = dates[0] && dates[0].value, en = dates[1] && dates[1].value;
          if (!s || !en) throw new Error('Pick start and end dates.');
          await post('/api/v1/leave/', {
            employee_id: match.id, start_date: s, end_date: en,
            type: 'casual', reason: 'Recorded from Time Off screen',
          });
          var ok2 = el('toast-success');
          if (ok2) ok2.style.display = 'block';
          var fresh2 = await leaves();
          setText('metric-waiting-count', String(fresh2.filter(function (l) { return l.status === 'pending'; }).length));
        } catch (e) {
          var bad2 = el('toast-conflict');
          if (bad2) { bad2.style.display = 'block'; bad2.textContent = 'Could not save: ' + e.message; }
        }
      });
    }
  }

  /* ------------------------------ COMPARISON ------------------------------ */
  async function bootComparison() {
    var res = await optimize();
    if (res.status !== 'feasible' || !res.optimized_metrics) {
      var banner = el('infeasible-banner');
      if (banner) banner.style.display = '';
      setText('status-text', 'Infeasible');
      var ch = el('changelog-container');
      if (ch) ch.innerHTML = '<p class="font-body-md">' + esc((res.infeasibility_causes || ['No feasible schedule.']).join(' ')) + '</p>';
      return;
    }
    var m = res.optimized_metrics, b = res.baseline_metrics;
    setText('status-text', 'Ready');
    setText('metric-coverage', Math.round((m.coverage || 0) * 100) + '%');
    setText('metric-coverage-sub', 'Shifts staffed by the optimizer');
    setText('metric-cost', inr(m.labor_cost));
    setText('metric-cost-sub', b ? 'Manual baseline ' + inr(b.labor_cost) : 'No baseline returned');
    setText('metric-ot', (m.overtime_hours || 0) + ' hrs');
    setText('metric-balance', Math.round(m.fairness_score || 0) + ' / 100');
    if (m.savings != null) {
      setText('savings-text', 'Saved ' + inr(m.savings) + ' vs the manual baseline.');
    }
    var bar = el('bar-coverage');
    if (bar) bar.style.width = Math.round((m.coverage || 0) * 100) + '%';
    var cc = el('changelog-container');
    if (cc) {
      var rows = (res.assignments || []).slice(0, 6).map(function (a) {
        return '<p class="font-body-md">' + esc(a.employee_name || a.employee_id) + ' \u2192 ' +
          esc(a.shift_name || a.shift_id) + ' (' + esc(a.day || '') + ')</p>';
      }).join('');
      cc.innerHTML = rows || '<p class="font-body-md">Optimized roster ready.</p>';
    }
  }

  /* -------------------------------- CUSTOM -------------------------------- */
  async function bootCustom() {
    var emps = await employees();
    var shs = await shifts();
    var list = el('team-roster-list');
    if (list) {
      list.innerHTML = emps.map(function (e) {
        return '<div class="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-lg">' +
          '<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-label-md font-bold text-on-surface shrink-0">' + esc(initials(e.name)) + '</div>' +
          '<div class="min-w-0 flex-1"><div class="font-label-md text-label-md text-on-surface truncate">' + esc(e.name) + '</div>' +
          '<div class="font-label-sm text-label-sm text-on-surface-variant truncate">' + esc(e.role) + '</div></div>' +
          '<div class="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">' + inr(e.hourly_rate) + '/h</div></div>';
      }).join('');
    }
    function countLike(word) {
      var n = 0;
      shs.forEach(function (s) {
        if ((s.name || '').toLowerCase().indexOf(word) !== -1) n += (s.required_staff || 0);
      });
      return n;
    }
    setText('count-morning', String(countLike('morning')));
    setText('count-mid', String(countLike('afternoon') + countLike('mid')));
    setText('count-evening', String(countLike('evening')));
  }

  /* -------------------------------- RULES --------------------------------- */
  async function bootRules() {
    var shs = await shifts();
    function setStepper(id, words) {
      var n = el(id);
      if (!n) return;
      var total = 0;
      shs.forEach(function (s) {
        var nm = (s.name || '').toLowerCase();
        if (words.some(function (w) { return nm.indexOf(w) !== -1; })) total += (s.required_staff || 0);
      });
      if ('value' in n) n.value = String(total);
      else n.textContent = String(total);
    }
    setStepper('morning-stepper', ['morning']);
    setStepper('evening-stepper', ['evening']);
    setStepper('weekend-stepper', ['weekend', 'saturday', 'sunday']);
  }

  /* --------------------------------- BOOT --------------------------------- */
  async function boot() {
    try {
      if (el('kpi-team')) await bootOverview();
      else if (el('team-table-body')) await bootTeam();
      else if (el('kpi-coverage-value')) await bootWorkspace();
      else if (el('triage-grid')) await bootTimeOff();
      else if (el('metric-coverage')) await bootComparison();
      else if (el('team-roster-list')) await bootCustom();
      else if (el('shift-requirements-list')) await bootRules();
      /* settings screen: no backend business endpoint — stays as designed */
    } catch (e) {
      if (window.console && console.error) console.error('[stitch-connect]', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
