# gas-simple-uploader

A Google Apps Script web app for uploading files to Google Drive, built with TypeScript and deployed via `clasp`.

## How It Works

- `doGet` serves `index.html` as a web app
- The frontend base64-encodes the file and calls `uploadFile`
- `uploadFile` saves the file to the folder specified by the `UPLOAD_FOLDER_ID` script property

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up clasp

```bash
# Install if needed
pnpm install -g @google/clasp

# Authenticate
clasp login

# Create a new project or connect to an existing one
clasp create --type webapp --title "simple-uploader"
# or
clasp clone <SCRIPT_ID>
```

Make sure `.clasp.json` has `rootDir` set to `dist`:

```json
{ "scriptId": "<YOUR_SCRIPT_ID>", "rootDir": "dist" }
```

### 3. Set the upload folder

Add a script property in the GAS editor (Project Settings → Script Properties):

| Key | Value |
|---|---|
| `UPLOAD_FOLDER_ID` | The ID of the target Google Drive folder |

## Workflow

```bash
# Build (outputs to dist/)
pnpm build

# Push to GAS
clasp push

# Deploy as web app
clasp deploy --description "update"
```

## Directory Layout

```
src/
  appsscript.json   # GAS manifest
  doGet.ts          # Web app entry point
  index.html        # Uploader UI
  uploadFile.ts     # Drive upload logic
dist/               # Build output (gitignored)
```

## Scripts

| Command | Description |
|---|---|
| `pnpm build` | Compile TypeScript to `dist/` and copy static assets |
| `pnpm fix` | Lint, format, and auto-fix with Biome |
