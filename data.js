// All game data definitions — v3 (Big Bang Arc)

const AGES = [
    // ---- Cosmic Era -------------------------------------------------
    {
        id: 'bigbang',
        name: 'The Big Bang',
        description: 'Everything erupts from a single infinite point',
        threshold: 0,
        hue: 300,
        color: '#e879f9',
        bg: 'linear-gradient(135deg, #0e0014 0%, #1a0028 100%)',
        gatherIcon: '💥',
        gatherLabel: 'Fluctuate',
        resources: ['population']
    },
    {
        id: 'quarks',
        name: 'Quark Epoch',
        description: 'Fundamental particles coalesce from raw energy',
        threshold: 30,
        hue: 270,
        color: '#a855f7',
        bg: 'linear-gradient(135deg, #0a0018 0%, #160030 100%)',
        gatherIcon: '⚛️',
        gatherLabel: 'Collide',
        resources: ['population']
    },
    {
        id: 'stars',
        name: 'Age of Stars',
        description: 'Hydrogen ignites and the void fills with light',
        threshold: 100,
        hue: 40,
        color: '#fb923c',
        bg: 'linear-gradient(135deg, #180800 0%, #2c1200 100%)',
        gatherIcon: '⭐',
        gatherLabel: 'Ignite',
        resources: ['population']
    },
    {
        id: 'earthform',
        name: 'Primordial Earth',
        description: 'A rocky world cools — oceans form, continents shift',
        threshold: 500,
        hue: 200,
        color: '#38bdf8',
        bg: 'linear-gradient(135deg, #001520 0%, #002030 100%)',
        gatherIcon: '🌍',
        gatherLabel: 'Cool',
        resources: ['population']
    },
    {
        id: 'firstlife',
        name: 'First Life',
        description: 'Chemistry becomes biology in the primordial sea',
        threshold: 2000,
        hue: 140,
        color: '#4ade80',
        bg: 'linear-gradient(135deg, #001208 0%, #002018 100%)',
        gatherIcon: '🦠',
        gatherLabel: 'Evolve',
        resources: ['population']
    },
    // ---- Human Era --------------------------------------------------
    {
        id: 'stone',
        name: 'Stone Age',
        description: 'Humanity takes its first steps',
        threshold: 10000,
        hue: 30,
        color: '#c8a96e',
        bg: 'linear-gradient(135deg, #1a1510 0%, #2a2018 100%)',
        gatherIcon: '🌿',
        gatherLabel: 'Forage',
        resources: ['population']
    },
    {
        id: 'bronze',
        name: 'Bronze Age',
        description: 'Fire and metal reshape society',
        threshold: 100000,
        hue: 35,
        color: '#cd7f32',
        bg: 'linear-gradient(135deg, #1a1205 0%, #2a1e08 100%)',
        gatherIcon: '🔥',
        gatherLabel: 'Smelt',
        resources: ['population', 'food']
    },
    {
        id: 'iron',
        name: 'Iron Age',
        description: 'Superior tools dominate the land',
        threshold: 1000000,
        hue: 200,
        color: '#708090',
        bg: 'linear-gradient(135deg, #0a1520 0%, #101e2a 100%)',
        gatherIcon: '⚒️',
        gatherLabel: 'Forge',
        resources: ['population', 'food', 'knowledge']
    },
    {
        id: 'medieval',
        name: 'Medieval Age',
        description: 'Kingdoms rise and culture blooms',
        threshold: 10000000,
        hue: 280,
        color: '#9b59b6',
        bg: 'linear-gradient(135deg, #100a1a, #180f24)',
        gatherIcon: '🏰',
        gatherLabel: 'Rule',
        resources: ['population', 'food', 'knowledge', 'culture']
    },
    {
        id: 'renaissance',
        name: 'Renaissance',
        description: 'Art, science, and philosophy converge',
        threshold: 100000000,
        hue: 50,
        color: '#f1c40f',
        bg: 'linear-gradient(135deg, #1a1800, #262400)',
        gatherIcon: '🎨',
        gatherLabel: 'Create',
        resources: ['population', 'food', 'knowledge', 'culture']
    },
    {
        id: 'industrial',
        name: 'Industrial Age',
        description: 'Machines amplify human will',
        threshold: 1000000000,
        hue: 15,
        color: '#e67e22',
        bg: 'linear-gradient(135deg, #1a0a00, #260f00)',
        gatherIcon: '⚙️',
        gatherLabel: 'Produce',
        resources: ['population', 'food', 'knowledge', 'science', 'culture']
    },
    {
        id: 'atomic',
        name: 'Atomic Age',
        description: 'The atom unlocks boundless power',
        threshold: 10000000000,
        hue: 160,
        color: '#1abc9c',
        bg: 'linear-gradient(135deg, #001a12, #002618)',
        gatherIcon: '☢️',
        gatherLabel: 'Fission',
        resources: ['population', 'food', 'knowledge', 'science', 'culture', 'energy']
    },
    {
        id: 'space',
        name: 'Space Age',
        description: 'Reaching beyond the cradle of life',
        threshold: 100000000000,
        hue: 220,
        color: '#3498db',
        bg: 'linear-gradient(135deg, #00081a, #000d26)',
        gatherIcon: '🚀',
        gatherLabel: 'Launch',
        resources: ['population', 'food', 'knowledge', 'science', 'culture', 'energy']
    },
    {
        id: 'digital',
        name: 'Information Age',
        description: 'Knowledge becomes exponential',
        threshold: 1000000000000,
        hue: 190,
        color: '#00bcd4',
        bg: 'linear-gradient(135deg, #00101a, #001826)',
        gatherIcon: '💻',
        gatherLabel: 'Compute',
        resources: ['population', 'food', 'knowledge', 'science', 'culture', 'energy']
    },
    {
        id: 'type2',
        name: 'Type II Civilization',
        description: 'Masters of a star system',
        threshold: 10000000000000,
        hue: 55,
        color: '#ffd700',
        bg: 'linear-gradient(135deg, #0a0800, #141000)',
        gatherIcon: '⭐',
        gatherLabel: 'Harness',
        resources: ['population', 'food', 'knowledge', 'science', 'culture', 'energy']
    },
    {
        id: 'type3',
        name: 'Type III Civilization',
        description: 'A galaxy bends to your will',
        threshold: 100000000000000,
        hue: 290,
        color: '#c084fc',
        bg: 'linear-gradient(135deg, #0e0020, #180038)',
        gatherIcon: '🌌',
        gatherLabel: 'Transcend',
        resources: ['population', 'food', 'knowledge', 'science', 'culture', 'energy']
    }
];

