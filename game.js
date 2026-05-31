// Game State
const game = {
    population: 0,
    totalEarned: 0,
    startTime: Date.now(),

    // Resource production
    productionPerSecond: 0,

    // Age System
    currentAgeIndex: 0,
    populationToNextAge: 100,

    // Owned buildings
    buildings: {},

    // Purchased upgrades
    upgrades: {}
};

// Age definitions with descriptions and progression
const ages = [
    { name: 'Stone Age', description: 'Humanity takes its first steps', threshold: 0 },
    { name: 'Bronze Age', description: 'Discovery of metal working', threshold: 100 },
    { name: 'Iron Age', description: 'Superior tools emerge', threshold: 1000 },
    { name: 'Medieval Age', description: 'Rise of kingdoms and culture', threshold: 10000 },
    { name: 'Renaissance', description: 'Rebirth of knowledge and art', threshold: 100000 },
    { name: 'Industrial Age', description: 'Machines transform society', threshold: 1000000 },
    { name: 'Information Age', description: 'Digital revolution', threshold: 10000000 },
    { name: 'Type II Civilization', description: 'Planetary mastery achieved', threshold: 100000000 }
];

// Building definitions
const buildingDefinitions = {
    hunter: {
        name: 'Hunter',
        description: 'Gathers food and resources',
        baseProduction: 1,
        baseCost: 10,
        unlockedAt: 0,
        emoji: '🏹'
    },
    farmer: {
        name: 'Farmer',
        description: 'Cultivates crops',
        baseProduction: 5,
        baseCost: 100,
        unlockedAt: 100,
        emoji: '🌾'
    },
    blacksmith: {
        name: 'Blacksmith',
        description: 'Forges tools and weapons',
        baseProduction: 25,
        baseCost: 500,
        unlockedAt: 1000,
        emoji: '⚒️'
    },
    scholar: {
        name: 'Scholar',
        description: 'Advances knowledge',
        baseProduction: 100,
        baseCost: 5000,
        unlockedAt: 10000,
        emoji: '📚'
    },
    factory: {
        name: 'Factory',
        description: 'Mass produces goods',
        baseProduction: 500,
        baseCost: 100000,
        unlockedAt: 1000000,
        emoji: '🏭'
    },
    datacenter: {
        name: 'Data Center',
        description: 'Processes information',
        baseProduction: 2500,
        baseCost: 10000000,
        unlockedAt: 10000000,
        emoji: '🖥️'
    }
};

// Upgrade definitions
const upgradeDefinitions = [
    {
        id: 'fire',
        name: 'Discover Fire',
        description: 'Hunters are 50% more efficient',
        cost: 50,
        unlockedAt: 0,
        effect: { building: 'hunter', multiplier: 1.5 }
    },
    {
        id: 'tools',
        name: 'Craft Tools',
        description: 'All workers are 25% more efficient',
        cost: 200,
        unlockedAt: 100,
        effect: { global: true, multiplier: 1.25 }
    },
    {
        id: 'agriculture',
        name: 'Agriculture Revolution',
        description: 'Farmers are 100% more efficient',
        cost: 500,
        unlockedAt: 100,
        effect: { building: 'farmer', multiplier: 2.0 }
    },
    {
        id: 'metalworking',
        name: 'Metal Working',
        description: 'Blacksmiths are 100% more efficient',
        cost: 5000,
        unlockedAt: 1000,
        effect: { building: 'blacksmith', multiplier: 2.0 }
    },
    {
        id: 'literacy',
        name: 'Written Language',
        description: 'Scholars are 100% more efficient',
        cost: 50000,
        unlockedAt: 10000,
        effect: { building: 'scholar', multiplier: 2.0 }
    },
    {
        id: 'industrialization',
        name: 'Mechanization',
        description: 'Factories are 100% more efficient',
        cost: 1000000,
        unlockedAt: 1000000,
        effect: { building: 'factory', multiplier: 2.0 }
    }
];

// Initialize game
function initGame() {
    // Initialize buildings
    Object.keys(buildingDefinitions).forEach(key => {
        game.buildings[key] = 0;
    });

    // Initialize upgrades
    upgradeDefinitions.forEach(upgrade => {
        game.upgrades[upgrade.id] = false;
    });

    loadGame();
    updateUI();
    setupEventListeners();
    startGameLoop();
}

// Event listeners
function setupEventListeners() {
    document.getElementById('clickButton').addEventListener('click', handleClick);

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    document.getElementById('resetButton').addEventListener('click', handleReset);
}

function handleClick() {
    game.population += 1;
    game.totalEarned += 1;
    updateUI();
}

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

function handleReset() {
    if (confirm('Reset your progress? You will keep some bonus multipliers based on total population earned.')) {
        // TODO: Implement prestige system
        game.population = 0;
        game.buildings = {};
        Object.keys(buildingDefinitions).forEach(key => {
            game.buildings[key] = 0;
        });
        game.currentAgeIndex = 0;
        saveGame();
        updateUI();
    }
}

// Game Loop
function startGameLoop() {
    setInterval(() => {
        // Calculate production
        let production = 0;
        let multiplier = 1;

        // Apply global upgrades
        if (game.upgrades['tools']) multiplier *= 1.25;

        // Calculate production from buildings
        Object.keys(game.buildings).forEach(buildingKey => {
            const count = game.buildings[buildingKey];
            const def = buildingDefinitions[buildingKey];
            let buildingProduction = def.baseProduction * count * multiplier;

            // Apply building-specific upgrades
            Object.values(game.upgrades).forEach((_, upgradeKey) => {
                const upgrade = upgradeDefinitions.find(u => u.id === upgradeKey);
                if (upgrade && game.upgrades[upgrade.id] && upgrade.effect.building === buildingKey) {
                    buildingProduction *= upgrade.effect.multiplier;
                }
            });

            production += buildingProduction;
        });

        game.productionPerSecond = production;
        game.population += production / 10; // 10 updates per second
        game.totalEarned += production / 10;

        updateUI();
    }, 100);

    // Update time played
    setInterval(() => {
        updateUI();
    }, 1000);
}

