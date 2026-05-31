// All game data definitions

const AGES = [
    {
        id: 'stone',
        name: 'Stone Age',
        description: 'Humanity scratches at the earth',
        threshold: 0,
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
        threshold: 100,
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
        threshold: 1000,
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
        threshold: 10000,
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
        threshold: 100000,
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
        threshold: 1000000,
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
        threshold: 10000000,
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
        threshold: 100000000,
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
        threshold: 1000000000,
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
        threshold: 10000000000,
        hue: 55,
        color: '#ffd700',
        bg: 'linear-gradient(135deg, #0a0800, #141000)',
        gatherIcon: '⭐',
        gatherLabel: 'Harness',
        resources: ['population', 'food', 'knowledge', 'science', 'culture', 'energy']
    }
];

const BUILDINGS = [
    // Stone Age
    {
        id: 'campfire',
        name: 'Campfire',
        emoji: '🔥',
        description: 'Warmth and safety. People gather here.',
        produces: { population: 1 },
        baseCost: { population: 10 },
        unlockedAtAge: 'stone'
    },
    {
        id: 'cave',
        name: 'Cave Dwelling',
        emoji: '🪨',
        description: 'Shelter from the elements.',
        produces: { population: 5 },
        baseCost: { population: 80 },
        unlockedAtAge: 'stone'
    },
    // Bronze Age
    {
        id: 'farm',
        name: 'Farm',
        emoji: '🌾',
        description: 'Sustains more people than hunting alone.',
        produces: { population: 10, food: 5 },
        baseCost: { population: 200 },
        unlockedAtAge: 'bronze'
    },
    {
        id: 'granary',
        name: 'Granary',
        emoji: '🏚️',
        description: 'Stores food for lean seasons.',
        produces: { food: 15, population: 5 },
        baseCost: { population: 400 },
        unlockedAtAge: 'bronze'
    },
    {
        id: 'forge',
        name: 'Bronze Forge',
        emoji: '⚒️',
        description: 'Crafts tools and weapons from bronze.',
        produces: { population: 25 },
        baseCost: { population: 800, food: 50 },
        unlockedAtAge: 'bronze'
    },
    // Iron Age
    {
        id: 'ironworks',
        name: 'Iron Works',
        emoji: '🏭',
        description: 'Superior metalworking drives progress.',
        produces: { population: 60, knowledge: 2 },
        baseCost: { population: 2000 },
        unlockedAtAge: 'iron'
    },
    {
        id: 'mill',
        name: 'Water Mill',
        emoji: '💧',
        description: 'Harnessing natural energy for work.',
        produces: { food: 40, population: 20 },
        baseCost: { population: 3500 },
        unlockedAtAge: 'iron'
    },
    {
        id: 'barracks',
        name: 'Barracks',
        emoji: '🛡️',
        description: 'Trains soldiers who protect the settlement.',
        produces: { population: 80 },
        baseCost: { population: 5000 },
        unlockedAtAge: 'iron'
    },
    // Medieval Age
    {
        id: 'monastery',
        name: 'Monastery',
        emoji: '⛪',
        description: 'Monks preserve and copy knowledge.',
        produces: { knowledge: 20, culture: 5 },
        baseCost: { population: 12000 },
        unlockedAtAge: 'medieval'
    },
    {
        id: 'castle',
        name: 'Castle',
        emoji: '🏰',
        description: 'A center of political power.',
        produces: { population: 150, culture: 10 },
        baseCost: { population: 20000 },
        unlockedAtAge: 'medieval'
    },
    {
        id: 'market',
        name: 'Market',
        emoji: '🏪',
        description: 'Trade routes boost all resources.',
        produces: { population: 100, food: 50, knowledge: 10 },
        baseCost: { population: 30000 },
        unlockedAtAge: 'medieval'
    },
    {
        id: 'cathedral',
        name: 'Cathedral',
        emoji: '⛩️',
        description: 'A monument to culture and faith.',
        produces: { culture: 40, population: 80 },
        baseCost: { population: 50000 },
        unlockedAtAge: 'medieval'
    },
    // Renaissance
    {
        id: 'library',
        name: 'Grand Library',
        emoji: '📚',
        description: 'Repository of all human knowledge.',
        produces: { knowledge: 80, culture: 20 },
        baseCost: { population: 80000 },
        unlockedAtAge: 'renaissance'
    },
    {
        id: 'university',
        name: 'University',
        emoji: '🎓',
        description: 'Systematic pursuit of knowledge.',
        produces: { knowledge: 150, science: 5, population: 100 },
        baseCost: { population: 150000 },
        unlockedAtAge: 'renaissance'
    },
    {
        id: 'printingpress',
        name: 'Printing Press',
        emoji: '🖨️',
        description: 'Ideas spread like wildfire.',
        produces: { knowledge: 200, culture: 50 },
        baseCost: { population: 200000 },
        unlockedAtAge: 'renaissance'
    },
    // Industrial
    {
        id: 'factory',
        name: 'Factory',
        emoji: '⚙️',
        description: 'Mass production transforms society.',
        produces: { population: 500, food: 100 },
        baseCost: { population: 1500000 },
        unlockedAtAge: 'industrial'
    },
    {
        id: 'railroad',
        name: 'Railroad',
        emoji: '🚂',
        description: 'Connects cities; accelerates everything.',
        produces: { population: 800, food: 200, knowledge: 100 },
        baseCost: { population: 3000000 },
        unlockedAtAge: 'industrial'
    },
    {
        id: 'powerplant',
        name: 'Coal Power Plant',
        emoji: '🏭',
        description: 'Electricity empowers the industrial world.',
        produces: { population: 1200, science: 50 },
        baseCost: { population: 5000000 },
        unlockedAtAge: 'industrial'
    },
    // Atomic
    {
        id: 'reactor',
        name: 'Nuclear Reactor',
        emoji: '☢️',
        description: 'Atomic energy powers civilization.',
        produces: { energy: 500, population: 2000, science: 200 },
        baseCost: { population: 15000000 },
        unlockedAtAge: 'atomic'
    },
    {
        id: 'researchlab',
        name: 'Research Lab',
        emoji: '🔬',
        description: 'Cutting-edge scientific inquiry.',
        produces: { science: 500, knowledge: 300 },
        baseCost: { population: 25000000 },
        unlockedAtAge: 'atomic'
    },
    // Space Age
    {
        id: 'launchpad',
        name: 'Launch Pad',
        emoji: '🚀',
        description: 'Gateway to the stars.',
        produces: { science: 2000, energy: 1000, population: 5000 },
        baseCost: { population: 150000000 },
        unlockedAtAge: 'space'
    },
    {
        id: 'satellite',
        name: 'Satellite Network',
        emoji: '🛰️',
        description: 'Global communications infrastructure.',
        produces: { knowledge: 2000, culture: 500, science: 1000 },
        baseCost: { population: 300000000 },
        unlockedAtAge: 'space'
    },
    // Information Age
    {
        id: 'datacenter',
        name: 'Data Center',
        emoji: '💾',
        description: 'Petabytes of civilization\'s knowledge.',
        produces: { knowledge: 5000, science: 3000, energy: 2000 },
        baseCost: { population: 2000000000 },
        unlockedAtAge: 'digital'
    },
    {
        id: 'ai',
        name: 'AI Nexus',
        emoji: '🤖',
        description: 'Artificial minds accelerate all progress.',
        produces: { science: 10000, knowledge: 8000, population: 20000 },
        baseCost: { population: 5000000000 },
        unlockedAtAge: 'digital'
    },
    // Type II
    {
        id: 'dyson',
        name: 'Dyson Sphere (Partial)',
        emoji: '⭐',
        description: 'Harvesting stellar energy at scale.',
        produces: { energy: 50000, science: 20000, population: 50000 },
        baseCost: { population: 15000000000 },
        unlockedAtAge: 'type2'
    }
];

