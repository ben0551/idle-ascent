// ============================================================
// IDLE ASCENT — Core Engine
// ============================================================

const TICK_MS = 100; // 10 ticks/second
const COST_SCALE = 1.15;

// ---- State --------------------------------------------------

const defaultState = () => ({
    population: 0,
    food: 0,
    knowledge: 0,
    science: 0,
    culture: 0,
    energy: 0,

    totalEarned: { population: 0, food: 0, knowledge: 0, science: 0, culture: 0, energy: 0 },

    buildings: {},        // id -> count
    upgrades: {},         // id -> bool
    research: {},         // id -> bool
    milestones: {},       // id -> bool

    ageIndex: 0,
    clickPower: 1,
    startTime: Date.now(),
    lastTick: Date.now(),

    // Prestige
    prestigeCount: 0,
    prestigeMultiplier: 1,

    // Unlocked resources
    unlockedResources: ['population']
});

let G = defaultState();

// ---- Computed multipliers -----------------------------------

function computeMultipliers() {
    // Returns { global, click, buildings:{}, resources:{} }
    const m = {
        global: G.prestigeMultiplier || 1,
        click: G.clickPower,
        buildings: {},
        resources: {}
    };

    const allDefs = [...UPGRADES, ...RESEARCH];

    allDefs.forEach(def => {
        const purchased = G.upgrades[def.id] || G.research[def.id];
        if (!purchased) return;
        const e = def.effect;
        if (!e) return;

        if (e.type === 'global') m.global *= e.multiplier;
        if (e.type === 'click') m.click *= e.multiplier;
        if (e.type === 'building') {
            m.buildings[e.building] = (m.buildings[e.building] || 1) * e.multiplier;
        }
        if (e.type === 'multi-building') {
            e.buildings.forEach(b => {
                m.buildings[b] = (m.buildings[b] || 1) * e.multiplier;
            });
        }
        if (e.type === 'resource') {
            m.resources[e.resource] = (m.resources[e.resource] || 1) * e.multiplier;
        }
        if (e.type === 'multi-resource') {
            e.resources.forEach(r => {
                m.resources[r] = (m.resources[r] || 1) * e.multiplier;
            });
        }
    });

    return m;
}

function computeProduction() {
    // Returns per-second production for each resource
    const mults = computeMultipliers();
    const prod = { population: 0, food: 0, knowledge: 0, science: 0, culture: 0, energy: 0 };

    BUILDINGS.forEach(bDef => {
        const count = G.buildings[bDef.id] || 0;
        if (count === 0) return;
        const bMult = (mults.buildings[bDef.id] || 1) * mults.global;
        Object.entries(bDef.produces).forEach(([res, base]) => {
            const rMult = mults.resources[res] || 1;
            prod[res] = (prod[res] || 0) + base * count * bMult * rMult;
        });
    });

    return prod;
}

// ---- Game Loop ----------------------------------------------

let lastProduction = {};

function tick() {
    const now = Date.now();
    const dt = (now - G.lastTick) / 1000; // seconds elapsed
    G.lastTick = now;

    const prod = computeProduction();
    lastProduction = prod;

    Object.keys(prod).forEach(res => {
        if (!G.unlockedResources.includes(res)) return;
        G[res] = (G[res] || 0) + prod[res] * dt;
        G.totalEarned[res] = (G.totalEarned[res] || 0) + prod[res] * dt;
    });

    checkAgeAdvance();
    checkMilestones();
    updateUI();
}

function startLoop() {
    setInterval(tick, TICK_MS);
    setInterval(saveGame, 5000);
}

// ---- Age System ---------------------------------------------

function checkAgeAdvance() {
    let newIdx = 0;
    for (let i = AGES.length - 1; i >= 0; i--) {
        if (G.population >= AGES[i].threshold) { newIdx = i; break; }
    }
    if (newIdx > G.ageIndex) {
        G.ageIndex = newIdx;
        const age = AGES[newIdx];
        applyAgeTheme(age);
        showAgeOverlay(age);
        burstParticles(age.color, 80);
        setTimeout(() => burstParticles(age.color, 60), 400);
        saveGame();
    }
}

