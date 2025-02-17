# QuadViewer

QuadViewer is an Electron-based application that divides your screen into four independent quadrants—each hosting a full browser instance. In each quadrant, you can interact with web pages, navigate using a built-in on-demand navigation bar, and enjoy ad blocking through a pre-filled adblock file.

## Features

- **Four Quadrants:** Each quadrant is a separate BrowserView that loads a default webpage.
- **Navigation Bar:**  
  - **Left Section:** Home icon, Globe icon, and an always-visible URL input field.
  - **Middle Section:** Back and Next buttons for navigation.
- **Ad Blocking:** Blocks common ad domains using rules defined in the pre-filled `adblock_patterns.txt` file.
- **Easy Launchers:** Includes both CMD and PowerShell scripts for quick launching.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or later)
- [npm](https://www.npmjs.com/)

## Installation and Usage

1. **Choose Your Installation Location:**  
   Open a terminal (CMD or PowerShell) in the folder where you want the app's folder to be created.

2. **Clone the Repository:**  
   In your terminal, run: git clone https://github.com/yourusername/QuadViewer.git
    This will create a folder named QuadViewer in your selected installation directory.

3. **Install dependencies:**
    Navigate to the QuadViewer folder
    run : npm install

4. **Close the Terminal:**
    After cloning and installing dependencies, close your CMD/PowerShell window.

5. **Navigate to Your Installation Folder:**
    Open File Explorer and go to the folder where the QuadViewer folder was created.

6. **Create a Desktop Shortcut:**

**For CMD Users:**
    Right-click the launch.cmd file inside the QuadViewer folder, then choose "Create shortcut." You can drag the shortcut to your desktop. Double-click this shortcut to launch the app.
**For PowerShell Users:**
    Right-click the launch.ps1 file and select "Run with PowerShell" or create a shortcut by right-clicking and selecting "Create shortcut." Note that for the PowerShell script, you must right-click and choose "Run with PowerShell" if the script isn’t set to run by default.
7. **Launch the App:**
    Double-click your desktop shortcut (or right-click the PowerShell shortcut and select "Run with PowerShell") to start QuadViewer. The app will launch immediately with its default settings.

## Files Overview

**main.js:**
Contains the main process code. A configuration block at the top lets you modify the default page, window width, and height.
**preload.js:**
Injects the navigation bar into each quadrant. The navbar includes Home, Globe, Back, Next buttons, and a URL input field.
**adblock_patterns.txt:**
Pre-filled with ad-blocking rules (in AdBlock syntax) to block common ad domains.
**launch.cmd & launch.ps1:**
Windows command files for launching the app easily. Create shortcuts for these files to launch the app directly.
**package.json:**
Contains metadata and scripts for the Electron app.


## Customization

**To change the default settings, open main.js and modify the configuration block at the top:**

// --------------------------------------------------
// Configuration – Modify these values as desired:
const config = {
  defaultPage: "https://www.google.com/",
  width: 1920,
  height: 1080
};
// --------------------------------------------------
**Adjust these values as needed.**

## Contributing

Contributions, bug reports, and feature requests are welcome!
Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.