const BUILDINGS = [
    // ---- Cosmic Era Buildings -----------------------------------
    {
        id: 'quantum_foam',
        name: 'Quantum Foam',
        emoji: '💫',
        description: 'Spacetime itself fluctuates into being.',
        produces: { population: 0.5 },
        baseCost: { population: 15 },
        unlockedAtAge: 'bigbang'
    },
    {
        id: 'particle_pair',
        name: 'Particle Pair',
        emoji: '⚡',
        description: 'Matter and antimatter spring into existence.',
        produces: { population: 2 },
        baseCost: { population: 80 },
        unlockedAtAge: 'bigbang'
    },
    {
        id: 'quark_cluster',
        name: 'Quark Cluster',
        emoji: '🔮',
        description: 'Three quarks bind into the first protons.',
        produces: { population: 8 },
        baseCost: { population: 300 },
        unlockedAtAge: 'quarks'
    },
    {
        id: 'atomic_nucleus',
        name: 'Atomic Nucleus',
        emoji: '⚛️',
        description: 'Protons and neutrons fuse under immense heat.',
        produces: { population: 25 },
        baseCost: { population: 1200 },
        unlockedAtAge: 'quarks'
    },
    {
        id: 'stellar_nursery',
        name: 'Stellar Nursery',
        emoji: '🌟',
        description: 'Dense clouds of gas collapse into stars.',
        produces: { population: 80 },
        baseCost: { population: 5000 },
        unlockedAtAge: 'stars'
    },
    {
        id: 'supernova',
        name: 'Supernova',
        emoji: '💥',
        description: 'A dying star forges heavy elements and scatters them.',
        produces: { population: 250 },
        baseCost: { population: 20000 },
        unlockedAtAge: 'stars'
    },
    {
        id: 'tectonic_plate',
        name: 'Tectonic Plate',
        emoji: '🌋',
        description: 'Grinding continents release minerals and heat.',
        produces: { population: 800 },
        baseCost: { population: 80000 },
        unlockedAtAge: 'earthform'
    },
    {
        id: 'primordial_ocean',
        name: 'Primordial Ocean',
        emoji: '🌊',
        description: 'Deep water shelters early chemistry.',
        produces: { population: 2500 },
        baseCost: { population: 300000 },
        unlockedAtAge: 'earthform'
    },
    {
        id: 'microbe_colony',
        name: 'Microbe Colony',
        emoji: '🦠',
        description: 'Single-celled life multiplies in the warm shallows.',
        produces: { population: 8000, food: 100 },
        baseCost: { population: 1500000 },
        unlockedAtAge: 'firstlife'
    },
    {
        id: 'rna_world',
        name: 'RNA World',
        emoji: '🧬',
        description: 'Self-replicating molecules carry the first genetic code.',
        produces: { population: 25000, food: 400 },
        baseCost: { population: 6000000 },
        unlockedAtAge: 'firstlife'
    },
    // ---- Stone Age -----------------------------------------------
    {
        id: 'campfire',
        name: 'Campfire',
        emoji: '🔥',
        description: 'Warmth and safety. People gather here.',
        produces: { population: 100 },
        baseCost: { population: 10000 },
        unlockedAtAge: 'stone'
    },
    {
        id: 'cave',
        name: 'Cave Dwelling',
        emoji: '🪨',
        description: 'Shelter from the elements.',
        produces: { population: 500 },
        baseCost: { population: 80000 },
        unlockedAtAge: 'stone'
    },
    // ---- Bronze Age ----------------------------------------------
    {
        id: 'fishing',
        name: 'Fishing Village',
        emoji: '🎣',
        description: 'Coastal settlements harvest the sea.',
        produces: { food: 2500, population: 800 },
        baseCost: { population: 600000 },
        unlockedAtAge: 'bronze'
    },
    {
        id: 'farm',
        name: 'Farm',
        emoji: '🌾',
        description: 'Sustains more people than hunting alone.',
        produces: { population: 1000, food: 500 },
        baseCost: { population: 200000 },
        unlockedAtAge: 'bronze'
    },
    {
        id: 'granary',
        name: 'Granary',
        emoji: '🏚️',
        description: 'Stores food for lean seasons.',
        produces: { food: 1500, population: 500 },
        baseCost: { population: 400000 },
        unlockedAtAge: 'bronze'
    },
    {
        id: 'forge',
        name: 'Bronze Forge',
        emoji: '⚒️',
        description: 'Crafts tools and weapons from bronze.',
        produces: { population: 2500 },
        baseCost: { population: 800000, food: 50000 },
        unlockedAtAge: 'bronze'
    },
    // ---- Iron Age -----------------------------------------------
    {
        id: 'tavern',
        name: 'Tavern & Inn',
        emoji: '🍺',
        description: 'A hub of culture and storytelling.',
        produces: { culture: 1500, population: 6000, food: 2000 },
        baseCost: { population: 8000000 },
        unlockedAtAge: 'iron'
    },
    {
        id: 'ironworks',
        name: 'Iron Works',
        emoji: '🏭',
        description: 'Superior metalworking drives progress.',
        produces: { population: 6000, knowledge: 200 },
        baseCost: { population: 2000000 },
        unlockedAtAge: 'iron'
    },
    {
        id: 'mill',
        name: 'Water Mill',
        emoji: '💧',
        description: 'Harnessing natural energy for work.',
        produces: { food: 4000, population: 2000 },
        baseCost: { population: 3500000 },
        unlockedAtAge: 'iron'
    },
    {
        id: 'barracks',
        name: 'Barracks',
        emoji: '🛡️',
        description: 'Trains soldiers who protect the settlement.',
        produces: { population: 8000 },
        baseCost: { population: 5000000 },
        unlockedAtAge: 'iron'
    },
    // ---- Medieval -----------------------------------------------
    {
        id: 'monastery',
        name: 'Monastery',
        emoji: '⛪',
        description: 'Monks preserve and copy knowledge.',
        produces: { knowledge: 2000, culture: 500 },
        baseCost: { population: 12000000 },
        unlockedAtAge: 'medieval'
    },
    {
        id: 'castle',
        name: 'Castle',
        emoji: '🏰',
        description: 'A center of political power.',
        produces: { population: 15000, culture: 1000 },
        baseCost: { population: 20000000 },
        unlockedAtAge: 'medieval'
    },
    {
        id: 'market',
        name: 'Market',
        emoji: '🏪',
        description: 'Trade routes boost all resources.',
        produces: { population: 10000, food: 5000, knowledge: 1000 },
        baseCost: { population: 30000000 },
        unlockedAtAge: 'medieval'
    },
    {
        id: 'cathedral',
        name: 'Cathedral',
        emoji: '⛩️',
        description: 'A monument to culture and faith.',
        produces: { culture: 4000, population: 8000 },
        baseCost: { population: 50000000 },
        unlockedAtAge: 'medieval'
    },
    // ---- Renaissance --------------------------------------------
    {
        id: 'hospital',
        name: 'Hospital',
        emoji: '🏥',
        description: 'Keeps the workforce healthy and growing.',
        produces: { population: 30000, science: 2000 },
        baseCost: { population: 400000000 },
        unlockedAtAge: 'renaissance'
    },
    {
        id: 'library',
        name: 'Grand Library',
        emoji: '📚',
        description: 'Repository of all human knowledge.',
        produces: { knowledge: 8000, culture: 2000 },
        baseCost: { population: 80000000 },
        unlockedAtAge: 'renaissance'
    },
    {
        id: 'university',
        name: 'University',
        emoji: '🎓',
        description: 'Systematic pursuit of knowledge.',
        produces: { knowledge: 15000, science: 500, population: 10000 },
        baseCost: { population: 150000000 },
        unlockedAtAge: 'renaissance'
    },
    {
        id: 'printingpress',
        name: 'Printing Press',
        emoji: '🖨️',
        description: 'Ideas spread like wildfire.',
        produces: { knowledge: 20000, culture: 5000 },
        baseCost: { population: 200000000 },
        unlockedAtAge: 'renaissance'
    },
    // ---- Industrial ---------------------------------------------
    {
        id: 'factory',
        name: 'Factory',
        emoji: '⚙️',
        description: 'Mass production transforms society.',
        produces: { population: 50000, food: 10000 },
        baseCost: { population: 1500000000 },
        unlockedAtAge: 'industrial'
    },
    {
        id: 'railroad',
        name: 'Railroad',
        emoji: '🚂',
        description: 'Connects cities; accelerates everything.',
        produces: { population: 80000, food: 20000, knowledge: 10000 },
        baseCost: { population: 3000000000 },
        unlockedAtAge: 'industrial'
    },
    {
        id: 'powerplant',
        name: 'Coal Power Plant',
        emoji: '🏭',
        description: 'Electricity empowers the industrial world.',
        produces: { population: 120000, science: 5000 },
        baseCost: { population: 5000000000 },
        unlockedAtAge: 'industrial'
    },
    // ---- Atomic Age ---------------------------------------------
    {
        id: 'reactor',
        name: 'Nuclear Reactor',
        emoji: '☢️',
        description: 'Atomic energy powers civilization.',
        produces: { energy: 50000, population: 200000, science: 20000 },
        baseCost: { population: 15000000000 },
        unlockedAtAge: 'atomic'
    },
    {
        id: 'researchlab',
        name: 'Research Lab',
        emoji: '🔬',
        description: 'Cutting-edge scientific inquiry.',
        produces: { science: 50000, knowledge: 30000 },
        baseCost: { population: 25000000000 },
        unlockedAtAge: 'atomic'
    },
    // ---- Space Age ----------------------------------------------
    {
        id: 'launchpad',
        name: 'Launch Pad',
        emoji: '🚀',
        description: 'Gateway to the stars.',
        produces: { science: 200000, energy: 100000, population: 500000 },
        baseCost: { population: 150000000000 },
        unlockedAtAge: 'space'
    },
    {
        id: 'satellite',
        name: 'Satellite Network',
        emoji: '🛰️',
        description: 'Global communications infrastructure.',
        produces: { knowledge: 200000, culture: 50000, science: 100000 },
        baseCost: { population: 300000000000 },
        unlockedAtAge: 'space'
    },
    // ---- Information Age ----------------------------------------
    {
        id: 'datacenter',
        name: 'Data Center',
        emoji: '💾',
        description: 'Petabytes of civilization\'s knowledge.',
        produces: { knowledge: 500000, science: 300000, energy: 200000 },
        baseCost: { population: 2000000000000 },
        unlockedAtAge: 'digital'
    },
    {
        id: 'ai',
        name: 'AI Nexus',
        emoji: '🤖',
        description: 'Artificial minds accelerate all progress.',
        produces: { science: 1000000, knowledge: 800000, population: 2000000 },
        baseCost: { population: 5000000000000 },
        unlockedAtAge: 'digital'
    },
    // ---- Type II ------------------------------------------------
    {
        id: 'dyson',
        name: 'Dyson Sphere (Partial)',
        emoji: '⭐',
        description: 'Harvesting stellar energy at scale.',
        produces: { energy: 5000000, science: 2000000, population: 5000000 },
        baseCost: { population: 15000000000000 },
        unlockedAtAge: 'type2'
    },
    // ---- Type III -----------------------------------------------
    {
        id: 'galaxy_core',
        name: 'Galactic Core Tap',
        emoji: '🌌',
        description: 'Tap the black hole at the heart of the galaxy.',
        produces: { energy: 50000000, science: 20000000, population: 20000000 },
        baseCost: { population: 200000000000000 },
        unlockedAtAge: 'type3'
    },
    {
        id: 'star_factory',
        name: 'Star Factory',
        emoji: '✨',
        description: 'Engineer new stars on demand.',
        produces: { energy: 200000000, science: 50000000, population: 80000000 },
        baseCost: { population: 800000000000000 },
        unlockedAtAge: 'type3'
    }
];