const UPGRADES = [
    // Stone Age upgrades
    {
        id: 'fire_mastery',
        name: 'Fire Mastery',
        emoji: '🔥',
        description: 'Campfires produce 2x more population.',
        cost: { population: 50 },
        unlockedAtAge: 'stone',
        effect: { type: 'building', building: 'campfire', multiplier: 2 }
    },
    {
        id: 'flint_tools',
        name: 'Flint Tools',
        emoji: '🪨',
        description: 'Click power doubled.',
        cost: { population: 75 },
        unlockedAtAge: 'stone',
        effect: { type: 'click', multiplier: 2 }
    },
    {
        id: 'animal_taming',
        name: 'Animal Taming',
        emoji: '🐄',
        description: 'Cave Dwellings produce 2x more population.',
        cost: { population: 400 },
        unlockedAtAge: 'stone',
        effect: { type: 'building', building: 'cave', multiplier: 2 }
    },
    {
        id: 'oral_tradition',
        name: 'Oral Tradition',
        emoji: '👄',
        description: 'All production +25%.',
        cost: { population: 600 },
        unlockedAtAge: 'stone',
        effect: { type: 'global', multiplier: 1.25 }
    },

    // Bronze Age upgrades
    {
        id: 'irrigation',
        name: 'Irrigation',
        emoji: '💧',
        description: 'Farms produce 3x more food and pop.',
        cost: { population: 500, food: 20 },
        unlockedAtAge: 'bronze',
        effect: { type: 'building', building: 'farm', multiplier: 3 }
    },
    {
        id: 'pottery',
        name: 'Pottery',
        emoji: '🏺',
        description: 'Granaries produce 3x more food.',
        cost: { population: 800, food: 40 },
        unlockedAtAge: 'bronze',
        effect: { type: 'building', building: 'granary', multiplier: 3 }
    },
    {
        id: 'bronze_alloy',
        name: 'Bronze Alloy',
        emoji: '🔩',
        description: 'Bronze Forges produce 3x more.',
        cost: { population: 2000 },
        unlockedAtAge: 'bronze',
        effect: { type: 'building', building: 'forge', multiplier: 3 }
    },
    {
        id: 'domestication',
        name: 'Domestication',
        emoji: '🐎',
        description: 'Food production globally +50%.',
        cost: { population: 1500, food: 100 },
        unlockedAtAge: 'bronze',
        effect: { type: 'resource', resource: 'food', multiplier: 1.5 }
    },
    {
        id: 'writing',
        name: 'Writing',
        emoji: '📜',
        description: 'Unlock knowledge production. Click +50%.',
        cost: { population: 3000 },
        unlockedAtAge: 'bronze',
        effect: { type: 'click', multiplier: 1.5 }
    },

    // Iron Age upgrades
    {
        id: 'steel_tools',
        name: 'Steel Tools',
        emoji: '🗡️',
        description: 'Iron Works produce 3x more.',
        cost: { population: 4000 },
        unlockedAtAge: 'iron',
        effect: { type: 'building', building: 'ironworks', multiplier: 3 }
    },
    {
        id: 'crop_rotation',
        name: 'Crop Rotation',
        emoji: '🌻',
        description: 'All food production +100%.',
        cost: { population: 6000, knowledge: 20 },
        unlockedAtAge: 'iron',
        effect: { type: 'resource', resource: 'food', multiplier: 2 }
    },
    {
        id: 'military_tactics',
        name: 'Military Tactics',
        emoji: '⚔️',
        description: 'Barracks produce 3x more pop.',
        cost: { population: 8000 },
        unlockedAtAge: 'iron',
        effect: { type: 'building', building: 'barracks', multiplier: 3 }
    },
    {
        id: 'philosophy',
        name: 'Philosophy',
        emoji: '🧠',
        description: 'Knowledge production globally +100%.',
        cost: { population: 10000, knowledge: 50 },
        unlockedAtAge: 'iron',
        effect: { type: 'resource', resource: 'knowledge', multiplier: 2 }
    },

    // Medieval Age upgrades
    {
        id: 'feudalism',
        name: 'Feudalism',
        emoji: '👑',
        description: 'Castles produce 3x more.',
        cost: { population: 25000 },
        unlockedAtAge: 'medieval',
        effect: { type: 'building', building: 'castle', multiplier: 3 }
    },
    {
        id: 'scholasticism',
        name: 'Scholasticism',
        emoji: '📖',
        description: 'Monasteries produce 3x more.',
        cost: { population: 30000, knowledge: 200 },
        unlockedAtAge: 'medieval',
        effect: { type: 'building', building: 'monastery', multiplier: 3 }
    },
    {
        id: 'guilds',
        name: 'Merchant Guilds',
        emoji: '💰',
        description: 'Markets produce 3x more.',
        cost: { population: 40000 },
        unlockedAtAge: 'medieval',
        effect: { type: 'building', building: 'market', multiplier: 3 }
    },
    {
        id: 'divine_mandate',
        name: 'Divine Mandate',
        emoji: '✝️',
        description: 'Culture production globally +100%.',
        cost: { population: 60000, culture: 100 },
        unlockedAtAge: 'medieval',
        effect: { type: 'resource', resource: 'culture', multiplier: 2 }
    },
    {
        id: 'mapmaking',
        name: 'Cartography',
        emoji: '🗺️',
        description: 'All production globally +30%.',
        cost: { population: 80000, knowledge: 500 },
        unlockedAtAge: 'medieval',
        effect: { type: 'global', multiplier: 1.3 }
    },

    // Renaissance upgrades
    {
        id: 'printing',
        name: 'Printing Revolution',
        emoji: '🖨️',
        description: 'Libraries and Printing Press produce 5x more.',
        cost: { population: 150000, knowledge: 2000 },
        unlockedAtAge: 'renaissance',
        effect: { type: 'multi-building', buildings: ['library', 'printingpress'], multiplier: 5 }
    },
    {
        id: 'scientific_method',
        name: 'Scientific Method',
        emoji: '🔬',
        description: 'Universities produce 4x more.',
        cost: { population: 200000, knowledge: 3000 },
        unlockedAtAge: 'renaissance',
        effect: { type: 'building', building: 'university', multiplier: 4 }
    },
    {
        id: 'classical_arts',
        name: 'Classical Arts',
        emoji: '🎭',
        description: 'Culture production +150%.',
        cost: { population: 250000, culture: 500 },
        unlockedAtAge: 'renaissance',
        effect: { type: 'resource', resource: 'culture', multiplier: 2.5 }
    },
    {
        id: 'humanism',
        name: 'Humanism',
        emoji: '🤝',
        description: 'Click power x5.',
        cost: { population: 300000, knowledge: 4000 },
        unlockedAtAge: 'renaissance',
        effect: { type: 'click', multiplier: 5 }
    },

    // Industrial Age upgrades
    {
        id: 'steam_engine',
        name: 'Steam Engine',
        emoji: '🚂',
        description: 'Factories and Railroads produce 4x more.',
        cost: { population: 2000000 },
        unlockedAtAge: 'industrial',
        effect: { type: 'multi-building', buildings: ['factory', 'railroad'], multiplier: 4 }
    },
    {
        id: 'electrification',
        name: 'Electrification',
        emoji: '💡',
        description: 'Power Plants produce 5x more.',
        cost: { population: 5000000 },
        unlockedAtAge: 'industrial',
        effect: { type: 'building', building: 'powerplant', multiplier: 5 }
    },
    {
        id: 'mass_production',
        name: 'Mass Production',
        emoji: '🏭',
        description: 'All production +50%.',
        cost: { population: 7000000 },
        unlockedAtAge: 'industrial',
        effect: { type: 'global', multiplier: 1.5 }
    },

    // Atomic Age upgrades
    {
        id: 'nuclear_power',
        name: 'Nuclear Power Grid',
        emoji: '☢️',
        description: 'Reactors produce 5x more.',
        cost: { population: 20000000, energy: 1000 },
        unlockedAtAge: 'atomic',
        effect: { type: 'building', building: 'reactor', multiplier: 5 }
    },
    {
        id: 'computers',
        name: 'Early Computers',
        emoji: '🖥️',
        description: 'Research Labs produce 5x more.',
        cost: { population: 40000000, science: 2000 },
        unlockedAtAge: 'atomic',
        effect: { type: 'building', building: 'researchlab', multiplier: 5 }
    },
    {
        id: 'globalization',
        name: 'Globalization',
        emoji: '🌍',
        description: 'All production +100%.',
        cost: { population: 60000000, knowledge: 50000 },
        unlockedAtAge: 'atomic',
        effect: { type: 'global', multiplier: 2 }
    },

    // Space Age upgrades
    {
        id: 'rocketry',
        name: 'Advanced Rocketry',
        emoji: '🚀',
        description: 'Launch Pads produce 5x more.',
        cost: { population: 200000000, science: 20000 },
        unlockedAtAge: 'space',
        effect: { type: 'building', building: 'launchpad', multiplier: 5 }
    },
    {
        id: 'internet',
        name: 'The Internet',
        emoji: '🌐',
        description: 'Knowledge production +300%.',
        cost: { population: 400000000, knowledge: 200000 },
        unlockedAtAge: 'space',
        effect: { type: 'resource', resource: 'knowledge', multiplier: 4 }
    },

    // Info Age upgrades
    {
        id: 'neural_networks',
        name: 'Neural Networks',
        emoji: '🧠',
        description: 'AI Nexus and Data Centers produce 5x more.',
        cost: { population: 3000000000, science: 500000 },
        unlockedAtAge: 'digital',
        effect: { type: 'multi-building', buildings: ['ai', 'datacenter'], multiplier: 5 }
    },
    {
        id: 'quantum_computing',
        name: 'Quantum Computing',
        emoji: '⚛️',
        description: 'Science production +500%.',
        cost: { population: 5000000000, science: 1000000 },
        unlockedAtAge: 'digital',
        effect: { type: 'resource', resource: 'science', multiplier: 6 }
    },
    {
        id: 'singularity',
        name: 'Technological Singularity',
        emoji: '♾️',
        description: 'All production tripled.',
        cost: { population: 8000000000, science: 2000000 },
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
        cost: { population: 80 },
        unlockedAtAge: 'stone',
        requires: [],
        effect: { type: 'unlock_resource', resource: 'food' }
    },
    {
        id: 'medicine',
        name: 'Herbal Medicine',
        emoji: '🌿',
        description: 'Population cap raised, +10% global production.',
        cost: { population: 150, knowledge: 5 },
        unlockedAtAge: 'bronze',
        requires: ['cultivation'],
        effect: { type: 'global', multiplier: 1.1 }
    },
    {
        id: 'astronomy',
        name: 'Astronomy',
        emoji: '🌟',
        description: 'Better navigation and planning. +20% knowledge production.',
        cost: { population: 800, knowledge: 30 },
        unlockedAtAge: 'iron',
        requires: [],
        effect: { type: 'resource', resource: 'knowledge', multiplier: 1.2 }
    },
    {
        id: 'mathematics',
        name: 'Mathematics',
        emoji: '📐',
        description: 'Numbers unlock architecture. +25% all production.',
        cost: { population: 2000, knowledge: 100 },
        unlockedAtAge: 'iron',
        requires: ['astronomy'],
        effect: { type: 'global', multiplier: 1.25 }
    },
    {
        id: 'navigation',
        name: 'Navigation',
        emoji: '🧭',
        description: 'Sea routes boost trade. +30% food production.',
        cost: { population: 5000, knowledge: 200 },
        unlockedAtAge: 'medieval',
        requires: ['astronomy'],
        effect: { type: 'resource', resource: 'food', multiplier: 1.3 }
    },
    {
        id: 'alchemy',
        name: 'Alchemy',
        emoji: '⚗️',
        description: 'Proto-chemistry. Precursor to science. Click power +100%.',
        cost: { population: 8000, knowledge: 400 },
        unlockedAtAge: 'medieval',
        requires: ['mathematics'],
        effect: { type: 'click', multiplier: 2 }
    },
    {
        id: 'optics',
        name: 'Optics',
        emoji: '🔭',
        description: 'Telescopes and lenses. +50% knowledge production.',
        cost: { population: 50000, knowledge: 1500 },
        unlockedAtAge: 'renaissance',
        requires: ['mathematics'],
        effect: { type: 'resource', resource: 'knowledge', multiplier: 1.5 }
    },
    {
        id: 'chemistry',
        name: 'Chemistry',
        emoji: '🧪',
        description: 'Systematic study of matter. Unlocks science resource.',
        cost: { population: 80000, knowledge: 2500 },
        unlockedAtAge: 'renaissance',
        requires: ['alchemy', 'optics'],
        effect: { type: 'unlock_resource', resource: 'science' }
    },
    {
        id: 'physics',
        name: 'Classical Physics',
        emoji: '🍎',
        description: 'Laws of motion and gravity. +50% science production.',
        cost: { population: 200000, knowledge: 5000, science: 100 },
        unlockedAtAge: 'industrial',
        requires: ['chemistry'],
        effect: { type: 'resource', resource: 'science', multiplier: 1.5 }
    },
    {
        id: 'evolution',
        name: 'Theory of Evolution',
        emoji: '🦕',
        description: 'Life\'s patterns revealed. +50% all production.',
        cost: { population: 400000, knowledge: 8000, science: 500 },
        unlockedAtAge: 'industrial',
        requires: ['physics'],
        effect: { type: 'global', multiplier: 1.5 }
    },
    {
        id: 'electromagnetism',
        name: 'Electromagnetism',
        emoji: '⚡',
        description: 'Electricity and magnetism unified. Unlocks energy resource.',
        cost: { population: 800000, knowledge: 15000, science: 2000 },
        unlockedAtAge: 'industrial',
        requires: ['physics'],
        effect: { type: 'unlock_resource', resource: 'energy' }
    },
    {
        id: 'relativity',
        name: 'Theory of Relativity',
        emoji: '🌌',
        description: 'Space-time understood. +100% science production.',
        cost: { population: 20000000, science: 10000, energy: 500 },
        unlockedAtAge: 'atomic',
        requires: ['electromagnetism'],
        effect: { type: 'resource', resource: 'science', multiplier: 2 }
    },
    {
        id: 'quantum',
        name: 'Quantum Mechanics',
        emoji: '⚛️',
        description: 'The subatomic world revealed. +100% energy production.',
        cost: { population: 30000000, science: 20000, energy: 2000 },
        unlockedAtAge: 'atomic',
        requires: ['relativity'],
        effect: { type: 'resource', resource: 'energy', multiplier: 2 }
    },
    {
        id: 'genetics',
        name: 'Genetics',
        emoji: '🧬',
        description: 'DNA decoded. Population growth +100%.',
        cost: { population: 40000000, science: 30000 },
        unlockedAtAge: 'atomic',
        requires: ['evolution'],
        effect: { type: 'resource', resource: 'population', multiplier: 2 }
    },
    {
        id: 'rocketscience',
        name: 'Rocket Science',
        emoji: '🚀',
        description: 'Escape velocity achieved. +100% all production.',
        cost: { population: 200000000, science: 100000, energy: 20000 },
        unlockedAtAge: 'space',
        requires: ['quantum', 'genetics'],
        effect: { type: 'global', multiplier: 2 }
    },
    {
        id: 'ai_research',
        name: 'Artificial Intelligence',
        emoji: '🤖',
        description: 'Machine learning emerges. +200% science and knowledge.',
        cost: { population: 2000000000, science: 500000, energy: 100000 },
        unlockedAtAge: 'digital',
        requires: ['rocketscience'],
        effect: { type: 'multi-resource', resources: ['science', 'knowledge'], multiplier: 3 }
    },
    {
        id: 'fusion',
        name: 'Fusion Power',
        emoji: '🌞',
        description: 'Infinite clean energy. +500% energy production.',
        cost: { population: 5000000000, science: 1000000, energy: 500000 },
        unlockedAtAge: 'digital',
        requires: ['ai_research'],
        effect: { type: 'resource', resource: 'energy', multiplier: 6 }
    },
    {
        id: 'dyson_tech',
        name: 'Dyson Sphere Engineering',
        emoji: '⭐',
        description: 'Harness a star. All production x5.',
        cost: { population: 8000000000, science: 5000000, energy: 2000000 },
        unlockedAtAge: 'type2',
        requires: ['fusion'],
        effect: { type: 'global', multiplier: 5 }
    }
];

