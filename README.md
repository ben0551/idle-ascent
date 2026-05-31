# Idle Ascent

An incremental/idle game about the rise of civilization from creation to Type II civilization.

## Quick Start

Open `index.html` in a browser to play. The game auto-saves to localStorage.

## Game Mechanics

### Core Loop
- **Click to Gather**: Manual production (1 pop/click)
- **Buy Buildings**: Workers that generate population passively
- **Purchase Upgrades**: Multipliers and quality-of-life improvements
- **Age Progression**: Unlock new content as population grows

### Ages System
Game progresses through 8 ages, each unlocking new buildings and upgrades:
1. Stone Age (0 pop)
2. Bronze Age (100 pop)
3. Iron Age (1k pop)
4. Medieval Age (10k pop)
5. Renaissance (100k pop)
6. Industrial Age (1M pop)
7. Information Age (10M pop)
8. Type II Civilization (100M pop)

### Buildings
Each building generates population per second. Cost increases by 1.15x per owned unit (exponential scaling).

Current buildings:
- Hunter: 1 pop/s (10 cost)
- Farmer: 5 pop/s (100 cost) - unlocks at Bronze Age
- Blacksmith: 25 pop/s (500 cost) - unlocks at Iron Age
- Scholar: 100 pop/s (5k cost) - unlocks at Medieval Age
- Factory: 500 pop/s (100k cost) - unlocks at Industrial Age
- Data Center: 2.5k pop/s (10M cost) - unlocks at Information Age

### Upgrades
One-time purchases that apply permanent multipliers. Can apply to specific buildings or globally.

Current upgrades:
- Discover Fire: +50% Hunter efficiency (50 cost)
- Craft Tools: +25% global efficiency (200 cost)
- Agriculture Revolution: +100% Farmer efficiency (500 cost)
- Metal Working: +100% Blacksmith efficiency (5k cost)
- Written Language: +100% Scholar efficiency (50k cost)
- Mechanization: +100% Factory efficiency (1M cost)

## Architecture

### File Structure
```
index.html    - Main HTML markup
style.css     - All styling (dark theme with golden accents)
game.js       - Game logic and state management
README.md     - This file
```

### Game State (game.js)

```javascript
game = {
    population: number,         // Current population
    totalEarned: number,        // Lifetime population for prestige
    startTime: timestamp,       // Session start for time tracking
    productionPerSecond: number,// Current generation rate
    currentAgeIndex: number,    // Which age we're in
    buildings: {},              // Owned count of each building
    upgrades: {}                // Purchased upgrades (boolean map)
}
```

### Key Functions

**Game Loop**
- `startGameLoop()`: Updates production 10x/s, calculates passive income
- `updateUI()`: Refreshes all display elements

**Economy**
- `purchaseBuilding(key)`: Subtract cost, increment owned count
- `calculateBuildingCost(key)`: Exponential cost with scaling factor 1.15
- `purchaseUpgrade(id)`: Mark upgrade as purchased
- `updateAge()`: Promote to next age when population threshold crossed

**Persistence**
- `saveGame()`: Write game state to localStorage
- `loadGame()`: Load saved game on startup

**Progression**
- Buildings unlock at specific population thresholds
- Upgrades similarly gated by population
- No hard gates — can always make progress

## TODO

### Content Additions
- [ ] More buildings (residential, entertainment, government, etc.)
- [ ] More upgrades with interesting combinations
- [ ] Building/upgrade flavor text aligned with age theme
- [ ] Sound effects (toggle in settings)
- [ ] Visual feedback for major milestones

### Gameplay Features
- [ ] **Prestige System**: Reset to gain permanent multiplier based on total earned
- [ ] **Achievements**: Unlock badges for milestones
- [ ] **Ascension Mechanics**: Soft reset with carry-over bonuses
- [ ] **Building Synergies**: Upgrades that affect multiple buildings uniquely
- [ ] **Mini-events**: Random population boosts or production penalties

### UI/UX
- [ ] Settings panel (volume, autosave, theme)
- [ ] Keyboard shortcuts (number keys to buy buildings)
- [ ] Number formatting polish (1.5k vs 1500)
- [ ] Notification system (milestone popups)
- [ ] Dark/light theme toggle
- [ ] Mobile responsiveness polish

### Technical
- [ ] Cloud save sync (optional)
- [ ] Export/import save files
- [ ] Performance optimization for late game
- [ ] Unit tests for cost calculations
- [ ] Refactor: extract constants to config file

### Balance & Tuning
- [ ] Playtest early game pacing (first 10 minutes)
- [ ] Playtest mid game (1k-100k population)
- [ ] Playtest late game (10M+ population)
- [ ] Adjust building costs if progression feels too slow/fast
- [ ] Review upgrade timing — unlocks should feel rewarding
- [ ] Cost/benefit analysis for prestige multiplier values

### Analytics & Feedback
- [ ] Track: average session length
- [ ] Track: which buildings are purchased most
- [ ] Track: which upgrades feel mandatory vs optional
- [ ] Iterate on weak content based on telemetry

## Design Decisions

### Single-Pass Production Calculation
Buildings apply multipliers in this order:
1. Global multipliers (Craft Tools)
2. Building-specific multipliers (building upgrades)

This keeps math simple and predictable.

### No Prestige Yet
Prestige is scaffolded but not implemented. Add once core loop feels fun (after balance tuning).

### Age-Based Content Gating
Rather than time-gating, content unlocks based on population thresholds. This lets aggressive clickers progress faster, encouraging engagement.

### localStorage Persistence
No backend required for MVP. If adding cloud save later, use this as fallback.

## Notes for Future Dev

- Theme is "humanity's journey to galactic civilization" — keep building names and descriptions aligned
- Cost scaling (1.15x) feels right for browser games — adjust if progression feels wrong
- Production updates every 100ms (10x/s) for smooth feel without server load
- All numbers are integers except production rate (shown as float)