const UPGRADES = [
    // Stone Age
    {
        id: 'fire_mastery',
        name: 'Fire Mastery',
        emoji: '🔥',
        description: 'Campfires produce 2x more population.',
        cost: { population: 50000 },
        unlockedAtAge: 'stone',
        effect: { type: 'building', building: 'campfire', multiplier: 2 }
    },
    {
        id: 'flint_tools',
        name: 'Flint Tools',
        emoji: '🪨',
        description: 'Click power doubled.',
        cost: { population: 75000 },
        unlockedAtAge: 'stone',
        effect: { type: 'click', multiplier: 2 }
    },
    {
        id: 'animal_taming',
        name: 'Animal Taming',
        emoji: '🐄',
        description: 'Cave Dwellings produce 2x more population.',
        cost: { population: 400000 },
        unlockedAtAge: 'stone',
        effect: { type: 'building', building: 'cave', multiplier: 2 }
    },
    {
        id: 'oral_tradition',
        name: 'Oral Tradition',
        emoji: '👄',
        description: 'All production +25%.',
        cost: { population: 600000 },
        unlockedAtAge: 'stone',
        effect: { type: 'global', multiplier: 1.25 }
    },
    // Bronze Age
    {
        id: 'irrigation',
        name: 'Irrigation',
        emoji: '💧',
        description: 'Farms produce 3x more food and pop.',
        cost: { population: 500000, food: 20000 },
        unlockedAtAge: 'bronze',
        effect: { type: 'building', building: 'farm', multiplier: 3 }
    },
    {
        id: 'pottery',
        name: 'Pottery',
        emoji: '🏺',
        description: 'Granaries produce 3x more food.',
        cost: { population: 800000, food: 40000 },
        unlockedAtAge: 'bronze',
        effect: { type: 'building', building: 'granary', multiplier: 3 }
    },
    {
        id: 'bronze_alloy',
        name: 'Bronze Alloy',
        emoji: '🔩',
        description: 'Bronze Forges produce 3x more.',
        cost: { population: 2000000 },
        unlockedAtAge: 'bronze',
        effect: { type: 'building', building: 'forge', multiplier: 3 }
    },
    {
        id: 'domestication',
        name: 'Domestication',
        emoji: '🐎',
        description: 'Food production globally +50%.',
        cost: { population: 1500000, food: 100000 },
        unlockedAtAge: 'bronze',
        effect: { type: 'resource', resource: 'food', multiplier: 1.5 }
    },
    {
        id: 'writing',
        name: 'Writing',
        emoji: '📜',
        description: 'The written word spreads ideas. Click power +50%.',
        cost: { population: 3000000 },
        unlockedAtAge: 'bronze',
        effect: { type: 'click', multiplier: 1.5 }
    },
    // Iron Age
    {
        id: 'steel_tools',
        name: 'Steel Tools',
        emoji: '🗡️',
        description: 'Iron Works produce 3x more.',
        cost: { population: 4000000 },
        unlockedAtAge: 'iron',
        effect: { type: 'building', building: 'ironworks', multiplier: 3 }
    },
    {
        id: 'crop_rotation',
        name: 'Crop Rotation',
        emoji: '🌻',
        description: 'All food production +100%.',
        cost: { population: 6000000, knowledge: 20000 },
        unlockedAtAge: 'iron',
        effect: { type: 'resource', resource: 'food', multiplier: 2 }
    },
    {
        id: 'military_tactics',
        name: 'Military Tactics',
        emoji: '⚔️',
        description: 'Barracks produce 3x more pop.',
        cost: { population: 8000000 },
        unlockedAtAge: 'iron',
        effect: { type: 'building', building: 'barracks', multiplier: 3 }
    },
    {
        id: 'philosophy',
        name: 'Philosophy',
        emoji: '🧠',
        description: 'Knowledge production globally +100%.',
        cost: { population: 10000000, knowledge: 50000 },
        unlockedAtAge: 'iron',
        effect: { type: 'resource', resource: 'knowledge', multiplier: 2 }
    },
    // Medieval
    {
        id: 'feudalism',
        name: 'Feudalism',
        emoji: '👑',
        description: 'Castles produce 3x more.',
        cost: { population: 25000000 },
        unlockedAtAge: 'medieval',
        effect: { type: 'building', building: 'castle', multiplier: 3 }
    },
    {
        id: 'scholasticism',
        name: 'Scholasticism',
        emoji: '📖',
        description: 'Monasteries produce 3x more.',
        cost: { population: 30000000, knowledge: 200000 },
        unlockedAtAge: 'medieval',
        effect: { type: 'building', building: 'monastery', multiplier: 3 }
    },
    {
        id: 'guilds',
        name: 'Merchant Guilds',
        emoji: '💰',
        description: 'Markets produce 3x more.',
        cost: { population: 40000000 },
        unlockedAtAge: 'medieval',
        effect: { type: 'building', building: 'market', multiplier: 3 }
    },
    {
        id: 'divine_mandate',
        name: 'Divine Mandate',
        emoji: '✝️',
        description: 'Culture production globally +100%.',
        cost: { population: 60000000, culture: 100000 },
        unlockedAtAge: 'medieval',
        effect: { type: 'resource', resource: 'culture', multiplier: 2 }
    },
    {
        id: 'mapmaking',
        name: 'Cartography',
        emoji: '🗺️',
        description: 'All production globally +30%.',
        cost: { population: 80000000, knowledge: 500000 },
        unlockedAtAge: 'medieval',
        effect: { type: 'global', multiplier: 1.3 }
    },
    // Renaissance
    {
        id: 'printing',
        name: 'Printing Revolution',
        emoji: '🖨️',
        description: 'Libraries and Printing Press produce 5x more.',
        cost: { population: 150000000, knowledge: 2000000 },
        unlockedAtAge: 'renaissance',
        effect: { type: 'multi-building', buildings: ['library', 'printingpress'], multiplier: 5 }
    },
    {
        id: 'scientific_method',
        name: 'Scientific Method',
        emoji: '🔬',
        description: 'Universities produce 4x more.',
        cost: { population: 200000000, knowledge: 3000000 },
        unlockedAtAge: 'renaissance',
        effect: { type: 'building', building: 'university', multiplier: 4 }
    },
    {
        id: 'classical_arts',
        name: 'Classical Arts',
        emoji: '🎭',
        description: 'Culture production +150%.',
        cost: { population: 250000000, culture: 500000 },
        unlockedAtAge: 'renaissance',
        effect: { type: 'resource', resource: 'culture', multiplier: 2.5 }
    },
    {
        id: 'humanism',
        name: 'Humanism',
        emoji: '🤝',
        description: 'Click power x5.',
        cost: { population: 300000000, knowledge: 4000000 },
        unlockedAtAge: 'renaissance',
        effect: { type: 'click', multiplier: 5 }
    },
    // Industrial
    {
        id: 'steam_engine',
        name: 'Steam Engine',
        emoji: '🚂',
        description: 'Factories and Railroads produce 4x more.',
        cost: { population: 2000000000 },
        unlockedAtAge: 'industrial',
        effect: { type: 'multi-building', buildings: ['factory', 'railroad'], multiplier: 4 }
    },
    {
        id: 'electrification',
        name: 'Electrification',
        emoji: '💡',
        description: 'Power Plants produce 5x more.',
        cost: { population: 5000000000 },
        unlockedAtAge: 'industrial',
        effect: { type: 'building', building: 'powerplant', multiplier: 5 }
    },
    {
        id: 'mass_production',
        name: 'Mass Production',
        emoji: '🏭',
        description: 'All production +50%.',
        cost: { population: 7000000000 },
        unlockedAtAge: 'industrial',
        effect: { type: 'global', multiplier: 1.5 }
    },
    // Atomic
    {
        id: 'nuclear_power',
        name: 'Nuclear Power Grid',
        emoji: '☢️',
        description: 'Reactors produce 5x more.',
        cost: { population: 20000000000, energy: 1000000 },
        unlockedAtAge: 'atomic',
        effect: { type: 'building', building: 'reactor', multiplier: 5 }
    },
    {
        id: 'computers',
        name: 'Early Computers',
        emoji: '🖥️',
        description: 'Research Labs produce 5x more.',
        cost: { population: 40000000000, science: 2000000 },
        unlockedAtAge: 'atomic',
        effect: { type: 'building', building: 'researchlab', multiplier: 5 }
    },
    {
        id: 'globalization',
        name: 'Globalization',
        emoji: '🌍',
        description: 'All production +100%.',
        cost: { population: 60000000000, knowledge: 50000000 },
        unlockedAtAge: 'atomic',
        effect: { type: 'global', multiplier: 2 }
    },
    // Space
    {
        id: 'rocketry',
        name: 'Advanced Rocketry',
        emoji: '🚀',
        description: 'Launch Pads produce 5x more.',
        cost: { population: 200000000000, science: 20000000 },
        unlockedAtAge: 'space',
        effect: { type: 'building', building: 'launchpad', multiplier: 5 }
    },
    {
        id: 'internet',
        name: 'The Internet',
        emoji: '🌐',
        description: 'Knowledge production +300%.',
        cost: { population: 400000000000, knowledge: 200000000 },
        unlockedAtAge: 'space',
        effect: { type: 'resource', resource: 'knowledge', multiplier: 4 }
    },
    // Info Age
    {
        id: 'neural_networks',
        name: 'Neural Networks',
        emoji: '🧠',
        description: 'AI Nexus and Data Centers produce 5x more.',
        cost: { population: 3000000000000, science: 500000000 },
        unlockedAtAge: 'digital',
        effect: { type: 'multi-building', buildings: ['ai', 'datacenter'], multiplier: 5 }
    },
    {
        id: 'quantum_computing',
        name: 'Quantum Computing',
        emoji: '⚛️',
        description: 'Science production +500%.',
        cost: { population: 5000000000000, science: 1000000000 },
        unlockedAtAge: 'digital',
        effect: { type: 'resource', resource: 'science', multiplier: 6 }
    },
    {
        id: 'singularity',
        name: 'Technological Singularity',
        emoji: '♾️',
        description: 'All production tripled.',
        cost: { population: 8000000000000, science: 2000000000 },
        unlockedAtAge: 'digital',
        effect: { type: 'global', multiplier: 3 }
    }
];