const MILESTONES = [
    { id: 'first_100', name: 'First Steps', emoji: '👣', description: 'Reach 100 population.', condition: (g) => g.population >= 100 },
    { id: 'first_1k', name: 'Tribe', emoji: '🏕️', description: 'Reach 1,000 population.', condition: (g) => g.population >= 1000 },
    { id: 'first_10k', name: 'Village', emoji: '🏘️', description: 'Reach 10,000 population.', condition: (g) => g.population >= 10000 },
    { id: 'first_100k', name: 'City', emoji: '🏙️', description: 'Reach 100,000 population.', condition: (g) => g.population >= 100000 },
    { id: 'first_1m', name: 'Nation', emoji: '🏛️', description: 'Reach 1,000,000 population.', condition: (g) => g.population >= 1000000 },
    { id: 'first_1b', name: 'Civilization', emoji: '🌍', description: 'Reach 1,000,000,000 population.', condition: (g) => g.population >= 1000000000 },
    { id: 'first_building', name: 'Builder', emoji: '🔨', description: 'Buy your first building.', condition: (g) => Object.values(g.buildings).reduce((a, b) => a + b, 0) >= 1 },
    { id: 'ten_buildings', name: 'Architect', emoji: '🏗️', description: 'Own 10 buildings.', condition: (g) => Object.values(g.buildings).reduce((a, b) => a + b, 0) >= 10 },
    { id: 'fifty_buildings', name: 'City Planner', emoji: '🗺️', description: 'Own 50 buildings.', condition: (g) => Object.values(g.buildings).reduce((a, b) => a + b, 0) >= 50 },
    { id: 'first_research', name: 'Curious Mind', emoji: '🔍', description: 'Complete your first research.', condition: (g) => Object.values(g.research).filter(Boolean).length >= 1 },
    { id: 'five_research', name: 'Scholar', emoji: '📚', description: 'Complete 5 researches.', condition: (g) => Object.values(g.research).filter(Boolean).length >= 5 },
    { id: 'all_research', name: 'Sage', emoji: '🧙', description: 'Complete all research.', condition: (g) => Object.values(g.research).filter(Boolean).length >= RESEARCH.length },
    { id: 'bronze_age', name: 'Age of Bronze', emoji: '🥉', description: 'Enter the Bronze Age.', condition: (g) => g.ageIndex >= 1 },
    { id: 'iron_age', name: 'Age of Iron', emoji: '⚔️', description: 'Enter the Iron Age.', condition: (g) => g.ageIndex >= 2 },
    { id: 'medieval_age', name: 'Medieval Times', emoji: '🏰', description: 'Enter the Medieval Age.', condition: (g) => g.ageIndex >= 3 },
    { id: 'renaissance_age', name: 'Renaissance Man', emoji: '🎨', description: 'Enter the Renaissance.', condition: (g) => g.ageIndex >= 4 },
    { id: 'industrial_age', name: 'Industrial Revolution', emoji: '⚙️', description: 'Enter the Industrial Age.', condition: (g) => g.ageIndex >= 5 },
    { id: 'atomic_age', name: 'Atomic Age', emoji: '☢️', description: 'Enter the Atomic Age.', condition: (g) => g.ageIndex >= 6 },
    { id: 'space_age', name: 'Space Race', emoji: '🚀', description: 'Enter the Space Age.', condition: (g) => g.ageIndex >= 7 },
    { id: 'info_age', name: 'Digital Frontier', emoji: '💻', description: 'Enter the Information Age.', condition: (g) => g.ageIndex >= 8 },
    { id: 'type2', name: 'Type II Civilization', emoji: '⭐', description: 'Achieve Type II Civilization status.', condition: (g) => g.ageIndex >= 9 }
];