function applyAgeTheme(age) {
    document.documentElement.style.setProperty('--age-color', age.color);
    document.documentElement.style.setProperty('--age-hue', age.hue);
    document.body.style.background = age.bg;
    document.getElementById('gatherIcon').textContent = age.gatherIcon;
    document.getElementById('gatherLabel').textContent = age.gatherLabel;
    document.getElementById('ageBadge').textContent = age.name;
    document.getElementById('ageBadge').style.background = age.color;
    document.getElementById('ageBadge').style.color = '#000';
}

function showAgeOverlay(age) {
    const overlay = document.getElementById('ageOverlay');
    document.getElementById('overlayTitle').textContent = `⚡ ${age.name}`;
    document.getElementById('overlaySub').textContent = age.description;
    overlay.classList.remove('hidden');
    setTimeout(() => overlay.classList.add('hidden'), 3500);
}

// ---- Milestone Checks ---------------------------------------

function checkMilestones() {
    MILESTONES.forEach(m => {
        if (!G.milestones[m.id] && m.condition(G)) {
            G.milestones[m.id] = true;
            showToast(`🏆 ${m.name}: ${m.description}`, 'milestone');
        }
    });
}

// ---- Click Handler ------------------------------------------

function handleGather() {
    const mults = computeMultipliers();
    const amount = mults.click;
    G.population += amount;
    G.totalEarned.population += amount;
    showClickPop(amount);
    updateUI();
}

function showClickPop(amount) {
    const btn = document.getElementById('gatherBtn');
    const pop = document.createElement('div');
    pop.className = 'click-pop';
    pop.textContent = `+${fmt(amount)}`;
    btn.appendChild(pop);
    setTimeout(() => pop.remove(), 800);
}

// ---- Building Cost ------------------------------------------

function buildingCost(bDef) {
    const owned = G.buildings[bDef.id] || 0;
    const cost = {};
    Object.entries(bDef.baseCost).forEach(([res, base]) => {
        cost[res] = Math.ceil(base * Math.pow(COST_SCALE, owned));
    });
    return cost;
}

function canAfford(costObj) {
    return Object.entries(costObj).every(([res, amt]) => (G[res] || 0) >= amt);
}

function deductCost(costObj) {
    Object.entries(costObj).forEach(([res, amt]) => { G[res] -= amt; });
}

function purchaseBuilding(id) {
    purchaseBuildingN(id, buyAmount);
}

function purchaseUpgrade(id) {
    const def = UPGRADES.find(u => u.id === id);
    if (!def || G.upgrades[id]) return;
    if (!canAfford(def.cost)) return;
    deductCost(def.cost);
    G.upgrades[id] = true;
    if (def.effect?.type === 'unlock_resource') unlockResource(def.effect.resource);
    saveGame();
    updateUI();
}

function purchaseResearch(id) {
    const def = RESEARCH.find(r => r.id === id);
    if (!def || G.research[id]) return;
    const prereqsMet = def.requires.every(req => G.research[req]);
    if (!prereqsMet) return;
    if (!canAfford(def.cost)) return;
    deductCost(def.cost);
    G.research[id] = true;
    if (def.effect?.type === 'unlock_resource') unlockResource(def.effect.resource);
    showToast(`🔬 Researched: ${def.name}`, 'research');
    saveGame();
    updateUI();
}

function unlockResource(res) {
    if (!G.unlockedResources.includes(res)) {
        G.unlockedResources.push(res);
        document.getElementById(`res-${res}`)?.classList.remove('hidden');
        showToast(`✨ Unlocked: ${res.charAt(0).toUpperCase() + res.slice(1)}!`, 'unlock');
    }
}

// ---- Number Formatter ---------------------------------------

function fmt(n) {
    if (n === undefined || n === null) return '0';
    n = Math.floor(n);
    if (n < 1000) return n.toString();
    if (n < 1e6) return (n / 1e3).toFixed(1) + 'K';
    if (n < 1e9) return (n / 1e6).toFixed(2) + 'M';
    if (n < 1e12) return (n / 1e9).toFixed(2) + 'B';
    if (n < 1e15) return (n / 1e12).toFixed(2) + 'T';
    return (n / 1e15).toFixed(2) + 'Q';
}

