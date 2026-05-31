// ============================================================
// IDLE ASCENT — SVG Tech Tree
// ============================================================

const TREE_LAYOUT = {
    cultivation:      { col: 0, row: 1 },
    medicine:         { col: 1, row: 0 },
    writing:          { col: 1, row: 2 },
    astronomy:        { col: 2, row: 0 },
    mathematics:      { col: 2, row: 1 },
    navigation:       { col: 3, row: 0 },
    alchemy:          { col: 3, row: 2 },
    optics:           { col: 4, row: 0 },
    chemistry:        { col: 4, row: 1 },
    evolution:        { col: 5, row: 0 },
    physics:          { col: 5, row: 1 },
    electromagnetism: { col: 5, row: 2 },
    genetics:         { col: 6, row: 0 },
    relativity:       { col: 6, row: 1 },
    quantum:          { col: 6, row: 2 },
    rocketscience:    { col: 7, row: 1 },
    ai_research:      { col: 8, row: 0 },
    fusion:           { col: 8, row: 2 },
    dyson_tech:       { col: 9, row: 1 },
};

const TT = {
    COL_W: 150,
    ROW_Y: [88, 205, 322],
    NR: 29,
    W: 1500,
    H: 385,
};

let treeDirty = true;
let treeViewMode = 'list';

function treeNodePos(id) {
    const { col, row } = TREE_LAYOUT[id];
    return { x: col * TT.COL_W + 75, y: TT.ROW_Y[row] };
}

function treeNodeState(def) {
    if (G.research[def.id]) return 'done';
    if (!isUnlockedByAge(def.unlockedAtAge)) return 'locked';
    if (!def.requires.every(r => G.research[r])) return 'blocked';
    if (canAfford(def.cost)) return 'affordable';
    return 'available';
}

function setTreeView(mode) {
    treeViewMode = mode;
    document.getElementById('researchListView').classList.toggle('hidden', mode !== 'list');
    document.getElementById('researchTreeView').classList.toggle('hidden', mode !== 'tree');
    document.querySelectorAll('.view-btn').forEach(b =>
        b.classList.toggle('active', b.dataset.view === mode)
    );
    if (mode === 'tree') { treeDirty = true; renderTechTree(); }
}