// ---- Discoveries -------------------------------------------
// Auto-unlocked when condition is met. No purchase required.
// effect types: same as upgrades/research (global, resource, click, building)

const DISCOVERIES = [
    // Triggered by population thresholds
    {
        id: 'd_tribe',
        name: 'Tribal Unity',
        emoji: '🔗',
        description: 'Your people act as one. +5% global production.',
        condition: (g) => g.population >= 500,
        effect: { type: 'global', multiplier: 1.05 }
    },
    {
        id: 'd_surplus',
        name: 'Surplus Economy',
        emoji: '🌽',
        description: 'More than enough. +10% food production.',
        condition: (g) => (g.food || 0) >= 1000,
        effect: { type: 'resource', resource: 'food', multiplier: 1.10 }
    },
    {
        id: 'd_scribe',
        name: 'Rise of the Scribe',
        emoji: '✍️',
        description: 'Record-keeping accelerates civilization. +10% knowledge.',
        condition: (g) => (g.knowledge || 0) >= 500,
        effect: { type: 'resource', resource: 'knowledge', multiplier: 1.10 }
    },
    {
        id: 'd_city_state',
        name: 'City-State',
        emoji: '🏛️',
        description: 'A true city emerges. +10% global production.',
        condition: (g) => g.population >= 15000,
        effect: { type: 'global', multiplier: 1.10 }
    },
    {
        id: 'd_market_econ',
        name: 'Market Economy',
        emoji: '💹',
        description: 'Trade multiplies wealth. +15% all resource production.',
        condition: (g) => Object.values(g.buildings).reduce((a,b)=>a+b,0) >= 20,
        effect: { type: 'global', multiplier: 1.15 }
    },
    {
        id: 'd_renaissance_spark',
        name: 'Renaissance Spark',
        emoji: '✨',
        description: 'Art and science merge. +20% culture and knowledge.',
        condition: (g) => (g.culture || 0) >= 5000 && (g.knowledge || 0) >= 50000,
        effect: { type: 'multi-resource', resources: ['culture', 'knowledge'], multiplier: 1.2 }
    },
    {
        id: 'd_industrial_might',
        name: 'Industrial Might',
        emoji: '⚙️',
        description: 'Mass production becomes second nature. +20% population production.',
        condition: (g) => g.population >= 2000000,
        effect: { type: 'resource', resource: 'population', multiplier: 1.20 }
    },
    {
        id: 'd_nuclear_dawn',
        name: 'Nuclear Dawn',
        emoji: '☢️',
        description: 'The atom bends to your will. +25% energy production.',
        condition: (g) => (g.energy || 0) >= 5000,
        effect: { type: 'resource', resource: 'energy', multiplier: 1.25 }
    },
    {
        id: 'd_global_net',
        name: 'Global Network',
        emoji: '🌐',
        description: 'Every mind connected to every other. +25% science and knowledge.',
        condition: (g) => (g.science || 0) >= 100000,
        effect: { type: 'multi-resource', resources: ['science', 'knowledge'], multiplier: 1.25 }
    },
    {
        id: 'd_transcendence',
        name: 'Transcendence',
        emoji: '🌌',
        description: 'Humanity reaches beyond its limits. +30% global production.',
        condition: (g) => g.ageIndex >= 8,
        effect: { type: 'global', multiplier: 1.30 }
    },
    {
        id: 'd_century_builder',
        name: 'Century of Building',
        emoji: '🏗️',
        description: 'A civilization of builders. +15% global for owning 50+ buildings.',
        condition: (g) => Object.values(g.buildings).reduce((a,b)=>a+b,0) >= 50,
        effect: { type: 'global', multiplier: 1.15 }
    },
    {
        id: 'd_polymath',
        name: 'The Polymath',
        emoji: '🧙',
        description: 'Master of all disciplines. +20% global for completing 10+ researches.',
        condition: (g) => Object.values(g.research).filter(Boolean).length >= 10,
        effect: { type: 'global', multiplier: 1.20 }
    }
];