const RESEARCH = [
    {
        id: 'cultivation',
        name: 'Cultivation',
        emoji: '🌱',
        description: 'Unlock Farming techniques. Enables food resource.',
        cost: { population: 80000 },
        unlockedAtAge: 'stone',
        requires: [],
        effect: { type: 'unlock_resource', resource: 'food' }
    },
    {
        id: 'medicine',
        name: 'Herbal Medicine',
        emoji: '🌿',
        description: 'Population cap raised, +10% global production.',
        cost: { population: 150000 },
        unlockedAtAge: 'bronze',
        requires: ['cultivation'],
        effect: { type: 'global', multiplier: 1.1 }
    },
    {
        id: 'astronomy',
        name: 'Astronomy',
        emoji: '🌟',
        description: 'Better navigation and planning. +20% knowledge production.',
        cost: { population: 800000, knowledge: 30000 },
        unlockedAtAge: 'iron',
        requires: [],
        effect: { type: 'resource', resource: 'knowledge', multiplier: 1.2 }
    },
    {
        id: 'mathematics',
        name: 'Mathematics',
        emoji: '📐',
        description: 'Numbers unlock architecture. +25% all production.',
        cost: { population: 2000000, knowledge: 100000 },
        unlockedAtAge: 'iron',
        requires: ['astronomy'],
        effect: { type: 'global', multiplier: 1.25 }
    },
    {
        id: 'navigation',
        name: 'Navigation',
        emoji: '🧭',
        description: 'Sea routes boost trade. +30% food production.',
        cost: { population: 5000000, knowledge: 200000 },
        unlockedAtAge: 'medieval',
        requires: ['astronomy'],
        effect: { type: 'resource', resource: 'food', multiplier: 1.3 }
    },
    {
        id: 'alchemy',
        name: 'Alchemy',
        emoji: '⚗️',
        description: 'Proto-chemistry. Click power +100%.',
        cost: { population: 8000000, knowledge: 400000 },
        unlockedAtAge: 'medieval',
        requires: ['mathematics'],
        effect: { type: 'click', multiplier: 2 }
    },
    {
        id: 'optics',
        name: 'Optics',
        emoji: '🔭',
        description: 'Telescopes and lenses. +50% knowledge production.',
        cost: { population: 50000000, knowledge: 1500000 },
        unlockedAtAge: 'renaissance',
        requires: ['mathematics'],
        effect: { type: 'resource', resource: 'knowledge', multiplier: 1.5 }
    },
    {
        id: 'chemistry',
        name: 'Chemistry',
        emoji: '🧪',
        description: 'Systematic study of matter. Unlocks science resource.',
        cost: { population: 80000000, knowledge: 2500000 },
        unlockedAtAge: 'renaissance',
        requires: ['alchemy', 'optics'],
        effect: { type: 'unlock_resource', resource: 'science' }
    },
    {
        id: 'physics',
        name: 'Classical Physics',
        emoji: '🍎',
        description: 'Laws of motion and gravity. +50% science production.',
        cost: { population: 200000000, knowledge: 5000000, science: 100000 },
        unlockedAtAge: 'industrial',
        requires: ['chemistry'],
        effect: { type: 'resource', resource: 'science', multiplier: 1.5 }
    },
    {
        id: 'evolution',
        name: 'Theory of Evolution',
        emoji: '🦕',
        description: 'Life\'s patterns revealed. +50% all production.',
        cost: { population: 400000000, knowledge: 8000000, science: 500000 },
        unlockedAtAge: 'industrial',
        requires: ['physics'],
        effect: { type: 'global', multiplier: 1.5 }
    },
    {
        id: 'electromagnetism',
        name: 'Electromagnetism',
        emoji: '⚡',
        description: 'Electricity and magnetism unified. Unlocks energy resource.',
        cost: { population: 800000000, knowledge: 15000000, science: 2000000 },
        unlockedAtAge: 'industrial',
        requires: ['physics'],
        effect: { type: 'unlock_resource', resource: 'energy' }
    },
    {
        id: 'relativity',
        name: 'Theory of Relativity',
        emoji: '🌌',
        description: 'Space-time understood. +100% science production.',
        cost: { population: 20000000000, science: 10000000, energy: 500000 },
        unlockedAtAge: 'atomic',
        requires: ['electromagnetism'],
        effect: { type: 'resource', resource: 'science', multiplier: 2 }
    },
    {
        id: 'quantum',
        name: 'Quantum Mechanics',
        emoji: '⚛️',
        description: 'The subatomic world revealed. +100% energy production.',
        cost: { population: 30000000000, science: 20000000, energy: 2000000 },
        unlockedAtAge: 'atomic',
        requires: ['relativity'],
        effect: { type: 'resource', resource: 'energy', multiplier: 2 }
    },
    {
        id: 'genetics',
        name: 'Genetics',
        emoji: '🧬',
        description: 'DNA decoded. Population growth +100%.',
        cost: { population: 40000000000, science: 30000000 },
        unlockedAtAge: 'atomic',
        requires: ['evolution'],
        effect: { type: 'resource', resource: 'population', multiplier: 2 }
    },
    {
        id: 'rocketscience',
        name: 'Rocket Science',
        emoji: '🚀',
        description: 'Escape velocity achieved. +100% all production.',
        cost: { population: 200000000000, science: 100000000, energy: 20000000 },
        unlockedAtAge: 'space',
        requires: ['quantum', 'genetics'],
        effect: { type: 'global', multiplier: 2 }
    },
    {
        id: 'ai_research',
        name: 'Artificial Intelligence',
        emoji: '🤖',
        description: 'Machine learning emerges. +200% science and knowledge.',
        cost: { population: 2000000000000, science: 500000000, energy: 100000000 },
        unlockedAtAge: 'digital',
        requires: ['rocketscience'],
        effect: { type: 'multi-resource', resources: ['science', 'knowledge'], multiplier: 3 }
    },
    {
        id: 'fusion',
        name: 'Fusion Power',
        emoji: '🌞',
        description: 'Infinite clean energy. +500% energy production.',
        cost: { population: 5000000000000, science: 1000000000, energy: 500000000 },
        unlockedAtAge: 'digital',
        requires: ['ai_research'],
        effect: { type: 'resource', resource: 'energy', multiplier: 6 }
    },
    {
        id: 'dyson_tech',
        name: 'Dyson Sphere Engineering',
        emoji: '⭐',
        description: 'Harness a star. All production x5.',
        cost: { population: 8000000000000, science: 5000000000, energy: 2000000000 },
        unlockedAtAge: 'type2',
        requires: ['fusion'],
        effect: { type: 'global', multiplier: 5 }
    }
];

