// AI Chat Hub - Main Application Logic

// AI Services Configuration
const AI_SERVICES = {
  chatgpt: {
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    color: '#10a37f'
  },
  claude: {
    name: 'Claude',
    url: 'https://claude.ai',
    color: '#cc785c'
  },
  gemini: {
    name: 'Gemini',
    url: 'https://gemini.google.com',
    color: '#4285f4'
  },
  copilot: {
    name: 'Microsoft Copilot',
    url: 'https://copilot.microsoft.com',
    color: '#00bcf2'
  },
  perplexity: {
    name: 'Perplexity',
    url: 'https://perplexity.ai',
    color: '#20b2aa'
  },
  deepseek: {
    name: 'DeepSeek',
    url: 'https://chat.deepseek.com',
    color: '#00d4aa'
  },
  huggingchat: {
    name: 'HuggingChat',
    url: 'https://huggingface.co/chat',
    color: '#ffcc00'
  },
  you: {
    name: 'You.com',
    url: 'https://you.com',
    color: '#5436da'
  }
};

// DOM Elements
const sidebar = document.getElementById('sidebar');
const aiFrame = document.getElementById('ai-frame');
const serviceName = document.getElementById('service-name');
const loadingOverlay = document.getElementById('loading-overlay');
const sidebarButtons = document.querySelectorAll('.sidebar-btn[data-service]');

// Window Controls
const minimizeBtn = document.getElementById('minimize-btn');
const maximizeBtn = document.getElementById('maximize-btn');
const closeBtn = document.getElementById('close-btn');

// Current active service
let currentService = 'chatgpt';

// Initialize the application
function init() {
  // Set up sidebar button click handlers
  sidebarButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.dataset.service;
      if (service && service !== currentService) {
        switchService(service);
      }
    });
  });

  // Set up keyboard shortcuts (Ctrl+1 through Ctrl+8)
  document.addEventListener('keydown', handleKeyboardShortcuts);

  // Set up iframe load events
  aiFrame.addEventListener('load', () => {
    hideLoading();
  });

  // Set up window controls (Tauri specific)
  setupWindowControls();

  // Load initial service
  switchService('chatgpt');
}

// Switch to a different AI service
function switchService(serviceId) {
  const service = AI_SERVICES[serviceId];
  if (!service) return;

  // Update current service
  currentService = serviceId;

  // Show loading overlay
  showLoading();

  // Update active button state
  sidebarButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.service === serviceId);
  });

  // Update service name in titlebar
  serviceName.textContent = service.name;

  // Load the new URL
  aiFrame.src = service.url;

  // Store last used service
  try {
    localStorage.setItem('lastService', serviceId);
  } catch (e) {
    // Ignore storage errors
  }
}

// Show loading overlay
function showLoading() {
  loadingOverlay.classList.add('visible');
}

// Hide loading overlay
function hideLoading() {
  loadingOverlay.classList.remove('visible');
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
  // Ctrl/Cmd + number to switch services
  if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '8') {
    e.preventDefault();
    const serviceIds = Object.keys(AI_SERVICES);
    const index = parseInt(e.key) - 1;
    if (index < serviceIds.length) {
      switchService(serviceIds[index]);
    }
  }
}

// Setup window controls for Tauri
async function setupWindowControls() {
  // Check if Tauri is available
  if (window.__TAURI__) {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    const appWindow = getCurrentWindow();

    minimizeBtn?.addEventListener('click', () => appWindow.minimize());
    maximizeBtn?.addEventListener('click', async () => {
      const isMaximized = await appWindow.isMaximized();
      if (isMaximized) {
        appWindow.unmaximize();
      } else {
        appWindow.maximize();
      }
    });
    closeBtn?.addEventListener('click', () => appWindow.close());
  } else {
    // Hide window controls if not in Tauri (e.g., browser testing)
    const windowControls = document.querySelector('.window-controls');
    if (windowControls) {
      windowControls.style.display = 'none';
    }
  }
}

// Restore last used service
function restoreLastService() {
  try {
    const lastService = localStorage.getItem('lastService');
    if (lastService && AI_SERVICES[lastService]) {
      return lastService;
    }
  } catch (e) {
    // Ignore storage errors
  }
  return 'chatgpt';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