function fmtRate(n) {
    if (!n || n < 0.01) return '+0/s';
    return `+${fmt(n)}/s`;
}

function fmtTime(ms) {
    const s = Math.floor(ms / 1000);
    if (s < 60) return `${s}s`;
    if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
    return `${Math.floor(s / 86400)}d ${Math.floor((s % 86400) / 3600)}h`;
}

// ---- Buy Amount Toggle --------------------------------------

let buyAmount = 1; // 1, 10, 100, or 'max'

function setBuyAmount(n) {
    buyAmount = n;
    document.querySelectorAll('.buy-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.amount == n);
    });
    updateUI();
}

function calcMaxBuy(bDef) {
    // Binary search for max affordable count
    let lo = 0, hi = 10000;
    const owned = G.buildings[bDef.id] || 0;
    while (lo < hi) {
        const mid = Math.floor((lo + hi + 1) / 2);
        if (canAffordBulk(bDef, owned, mid)) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

function canAffordBulk(bDef, currentOwned, n) {
    if (n === 0) return false;
    const totalCost = {};
    for (let i = 0; i < n; i++) {
        Object.entries(bDef.baseCost).forEach(([res, base]) => {
            totalCost[res] = (totalCost[res] || 0) + Math.ceil(base * Math.pow(COST_SCALE, currentOwned + i));
        });
    }
    return Object.entries(totalCost).every(([res, amt]) => (G[res] || 0) >= amt);
}

function bulkBuildingCost(bDef, n) {
    const owned = G.buildings[bDef.id] || 0;
    const cost = {};
    for (let i = 0; i < n; i++) {
        Object.entries(bDef.baseCost).forEach(([res, base]) => {
            cost[res] = (cost[res] || 0) + Math.ceil(base * Math.pow(COST_SCALE, owned + i));
        });
    }
    return cost;
}

function purchaseBuildingN(id, n) {
    const bDef = BUILDINGS.find(b => b.id === id);
    if (!bDef) return;
    const owned = G.buildings[bDef.id] || 0;
    const count = n === 'max' ? calcMaxBuy(bDef) : n;
    if (count === 0) return;
    if (!canAffordBulk(bDef, owned, count)) return;
    const cost = bulkBuildingCost(bDef, count);
    deductCost(cost);
    G.buildings[id] = owned + count;
    saveGame();
    updateUI();
}

// ---- UI Updaters --------------------------------------------

let activeTab = 'buildings';

const RES_ID_MAP = {
    population: 'pop', food: 'food', knowledge: 'know',
    science: 'sci', culture: 'cult', energy: 'energy'
};

function updateUI() {
    const prod = lastProduction;

    // Resources chips
    Object.keys(RES_ID_MAP).forEach(res => {
        const chip = document.getElementById(`res-${res}`);
        if (!chip) return;
        if (G.unlockedResources.includes(res)) chip.classList.remove('hidden');
        const prefix = RES_ID_MAP[res];
        document.getElementById(`${prefix}-val`).textContent = fmt(G[res] || 0);
        document.getElementById(`${prefix}-rate`).textContent = fmtRate(prod[res] || 0);
    });

    // Age progress
    const nextAge = AGES[Math.min(G.ageIndex + 1, AGES.length - 1)];
    const curAge = AGES[G.ageIndex];
    const range = nextAge.threshold - curAge.threshold;
    const prog = range === 0 ? 100 : Math.min(((G.population - curAge.threshold) / range) * 100, 100);
    document.getElementById('ageFill').style.width = prog + '%';
    document.getElementById('ageProgressLabel').textContent = curAge.name;
    document.getElementById('ageProgressNext').textContent = nextAge.name;
    document.getElementById('ageProgressText').textContent =
        G.ageIndex >= AGES.length - 1
            ? '🎉 Max Age Reached!'
            : `${fmt(G.population)} / ${fmt(nextAge.threshold)}`;

    // Gather bonus
    const mults = computeMultipliers();
    document.getElementById('gatherBonus').textContent = `+${fmt(mults.click)} per click`;

    // Notification badges
    const availableUpgrades = UPGRADES.filter(u => !G.upgrades[u.id] && isUnlockedByAge(u.unlockedAtAge) && canAfford(u.cost));
    document.getElementById('upgradesBadge').classList.toggle('hidden', availableUpgrades.length === 0);

    const availableResearch = RESEARCH.filter(r =>
        !G.research[r.id] &&
        isUnlockedByAge(r.unlockedAtAge) &&
        r.requires.every(req => G.research[req]) &&
        canAfford(r.cost)
    );
    document.getElementById('researchBadge').classList.toggle('hidden', availableResearch.length === 0);

    // Active tab content
    if (activeTab === 'buildings') renderBuildings();
    if (activeTab === 'research') renderResearch();
    if (activeTab === 'upgrades') renderUpgrades();
    if (activeTab === 'milestones') renderMilestones();
    if (activeTab === 'stats') renderStats();
}

function isUnlockedByAge(ageId) {
    const targetIdx = AGES.findIndex(a => a.id === ageId);
    return G.ageIndex >= targetIdx;
}

function renderBuildings() {
    const grid = document.getElementById('buildingsGrid');
    grid.innerHTML = '';

    BUILDINGS.forEach(bDef => {
        const unlocked = isUnlockedByAge(bDef.unlockedAtAge);
        const owned = G.buildings[bDef.id] || 0;
        const prod = computeBuildingProduction(bDef);
        const n = buyAmount === 'max' ? Math.max(1, calcMaxBuy(bDef)) : buyAmount;
        const cost = buyAmount === 'max'
            ? bulkBuildingCost(bDef, Math.max(1, calcMaxBuy(bDef)))
            : bulkBuildingCost(bDef, n);
        const actualN = buyAmount === 'max' ? calcMaxBuy(bDef) : n;
        const affordable = unlocked && actualN > 0 && canAfford(cost);

        const card = document.createElement('div');
        card.className = 'building-card' + (unlocked ? (affordable ? ' can-afford' : '') : ' locked');
        const buyLabel = buyAmount === 'max' ? `Buy Max (${actualN})` : `Buy ×${n}`;
        card.innerHTML = `
            <div class="bc-header">
                <span class="bc-emoji">${bDef.emoji}</span>
                <span class="bc-name">${bDef.name}</span>
                <span class="bc-owned ${owned > 0 ? 'has-owned' : ''}">${owned}</span>
            </div>
            <div class="bc-desc">${bDef.description}</div>
            <div class="bc-prod">${prodString(prod)}</div>
            <div class="bc-cost">${unlocked ? costString(cost, affordable) : `🔒 ${AGES.find(a => a.id === bDef.unlockedAtAge)?.name}`}</div>
        `;
        if (unlocked) card.addEventListener('click', () => purchaseBuilding(bDef.id));
        grid.appendChild(card);
    });
}

function computeBuildingProduction(bDef) {
    const mults = computeMultipliers();
    const bMult = (mults.buildings[bDef.id] || 1) * mults.global;
    const result = {};
    Object.entries(bDef.produces).forEach(([res, base]) => {
        const rMult = mults.resources[res] || 1;
        result[res] = base * bMult * rMult;
    });
    return result;
}

function prodString(prod) {
    return Object.entries(prod).map(([res, val]) => {
        const icons = { population: '👥', food: '🌾', knowledge: '📖', science: '⚗️', culture: '🎭', energy: '⚡' };
        return `${icons[res] || ''} ${fmt(val)}/s`;
    }).join(' ');
}

function costString(costObj, affordable) {
    const icons = { population: '👥', food: '🌾', knowledge: '📖', science: '⚗️', culture: '🎭', energy: '⚡' };
    return Object.entries(costObj).map(([res, amt]) => {
        const have = G[res] || 0;
        const ok = have >= amt;
        return `<span class="${ok ? 'cost-ok' : 'cost-no'}">${icons[res]} ${fmt(amt)}</span>`;
    }).join(' ');
}

function renderResearch() {
    const grid = document.getElementById('researchGrid');
    grid.innerHTML = '';

    RESEARCH.forEach(def => {
        const unlocked = isUnlockedByAge(def.unlockedAtAge);
        const done = G.research[def.id];
        const prereqsMet = def.requires.every(req => G.research[req]);
        const affordable = canAfford(def.cost);
        const available = unlocked && prereqsMet && !done;

        const card = document.createElement('div');
        card.className = 'research-card' + (done ? ' done' : available ? (affordable ? ' can-afford' : '') : ' locked');
        card.innerHTML = `
            <div class="rc-header">
                <span class="rc-emoji">${def.emoji}</span>
                <span class="rc-name">${def.name}</span>
                ${done ? '<span class="rc-done-badge">✓</span>' : ''}
            </div>
            <div class="rc-desc">${def.description}</div>
            ${def.requires.length ? `<div class="rc-requires">Requires: ${def.requires.map(r => {
                const rd = RESEARCH.find(x => x.id === r);
                return `<span class="${G.research[r] ? 'req-met' : 'req-unmet'}">${rd?.name || r}</span>`;
            }).join(', ')}</div>` : ''}
            <div class="rc-cost">${done ? 'Researched' : (unlocked ? costString(def.cost, affordable) : `🔒 ${AGES.find(a => a.id === def.unlockedAtAge)?.name}`)}</div>
        `;
        if (available) card.addEventListener('click', () => purchaseResearch(def.id));
        grid.appendChild(card);
    });
}

function renderUpgrades() {
    const list = document.getElementById('upgradesList');
    list.innerHTML = '';

    UPGRADES.forEach(def => {
        const unlocked = isUnlockedByAge(def.unlockedAtAge);
        const done = G.upgrades[def.id];
        const affordable = !done && canAfford(def.cost);

        const card = document.createElement('div');
        card.className = 'upgrade-card' + (done ? ' done' : (!unlocked ? ' locked' : affordable ? ' can-afford' : ''));
        card.innerHTML = `
            <div class="uc-header">
                <span class="uc-emoji">${def.emoji}</span>
                <span class="uc-name">${def.name}</span>
                ${done ? '<span class="uc-done-badge">✓</span>' : ''}
            </div>
            <div class="uc-desc">${def.description}</div>
            <div class="uc-cost">${done ? 'Purchased' : (unlocked ? costString(def.cost, affordable) : `🔒 ${AGES.find(a => a.id === def.unlockedAtAge)?.name}`)}</div>
        `;
        if (unlocked && !done) card.addEventListener('click', () => purchaseUpgrade(def.id));
        list.appendChild(card);
    });
}

function renderMilestones() {
    const list = document.getElementById('milestonesList');
    list.innerHTML = '';
    MILESTONES.forEach(m => {
        const achieved = G.milestones[m.id];
        const card = document.createElement('div');
        card.className = 'milestone-card' + (achieved ? ' achieved' : '');
        card.innerHTML = `
            <span class="mc-emoji">${m.emoji}</span>
            <div class="mc-info">
                <div class="mc-name">${m.name}</div>
                <div class="mc-desc">${m.description}</div>
            </div>
            ${achieved ? '<span class="mc-check">✓</span>' : '<span class="mc-lock">🔒</span>'}
        `;
        list.appendChild(card);
    });
}

function renderStats() {
    const elapsed = Date.now() - G.startTime;
    document.getElementById('statTotalPop').textContent = fmt(G.totalEarned.population || 0);
    document.getElementById('statBuildings').textContent = Object.values(G.buildings).reduce((a, b) => a + b, 0);
    document.getElementById('statResearches').textContent = Object.values(G.research).filter(Boolean).length;
    document.getElementById('statUpgrades').textContent = Object.values(G.upgrades).filter(Boolean).length;
    document.getElementById('statMilestones').textContent = Object.values(G.milestones).filter(Boolean).length;
    document.getElementById('statTime').textContent = fmtTime(elapsed);
    document.getElementById('statPrestige').textContent = G.prestigeCount || 0;
    document.getElementById('statPrestigeBonus').textContent = `×${(G.prestigeMultiplier || 1).toFixed(1)}`;

    // Prestige panel
    const bonus = Math.floor(Math.sqrt((G.totalEarned.population || 0) / 1e6));
    const eligible = G.ageIndex >= 5;
    const prestigeBtn = document.getElementById('prestigeBtn');
    const prestigeDesc = document.getElementById('prestigeDesc');
    if (eligible) {
        prestigeDesc.textContent = `Next prestige: +${bonus * 10}% production (×${(1 + bonus * 0.1).toFixed(1)}). You have earned ${fmt(G.totalEarned.population)} total pop.`;
        prestigeBtn.disabled = false;
        prestigeBtn.classList.remove('disabled');
    } else {
        prestigeDesc.textContent = `Reach the Industrial Age to unlock prestige. Current age: ${AGES[G.ageIndex].name}.`;
        prestigeBtn.disabled = true;
        prestigeBtn.classList.add('disabled');
    }
}

// ---- Toast --------------------------------------------------

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// ---- Tabs ---------------------------------------------------

function switchTab(name) {
    activeTab = name;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === name));
    document.querySelectorAll('.tab-content').forEach(t => t.classList.toggle('active', t.id === name));
    updateUI();
}

