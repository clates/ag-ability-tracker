# AG Ability Tracker

An [Alt1 Toolkit](https://runeapps.org/alt1) overlay plugin that tracks the Arch-Glacor's move rotation during combat in [RuneScape](https://runescape.com).

## About

This plugin monitors the in-game chat during Arch-Glacor encounters and displays which mechanics have been used in the current rotation. It helps players predict upcoming mechanics and provides a visual overlay showing the status of each ability.

### Related Links

- **[Alt1 Toolkit](https://runeapps.org/alt1)** - The toolkit platform this plugin runs on
- **[RuneScape](https://runescape.com)** - The game this plugin is designed for
- **[Arch-Glacor Wiki](https://runescape.wiki/w/Arch-Glacor#Mechanics)** - Detailed information about the boss mechanics

## Features

- **Real-time Ability Tracking**: Monitors chat messages to detect which Arch-Glacor mechanics have been used
- **Visual Overlay**: Displays icons for all five mechanics (Flurry, Pillars, Exposed Core, Cannon, Minions)
- **Rotation Reset Detection**: Automatically resets when a full rotation is complete or when the boss is defeated
- **Double Cannon Warning**: Alerts when all other mechanics have been used (cannon will repeat)
- **Manual Reset**: Reset the tracker at any time using the in-app button or Alt+1 hotkey
- **Victory Screen**: Shows a celebratory message with random loot image when Arch-Glacor is defeated

## Installation

1. Download and install [Alt1 Toolkit](https://runeapps.org/alt1) if you haven't already
2. Navigate to the [plugin page](https://clates.github.io/ag-ability-tracker)
3. Click "Add App" in Alt1 when prompted

## Usage

1. Start the plugin before entering an Arch-Glacor encounter
2. The overlay will automatically start tracking when the boss spawns
3. Grayed-out and blurred icons indicate mechanics that have already been used
4. Clear icons show mechanics that haven't been used yet in the current rotation
5. When all mechanics except cannon have been used, a tooltip will warn about the double cannon
6. Use the "Reset the rotation (alt+1)" button or press Alt+1 to manually reset the tracker

## Development

### Technologies Used

- **[React](https://react.dev/)** (v18.2.0) - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** (v4.7.4) - Type-safe JavaScript
- **[Webpack](https://webpack.js.org/)** (v5.65.0) - Module bundler
- **[Alt1 SDK](https://www.npmjs.com/package/@alt1/base)** - Alt1 Toolkit integration libraries
  - `@alt1/base` - Core Alt1 functionality
  - `@alt1/chatbox` - Chat message reading
  - `@alt1/webpack` - Webpack configuration helpers
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework (via classes)

### Building

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Watch mode for development
npm run watch
```

The built files will be output to the `./build/` directory.

### Project Structure

- `src/App.tsx` - Main React component with game logic
- `src/abilityLineMap.ts` - Chat message fragments for ability detection
- `src/useChat.tsx` - Custom hook for reading chat messages
- `src/useImageFinder.tsx` - Custom hook for detecting Exposed Core via image recognition
- `src/appconfig.json` - Alt1 app configuration
- `src/assets/` - Images for ability icons and UI elements

## How It Works

The plugin uses Alt1's chat reading capabilities to detect when specific Arch-Glacor mechanics are activated by matching chat message patterns. It also uses image recognition to detect the Exposed Core mechanic (Glacyte of Enduring Ice/"hoary chill"). The UI updates in real-time to show which mechanics have been used in the current rotation.

## License

MIT

## Author

[clates](https://github.com/clates)