const MILESTONES = [
    { id: 'first_100', name: 'First Steps', emoji: '👣', description: 'Reach 100 population.', condition: (g) => g.population >= 100 },
    { id: 'first_1k', name: 'Thousand Sparks', emoji: '✨', description: 'Reach 1,000 population.', condition: (g) => g.population >= 1000 },
    { id: 'first_10k', name: 'Tribe', emoji: '🏕️', description: 'Reach 10,000 population.', condition: (g) => g.population >= 10000 },
    { id: 'first_100k', name: 'Village', emoji: '🏘️', description: 'Reach 100,000 population.', condition: (g) => g.population >= 100000 },
    { id: 'first_1m', name: 'City', emoji: '🏙️', description: 'Reach 1,000,000 population.', condition: (g) => g.population >= 1000000 },
    { id: 'first_1b', name: 'Nation', emoji: '🏛️', description: 'Reach 1,000,000,000 population.', condition: (g) => g.population >= 1000000000 },
    { id: 'first_1t', name: 'Civilization', emoji: '🌍', description: 'Reach 1,000,000,000,000 population.', condition: (g) => g.population >= 1000000000000 },
    { id: 'first_building', name: 'Builder', emoji: '🔨', description: 'Buy your first building.', condition: (g) => Object.values(g.buildings).reduce((a, b) => a + b, 0) >= 1 },
    { id: 'ten_buildings', name: 'Architect', emoji: '🏗️', description: 'Own 10 buildings.', condition: (g) => Object.values(g.buildings).reduce((a, b) => a + b, 0) >= 10 },
    { id: 'fifty_buildings', name: 'City Planner', emoji: '🗺️', description: 'Own 50 buildings.', condition: (g) => Object.values(g.buildings).reduce((a, b) => a + b, 0) >= 50 },
    { id: 'first_research', name: 'Curious Mind', emoji: '🔍', description: 'Complete your first research.', condition: (g) => Object.values(g.research).filter(Boolean).length >= 1 },
    { id: 'five_research', name: 'Scholar', emoji: '📚', description: 'Complete 5 researches.', condition: (g) => Object.values(g.research).filter(Boolean).length >= 5 },
    { id: 'all_research', name: 'Sage', emoji: '🧙', description: 'Complete all research.', condition: (g) => Object.values(g.research).filter(Boolean).length >= RESEARCH.length },
    { id: 'bigbang_age', name: 'Birth of the Universe', emoji: '💥', description: 'Emerge from the Big Bang.', condition: (g) => g.ageIndex >= 0 },
    { id: 'quarks_age', name: 'Particle Physics', emoji: '⚛️', description: 'Enter the Quark Epoch.', condition: (g) => g.ageIndex >= 1 },
    { id: 'stars_age', name: 'First Light', emoji: '⭐', description: 'Enter the Age of Stars.', condition: (g) => g.ageIndex >= 2 },
    { id: 'earth_age', name: 'Blue Marble', emoji: '🌍', description: 'Enter Primordial Earth.', condition: (g) => g.ageIndex >= 3 },
    { id: 'life_age', name: 'First Life', emoji: '🦠', description: 'Enter the Age of First Life.', condition: (g) => g.ageIndex >= 4 },
    { id: 'stone_age', name: 'Stone Age', emoji: '🪨', description: 'Enter the Stone Age.', condition: (g) => g.ageIndex >= 5 },
    { id: 'bronze_age', name: 'Age of Bronze', emoji: '🥉', description: 'Enter the Bronze Age.', condition: (g) => g.ageIndex >= 6 },
    { id: 'iron_age', name: 'Age of Iron', emoji: '⚔️', description: 'Enter the Iron Age.', condition: (g) => g.ageIndex >= 7 },
    { id: 'medieval_age', name: 'Medieval Times', emoji: '🏰', description: 'Enter the Medieval Age.', condition: (g) => g.ageIndex >= 8 },
    { id: 'renaissance_age', name: 'Renaissance Man', emoji: '🎨', description: 'Enter the Renaissance.', condition: (g) => g.ageIndex >= 9 },
    { id: 'industrial_age', name: 'Industrial Revolution', emoji: '⚙️', description: 'Enter the Industrial Age.', condition: (g) => g.ageIndex >= 10 },
    { id: 'atomic_age', name: 'Atomic Age', emoji: '☢️', description: 'Enter the Atomic Age.', condition: (g) => g.ageIndex >= 11 },
    { id: 'space_age', name: 'Space Race', emoji: '🚀', description: 'Enter the Space Age.', condition: (g) => g.ageIndex >= 12 },
    { id: 'info_age', name: 'Digital Frontier', emoji: '💻', description: 'Enter the Information Age.', condition: (g) => g.ageIndex >= 13 },
    { id: 'type2', name: 'Type II Civilization', emoji: '⭐', description: 'Achieve Type II Civilization.', condition: (g) => g.ageIndex >= 14 },
    { id: 'type3', name: 'Type III Civilization', emoji: '🌌', description: 'Achieve Type III Civilization.', condition: (g) => g.ageIndex >= 15 }
];

