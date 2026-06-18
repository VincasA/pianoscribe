# PianoScribe

> Paste a TikTok link containing piano playing → get sheet music and MIDI playback.

## Project structure

```
pianoscribe/
├── context/                  # Planning docs (PRD, epics, sprints)
│   ├── PRD.md
│   └── EPICS_AND_SPRINTS.md
└── src/
    ├── frontend/             # Next.js 14 (App Router) — runs on :3000
    │   ├── app/              # Routes and layouts
    │   ├── lib/              # API client helpers
    │   ├── public/           # Static assets
    │   ├── .env.example      # Copy to .env.local and fill in values
    │   └── package.json
    └── backend/              # FastAPI (Python) — runs on :8000
        ├── main.py           # App entrypoint and route definitions
        ├── .env.example      # Copy to .env and fill in values
        ├── requirements.txt  # Pinned dependencies
        └── pyproject.toml
```

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.11+ |
| Audio download | yt-dlp |
| Source separation | Demucs (Meta) |
| Transcription | Basic Pitch (Spotify) |
| Sheet music | VexFlow (browser), LilyPond (PDF) |
| MIDI playback | Tone.js |
| Auth & DB | Supabase (Postgres + Auth) |
| Hosting | Vercel (frontend), Railway (backend) |

## Getting started

### Frontend

```bash
cd src/frontend
cp .env.example .env.local
npm install
npm run dev        # http://localhost:3000
```

### Backend

```bash
cd src/backend
cp .env.example .env
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000   # http://localhost:8000
```

### Verify the connection

With both services running, open [http://localhost:3000](http://localhost:3000) and click **Ping backend**. You should see `Backend says: pong`.

Alternatively, confirm the backend is up directly:

```bash
curl http://localhost:8000/health
# {"status":"ok"}
```

## Development workflow

- **Epic branches** (`epic/N-name`) track each epic off `development`
- **Feature branches** (`feature/PIAN-N-description`) are cut from the epic branch
- PRs target `development` and are merged after the implementation is verified