// ---- Random Events -----------------------------------------
// effect types:
//   gain:         { type:'gain', res, amount }
//   lose_pct:     { type:'lose_pct', res, pct }          (0-1 fraction)
//   temp_buff:    { type:'temp_buff', res, mult, dur }   (res='all' for global, dur in seconds)
//   perm_micro:   { type:'perm_micro', mult }            (stacks into G.eventBonus)
//   gamble:       { type:'gamble', win:{...effect}, lose:{...effect} }

const RANDOM_EVENTS = [
    // Early civilization
    {
        id: 'wandering_traders',
        ages: ['stone','bronze','iron'],
        emoji: '🐪',
        title: 'Wandering Traders',
        flavor: 'A caravan arrives from distant lands bearing strange goods and stranger stories.',
        choices: [
            { label: 'Trade knowledge', emoji: '📖', desc: 'Exchange stories — gain a burst of knowledge.',
              effect: { type: 'gain', res: 'knowledge', amount: 200 } },
            { label: 'Trade food', emoji: '🌾', desc: 'A fair exchange — population and food both grow.',
              effect: { type: 'gain', res: 'population', amount: 300 } }
        ]
    },
    {
        id: 'cave_paintings',
        ages: ['stone'],
        emoji: '🎨',
        title: 'Cave Paintings',
        flavor: 'Someone has covered the cave walls with breathtaking images. A spark of culture ignites.',
        choices: [
            { label: 'Preserve them', emoji: '🏛️', desc: '+90 seconds of doubled knowledge production.',
              effect: { type: 'temp_buff', res: 'knowledge', mult: 2, dur: 90 } },
            { label: 'Copy the technique', emoji: '✍️', desc: 'Permanent +3% to all production.',
              effect: { type: 'perm_micro', mult: 1.03 } }
        ]
    },
    {
        id: 'bountiful_hunt',
        ages: ['stone','bronze'],
        emoji: '🦌',
        title: 'Bountiful Hunt',
        flavor: 'The herds have returned in vast numbers. The tribe feasts.',
        choices: [
            { label: 'Feast now', emoji: '🍖', desc: '+2 min of 3× food production.',
              effect: { type: 'temp_buff', res: 'food', mult: 3, dur: 120 } },
            { label: 'Smoke the meat', emoji: '🏚️', desc: 'Preserve it — gain a large stockpile of food immediately.',
              effect: { type: 'gain', res: 'food', amount: 800 } }
        ]
    },
    {
        id: 'storm_lightning',
        ages: ['stone','bronze','iron'],
        emoji: '⛈️',
        title: 'The Storm',
        flavor: 'A violent storm rolls in. Lightning strikes the forest, but someone is watching closely.',
        choices: [
            { label: 'Shelter the tribe', emoji: '🏕️', desc: 'Safe choice — lose 10% food but everyone survives.',
              effect: { type: 'lose_pct', res: 'food', pct: 0.1 } },
            { label: 'Study the lightning', emoji: '🔬', desc: 'Risky curiosity — gamble: 60% chance of +500 knowledge, 40% chance of losing 15% population.',
              effect: { type: 'gamble',
                win:  { type: 'gain',     res: 'knowledge', amount: 500 },
                lose: { type: 'lose_pct', res: 'population', pct: 0.15 },
                winChance: 0.6 } }
        ]
    },
    {
        id: 'rival_tribe',
        ages: ['bronze','iron'],
        emoji: '⚔️',
        title: 'Rival Tribe',
        flavor: 'A rival settlement sends an envoy. Their intent is unclear.',
        choices: [
            { label: 'Make peace', emoji: '🤝', desc: 'Lasting alliance — permanent +4% global production.',
              effect: { type: 'perm_micro', mult: 1.04 } },
            { label: 'Dominate them', emoji: '🗡️', desc: 'Absorb their people — gain a large pop boost, but lose some food.',
              effect: { type: 'gain', res: 'population', amount: 1500 } }
        ]
    },
    // Medieval / Renaissance
    {
        id: 'plague',
        ages: ['medieval','renaissance'],
        emoji: '🦠',
        title: 'The Plague',
        flavor: 'Dark ships arrive bearing a terrible sickness. The city falls silent.',
        choices: [
            { label: 'Quarantine', emoji: '🚧', desc: 'Lose 20% population but stop the spread.',
              effect: { type: 'lose_pct', res: 'population', pct: 0.20 } },
            { label: 'Seek a cure', emoji: '⚗️', desc: 'Desperate research — gain knowledge but risk more loss.',
              effect: { type: 'gamble',
                win:  { type: 'gain',     res: 'knowledge', amount: 5000 },
                lose: { type: 'lose_pct', res: 'population', pct: 0.30 },
                winChance: 0.55 } }
        ]
    },
    {
        id: 'patron',
        ages: ['medieval','renaissance'],
        emoji: '👑',
        title: 'Wealthy Patron',
        flavor: 'A duke wishes to fund a great work. What shall he commission?',
        choices: [
            { label: 'Commission art', emoji: '🎭', desc: '+2 min of 3× culture production.',
              effect: { type: 'temp_buff', res: 'culture', mult: 3, dur: 120 } },
            { label: 'Fund research', emoji: '📚', desc: '+90 seconds of 3× knowledge production.',
              effect: { type: 'temp_buff', res: 'knowledge', mult: 3, dur: 90 } }
        ]
    },
    {
        id: 'great_fire',
        ages: ['medieval','renaissance','industrial'],
        emoji: '🔥',
        title: 'The Great Fire',
        flavor: 'A fire has broken out in the city. Flames consume whole districts.',
        choices: [
            { label: 'Rebuild stronger', emoji: '🏗️', desc: 'Lose 15% population — but gain permanent +5% production as the city improves.',
              effect: { type: 'perm_micro', mult: 1.05 } },
            { label: 'Evacuate', emoji: '🚶', desc: 'Minimal losses — lose only 8% population.',
              effect: { type: 'lose_pct', res: 'population', pct: 0.08 } }
        ]
    },
    {
        id: 'printing_boom',
        ages: ['renaissance'],
        emoji: '📰',
        title: 'Printing Revolution',
        flavor: 'Presses run day and night. Ideas are spreading faster than anyone expected.',
        choices: [
            { label: 'Spread science', emoji: '🔬', desc: '+3 min of 2× knowledge production.',
              effect: { type: 'temp_buff', res: 'knowledge', mult: 2, dur: 180 } },
            { label: 'Spread politics', emoji: '📜', desc: 'Permanent +5% global — unity through shared ideas.',
              effect: { type: 'perm_micro', mult: 1.05 } }
        ]
    },
    {
        id: 'alchemist',
        ages: ['medieval','renaissance'],
        emoji: '⚗️',
        title: 'The Alchemist\'s Discovery',
        flavor: 'An eccentric alchemist claims to have found something extraordinary in his lab.',
        choices: [
            { label: 'Fund more research', emoji: '💰', desc: 'Gamble: 65% — double science for 2 min. 35% — lose 10% of population (fraud!).',
              effect: { type: 'gamble',
                win:  { type: 'temp_buff', res: 'science', mult: 2, dur: 120 },
                lose: { type: 'lose_pct', res: 'population', pct: 0.10 },
                winChance: 0.65 } },
            { label: 'Steal the notes', emoji: '📋', desc: 'Safe bet — gain a large knowledge cache.',
              effect: { type: 'gain', res: 'knowledge', amount: 3000 } }
        ]
    },
    // Industrial / Atomic
    {
        id: 'labor_strike',
        ages: ['industrial'],
        emoji: '✊',
        title: 'The Great Strike',
        flavor: 'Workers down tools across the factories. The streets fill with marchers.',
        choices: [
            { label: 'Meet their demands', emoji: '🤝', desc: 'Lose 10% pop production for 60s — but gain permanent +4% global from improved morale.',
              effect: { type: 'perm_micro', mult: 1.04 } },
            { label: 'Wait them out', emoji: '🏭', desc: '60 seconds of halved population production. Gamble — but science gain from the chaos.',
              effect: { type: 'gain', res: 'science', amount: 2000 } }
        ]
    },
    {
        id: 'breakthrough',
        ages: ['industrial','atomic'],
        emoji: '💡',
        title: 'Scientific Breakthrough',
        flavor: 'A researcher bursts into the hall waving papers. Something fundamental has been proven.',
        choices: [
            { label: 'Publish immediately', emoji: '📡', desc: '+3 min of 3× science production. Rivals will catch up, but you lead now.',
              effect: { type: 'temp_buff', res: 'science', mult: 3, dur: 180 } },
            { label: 'Classify it', emoji: '🔒', desc: 'Keep the advantage — permanent +6% global production.',
              effect: { type: 'perm_micro', mult: 1.06 } }
        ]
    },
    {
        id: 'nuclear_test',
        ages: ['atomic'],
        emoji: '☢️',
        title: 'Nuclear Test',
        flavor: 'Dawn breaks over the desert. The countdown reaches zero.',
        choices: [
            { label: 'Weaponize', emoji: '💣', desc: 'Lose 15% energy — but gain massive science from the data.',
              effect: { type: 'gain', res: 'science', amount: 15000 } },
            { label: 'Power plants', emoji: '⚡', desc: '+2 min of 4× energy production.',
              effect: { type: 'temp_buff', res: 'energy', mult: 4, dur: 120 } }
        ]
    },
    {
        id: 'vaccine',
        ages: ['atomic','space'],
        emoji: '💉',
        title: 'Vaccine Discovery',
        flavor: 'A disease that once ravaged populations has been conquered. The world celebrates.',
        choices: [
            { label: 'Global rollout', emoji: '🌍', desc: '+3 min of 2× population production.',
              effect: { type: 'temp_buff', res: 'population', mult: 2, dur: 180 } },
            { label: 'Study further', emoji: '🔬', desc: 'Permanent +6% global production from medical advancements.',
              effect: { type: 'perm_micro', mult: 1.06 } }
        ]
    },
    // Space / Digital
    {
        id: 'solar_flare',
        ages: ['space','digital','type2'],
        emoji: '🌞',
        title: 'Solar Flare',
        flavor: 'Sensors detect an enormous coronal ejection. The grid flickers.',
        choices: [
            { label: 'Shield the grid', emoji: '🛡️', desc: 'Costly protection — lose 20% energy.',
              effect: { type: 'lose_pct', res: 'energy', pct: 0.20 } },
            { label: 'Harvest it', emoji: '⚡', desc: 'Gamble: 70% — massive energy gain. 30% — lose 25% energy.',
              effect: { type: 'gamble',
                win:  { type: 'gain',     res: 'energy', amount: 50000 },
                lose: { type: 'lose_pct', res: 'energy', pct: 0.25 },
                winChance: 0.70 } }
        ]
    },
    {
        id: 'ai_ethics',
        ages: ['digital'],
        emoji: '🤖',
        title: 'The Ethics Debate',
        flavor: 'Philosophers, engineers and politicians argue through the night about what the machines mean for humanity.',
        choices: [
            { label: 'Embrace progress', emoji: '🚀', desc: '+3 min of 2× all production.',
              effect: { type: 'temp_buff', res: 'all', mult: 2, dur: 180 } },
            { label: 'Careful regulation', emoji: '⚖️', desc: 'Slower, safer — permanent +8% global production from trust gained.',
              effect: { type: 'perm_micro', mult: 1.08 } }
        ]
    },
    {
        id: 'space_discovery',
        ages: ['space','digital'],
        emoji: '🌌',
        title: 'Cosmic Discovery',
        flavor: 'Something unexpected has been detected at the edge of the solar system.',
        choices: [
            { label: 'Send a probe', emoji: '🛸', desc: '+3 min of 3× science production.',
              effect: { type: 'temp_buff', res: 'science', mult: 3, dur: 180 } },
            { label: 'Broadcast to Earth', emoji: '📡', desc: '+3 min of 3× knowledge production — public excitement surges.',
              effect: { type: 'temp_buff', res: 'knowledge', mult: 3, dur: 180 } }
        ]
    },
    {
        id: 'first_contact',
        ages: ['type2'],
        emoji: '👽',
        title: 'First Contact Signal',
        flavor: 'The arrays fall silent. Then — a pattern. Unmistakably intelligent. Unmistakably not us.',
        choices: [
            { label: 'Respond', emoji: '📡', desc: '+5 min of all production doubled.',
              effect: { type: 'temp_buff', res: 'all', mult: 2, dur: 300 } },
            { label: 'Study the signal', emoji: '🔭', desc: 'Permanent +10% global production — the mathematics alone changes everything.',
              effect: { type: 'perm_micro', mult: 1.10 } }
        ]
    },
    {
        id: 'golden_age',
        ages: ['medieval','renaissance','industrial','atomic'],
        emoji: '✨',
        title: 'A Golden Age Dawns',
        flavor: 'Art, science, philosophy — everything flourishes at once. The historians will write of this era.',
        choices: [
            { label: 'Celebrate', emoji: '🎉', desc: '+2 min of 2× everything.',
              effect: { type: 'temp_buff', res: 'all', mult: 2, dur: 120 } },
            { label: 'Institutionalize it', emoji: '🏛️', desc: 'Permanent +5% global production.',
              effect: { type: 'perm_micro', mult: 1.05 } }
        ]
    },
    {
        id: 'meteor_shower',
        ages: ['stone','bronze','iron','medieval'],
        emoji: '☄️',
        title: 'Meteor Shower',
        flavor: 'Streaks of fire cross the sky for three nights. Priests and scientists argue about what it means.',
        choices: [
            { label: 'Treat as an omen', emoji: '🙏', desc: 'Culture +200 and 90 seconds of 2× culture production.',
              effect: { type: 'temp_buff', res: 'culture', mult: 2, dur: 90 } },
            { label: 'Study the fragments', emoji: '🪨', desc: 'Gain a burst of knowledge — metallic fragments reveal secrets.',
              effect: { type: 'gain', res: 'knowledge', amount: 1000 } }
        ]
    }
];
