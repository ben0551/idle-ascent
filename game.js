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
    discoveries: {},      // id -> bool
    prestigeShop: {},     // id -> level

    ageIndex: 0,
    clickPower: 1,
    startTime: Date.now(),
    lastTick: Date.now(),

    // Prestige
    prestigeCount: 0,
    prestigeMultiplier: 1,

    // Events
    activeBuffs: [],     // [{ res, mult, expiresAt, label }]
    eventBonus: 1,       // accumulated permanent micro-bonuses from events

    // Unlocked resources
    unlockedResources: ['population']
});

let G = defaultState();

// ---- Computed multipliers -----------------------------------

function computeMultipliers() {
    // Returns { global, click, buildings:{}, resources:{} }
    const now = Date.now();
    const m = {
        global: (G.prestigeMultiplier || 1) * (G.eventBonus || 1),
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

    // Apply prestige shop bonuses
    const pShop = G.prestigeShop || {};
    PRESTIGE_SHOP.forEach(item => {
        const level = pShop[item.id] || 0;
        if (level === 0) return;
        const e = item.effect;
        if (e.type === 'global') m.global *= (1 + e.perLevel * level);
        if (e.type === 'resource') m.resources[e.res] = (m.resources[e.res] || 1) * (1 + e.perLevel * level);
        if (e.type === 'click') m.click *= (1 + e.perLevel * level);
    });

    // Apply discoveries
    DISCOVERIES.forEach(d => {
        if (!G.discoveries[d.id]) return;
        const e = d.effect;
        if (e.type === 'global') m.global *= e.multiplier;
        if (e.type === 'resource') m.resources[e.resource] = (m.resources[e.resource] || 1) * e.multiplier;
        if (e.type === 'multi-resource') e.resources.forEach(r => { m.resources[r] = (m.resources[r] || 1) * e.multiplier; });
        if (e.type === 'click') m.click *= e.multiplier;
        if (e.type === 'building') m.buildings[e.building] = (m.buildings[e.building] || 1) * e.multiplier;
    });

    // Apply active timed buffs
    (G.activeBuffs || []).forEach(buff => {
        if (now >= buff.expiresAt) return;
        if (buff.res === 'all') m.global *= buff.mult;
        else m.resources[buff.res] = (m.resources[buff.res] || 1) * buff.mult;
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
    tickBuffs();
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
        age.resources.forEach(res => unlockResource(res));
        applyAgeTheme(age);
        showAgeOverlay(age);
        burstParticles(age.color, 80);
        setTimeout(() => burstParticles(age.color, 60), 400);
        treeDirty = true;
        saveHallRecord();
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
    DISCOVERIES.forEach(d => {
        if (!G.discoveries[d.id] && d.condition(G)) {
            G.discoveries[d.id] = true;
            showToast(`💡 Discovery: ${d.name} — ${d.description}`, 'unlock');
            burstParticles(AGES[G.ageIndex].color, 30);
        }
    });
}

// ---- Click Handler + Combo Streak --------------------------

let clickStreak = 0;
let streakTimer = null;
const STREAK_WINDOW = 1200; // ms between clicks to maintain streak

function handleGather() {
    // Combo streak
    clickStreak++;
    clearTimeout(streakTimer);
    streakTimer = setTimeout(() => { clickStreak = 0; updateStreakDisplay(); }, STREAK_WINDOW);
    updateStreakDisplay();

    const mults = computeMultipliers();
    const streakBonus = 1 + Math.min(clickStreak * 0.02, 1.0); // up to +100% at 50 combo
    const amount = mults.click * streakBonus;

    G.population += amount;
    G.totalEarned.population += amount;
    showClickPop(amount, clickStreak);
    updateUI();
}

function updateStreakDisplay() {
    const label = document.getElementById('gatherBonus');
    const mults = computeMultipliers();
    if (clickStreak > 2) {
        const bonus = Math.min(clickStreak * 2, 100);
        label.innerHTML = `+${fmt(mults.click)} × <span style="color:#ffd700">🔥 ${clickStreak}x combo (+${bonus}%)</span>`;
    } else {
        label.textContent = `+${fmt(mults.click)} per click`;
    }
}

function showClickPop(amount, streak) {
    const btn = document.getElementById('gatherBtn');
    const pop = document.createElement('div');
    pop.className = 'click-pop';
    const scale = streak > 10 ? 1.4 : streak > 5 ? 1.2 : 1;
    pop.style.fontSize = `${scale}em`;
    pop.style.color = streak > 20 ? '#ffd700' : streak > 10 ? '#f97316' : 'var(--age-color)';
    pop.textContent = `+${fmt(amount)}`;
    // Random horizontal spread
    pop.style.left = `${35 + Math.random() * 30}%`;
    btn.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
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
    treeDirty = true;
    researchBuilt = false; // rebuild list so completed item moves to bottom
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

// ---- Hall of Ages ------------------------------------------

function saveHallRecord() {
    try {
        const records = JSON.parse(localStorage.getItem('idleAscent_hall') || '[]');
        records.unshift({
            date: Date.now(),
            ageIndex: G.ageIndex,
            ageName: AGES[G.ageIndex].name,
            ageEmoji: AGES[G.ageIndex].gatherIcon,
            ageColor: AGES[G.ageIndex].color,
            totalPop: G.totalEarned.population || 0,
            playtime: Date.now() - G.startTime,
            prestigeCount: G.prestigeCount || 0
        });
        // Keep last 20
        localStorage.setItem('idleAscent_hall', JSON.stringify(records.slice(0, 20)));
    } catch(e) {}
}

function renderHallOfAges() {
    const list = document.getElementById('hallList');
    if (!list) return;
    try {
        const records = JSON.parse(localStorage.getItem('idleAscent_hall') || '[]');
        if (records.length === 0) {
            list.innerHTML = '<div class="hall-empty">No records yet — advance your civilization!</div>';
            return;
        }
        list.innerHTML = records.map((r, i) => `
            <div class="hall-row">
                <span class="hall-rank">#${i + 1}</span>
                <span class="hall-age" style="color:${r.ageColor}">${r.ageEmoji} ${r.ageName}</span>
                <span class="hall-pop">👥 ${fmt(r.totalPop)}</span>
                <span class="hall-time">⏱ ${fmtTime(r.playtime)}</span>
                ${r.prestigeCount > 0 ? `<span class="hall-prestige">✨×${r.prestigeCount}</span>` : ''}
                <span class="hall-date">${new Date(r.date).toLocaleDateString()}</span>
            </div>
        `).join('');
    } catch(e) {
        list.innerHTML = '<div class="hall-empty">No records yet.</div>';
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
    if (activeTab === 'buildings') tickBuildings();
    if (activeTab === 'research') tickResearch();
    if (activeTab === 'upgrades') tickUpgrades();
    if (activeTab === 'milestones') tickMilestones();
    if (activeTab === 'stats') renderStats();
    if (activeTab === 'prestige-shop') renderPrestigeShop();

    // Show prestige shop tab after first prestige
    const pTab = document.getElementById('prestigeShopTab');
    if (pTab) pTab.classList.toggle('hidden', (G.prestigeCount || 0) < 1);
}

function isUnlockedByAge(ageId) {
    const targetIdx = AGES.findIndex(a => a.id === ageId);
    return G.ageIndex >= targetIdx;
}

let selectedBuilding = null;
let buildingsBuilt = false;

function renderBuildings() {
    const grid = document.getElementById('buildingsGrid');
    grid.innerHTML = '';
    buildingsBuilt = false;

    BUILDINGS.forEach(bDef => {
        const card = document.createElement('div');
        card.className = 'building-card';
        card.dataset.id = bDef.id;
        card.innerHTML = `
            <div class="bc-header">
                <span class="bc-emoji">${bDef.emoji}</span>
                <span class="bc-name">${bDef.name}</span>
                <span class="bc-owned"></span>
            </div>
            <div class="bc-desc">${bDef.description}</div>
            <div class="bc-prod"></div>
            <div class="bc-total-prod" style="display:none"></div>
            <div class="bc-cost"></div>
        `;
        card.addEventListener('click', () => purchaseBuilding(bDef.id));
        grid.appendChild(card);
    });

    buildingsBuilt = true;
    tickBuildings();
}

function tickBuildings() {
    if (!buildingsBuilt) { renderBuildings(); return; }
    const grid = document.getElementById('buildingsGrid');
    if (!grid) return;

    BUILDINGS.forEach(bDef => {
        const card = grid.querySelector(`[data-id="${bDef.id}"]`);
        if (!card) return;

        const unlocked = isUnlockedByAge(bDef.unlockedAtAge);
        const owned = G.buildings[bDef.id] || 0;
        const n = buyAmount === 'max' ? Math.max(1, calcMaxBuy(bDef)) : buyAmount;
        const actualN = buyAmount === 'max' ? calcMaxBuy(bDef) : n;
        const cost = bulkBuildingCost(bDef, Math.max(1, actualN));
        const affordable = unlocked && actualN > 0 && canAfford(cost);

        card.className = 'building-card' +
            (unlocked ? (affordable ? ' can-afford' : '') : ' locked') +
            (selectedBuilding === bDef.id ? ' selected' : '');

        const ownedEl = card.querySelector('.bc-owned');
        if (ownedEl) {
            ownedEl.textContent = owned;
            ownedEl.className = 'bc-owned' + (owned > 0 ? ' has-owned' : '');
        }

        const prodEl = card.querySelector('.bc-prod');
        if (prodEl) {
            const prod = computeBuildingProduction(bDef);
            prodEl.innerHTML = prodString(prod) + '<span class="bc-per"> each</span>';
        }

        const totalEl = card.querySelector('.bc-total-prod');
        if (totalEl) {
            if (owned > 0) {
                const totalProd = computeBuildingProductionTotal(bDef);
                totalEl.innerHTML = 'Total: ' + prodString(totalProd);
                totalEl.style.display = '';
            } else {
                totalEl.style.display = 'none';
            }
        }

        const costEl = card.querySelector('.bc-cost');
        if (costEl) {
            if (!unlocked) costEl.textContent = `🔒 ${AGES.find(a => a.id === bDef.unlockedAtAge)?.name}`;
            else costEl.innerHTML = costString(cost, affordable);
        }
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

function computeBuildingProductionTotal(bDef) {
    const per = computeBuildingProduction(bDef);
    const owned = G.buildings[bDef.id] || 0;
    const result = {};
    Object.entries(per).forEach(([res, val]) => { result[res] = val * owned; });
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

let researchBuilt = false;

function renderResearch() {
    const grid = document.getElementById('researchGrid');
    grid.innerHTML = '';
    researchBuilt = false;

    const sorted = [...RESEARCH].sort((a, b) => {
        const aDone = G.research[a.id] ? 1 : 0;
        const bDone = G.research[b.id] ? 1 : 0;
        return aDone - bDone;
    });

    sorted.forEach(def => {
        const card = document.createElement('div');
        card.className = 'research-card';
        card.dataset.id = def.id;
        card.innerHTML = `
            <div class="rc-header">
                <span class="rc-emoji">${def.emoji}</span>
                <span class="rc-name">${def.name}</span>
                <span class="rc-done-badge" style="display:none">✓</span>
            </div>
            <div class="rc-desc">${def.description}</div>
            ${def.requires.length ? `<div class="rc-requires">Requires: ${def.requires.map(r => {
                const rd = RESEARCH.find(x => x.id === r);
                return `<span class="rc-req" data-req="${r}">${rd?.name || r}</span>`;
            }).join(', ')}</div>` : ''}
            <div class="rc-cost"></div>
        `;
        card.addEventListener('click', () => {
            const d = G.research[def.id];
            const prereqsMet = def.requires.every(req => G.research[req]);
            const unlocked = isUnlockedByAge(def.unlockedAtAge);
            if (!d && unlocked && prereqsMet) purchaseResearch(def.id);
        });
        grid.appendChild(card);
    });

    researchBuilt = true;
    tickResearch();
}

function tickResearch() {
    if (!researchBuilt) { renderResearch(); return; }
    const grid = document.getElementById('researchGrid');
    if (!grid) return;

    RESEARCH.forEach(def => {
        const card = grid.querySelector(`[data-id="${def.id}"]`);
        if (!card) return;

        const unlocked = isUnlockedByAge(def.unlockedAtAge);
        const done = !!G.research[def.id];
        const prereqsMet = def.requires.every(req => G.research[req]);
        const available = unlocked && prereqsMet && !done;
        const affordable = available && canAfford(def.cost);

        card.className = 'research-card' +
            (done ? ' done' : available ? (affordable ? ' can-afford' : '') : ' locked');

        const badge = card.querySelector('.rc-done-badge');
        if (badge) badge.style.display = done ? '' : 'none';

        // Update prereq span colours
        card.querySelectorAll('.rc-req').forEach(span => {
            const met = !!G.research[span.dataset.req];
            span.className = met ? 'req-met' : 'req-unmet';
        });

        const costEl = card.querySelector('.rc-cost');
        if (costEl) {
            if (done) costEl.textContent = 'Researched';
            else if (!unlocked) costEl.textContent = `🔒 ${AGES.find(a => a.id === def.unlockedAtAge)?.name}`;
            else costEl.innerHTML = costString(def.cost, affordable);
        }
    });
}

let upgradesBuilt = false;

function renderUpgrades() {
    const list = document.getElementById('upgradesList');
    list.innerHTML = '';
    upgradesBuilt = false;

    UPGRADES.forEach(def => {
        const card = document.createElement('div');
        card.className = 'upgrade-card';
        card.dataset.id = def.id;
        card.innerHTML = `
            <div class="uc-header">
                <span class="uc-emoji">${def.emoji}</span>
                <span class="uc-name">${def.name}</span>
                <span class="uc-done-badge" style="display:none">✓</span>
            </div>
            <div class="uc-desc">${def.description}</div>
            <div class="uc-cost"></div>
        `;
        card.addEventListener('click', () => {
            if (!G.upgrades[def.id] && isUnlockedByAge(def.unlockedAtAge)) {
                purchaseUpgrade(def.id);
            }
        });
        list.appendChild(card);
    });

    upgradesBuilt = true;
    tickUpgrades();
}

function tickUpgrades() {
    if (!upgradesBuilt) { renderUpgrades(); return; }
    const list = document.getElementById('upgradesList');
    if (!list) return;

    UPGRADES.forEach(def => {
        const card = list.querySelector(`[data-id="${def.id}"]`);
        if (!card) return;

        const unlocked = isUnlockedByAge(def.unlockedAtAge);
        const done = G.upgrades[def.id];
        const affordable = !done && unlocked && canAfford(def.cost);

        card.className = 'upgrade-card' +
            (done ? ' done' : !unlocked ? ' locked' : affordable ? ' can-afford' : '');

        const badge = card.querySelector('.uc-done-badge');
        if (badge) badge.style.display = done ? '' : 'none';

        const costEl = card.querySelector('.uc-cost');
        if (costEl) {
            if (done) costEl.textContent = 'Purchased';
            else if (!unlocked) costEl.textContent = `🔒 ${AGES.find(a => a.id === def.unlockedAtAge)?.name}`;
            else costEl.innerHTML = costString(def.cost, affordable);
        }
    });
}

let milestonesBuilt = false;

function renderMilestones() {
    const list = document.getElementById('milestonesList');
    list.innerHTML = '';
    milestonesBuilt = false;

    MILESTONES.forEach(m => {
        const card = document.createElement('div');
        card.className = 'milestone-card';
        card.dataset.id = m.id;
        card.innerHTML = `
            <span class="mc-emoji">${m.emoji}</span>
            <div class="mc-info">
                <div class="mc-name">${m.name}</div>
                <div class="mc-desc">${m.description}</div>
            </div>
            <span class="mc-status">🔒</span>
        `;
        list.appendChild(card);
    });

    milestonesBuilt = true;
    tickMilestones();
}

function tickMilestones() {
    if (!milestonesBuilt) { renderMilestones(); return; }
    const list = document.getElementById('milestonesList');
    if (!list) return;

    MILESTONES.forEach(m => {
        const card = list.querySelector(`[data-id="${m.id}"]`);
        if (!card) return;
        const achieved = !!G.milestones[m.id];
        card.classList.toggle('achieved', achieved);
        const status = card.querySelector('.mc-status');
        if (status) status.textContent = achieved ? '✓' : '🔒';
        if (status) status.className = achieved ? 'mc-check' : 'mc-lock';
    });

    // Discoveries use same pattern
    renderDiscoveries();
}

function renderDiscoveries() {
    const list = document.getElementById('discoveriesList');
    if (!list) return;
    list.innerHTML = '';
    DISCOVERIES.forEach(d => {
        const unlocked = G.discoveries[d.id];
        const card = document.createElement('div');
        card.className = 'discovery-card' + (unlocked ? ' unlocked' : '');
        card.innerHTML = `
            <span class="dc-emoji">${unlocked ? d.emoji : '❓'}</span>
            <div class="dc-info">
                <div class="dc-name">${unlocked ? d.name : '???'}</div>
                <div class="dc-desc">${unlocked ? d.description : 'Meet a hidden condition to reveal this discovery.'}</div>
            </div>
            ${unlocked ? '<span class="dc-check">💡</span>' : ''}
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

    renderHallOfAges();
    renderMultBreakdown();
}

function renderMultBreakdown() {
    const panel = document.getElementById('multBreakdown');
    if (!panel) return;

    const rows = [];

    // Prestige
    if ((G.prestigeMultiplier || 1) > 1) rows.push({ label: `✨ Prestige ×${G.prestigeCount}`, value: `×${(G.prestigeMultiplier).toFixed(2)}`, color: '#a78bfa' });

    // Event bonus
    if ((G.eventBonus || 1) > 1) rows.push({ label: '🎲 Event Bonuses', value: `×${(G.eventBonus).toFixed(2)}`, color: '#fbbf24' });

    // Upgrades
    UPGRADES.filter(u => G.upgrades[u.id] && u.effect?.type === 'global').forEach(u => {
        rows.push({ label: `⬆️ ${u.name}`, value: `×${u.effect.multiplier}`, color: '#f59e0b' });
    });

    // Research
    RESEARCH.filter(r => G.research[r.id] && r.effect?.type === 'global').forEach(r => {
        rows.push({ label: `🔬 ${r.name}`, value: `×${r.effect.multiplier}`, color: '#a78bfa' });
    });

    // Discoveries
    DISCOVERIES.filter(d => G.discoveries[d.id] && d.effect?.type === 'global').forEach(d => {
        rows.push({ label: `💡 ${d.name}`, value: `×${d.effect.multiplier}`, color: '#facc15' });
    });

    // Active buffs
    (G.activeBuffs || []).filter(b => b.res === 'all' && Date.now() < b.expiresAt).forEach(b => {
        const rem = Math.ceil((b.expiresAt - Date.now()) / 1000);
        rows.push({ label: `⚡ Active Buff (${rem}s)`, value: `×${b.mult}`, color: '#4ade80' });
    });

    // Compute total
    const mults = computeMultipliers();
    rows.push({ label: '🌍 Combined Global', value: `×${mults.global.toFixed(2)}`, color: 'var(--age-color)', bold: true });

    panel.innerHTML = `
        <div class="mult-title">📈 Active Multipliers</div>
        <div class="mult-rows">
            ${rows.map(r => `
                <div class="mult-row">
                    <span class="mult-label">${r.label}</span>
                    <span class="mult-val" style="color:${r.color};${r.bold ? 'font-weight:800;font-size:1.05em' : ''}">${r.value}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ---- Toast --------------------------------------------------

function showToast(message, type = 'info') {
    if (!settings.notifs && type !== 'error') return;
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

    // Force full rebuild when switching to these tabs
    if (name === 'buildings') buildingsBuilt = false;
    if (name === 'research') researchBuilt = false;
    if (name === 'upgrades') upgradesBuilt = false;
    if (name === 'milestones') milestonesBuilt = false;
    if (name === 'research' && treeViewMode === 'tree') {
        treeDirty = true;
        renderTechTree();
    }
    updateUI();
}

// ---- Save/Load/Reset ----------------------------------------

function saveGame() {
    try {
        localStorage.setItem('idleAscent_v2', JSON.stringify(G));
        flashSaveIndicator();
    } catch(e) {}
}

let _saveFlashTimer = null;
function flashSaveIndicator() {
    const badge = document.getElementById('ageBadge');
    if (!badge) return;
    badge.setAttribute('data-saved', '1');
    clearTimeout(_saveFlashTimer);
    _saveFlashTimer = setTimeout(() => badge.removeAttribute('data-saved'), 1200);
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

    const prestigeShop = { ...(G.prestigeShop || {}) };
    const eventBonus = G.eventBonus || 1;

    G = defaultState();
    G.prestigeCount = newCount;
    G.prestigeMultiplier = newMultiplier;
    G.milestones = milestones;
    G.prestigeShop = prestigeShop;
    G.eventBonus = eventBonus;

    // Apply start bonus from prestige shop
    const startLevel = (prestigeShop['ps_start_pop'] || 0);
    if (startLevel > 0) {
        G.population = startLevel * 100;
        G.totalEarned.population = startLevel * 100;
    }

    saveHallRecord();
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
    if (!settings.particles) return;
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
        'The shaman predicts the seasons.',
        'A grandmother teaches her grandchildren to weave.',
        'Two tribes meet at the river — neither attacks.',
        'The first burial ritual is performed with flowers.',
        'Cave walls are painted with animals of breathtaking detail.',
        'A hunter returns with more than the tribe can eat.'
    ],
    bronze: [
        'Bronze tools double the harvest yield.',
        'A travelling merchant arrives with copper.',
        'The first written records are scratched into clay tablets.',
        'Soldiers march in formation for the first time.',
        'Surplus food allows some to pursue crafts.',
        'A city of ten thousand is considered enormous.',
        'The first palace is built for the chieftain.',
        'Trade routes stretch two hundred miles.',
        'A craftsman forges the first decorated bronze mirror.',
        'The river floods — but the farmers planned for it.'
    ],
    iron: [
        'Iron plows turn the hardest soil.',
        'The first city walls are completed.',
        'A philosopher asks: what is the nature of the world?',
        'Roads connect distant settlements.',
        'A general unites three tribes under one banner.',
        'The first census is taken — the king wants to know his people.',
        'A playwright stages the first theatrical performance.',
        'Coinage simplifies trade across the empire.',
        'A surgeon successfully removes an arrowhead.',
        'The aqueduct carries clean water to fifty thousand people.'
    ],
    medieval: [
        'A cathedral spire rises above the city skyline.',
        'Knights swear fealty to the new king.',
        'Monks copy ancient texts by candlelight.',
        'The first university opens its doors.',
        'Guild craftsmen perfect the art of stained glass.',
        'A merchant from the east brings spices never tasted before.',
        'The Magna Carta is signed under duress and celebrated by all.',
        'A windmill appears on every hill in the province.',
        'The Black Death passes — and the survivors rebuild.',
        'A young cartographer maps the known world in exquisite detail.'
    ],
    renaissance: [
        'An artist completes a masterpiece that will last centuries.',
        'The printing press produces 500 books in a day.',
        'A scientist proposes that the earth circles the sun.',
        'Explorers return with maps of distant lands.',
        'A patron funds a new academy of arts and sciences.',
        'The first public library opens — and is immediately full.',
        'A surgeon dissects a human body and fills twelve notebooks.',
        'A composer writes a symphony that makes the king weep.',
        'A mathematican solves a problem unsolved for five hundred years.',
        'Ships circumnavigate the globe for the first time.'
    ],
    industrial: [
        'The first steam locomotive reaches the capital.',
        'Factory workers demand a 12-hour workday.',
        'Electricity lights the streets of the city.',
        'Population growth accelerates beyond all prediction.',
        'A telegraph message crosses the continent in seconds.',
        'The first photograph is taken. Everyone gathers to see it.',
        'A bridge spans the widest river ever crossed.',
        'A doctor washes his hands before surgery. Results improve dramatically.',
        'The first department store opens. The crowds are immense.',
        'A newspaper sells one million copies in a single day.'
    ],
    atomic: [
        'The atom is split. The world holds its breath.',
        'Penicillin saves millions of lives.',
        'The first computer fills an entire room.',
        'Satellites orbit the earth, mapping every coastline.',
        'A vaccine eradicates a disease for the first time.',
        'The first television broadcast reaches one billion viewers.',
        'A polio vaccine is given to every child in the nation.',
        'The structure of DNA is discovered. Everything changes.',
        'A nuclear submarine circumnavigates the globe underwater.',
        'A spy satellite photographs an army from space.'
    ],
    space: [
        'A human sets foot on another world.',
        'The space station becomes a permanent home.',
        'Telescopes peer back to the first moments of creation.',
        'A probe exits the solar system.',
        'Children dream of growing up among the stars.',
        'The first Mars colony broadcasts a message back to Earth.',
        'A telescope discovers a planet with liquid water.',
        'Space tourism becomes available to civilians.',
        'An asteroid is mined for rare minerals.',
        'The first baby is born in orbit.'
    ],
    digital: [
        'The global network connects every human mind.',
        'An AI writes a symphony overnight.',
        'A breakthrough in fusion energy powers the city.',
        'Every language is translated instantly.',
        'The genome of every species is catalogued.',
        'An AI diagnoses cancer with higher accuracy than any doctor.',
        'Climate change is reversed within a generation.',
        'The first self-replicating nanobots are tested.',
        'A quantum computer solves a problem in seconds that would take a billion years.',
        'Every human now carries the sum of human knowledge in their pocket.'
    ],
    type2: [
        'The Dyson Sphere project begins.',
        'Humanity bends the light of the sun.',
        'A second civilization is detected beyond the stars.',
        'The last resource shortage is solved permanently.',
        'We are no longer alone in the cosmos.',
        'A generation ship is launched towards Alpha Centauri.',
        'The solar system is mapped in perfect detail.',
        'Post-scarcity economics replaces all former models.',
        'Humans live without disease, aging gracefully across centuries.',
        'The signal from the stars is finally understood. It is a greeting.'
    ]
};

let lastNewsAge = '';
let newsQueue = [];
let newsInterval = null;

function startNewsTicker() {
    newsInterval = setInterval(() => {
        if (!settings.news) return;
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

// ---- Prestige Shop ------------------------------------------

const PRESTIGE_SHOP = [
    { id: 'ps_pop', name: 'Population Surge', emoji: '👥', desc: '+50% population production permanently.', cost: 1, maxLevel: 5, effect: { type: 'resource', res: 'population', perLevel: 0.5 } },
    { id: 'ps_food', name: 'Fertile Lands', emoji: '🌾', desc: '+50% food production permanently.', cost: 1, maxLevel: 5, effect: { type: 'resource', res: 'food', perLevel: 0.5 } },
    { id: 'ps_know', name: 'Ancient Wisdom', emoji: '📖', desc: '+50% knowledge production permanently.', cost: 1, maxLevel: 5, effect: { type: 'resource', res: 'knowledge', perLevel: 0.5 } },
    { id: 'ps_sci', name: 'Scientific Heritage', emoji: '⚗️', desc: '+50% science production permanently.', cost: 1, maxLevel: 5, effect: { type: 'resource', res: 'science', perLevel: 0.5 } },
    { id: 'ps_click', name: 'Ancestral Strength', emoji: '👊', desc: '+100% click power permanently.', cost: 1, maxLevel: 10, effect: { type: 'click', perLevel: 1.0 } },
    { id: 'ps_global', name: 'Legacy of Ages', emoji: '🌍', desc: '+25% all production permanently.', cost: 2, maxLevel: 5, effect: { type: 'global', perLevel: 0.25 } },
    { id: 'ps_offline', name: 'Eternal Memory', emoji: '⏰', desc: 'Offline efficiency +10% (up to 90%).', cost: 2, maxLevel: 4, effect: { type: 'offline', perLevel: 0.1 } },
    { id: 'ps_event', name: 'Fate\'s Favor', emoji: '🎲', desc: '+15% event buff duration permanently.', cost: 2, maxLevel: 4, effect: { type: 'event_dur', perLevel: 0.15 } },
    { id: 'ps_culture', name: 'Cultural Memory', emoji: '🎭', desc: '+75% culture production permanently.', cost: 2, maxLevel: 3, effect: { type: 'resource', res: 'culture', perLevel: 0.75 } },
    { id: 'ps_energy', name: 'Energy Legacy', emoji: '⚡', desc: '+75% energy production permanently.', cost: 2, maxLevel: 3, effect: { type: 'resource', res: 'energy', perLevel: 0.75 } },
    { id: 'ps_double', name: 'Civilization\'s Echo', emoji: '✨', desc: '×2 all production. The ultimate ascendancy.', cost: 5, maxLevel: 3, effect: { type: 'global', perLevel: 1.0 } },
    { id: 'ps_start_pop', name: 'Head Start', emoji: '🚀', desc: 'Start with 100 population after prestige.', cost: 1, maxLevel: 5, effect: { type: 'start_bonus', perLevel: 100 } },
];

function getPrestigePoints() {
    return Math.max(0, (G.prestigeCount || 0) - getTotalPrestigeSpent());
}

function getTotalPrestigeSpent() {
    return PRESTIGE_SHOP.reduce((total, item) => {
        const level = (G.prestigeShop || {})[item.id] || 0;
        return total + level * item.cost;
    }, 0);
}

function buyPrestigeUpgrade(id) {
    const item = PRESTIGE_SHOP.find(p => p.id === id);
    if (!item) return;
    const level = (G.prestigeShop || {})[item.id] || 0;
    if (level >= item.maxLevel) return;
    if (getPrestigePoints() < item.cost) return;
    if (!G.prestigeShop) G.prestigeShop = {};
    G.prestigeShop[id] = level + 1;
    showToast(`✨ ${item.name} upgraded to level ${level + 1}!`, 'milestone');
    saveGame();
    updateUI();
}

function applyPrestigeShopBonuses() {
    // Called from computeMultipliers - returns additional multiplier data
    // Actually we apply them directly in computeMultipliers
}

function renderPrestigeShop() {
    const grid = document.getElementById('pshGrid');
    if (!grid) return;
    const points = getPrestigePoints();
    document.getElementById('pshPoints').textContent = points;

    grid.innerHTML = '';
    PRESTIGE_SHOP.forEach(item => {
        const level = (G.prestigeShop || {})[item.id] || 0;
        const maxed = level >= item.maxLevel;
        const canAfford = points >= item.cost && !maxed;

        const card = document.createElement('div');
        card.className = 'psh-card' + (maxed ? ' maxed' : canAfford ? ' can-afford' : '');
        card.innerHTML = `
            <div class="psh-header">
                <span class="psh-emoji">${item.emoji}</span>
                <span class="psh-name">${item.name}</span>
                <span class="psh-level ${maxed ? 'max' : ''}">${level}/${item.maxLevel}</span>
            </div>
            <div class="psh-desc">${item.desc}</div>
            <div class="psh-cost">${maxed ? '✓ Maxed' : `Cost: ${item.cost} AP`}</div>
        `;
        if (canAfford) card.addEventListener('click', () => buyPrestigeUpgrade(item.id));
        grid.appendChild(card);
    });
}

// ---- Settings -----------------------------------------------

const DEFAULT_SETTINGS = { notifs: true, news: true, particles: true, events: true, numfmt: 'short' };
let settings = { ...DEFAULT_SETTINGS };

function loadSettings() {
    try {
        const s = JSON.parse(localStorage.getItem('idleAscent_settings') || '{}');
        settings = { ...DEFAULT_SETTINGS, ...s };
    } catch(e) {}
    applySettings();
}

function saveSettings() {
    localStorage.setItem('idleAscent_settings', JSON.stringify(settings));
}

function applySettings() {
    const boolKeys = ['notifs', 'news', 'particles', 'events'];
    boolKeys.forEach(k => {
        const btn = document.getElementById(`toggle-${k}`);
        if (btn) btn.textContent = settings[k] ? 'ON' : 'OFF';
        if (btn) btn.classList.toggle('toggle-off', !settings[k]);
    });
    const numBtn = document.getElementById('toggle-numfmt');
    if (numBtn) numBtn.textContent = settings.numfmt === 'short' ? 'Short' : 'Full';
}

function toggleSetting(key) {
    if (key === 'numfmt') {
        settings.numfmt = settings.numfmt === 'short' ? 'full' : 'short';
    } else {
        settings[key] = !settings[key];
    }
    saveSettings();
    applySettings();
}

function toggleSettings() {
    document.getElementById('settingsPanel').classList.toggle('hidden');
}

// Override fmt to support full number format
const _fmtOrig = window._fmtOrig || null;
function fmtFull(n) {
    if (n === undefined || n === null) return '0';
    n = Math.floor(n);
    return n.toLocaleString();
}

// ---- Boot ---------------------------------------------------

function init() {
    loadSettings();
    loadGame();
    applyAgeTheme(AGES[G.ageIndex]);

    // Ensure all resources for the current age (and below) are unlocked,
    // silently fixing any saves that had missing unlocks.
    for (let i = 0; i <= G.ageIndex; i++) {
        (AGES[i].resources || []).forEach(res => {
            if (!G.unlockedResources.includes(res)) G.unlockedResources.push(res);
        });
    }
    // Also apply any unlock_resource effects from purchased research/upgrades
    [...RESEARCH, ...UPGRADES].forEach(def => {
        if ((G.research[def.id] || G.upgrades[def.id]) && def.effect?.type === 'unlock_resource') {
            const res = def.effect.resource;
            if (!G.unlockedResources.includes(res)) G.unlockedResources.push(res);
        }
    });

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
    initEvents();
    initInput();
}

document.addEventListener('DOMContentLoaded', init);