// ---- Save/Load/Reset ----------------------------------------

function saveGame() {
    try {
        localStorage.setItem('idleAscent_v2', JSON.stringify(G));
    } catch(e) {}
}

function loadGame() {
    try {
        const raw = localStorage.getItem('idleAscent_v2');
        if (!raw) return;
        const saved = JSON.parse(raw);
        G = Object.assign(defaultState(), saved);

        // Offline progress: up to 8 hours
        const now = Date.now();
        const offlineMs = Math.min(now - (G.lastTick || now), 8 * 3600 * 1000);
        if (offlineMs > 5000) {
            G.lastTick = now;
            const prod = computeProduction();
            const offlineSecs = offlineMs / 1000;
            Object.keys(prod).forEach(res => {
                if (!G.unlockedResources.includes(res)) return;
                const gained = prod[res] * offlineSecs * 0.5; // 50% efficiency offline
                G[res] = (G[res] || 0) + gained;
                G.totalEarned[res] = (G.totalEarned[res] || 0) + gained;
            });
            showToast(`⏰ Welcome back! ${fmtTime(offlineMs)} of offline progress applied.`, 'info');
        }
    } catch(e) {}
}

function exportSave() {
    const data = btoa(JSON.stringify(G));
    const el = document.createElement('textarea');
    el.value = data;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    el.remove();
    showToast('Save copied to clipboard!', 'info');
}

