// ============================================================
// IDLE ASCENT — Keyboard Shortcuts + Touch/Swipe
// ============================================================

const TAB_ORDER = ['buildings', 'research', 'upgrades', 'milestones', 'stats'];

function initInput() {
    document.addEventListener('keydown', handleKey);
    initTouch();
}

function handleKey(e) {
    // Don't steal keys when typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    // Escape closes overlays
    if (e.key === 'Escape') {
        document.getElementById('eventModal')?.classList.add('hidden');
        document.getElementById('keyHelp')?.classList.add('hidden');
        eventActive = false;
        return;
    }

    // ? opens keyboard help
    if (e.key === '?') {
        document.getElementById('keyHelp').classList.toggle('hidden');
        return;
    }

    // Number keys 1–5 switch tabs
    const tabIdx = parseInt(e.key) - 1;
    if (tabIdx >= 0 && tabIdx < TAB_ORDER.length) {
        switchTab(TAB_ORDER[tabIdx]);
        return;
    }

    switch (e.key.toLowerCase()) {
        case ' ':
        case 'enter':
            e.preventDefault();
            if (!eventActive) handleGather();
            break;

        case 'b':
            cycleBuyAmount();
            break;

        case 'l':
            // Toggle list/tree view in research tab
            if (activeTab === 'research') {
                setTreeView(treeViewMode === 'list' ? 'tree' : 'list');
            }
            break;

        case 'p':
            // Prestige shortcut
            if (G.ageIndex >= 5) prestigeGame();
            break;
    }
}

const BUY_CYCLE = [1, 10, 100, 'max'];

function cycleBuyAmount() {
    const current = BUY_CYCLE.indexOf(buyAmount);
    const next = BUY_CYCLE[(current + 1) % BUY_CYCLE.length];
    setBuyAmount(next);
    showToast(`Buy amount: ×${next}`, 'info');
}

// ---- Touch / Swipe -----------------------------------------

let touchStartX = 0;
let touchStartY = 0;

function initTouch() {
    const container = document.getElementById('mainContainer');
    container.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    container.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        // Only register horizontal swipes (dx > dy, threshold 60px)
        if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

        const current = TAB_ORDER.indexOf(activeTab);
        if (dx < 0 && current < TAB_ORDER.length - 1) {
            // Swipe left → next tab
            switchTab(TAB_ORDER[current + 1]);
        } else if (dx > 0 && current > 0) {
            // Swipe right → previous tab
            switchTab(TAB_ORDER[current - 1]);
        }
    }, { passive: true });
}