// ---- Discoveries -----------------------------------------------
const DISCOVERIES = [
    { id: 'd_tribe', name: 'Tribal Unity', emoji: '🔗', description: 'Your people act as one. +5% global.', condition: (g) => g.population >= 500, effect: { type: 'global', multiplier: 1.05 } },
    { id: 'd_surplus', name: 'Surplus Economy', emoji: '🌽', description: 'More than enough. +10% food production.', condition: (g) => (g.food || 0) >= 1000000, effect: { type: 'resource', resource: 'food', multiplier: 1.10 } },
    { id: 'd_scribe', name: 'Rise of the Scribe', emoji: '✍️', description: 'Record-keeping accelerates civilization. +10% knowledge.', condition: (g) => (g.knowledge || 0) >= 500000, effect: { type: 'resource', resource: 'knowledge', multiplier: 1.10 } },
    { id: 'd_city_state', name: 'City-State', emoji: '🏛️', description: 'A true city emerges. +10% global.', condition: (g) => g.population >= 1000000, effect: { type: 'global', multiplier: 1.10 } },
    { id: 'd_market_econ', name: 'Market Economy', emoji: '💹', description: 'Trade multiplies wealth. +15% all production.', condition: (g) => Object.values(g.buildings).reduce((a,b)=>a+b,0) >= 20, effect: { type: 'global', multiplier: 1.15 } },
    { id: 'd_renaissance_spark', name: 'Renaissance Spark', emoji: '✨', description: 'Art and science merge. +20% culture and knowledge.', condition: (g) => (g.culture || 0) >= 5000000 && (g.knowledge || 0) >= 50000000, effect: { type: 'multi-resource', resources: ['culture', 'knowledge'], multiplier: 1.2 } },
    { id: 'd_industrial_might', name: 'Industrial Might', emoji: '⚙️', description: 'Mass production becomes second nature. +20% population production.', condition: (g) => g.population >= 2000000000, effect: { type: 'resource', resource: 'population', multiplier: 1.20 } },
    { id: 'd_nuclear_dawn', name: 'Nuclear Dawn', emoji: '☢️', description: 'The atom bends to your will. +25% energy production.', condition: (g) => (g.energy || 0) >= 5000000, effect: { type: 'resource', resource: 'energy', multiplier: 1.25 } },
    { id: 'd_global_net', name: 'Global Network', emoji: '🌐', description: 'Every mind connected. +25% science and knowledge.', condition: (g) => (g.science || 0) >= 100000000, effect: { type: 'multi-resource', resources: ['science', 'knowledge'], multiplier: 1.25 } },
    { id: 'd_transcendence', name: 'Transcendence', emoji: '🌌', description: 'Humanity reaches beyond its limits. +30% global.', condition: (g) => g.ageIndex >= 13, effect: { type: 'global', multiplier: 1.30 } },
    { id: 'd_century_builder', name: 'Century of Building', emoji: '🏗️', description: '+15% global for owning 50+ buildings.', condition: (g) => Object.values(g.buildings).reduce((a,b)=>a+b,0) >= 50, effect: { type: 'global', multiplier: 1.15 } },
    { id: 'd_polymath', name: 'The Polymath', emoji: '🧙', description: '+20% global for completing 10+ researches.', condition: (g) => Object.values(g.research).filter(Boolean).length >= 10, effect: { type: 'global', multiplier: 1.20 } }
];