function importSave() {
    const raw = prompt('Paste your save data:');
    if (!raw) return;
    try {
        G = Object.assign(defaultState(), JSON.parse(atob(raw.trim())));
        saveGame();
        applyAgeTheme(AGES[G.ageIndex]);
        showToast('Save loaded!', 'info');
        updateUI();
    } catch(e) {
        showToast('Invalid save data.', 'error');
    }
}

function prestigeGame() {
    if (G.ageIndex < 5) {
        showToast('⚠️ Reach Industrial Age before prestiging!', 'error');
        return;
    }
    const bonus = Math.floor(Math.sqrt(G.totalEarned.population / 1e6));
    if (!confirm(`Prestige? You'll reset everything but gain a permanent +${bonus * 10}% production bonus (×${(1 + bonus * 0.1).toFixed(1)}). Requires Industrial Age or beyond.`)) return;

    const newMultiplier = (G.prestigeMultiplier || 1) + bonus * 0.1;
    const newCount = (G.prestigeCount || 0) + 1;
    const milestones = { ...G.milestones };

    G = defaultState();
    G.prestigeCount = newCount;
    G.prestigeMultiplier = newMultiplier;
    G.milestones = milestones;
    saveGame();
    applyAgeTheme(AGES[0]);
    updateUI();
    showToast(`✨ Prestige #${newCount}! Production ×${newMultiplier.toFixed(1)} permanently!`, 'milestone');
}

