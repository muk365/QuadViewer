const { app, BrowserWindow, BrowserView, ipcMain, session } = require('electron');
const path = require('path');
const fs = require('fs');

// --------------------------------------------------
// Configuration – Modify these values as desired:
const config = {
  defaultPage: "https://www.google.com/",
  width: 1920,
  height: 1080
};
// --------------------------------------------------

let mainWindow;
let fullscreenView = null; // Holds the BrowserView currently in fullscreen
const originalBounds = {}; // To store each view’s original quadrant bounds

// Function to convert an AdBlock rule (in AdBlock syntax) to an Electron URL match pattern.
function convertPattern(adblockRule) {
  if (adblockRule.startsWith("||") && adblockRule.endsWith("^")) {
    const domain = adblockRule.slice(2, -1);
    return `*://*.${domain}/*`;
  }
  return adblockRule;
}

// Function to load and convert ad block patterns from a text file.
function loadAdBlockPatterns() {
  const patternsFilePath = path.join(__dirname, 'adblock_patterns.txt');
  try {
    const fileContent = fs.readFileSync(patternsFilePath, 'utf8');
    const rawPatterns = fileContent.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    const convertedPatterns = rawPatterns.map(convertPattern);
    return convertedPatterns;
  } catch (err) {
    console.error('Error loading ad block patterns:', err);
    return [];
  }
}

function createWindow() {
  // Calculate quadrant sizes based on configured dimensions.
  const halfWidth = Math.floor(config.width / 2);
  const halfHeight = Math.floor(config.height / 2);

  // Create the main window using the configuration.
  mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Helper function to create a BrowserView.
  function createView(url, bounds) {
    const view = new BrowserView({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true
      }
    });
    mainWindow.addBrowserView(view);
    view.setBounds(bounds);
    originalBounds[view.webContents.id] = bounds;
    view.webContents.loadURL(url);
    // Inject the default page into the BrowserView so the preload script can use it.
    view.webContents.on('dom-ready', () => {
      view.webContents.executeJavaScript(`window.__defaultPage = "${config.defaultPage}"`)
        .catch(err => console.error("Error injecting defaultPage:", err));
    });
    return view;
  }

  // Create four BrowserViews (quadrants) with the default page.
  createView(config.defaultPage, { x: 0, y: 0, width: halfWidth, height: halfHeight });
  createView(config.defaultPage, { x: halfWidth, y: 0, width: halfWidth, height: halfHeight });
  createView(config.defaultPage, { x: 0, y: halfHeight, width: halfWidth, height: halfHeight });
  createView(config.defaultPage, { x: halfWidth, y: halfHeight, width: halfWidth, height: halfHeight });
}

app.whenReady().then(() => {
  const adBlockPatterns = loadAdBlockPatterns();
  if (adBlockPatterns.length > 0) {
    session.defaultSession.webRequest.onBeforeRequest({ urls: adBlockPatterns }, (details, callback) => {
      callback({ cancel: true });
    });
  } else {
    console.warn('No ad block patterns loaded, ad blocking is disabled.');
  }
  
  createWindow();
});

ipcMain.on('toggle-fullscreen', (event) => {
  const senderWCId = event.sender.id;
  const winBounds = mainWindow.getBounds();

  if (!fullscreenView) {
    // Expand the sender view to fullscreen and hide others.
    mainWindow.getBrowserViews().forEach((view) => {
      if (view.webContents.id !== senderWCId) {
        view.setBounds({ x: -1000, y: -1000, width: 0, height: 0 });
      }
    });
    const senderView = mainWindow.getBrowserViews().find(view => view.webContents.id === senderWCId);
    if (senderView) {
      senderView.setBounds({ x: 0, y: 0, width: winBounds.width, height: winBounds.height });
      fullscreenView = senderView;
    }
  } else {
    // Restore all views to their original quadrant bounds.
    mainWindow.getBrowserViews().forEach((view) => {
      const bounds = originalBounds[view.webContents.id];
      if (bounds) {
        view.setBounds(bounds);
      }
    });
    fullscreenView = null;
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