// ---- Random Events ---------------------------------------------
const RANDOM_EVENTS = [
    {
        id: 'cosmic_fluctuation',
        ages: ['bigbang', 'quarks', 'stars'],
        emoji: '💫',
        title: 'Cosmic Fluctuation',
        flavor: 'A quantum ripple surges through the early universe.',
        choices: [
            { label: 'Amplify it', emoji: '⚡', desc: '+90s of 3× production.', effect: { type: 'temp_buff', res: 'all', mult: 3, dur: 90 } },
            { label: 'Stabilize', emoji: '🛡️', desc: 'Permanent +3% global production.', effect: { type: 'perm_micro', mult: 1.03 } }
        ]
    },
    {
        id: 'stellar_collapse',
        ages: ['stars', 'earthform'],
        emoji: '💥',
        title: 'Stellar Collapse',
        flavor: 'A nearby star goes supernova, scattering heavy elements.',
        choices: [
            { label: 'Harvest elements', emoji: '⚗️', desc: 'Massive resource gain.', effect: { type: 'gain', res: 'population', amount: 5000 } },
            { label: 'Study the blast', emoji: '🔬', desc: '+2 min of 2× production.', effect: { type: 'temp_buff', res: 'all', mult: 2, dur: 120 } }
        ]
    },
    {
        id: 'wandering_traders',
        ages: ['stone','bronze','iron'],
        emoji: '🐪',
        title: 'Wandering Traders',
        flavor: 'A caravan arrives from distant lands bearing strange goods and stranger stories.',
        choices: [
            { label: 'Trade knowledge', emoji: '📖', desc: 'Exchange stories — gain a burst of knowledge.', effect: { type: 'gain', res: 'knowledge', amount: 200 } },
            { label: 'Trade food', emoji: '🌾', desc: 'A fair exchange — population and food both grow.', effect: { type: 'gain', res: 'population', amount: 300 } }
        ]
    },
    {
        id: 'bountiful_hunt',
        ages: ['stone','bronze'],
        emoji: '🦌',
        title: 'Bountiful Hunt',
        flavor: 'The herds have returned in vast numbers. The tribe feasts.',
        choices: [
            { label: 'Feast now', emoji: '🍖', desc: '+2 min of 3× food production.', effect: { type: 'temp_buff', res: 'food', mult: 3, dur: 120 } },
            { label: 'Smoke the meat', emoji: '🏚️', desc: 'Preserve it — gain a large stockpile of food immediately.', effect: { type: 'gain', res: 'food', amount: 800 } }
        ]
    },
    {
        id: 'storm_lightning',
        ages: ['stone','bronze','iron'],
        emoji: '⛈️',
        title: 'The Storm',
        flavor: 'A violent storm rolls in. Lightning strikes the forest.',
        choices: [
            { label: 'Shelter the tribe', emoji: '🏕️', desc: 'Safe choice — lose 10% food.', effect: { type: 'lose_pct', res: 'food', pct: 0.1 } },
            { label: 'Study the lightning', emoji: '🔬', desc: 'Gamble: 60% +500 knowledge, 40% lose 15% population.', effect: { type: 'gamble', win: { type: 'gain', res: 'knowledge', amount: 500 }, lose: { type: 'lose_pct', res: 'population', pct: 0.15 }, winChance: 0.6 } }
        ]
    },
    {
        id: 'rival_tribe',
        ages: ['bronze','iron'],
        emoji: '⚔️',
        title: 'Rival Tribe',
        flavor: 'A rival settlement sends an envoy. Their intent is unclear.',
        choices: [
            { label: 'Make peace', emoji: '🤝', desc: 'Lasting alliance — permanent +4% global.', effect: { type: 'perm_micro', mult: 1.04 } },
            { label: 'Dominate them', emoji: '🗡️', desc: 'Absorb their people — gain a large pop boost.', effect: { type: 'gain', res: 'population', amount: 1500 } }
        ]
    },
    {
        id: 'plague',
        ages: ['medieval','renaissance'],
        emoji: '🦠',
        title: 'The Plague',
        flavor: 'Dark ships arrive bearing a terrible sickness. The city falls silent.',
        choices: [
            { label: 'Quarantine', emoji: '🚧', desc: 'Lose 20% population but stop the spread.', effect: { type: 'lose_pct', res: 'population', pct: 0.20 } },
            { label: 'Seek a cure', emoji: '⚗️', desc: 'Gamble: 55% big knowledge gain. 45% lose 30% pop.', effect: { type: 'gamble', win: { type: 'gain', res: 'knowledge', amount: 5000 }, lose: { type: 'lose_pct', res: 'population', pct: 0.30 }, winChance: 0.55 } }
        ]
    },
    {
        id: 'patron',
        ages: ['medieval','renaissance'],
        emoji: '👑',
        title: 'Wealthy Patron',
        flavor: 'A duke wishes to fund a great work.',
        choices: [
            { label: 'Commission art', emoji: '🎭', desc: '+2 min of 3× culture.', effect: { type: 'temp_buff', res: 'culture', mult: 3, dur: 120 } },
            { label: 'Fund research', emoji: '📚', desc: '+90s of 3× knowledge.', effect: { type: 'temp_buff', res: 'knowledge', mult: 3, dur: 90 } }
        ]
    },
    {
        id: 'great_fire',
        ages: ['medieval','renaissance','industrial'],
        emoji: '🔥',
        title: 'The Great Fire',
        flavor: 'A fire has broken out in the city. Flames consume whole districts.',
        choices: [
            { label: 'Rebuild stronger', emoji: '🏗️', desc: 'Lose 15% pop — but permanent +5% from improvements.', effect: { type: 'perm_micro', mult: 1.05 } },
            { label: 'Evacuate', emoji: '🚶', desc: 'Minimal losses — lose only 8% population.', effect: { type: 'lose_pct', res: 'population', pct: 0.08 } }
        ]
    },
    {
        id: 'breakthrough',
        ages: ['industrial','atomic'],
        emoji: '💡',
        title: 'Scientific Breakthrough',
        flavor: 'A researcher bursts into the hall waving papers. Something fundamental has been proven.',
        choices: [
            { label: 'Publish immediately', emoji: '📡', desc: '+3 min of 3× science.', effect: { type: 'temp_buff', res: 'science', mult: 3, dur: 180 } },
            { label: 'Classify it', emoji: '🔒', desc: 'Permanent +6% global.', effect: { type: 'perm_micro', mult: 1.06 } }
        ]
    },
    {
        id: 'nuclear_test',
        ages: ['atomic'],
        emoji: '☢️',
        title: 'Nuclear Test',
        flavor: 'Dawn breaks over the desert. The countdown reaches zero.',
        choices: [
            { label: 'Weaponize', emoji: '💣', desc: 'Lose 15% energy — gain massive science.', effect: { type: 'gain', res: 'science', amount: 15000 } },
            { label: 'Power plants', emoji: '⚡', desc: '+2 min of 4× energy.', effect: { type: 'temp_buff', res: 'energy', mult: 4, dur: 120 } }
        ]
    },
    {
        id: 'solar_flare',
        ages: ['space','digital','type2','type3'],
        emoji: '🌞',
        title: 'Solar Flare',
        flavor: 'Sensors detect an enormous coronal ejection. The grid flickers.',
        choices: [
            { label: 'Shield the grid', emoji: '🛡️', desc: 'Lose 20% energy.', effect: { type: 'lose_pct', res: 'energy', pct: 0.20 } },
            { label: 'Harvest it', emoji: '⚡', desc: 'Gamble: 70% massive energy gain. 30% lose 25% energy.', effect: { type: 'gamble', win: { type: 'gain', res: 'energy', amount: 50000 }, lose: { type: 'lose_pct', res: 'energy', pct: 0.25 }, winChance: 0.70 } }
        ]
    },
    {
        id: 'ai_ethics',
        ages: ['digital'],
        emoji: '🤖',
        title: 'The Ethics Debate',
        flavor: 'Philosophers, engineers and politicians argue through the night.',
        choices: [
            { label: 'Embrace progress', emoji: '🚀', desc: '+3 min of 2× everything.', effect: { type: 'temp_buff', res: 'all', mult: 2, dur: 180 } },
            { label: 'Careful regulation', emoji: '⚖️', desc: 'Permanent +8% global.', effect: { type: 'perm_micro', mult: 1.08 } }
        ]
    },
    {
        id: 'first_contact',
        ages: ['type2','type3'],
        emoji: '👽',
        title: 'First Contact Signal',
        flavor: 'The arrays fall silent. Then — a pattern. Unmistakably intelligent. Unmistakably not us.',
        choices: [
            { label: 'Respond', emoji: '📡', desc: '+5 min of all production doubled.', effect: { type: 'temp_buff', res: 'all', mult: 2, dur: 300 } },
            { label: 'Study the signal', emoji: '🔭', desc: 'Permanent +10% global.', effect: { type: 'perm_micro', mult: 1.10 } }
        ]
    },
    {
        id: 'golden_age',
        ages: ['medieval','renaissance','industrial','atomic'],
        emoji: '✨',
        title: 'A Golden Age Dawns',
        flavor: 'Art, science, philosophy — everything flourishes at once.',
        choices: [
            { label: 'Celebrate', emoji: '🎉', desc: '+2 min of 2× everything.', effect: { type: 'temp_buff', res: 'all', mult: 2, dur: 120 } },
            { label: 'Institutionalize it', emoji: '🏛️', desc: 'Permanent +5% global.', effect: { type: 'perm_micro', mult: 1.05 } }
        ]
    },
    {
        id: 'galactic_discovery',
        ages: ['type3'],
        emoji: '🌌',
        title: 'Galactic Cartography Complete',
        flavor: 'Your probes have mapped every star system in the Milky Way.',
        choices: [
            { label: 'Share with all', emoji: '📡', desc: '+5 min of all production tripled.', effect: { type: 'temp_buff', res: 'all', mult: 3, dur: 300 } },
            { label: 'Exploit the data', emoji: '💾', desc: 'Permanent +12% global.', effect: { type: 'perm_micro', mult: 1.12 } }
        ]
    }
];
