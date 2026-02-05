# AI Chat Hub

A cross-platform desktop application with an Opera-style vertical icon sidebar for quick access to all major free AI chat services.

![AI Chat Hub Preview](preview.png)

## Features

- 🎨 **Opera-style vertical sidebar** - Clean, modern icon-based navigation
- 🤖 **8 Free AI Services** - ChatGPT, Claude, Gemini, Copilot, Perplexity, DeepSeek, HuggingChat, You.com
- 🖥️ **Cross-platform** - Works on Linux, Windows, and macOS
- ⌨️ **Keyboard shortcuts** - Ctrl+1 through Ctrl+8 to switch services
- 🌙 **Premium dark theme** - Glassmorphism design with smooth animations
- ⚡ **Lightweight** - Built with Tauri for minimal resource usage

## AI Services Included

| Service | Shortcut |
|---------|----------|
| ChatGPT | Ctrl+1 |
| Claude | Ctrl+2 |
| Gemini | Ctrl+3 |
| Microsoft Copilot | Ctrl+4 |
| Perplexity | Ctrl+5 |
| DeepSeek | Ctrl+6 |
| HuggingChat | Ctrl+7 |
| You.com | Ctrl+8 |

## Requirements

- [Node.js](https://nodejs.org/) (v18 or later)
- [Rust](https://rustup.rs/) (latest stable)
- Platform-specific dependencies for Tauri (see [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/))

### Linux Dependencies (Debian/Ubuntu)

```bash
sudo apt update
sudo apt install libwebkit2gtk-4.1-dev build-essential curl wget file \
  libxdo-dev libssl-dev libayatana-appindicator3-dev librsvg2-dev
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-chat-hub.git
   cd ai-chat-hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode:
   ```bash
   npm run tauri dev
   ```

4. Build for production:
   ```bash
   npm run tauri build
   ```

## Build Outputs

After building, you'll find platform-specific installers in:

- **Linux**: `src-tauri/target/release/bundle/`
  - `.deb` package
  - `.rpm` package  
  - `.AppImage` portable
- **Windows**: `src-tauri/target/release/bundle/msi/`
- **macOS**: `src-tauri/target/release/bundle/dmg/`

## Usage

1. Launch the application
2. Click on any AI service icon in the left sidebar
3. Use the service directly in the embedded webview
4. Switch between services anytime using sidebar icons or keyboard shortcuts

## License

MIT License