function resetGame() {
    if (!confirm('Hard reset? ALL progress including prestige will be lost.')) return;
    localStorage.removeItem('idleAscent_v2');
    G = defaultState();
    applyAgeTheme(AGES[0]);
    updateUI();
    showToast('Game reset.', 'info');
}

// ---- Particle System ----------------------------------------

const particles = [];
let canvas, ctx;

function initParticles() {
    canvas = document.getElementById('particleCanvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(animateParticles);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function burstParticles(color, count = 60) {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 3 + Math.random() * 8;
        particles.push({
            x: cx, y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2,
            life: 1,
            decay: 0.012 + Math.random() * 0.015,
            size: 4 + Math.random() * 6,
            color
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animateParticles);
}

// ---- Civilization News Ticker -------------------------------

const NEWS = {
    stone: [
        'Elders gather around the first campfire.',
        'A child discovers fire can cook meat.',
        'The tribe names their settlement for the first time.',
        'Flint knapping becomes an art form.',
        'The shaman predicts the seasons.'
    ],
    bronze: [
        'Bronze tools double the harvest yield.',
        'A travelling merchant arrives with copper.',
        'The first written records are scratched into clay tablets.',
        'Soldiers march in formation for the first time.',
        'Surplus food allows some to pursue crafts.'
    ],
    iron: [
        'Iron plows turn the hardest soil.',
        'The first city walls are completed.',
        'A philosopher asks: what is the nature of the world?',
        'Roads connect distant settlements.',
        'A general unites three tribes under one banner.'
    ],
    medieval: [
        'A cathedral spire rises above the city skyline.',
        'Knights swear fealty to the new king.',
        'Monks copy ancient texts by candlelight.',
        'The first university opens its doors.',
        'Guild craftsmen perfect the art of stained glass.'
    ],
    renaissance: [
        'An artist completes a masterpiece that will last centuries.',
        'The printing press produces 500 books in a day.',
        'A scientist proposes that the earth circles the sun.',
        'Explorers return with maps of distant lands.',
        'A patron funds a new academy of arts and sciences.'
    ],
    industrial: [
        'The first steam locomotive reaches the capital.',
        'Factory workers demand a 12-hour workday.',
        'Electricity lights the streets of the city.',
        'Population growth accelerates beyond all prediction.',
        'A telegraph message crosses the continent in seconds.'
    ],
    atomic: [
        'The atom is split. The world holds its breath.',
        'Penicillin saves millions of lives.',
        'The first computer fills an entire room.',
        'Satellites orbit the earth, mapping every coastline.',
        'A vaccine eradicates a disease for the first time.'
    ],
    space: [
        'A human sets foot on another world.',
        'The space station becomes a permanent home.',
        'Telescopes peer back to the first moments of creation.',
        'A probe exits the solar system.',
        'Children dream of growing up among the stars.'
    ],
    digital: [
        'The global network connects every human mind.',
        'An AI writes a symphony overnight.',
        'A breakthrough in fusion energy powers the city.',
        'Every language is translated instantly.',
        'The genome of every species is catalogued.'
    ],
    type2: [
        'The Dyson Sphere project begins.',
        'Humanity bends the light of the sun.',
        'A second civilization is detected beyond the stars.',
        'The last resource shortage is solved permanently.',
        'We are no longer alone in the cosmos.'
    ]
};

let lastNewsAge = '';
let newsQueue = [];
let newsInterval = null;

function startNewsTicker() {
    newsInterval = setInterval(() => {
        const age = AGES[G.ageIndex];
        if (age.id !== lastNewsAge) {
            lastNewsAge = age.id;
            newsQueue = [...(NEWS[age.id] || [])].sort(() => Math.random() - 0.5);
        }
        if (newsQueue.length > 0) {
            showToast(`📰 ${newsQueue.shift()}`, 'news');
        }
    }, 18000); // every 18 seconds
}

// ---- Boot ---------------------------------------------------

function init() {
    loadGame();
    applyAgeTheme(AGES[G.ageIndex]);

    // Restore unlocked resource chips
    G.unlockedResources.forEach(res => {
        document.getElementById(`res-${res}`)?.classList.remove('hidden');
    });

    document.getElementById('gatherBtn').addEventListener('click', handleGather);
    document.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
    document.getElementById('exportBtn').addEventListener('click', exportSave);
    document.getElementById('importBtn').addEventListener('click', importSave);
    document.getElementById('resetBtn').addEventListener('click', resetGame);
    document.getElementById('prestigeBtn').addEventListener('click', prestigeGame);

    updateUI();
    startLoop();
    initParticles();
    startNewsTicker();
}

document.addEventListener('DOMContentLoaded', init);