function renderTechTree() {
    if (!treeDirty) return;
    treeDirty = false;

    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', `0 0 ${TT.W} ${TT.H}`);
    svg.setAttribute('width', TT.W);
    svg.setAttribute('height', TT.H);

    // ---- CSS animations (inside SVG)
    const styleEl = document.createElementNS(ns, 'style');
    styleEl.textContent = `
        .pulse-ring { animation: tt-pulse 1.5s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes tt-pulse { 0%,100%{r:31;opacity:0.25} 50%{r:41;opacity:0.65} }
        .conn-active { stroke-dasharray:10 6; animation: tt-flow 1.3s linear infinite; }
        @keyframes tt-flow { to { stroke-dashoffset: -48; } }
        .node-affordable { cursor: pointer; }
        .node-done .node-circle, .node-affordable .node-circle { transition: opacity 0.15s; }
        .tree-node:hover .node-circle { opacity: 0.78; }
    `;
    svg.appendChild(styleEl);

    // ---- Defs
    const defs = document.createElementNS(ns, 'defs');
    defs.appendChild(makeGlowFilter(ns, 'tt-glow-done', '#4ade80', 6));
    defs.appendChild(makeGlowFilter(ns, 'tt-glow-afford', '#a78bfa', 6));
    svg.appendChild(defs);

    // ---- Age column backgrounds
    AGES.forEach((age, i) => {
        const active = G.ageIndex >= i;
        ttRect(svg, ns, i * TT.COL_W + 4, 44, TT.COL_W - 8, TT.H - 52, {
            fill: age.color + (active ? '16' : '07'),
            stroke: age.color + (active ? '30' : '10'),
            rx: 8
        });
        ttText(svg, ns, i * TT.COL_W + 75, 29, age.name, {
            size: 10.5, weight: 700,
            fill: active ? age.color : age.color + '38',
            anchor: 'middle'
        });
        // Subtle vertical divider
        if (i > 0) {
            const div = document.createElementNS(ns, 'line');
            div.setAttribute('x1', i * TT.COL_W + 2);
            div.setAttribute('y1', 44);
            div.setAttribute('x2', i * TT.COL_W + 2);
            div.setAttribute('y2', TT.H - 8);
            div.setAttribute('stroke', 'rgba(255,255,255,0.04)');
            div.setAttribute('stroke-width', '1');
            svg.appendChild(div);
        }
    });

    // ---- Connections (drawn under nodes)
    RESEARCH.forEach(def => {
        const to = treeNodePos(def.id);
        def.requires.forEach(reqId => {
            const from = treeNodePos(reqId);
            const bothDone = G.research[reqId] && G.research[def.id];
            const fromDone = G.research[reqId];

            const path = document.createElementNS(ns, 'path');
            let d;
            if (from.x === to.x) {
                // Same column: straight vertical
                const mid = (from.y + to.y) / 2;
                d = `M${from.x},${from.y} C${from.x+20},${mid} ${to.x-20},${mid} ${to.x},${to.y}`;
            } else {
                const dx = Math.abs(to.x - from.x) * 0.48;
                d = `M${from.x},${from.y} C${from.x+dx},${from.y} ${to.x-dx},${to.y} ${to.x},${to.y}`;
            }
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            if (bothDone) {
                path.setAttribute('class', 'conn-active');
                path.setAttribute('stroke', '#4ade80');
                path.setAttribute('stroke-width', '2.5');
                path.setAttribute('stroke-dasharray', '10 6');
            } else if (fromDone) {
                path.setAttribute('stroke', '#a78bfa');
                path.setAttribute('stroke-width', '2');
                path.setAttribute('stroke-dasharray', '6 4');
            } else {
                path.setAttribute('stroke', 'rgba(255,255,255,0.09)');
                path.setAttribute('stroke-width', '1.5');
                path.setAttribute('stroke-dasharray', '4 4');
            }
            svg.appendChild(path);
        });
    });

    // ---- Nodes
    RESEARCH.forEach(def => {
        const pos = treeNodePos(def.id);
        const state = treeNodeState(def);
        const g = document.createElementNS(ns, 'g');
        g.setAttribute('class', `tree-node node-${state}`);
        g.setAttribute('transform', `translate(${pos.x},${pos.y})`);

        // Pulse ring for affordable
        if (state === 'affordable') {
            const ring = document.createElementNS(ns, 'circle');
            ring.setAttribute('class', 'pulse-ring');
            ring.setAttribute('r', '31');
            ring.setAttribute('fill', 'rgba(167,139,250,0.08)');
            ring.setAttribute('stroke', '#a78bfa');
            ring.setAttribute('stroke-width', '1.5');
            g.appendChild(ring);
        }

        // Main circle
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('class', 'node-circle');
        circle.setAttribute('r', TT.NR);
        const bgMap = {
            done: 'rgba(74,222,128,0.22)',
            affordable: 'rgba(167,139,250,0.22)',
            available: 'rgba(255,255,255,0.07)',
            blocked: 'rgba(255,255,255,0.03)',
            locked: 'rgba(0,0,0,0.28)'
        };
        const strokeMap = {
            done: '#4ade80',
            affordable: '#a78bfa',
            available: 'rgba(255,255,255,0.22)',
            blocked: 'rgba(255,255,255,0.09)',
            locked: 'rgba(255,255,255,0.05)'
        };
        circle.setAttribute('fill', bgMap[state]);
        circle.setAttribute('stroke', strokeMap[state]);
        circle.setAttribute('stroke-width', (state === 'done' || state === 'affordable') ? '2' : '1.5');
        if (state === 'done') circle.setAttribute('filter', 'url(#tt-glow-done)');
        if (state === 'affordable') circle.setAttribute('filter', 'url(#tt-glow-afford)');
        g.appendChild(circle);

        // Emoji
        const emo = document.createElementNS(ns, 'text');
        emo.setAttribute('text-anchor', 'middle');
        emo.setAttribute('dominant-baseline', 'central');
        emo.setAttribute('y', '1');
        emo.setAttribute('font-size', state === 'locked' ? '13' : '17');
        emo.setAttribute('opacity', state === 'locked' ? '0.18' : state === 'blocked' ? '0.45' : '1');
        emo.textContent = def.emoji;
        g.appendChild(emo);

        // Done badge
        if (state === 'done') {
            const badge = document.createElementNS(ns, 'circle');
            badge.setAttribute('cx', TT.NR - 4);
            badge.setAttribute('cy', -(TT.NR - 4));
            badge.setAttribute('r', '9');
            badge.setAttribute('fill', '#4ade80');
            g.appendChild(badge);
            const chk = document.createElementNS(ns, 'text');
            chk.setAttribute('x', TT.NR - 4); chk.setAttribute('y', -(TT.NR - 4));
            chk.setAttribute('text-anchor', 'middle');
            chk.setAttribute('dominant-baseline', 'central');
            chk.setAttribute('font-size', '10'); chk.setAttribute('fill', '#000');
            chk.setAttribute('font-weight', '900'); chk.textContent = '✓';
            g.appendChild(chk);
        }

        // Name label (1 or 2 lines)
        const fillMap = {
            done: '#4ade80', affordable: '#c4b5fd',
            available: 'rgba(255,255,255,0.62)',
            blocked: 'rgba(255,255,255,0.24)',
            locked: 'rgba(255,255,255,0.1)'
        };
        const nc = fillMap[state];
        const words = def.name.split(' ');
        const ny = TT.NR + 14;
        if (words.length >= 2 && def.name.length > 9) {
            const mid = Math.ceil(words.length / 2);
            ttText(g, ns, 0, ny, words.slice(0, mid).join(' '), { size: 9.5, weight: 600, fill: nc, anchor: 'middle' });
            ttText(g, ns, 0, ny + 12, words.slice(mid).join(' '), { size: 9.5, weight: 600, fill: nc, anchor: 'middle' });
        } else {
            ttText(g, ns, 0, ny, def.name, { size: 10, weight: 600, fill: nc, anchor: 'middle' });
        }

        // Interactions
        if (state === 'affordable') {
            g.addEventListener('click', () => {
                purchaseResearch(def.id);
                treeDirty = true;
                renderTechTree();
            });
        }
        g.addEventListener('mouseenter', () => showTreeTip(def, state));
        g.addEventListener('mouseleave', () => document.getElementById('treeTip').style.display = 'none');

        svg.appendChild(g);
    });

    const wrap = document.getElementById('treeSvgWrap');
    wrap.innerHTML = '';
    wrap.appendChild(svg);
}

