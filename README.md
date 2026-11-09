# PowerToys ClipFlow — High-Efficiency Local Text Logger & Macro Engine

An optimized, secure, user-isolated clipboard logging and macro expansion engine built natively for the Windows Shell architecture. By interfacing directly with the Windows API kernel via `User32.dll` and leveraging PowerShell subsystems, ClipFlow provides persistent top-down text logging with near-zero memory and CPU overhead.

---

## 🚀 Key Architectural Features

### 1. Kernel-Level Deduplication Guard
Traditional clipboard monitors poll text streams using heavy interval data parsing, causing system stutter and duplicate logs—especially during multi-format screenshot conversions. ClipFlow completely mitigates this by calling `GetClipboardSequenceNumber` directly from `User32.dll`. The background loop instantly exits unless the OS kernel increments this specific transaction sequence pointer, reducing idle CPU utilization to 0%.

### 2. Physical Asset Size Fingerprinting
To prevent write-loop caching, ClipFlow profiles structural file metrics natively. If an incoming clipboard asset matches the exact physical sizing footprint of the previously logged entry, the script drops the event and purges the duplicate instantly at the disk boundary.

### 3. Chronological Reverse-Stack Logging
Data is committed to a secure on-device plain text log file using a reverse-stack sequence layout. Fresh clipboard contents are piped directly onto the absolute top line of the text journal file, seamlessly pushing older chronological records down. The system enforces a strict 1,000-block threshold limit to prevent runtime file bloating.

### 4. Enterprise-Grade Account Isolation
The utility automatically binds deployment assets into the local Windows environment variable user space (`%APPDATA%\SmartClipboard\`). This structural segregation anchors the history logs deep inside the individual user's profile slot, natively leveraging standard Windows file permissions to prevent cross-account credential or data snooping.

---

## 📁 System Directory Layout

```text
smart-clipboard/
├── index.js               # Core Background Event Loop & Windows API Pipelines
├── launch.vbs             # Suppressed Subsystem Launcher (Forces 100% Invisible Boot)
├── config.json            # Extensible Context-Aware Keyword Expansion Dictionary
├── build.js               # Machine Code Compilation Tool (Compiles to Standalone Binary)
├── installer.js           # Production Build Automated Single-Click Package Provisioner
└── README.md              # Software Engineering Technical Specification Sheet
```

---

## 🛠️ Installation & Compilation

### Prerequisites
* Windows 10 / 11 (x64 Architecture)
* Node.js runtime environment (v16+ recommended for local compilation assembly)

### 1. Production Assembly
To bundle the complete Node.js environment, dependencies, and execution script into an independent, standalone machine binary (`smart-clipboard-service.exe`), run the compilation builder script:
```powershell
node build.js
```

### 2. Deployment Generation
To automatically compile the single-click client setup utility (`Setup_Install.bat`), execute the packager script:
```powershell
node installer.js
```

### 3. End-User Installation
Users simply unpack the distribution `.zip` file package containing the artifacts and double-click:
```text
Setup_Install.bat
```
The routine automatically handles process management, sets up hidden profile system folders, creates an active keyboard macro listener link, and drops a direct text file shortcut (`My Clipboard History`) right onto their active Windows Desktop.

---

## 🛡️ Privacy, Security, & Compliance
* **100% On-Device Execution:** No web server routes, listening cloud sockets, or network bindings are constructed. All logs remain strictly offline.
* **Anti-Data Leak Design:** Prevents corporate text assets, API tokens, or source blocks from slipping into public internet cloud clipboards or remote AI telemetry data streams.
* **Zero Administration Overhead:** Configured natively to initialize via non-administrative user login shell routines (`Start Menu\Programs\Startup`), eliminating enterprise deployment permission friction.
