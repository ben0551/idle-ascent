// ============================================================
// IDLE ASCENT — Random Events Engine
// ============================================================

let eventTimer = null;
let eventActive = false;

function initEvents() {
    scheduleNextEvent();
}

function scheduleNextEvent() {
    // Fire events every 3-8 minutes (180-480 seconds)
    const delay = (180 + Math.random() * 300) * 1000;
    clearTimeout(eventTimer);
    eventTimer = setTimeout(tryFireEvent, delay);
}

function tryFireEvent() {
    // Don't stack events or fire if disabled
    if (eventActive || !settings.events) { scheduleNextEvent(); return; }

    const ageName = AGES[G.ageIndex].id;
    const pool = RANDOM_EVENTS.filter(e => e.ages.includes(ageName));
    if (pool.length === 0) { scheduleNextEvent(); return; }

    const event = pool[Math.floor(Math.random() * pool.length)];
    showEventModal(event);
}

function showEventModal(event) {
    eventActive = true;
    const modal = document.getElementById('eventModal');
    const banner = document.getElementById('eventBanner');
    const title  = document.getElementById('eventTitle');
    const flavor = document.getElementById('eventFlavor');
    const choices = document.getElementById('eventChoices');
    const age = AGES[G.ageIndex];

    banner.style.background = `linear-gradient(135deg, ${age.color}44, ${age.color}22)`;
    banner.style.borderBottom = `2px solid ${age.color}55`;
    banner.innerHTML = `<span style="font-size:2.2em">${event.emoji}</span>`;

    title.textContent = event.title;
    flavor.textContent = event.flavor;

    choices.innerHTML = '';
    event.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'event-choice-btn';
        btn.innerHTML = `
            <span class="ec-emoji">${choice.emoji}</span>
            <div class="ec-text">
                <div class="ec-label">${choice.label}</div>
                <div class="ec-desc">${choice.desc}</div>
            </div>
        `;
        btn.addEventListener('click', () => resolveEvent(choice.effect));
        choices.appendChild(btn);
    });

    modal.classList.remove('hidden');
    modal.classList.add('show');
}

function resolveEvent(effect) {
    applyEffect(effect);
    closeEventModal();
    scheduleNextEvent();
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('show');
    setTimeout(() => modal.classList.add('hidden'), 350);
    eventActive = false;
}

// ---- Effect Application ------------------------------------

function applyEffect(effect) {
    if (!effect) return;

    switch (effect.type) {
        case 'gain': {
            const amount = scaleEffectAmount(effect.amount);
            G[effect.res] = (G[effect.res] || 0) + amount;
            if (effect.res in G.totalEarned) G.totalEarned[effect.res] += amount;
            showToast(`${effectResIcon(effect.res)} +${fmt(amount)} ${effect.res} from the event!`, 'unlock');
            break;
        }
        case 'lose_pct': {
            const before = G[effect.res] || 0;
            const lost = before * effect.pct;
            G[effect.res] = Math.max(0, before - lost);
            showToast(`📉 Lost ${Math.round(effect.pct * 100)}% ${effect.res}`, 'error');
            break;
        }
        case 'temp_buff': {
            const buff = {
                res: effect.res,
                mult: effect.mult,
                expiresAt: Date.now() + effect.dur * 1000,
                label: `${effect.res === 'all' ? 'All' : effect.res} ×${effect.mult}`
            };
            G.activeBuffs.push(buff);
            const durLabel = effect.dur >= 60 ? `${Math.round(effect.dur / 60)}m` : `${effect.dur}s`;
            showToast(`⚡ ${buff.label} for ${durLabel}!`, 'milestone');
            updateBuffStrip();
            break;
        }
        case 'perm_micro': {
            G.eventBonus = (G.eventBonus || 1) * effect.mult;
            const pct = Math.round((effect.mult - 1) * 100);
            showToast(`✨ Permanent +${pct}% global production!`, 'milestone');
            break;
        }
        case 'gamble': {
            const won = Math.random() < (effect.winChance || 0.5);
            showToast(won ? '🎲 You won the gamble!' : '🎲 You lost the gamble…', 'info');
            applyEffect(won ? effect.win : effect.lose);
            break;
        }
    }
    updateUI();
}

// Scale event gains to current production rate so they feel significant at all stages
function scaleEffectAmount(base) {
    const prod = lastProduction;
    const totalPps = Object.values(prod).reduce((a, b) => a + b, 0) || 1;
    // Worth about 15-30 seconds of total production, but at least the base value
    return Math.max(base, totalPps * (15 + Math.random() * 15));
}

function effectResIcon(res) {
    return { population:'👥', food:'🌾', knowledge:'📖', science:'⚗️', culture:'🎭', energy:'⚡' }[res] || '✨';
}

// ---- Active Buff Strip -------------------------------------

function updateBuffStrip() {
    const strip = document.getElementById('buffStrip');
    const now = Date.now();

    // Clean expired buffs
    G.activeBuffs = G.activeBuffs.filter(b => now < b.expiresAt);

    if (G.activeBuffs.length === 0) {
        strip.classList.add('hidden');
        return;
    }
    strip.classList.remove('hidden');
    strip.innerHTML = G.activeBuffs.map(b => {
        const remaining = Math.ceil((b.expiresAt - now) / 1000);
        const durLabel = remaining >= 60 ? `${Math.floor(remaining / 60)}m${remaining % 60}s` : `${remaining}s`;
        return `<div class="buff-chip">⚡ ${b.res === 'all' ? 'All' : b.res} ×${b.mult} <span class="buff-timer">${durLabel}</span></div>`;
    }).join('');
}

// Called from game tick to expire buffs
function tickBuffs() {
    const now = Date.now();
    const before = G.activeBuffs.length;
    G.activeBuffs = G.activeBuffs.filter(b => now < b.expiresAt);
    if (G.activeBuffs.length !== before) updateBuffStrip();
    else if (G.activeBuffs.length > 0) updateBuffStrip(); // refresh timers
}