// ---- Tooltip -----------------------------------------------

function showTreeTip(def, state) {
    const panel = document.getElementById('treeTip');
    const labels = {
        done:       ['✓ Researched',           '#4ade80'],
        affordable: ['Click to Research!',      '#a78bfa'],
        available:  ['Cannot Afford Yet',       '#fbbf24'],
        blocked:    ['Prerequisites Needed',    '#f87171'],
        locked:     ['Advance Your Civilization','#666'],
    };
    const [lbl, col] = labels[state] || labels.locked;
    const icons = { population:'👥', food:'🌾', knowledge:'📖', science:'⚗️', culture:'🎭', energy:'⚡' };

    const costHtml = state === 'done'
        ? '<span style="color:#4ade80">Already complete.</span>'
        : Object.entries(def.cost).map(([res, amt]) =>
            `<span style="color:${(G[res]||0)>=amt?'#4ade80':'#f87171'}">${icons[res]} ${fmt(amt)}</span>`
          ).join(' ');

    const reqHtml = def.requires.length
        ? `<div class="tt-reqs">Requires: ${def.requires.map(r => {
              const rd = RESEARCH.find(x => x.id === r);
              return `<span style="color:${G.research[r]?'#4ade80':'#f87171'}">${rd?.name||r}</span>`;
          }).join(' + ')}</div>`
        : '';

    panel.innerHTML = `
        <div class="tt-row">
            <span class="tt-emo">${def.emoji}</span>
            <div>
                <div class="tt-name">${def.name}</div>
                <div style="color:${col};font-size:0.75em;font-weight:700;letter-spacing:0.3px">${lbl}</div>
            </div>
        </div>
        <div class="tt-desc">${def.description}</div>
        ${reqHtml}
        <div class="tt-cost">${costHtml}</div>
    `;
    panel.style.display = 'block';
}

// ---- SVG Helpers -------------------------------------------

function makeGlowFilter(ns, id, color, blur) {
    const f = document.createElementNS(ns, 'filter');
    f.setAttribute('id', id);
    f.setAttribute('x', '-70%'); f.setAttribute('y', '-70%');
    f.setAttribute('width', '240%'); f.setAttribute('height', '240%');

    const b = document.createElementNS(ns, 'feGaussianBlur');
    b.setAttribute('in', 'SourceGraphic'); b.setAttribute('stdDeviation', blur); b.setAttribute('result', 'blur');

    const flood = document.createElementNS(ns, 'feFlood');
    flood.setAttribute('flood-color', color); flood.setAttribute('flood-opacity', '0.55'); flood.setAttribute('result', 'clr');

    const comp = document.createElementNS(ns, 'feComposite');
    comp.setAttribute('in', 'clr'); comp.setAttribute('in2', 'blur'); comp.setAttribute('operator', 'in'); comp.setAttribute('result', 'glow');

    const merge = document.createElementNS(ns, 'feMerge');
    ['glow', 'SourceGraphic'].forEach(n => {
        const mn = document.createElementNS(ns, 'feMergeNode');
        mn.setAttribute('in', n);
        merge.appendChild(mn);
    });
    [b, flood, comp, merge].forEach(el => f.appendChild(el));
    return f;
}

function ttRect(parent, ns, x, y, w, h, { fill, stroke, rx = 0 } = {}) {
    const el = document.createElementNS(ns, 'rect');
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('width', w); el.setAttribute('height', h);
    if (fill) el.setAttribute('fill', fill);
    if (stroke) { el.setAttribute('stroke', stroke); el.setAttribute('stroke-width', '1'); }
    if (rx) el.setAttribute('rx', rx);
    parent.appendChild(el);
}

function ttText(parent, ns, x, y, text, { size = 12, weight = 400, fill = '#fff', anchor = 'start' } = {}) {
    const el = document.createElementNS(ns, 'text');
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('text-anchor', anchor);
    el.setAttribute('font-family', 'Segoe UI, system-ui, sans-serif');
    el.setAttribute('font-size', size); el.setAttribute('font-weight', weight);
    el.setAttribute('fill', fill);
    el.textContent = text;
    parent.appendChild(el);
}
