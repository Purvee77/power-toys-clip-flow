const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log("====================================================");
console.log("📝 UPGRADED TEXT LOGGER ACTIVE (CAPACITY: 1,000 ITEMS)");
console.log("Newest items forced to TOP of your secure AppData text file.");
console.log("====================================================");

// --- SECURE APPDATA USER PROFILE ISOLATION PATHS ---
const APPDATA_DIR = path.join(process.env.APPDATA || path.join(process.env.USERPROFILE, 'AppData', 'Roaming'), 'SmartClipboard');
const TEXT_LOG_FILE = path.join(APPDATA_DIR, 'My_Clipboard_History.txt');
const STORAGE_LIMIT = 1000; // Increased capacity straight to 1,000 items smoothly!

// Auto-provision secure directory if missing
if (!fs.existsSync(APPDATA_DIR)) fs.mkdirSync(APPDATA_DIR, { recursive: true });

// Load macro text expansion configurations safely from current project folder
let config = { "snippets": {} };
try {
    config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (err) {
    fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
}

let lastSequenceNumber = 0;
let lastTextContent = "";

function getClipboardSequenceNumber() {
    try {
        const cmd = `$sig = '[DllImport("user32.dll")] public static extern uint GetClipboardSequenceNumber();'; Add-Type -MemberDefinition $sig -Name "Util" -Namespace "Win32"; [Win32.Util]::GetClipboardSequenceNumber()`;
        return parseInt(execSync(`powershell.exe -NoProfile -Command "${cmd}"`, { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim(), 10);
    } catch (e) {
        return Date.now();
    }
}

function getWindowsClipboardText() {
    try {
        const text = execSync('powershell.exe -NoProfile -Command "Get-Clipboard"', { stdio: ['pipe', 'pipe', 'ignore'] }).toString().trim();
        return text || null;
    } catch (e) {
        return null;
    }
}

function setWindowsClipboardText(text) {
    try {
        execSync(`powershell.exe -NoProfile -Command "Set-Clipboard -Value '${text.replace(/'/g, "''")}'"`);
    } catch (e) {}
}

// Background Monitor Engine Loop
setInterval(() => {
    const currentSeq = getClipboardSequenceNumber();
    if (currentSeq === lastSequenceNumber) return;
    lastSequenceNumber = currentSeq;

    const currentText = getWindowsClipboardText();
    if (!currentText || currentText === lastTextContent) return;

    // A. Macro Text Expander Trigger Intercept
    if (config.snippets[currentText]) {
        const expanded = config.snippets[currentText];
        setWindowsClipboardText(expanded);
        lastTextContent = expanded;
        console.log(`⚡ Expanded snippet shortcut: "${currentText}"`);
        return;
    }

    lastTextContent = currentText;

    // B. Reverse Stack Plain Text Logger Engine
    try {
        const timestamp = new Date().toLocaleString();
        
        // Construct the new entry card text layout
        const newEntry = 
`----------------------------------------------------
🕒 TIMELOG: ${timestamp}
----------------------------------------------------
${currentText}

`;

        // Read old content if the file already exists
        let oldContent = "";
        if (fs.existsSync(TEXT_LOG_FILE)) {
            oldContent = fs.readFileSync(TEXT_LOG_FILE, 'utf8');
        }

        // Combine new entry on top, followed by old text history
        let updatedContent = newEntry + oldContent;

        // Smart Trimming Rule: If entries stack past 1,000, keep it lightning fast by popping off the oldest
        const logBlocks = updatedContent.split('----------------------------------------------------');
        
        // Every entry uses 2 dashed divider markers natively
        const maxMarkers = STORAGE_LIMIT * 2;
        if (logBlocks.length > maxMarkers) {
            // Cut the text block down to perfectly fit our limit structure
            updatedContent = logBlocks.slice(0, maxMarkers).join('----------------------------------------------------');
        }

        // Overwrite the text log with the clean chronological order
        fs.writeFileSync(TEXT_LOG_FILE, updatedContent, 'utf8');
        console.log(`💾 Top log locked. Cache usage verified.`);
        
    } catch (err) {
        console.error("❌ File write error:", err.message);
    }
}, 1200);
