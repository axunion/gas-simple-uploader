# GAS TypeScript Template

A minimal template for developing Google Apps Script (GAS) projects with TypeScript. You write code in `src/`, build to `dist/`, and upload only the compiled output via `clasp`.

## 🚀 Features
- TypeScript (target ES6, `module: none` for GAS compatibility)
- Biome for formatting / linting / combined checks
- Sample `doGet` / `doPost` returning JSON
- `appsscript.json` kept in `src/` and copied to `dist/` on build

## 📂 Directory Layout
```
src/
	doGet.ts
	doPost.ts
	appsscript.json   # Edit this while developing
dist/               # Generated build output (recommend git ignore)
```

## 🛠 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Required tools
- Node.js (18+ recommended)
- [clasp](https://github.com/google/clasp)

Install clasp:
```bash
npm install -g @google/clasp
```

### 3. Link a GAS project
1. Authenticate:
	 ```bash
	 clasp login
	 ```
2. Create a new (web app) project:
	 ```bash
	 clasp create --type webapp --title "Your Project Name"
	 ```
	 Or connect to an existing project:
	 ```bash
	 clasp clone <SCRIPT_ID>
	 ```
3. Move (or keep) the generated `appsscript.json` into `src/` (remove any root copy).
4. Ensure `.clasp.json` (at repo root) sets `rootDir` to `dist`. If missing, create:
	 ```json
	 {
		 "scriptId": "<YOUR_SCRIPT_ID>",
		 "rootDir": "dist"
	 }
	 ```

## 🔄 Development Workflow

### Change → Build → Push
```bash
# Transpile TypeScript to dist/ & copy appsscript.json
npm run build

# Upload (only dist/ content is sent)
clasp push
```

### Deploy as Web App
```bash
# Create a new deployment (first time or new version)
clasp deploy --description "feat: initial deploy"

# Update an existing deployment (specify deploymentId)
clasp deploy --deploymentId <DEPLOYMENT_ID> --description "update"
```
After deployment you can call the web app URL with GET/POST to receive JSON.

#### Example (GET)
```bash
curl "https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec?type=sample"
```

#### Example (POST)
```bash
curl -X POST \
	-H 'Content-Type: application/json' \
	-d '{"type":"sample"}' \
	"https://script.google.com/macros/s/<DEPLOYMENT_ID>/exec"
```

## 🔧 Customization
- Time zone: edit `timeZone` in `src/appsscript.json`
- TypeScript config: `tsconfig.json`
- Biome detailed rules: add a root `biome.json`
- Change deployment root: adjust `.clasp.json` `rootDir` and the build copy step

## 🗂 Recommended `.gitignore`
```
dist/
node_modules/
```
Keeping build artifacts out of git avoids noisy diffs.

## 📚 References
- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [clasp Docs](https://github.com/google/clasp)
- [TypeScript](https://www.typescriptlang.org/)
- [Biome](https://biomejs.dev/)

---
Quick Summary:
1. Edit code + `appsscript.json` in `src/`.
2. `npm run build` → outputs to `dist/`.
3. Ensure `.clasp.json` sets `rootDir: "dist"`.
4. `clasp push` then `clasp deploy`.
5. Use Biome scripts for quality.

Happy coding! 🚀
