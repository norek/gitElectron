// ./main.js
const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

let win = null;
require('electron-reload')(__dirname);
app.on('ready', function () {

    // Initialize the window to our specified dimensions
    win = new BrowserWindow({ width: 1000,height: 800, darkTheme: 'true',fullscreen: 'true' });

    // // Specify entry point
    win.loadURL('http://localhost:4200');

    win.webContents.openDevTools();
    

    // Remove window once app is closed
    win.on('closed', function () {
        win = null;
    });

});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});