// Building Purchase
function purchaseBuilding(buildingKey) {
    const def = buildingDefinitions[buildingKey];
    const cost = calculateBuildingCost(buildingKey);

    if (game.population >= cost) {
        game.population -= cost;
        game.buildings[buildingKey]++;
        saveGame();
        updateUI();
    }
}

function calculateBuildingCost(buildingKey) {
    const def = buildingDefinitions[buildingKey];
    const owned = game.buildings[buildingKey] || 0;
    return Math.ceil(def.baseCost * Math.pow(1.15, owned));
}

// Upgrade Purchase
function purchaseUpgrade(upgradeId) {
    const upgrade = upgradeDefinitions.find(u => u.id === upgradeId);

    if (!upgrade || game.upgrades[upgradeId]) return;
    if (game.population < upgrade.cost) return;

    game.population -= upgrade.cost;
    game.upgrades[upgradeId] = true;
    saveGame();
    updateUI();
}

// Age System
function updateAge() {
    const newAgeIndex = ages.findIndex(age => game.population >= age.threshold);
    if (newAgeIndex > game.currentAgeIndex && newAgeIndex !== -1) {
        game.currentAgeIndex = newAgeIndex;
        saveGame();
    }
}

// UI Updates
function updateUI() {
    // Update population display
    document.getElementById('populationDisplay').textContent = Math.floor(game.population).toLocaleString();
    document.getElementById('populationRate').textContent = `+${game.productionPerSecond.toFixed(1)}/s`;
    document.getElementById('totalEarned').textContent = Math.floor(game.totalEarned).toLocaleString();

    // Update age
    updateAge();
    const currentAge = ages[game.currentAgeIndex];
    document.getElementById('currentAge').textContent = currentAge.name;
    document.getElementById('ageDescription').textContent = currentAge.description;
    document.getElementById('statAge').textContent = currentAge.name;

    // Update progress bar
    const nextAge = ages[Math.min(game.currentAgeIndex + 1, ages.length - 1)];
    const prevAge = ages[game.currentAgeIndex];
    const progress = Math.min((game.population - prevAge.threshold) / (nextAge.threshold - prevAge.threshold), 1) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent =
        `${Math.floor(game.population).toLocaleString()} / ${nextAge.threshold.toLocaleString()} to ${nextAge.name}`;

    // Update time played
    const timeSeconds = Math.floor((Date.now() - game.startTime) / 1000);
    document.getElementById('timePlayed').textContent = formatTime(timeSeconds);

    // Update buildings
    updateBuildingsUI();

    // Update upgrades
    updateUpgradesUI();

    // Update stats
    document.getElementById('buildingsOwned').textContent =
        Object.values(game.buildings).reduce((a, b) => a + b, 0);
}

function updateBuildingsUI() {
    const grid = document.getElementById('buildingsGrid');
    grid.innerHTML = '';

    Object.entries(buildingDefinitions).forEach(([key, def]) => {
        const unlocked = game.population >= def.unlockedAt;
        const cost = calculateBuildingCost(key);
        const owned = game.buildings[key] || 0;
        const canAfford = game.population >= cost;

        const card = document.createElement('div');
        card.className = `building-card ${!unlocked ? 'locked' : canAfford ? 'available' : ''}`;
        card.innerHTML = `
            <div class="building-name">${def.emoji} ${def.name}</div>
            <div class="building-cost">Cost: ${cost.toLocaleString()}</div>
            <div class="building-income">+${def.baseProduction}/s per unit</div>
            <div class="building-owned">Owned: ${owned}</div>
            ${!unlocked ? `<div class="building-lock-reason">Unlock at ${def.unlockedAt.toLocaleString()} population</div>` : ''}
        `;

        if (unlocked) {
            card.addEventListener('click', () => purchaseBuilding(key));
        }

        grid.appendChild(card);
    });
}

function updateUpgradesUI() {
    const list = document.getElementById('upgradesList');
    list.innerHTML = '';

    upgradeDefinitions.forEach(upgrade => {
        const unlocked = game.population >= upgrade.unlockedAt;
        const purchased = game.upgrades[upgrade.id];
        const canAfford = game.population >= upgrade.cost && !purchased;

        const card = document.createElement('div');
        card.className = `upgrade-card ${!unlocked ? 'locked' : purchased ? 'purchased' : canAfford ? 'available' : ''}`;
        card.innerHTML = `
            <div class="upgrade-header">
                <span class="upgrade-name">${upgrade.name}</span>
                <span class="upgrade-cost">${upgrade.cost.toLocaleString()}</span>
            </div>
            <div class="upgrade-description">${upgrade.description}</div>
            ${purchased ? `<div class="upgrade-status">✓ Purchased</div>` : ''}
            ${!unlocked ? `<div class="upgrade-status">Unlock at ${upgrade.unlockedAt.toLocaleString()}</div>` : ''}
        `;

        if (unlocked && !purchased) {
            card.addEventListener('click', () => purchaseUpgrade(upgrade.id));
        }

        list.appendChild(card);
    });
}

function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
}

// Save/Load
function saveGame() {
    localStorage.setItem('idleAscent', JSON.stringify(game));
}

function loadGame() {
    const saved = localStorage.getItem('idleAscent');
    if (saved) {
        const data = JSON.parse(saved);
        Object.assign(game, data);
    }
}

// Start the game
initGame();
