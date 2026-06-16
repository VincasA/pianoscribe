# Epics, Sprints & Development Versions
## PianoScribe — TikTok Piano Transcription App
**Version:** 0.1 (Draft)
**Last Updated:** June 2026
**Sprint Length:** 1 week
**Methodology:** Agile — vertical slices, one working feature per sprint

---

## Development Versions Overview

| Version | Name | Goal |
|---|---|---|
| v0.1 | Core Pipeline | URL in → MIDI file out. No UI. Proves the pipeline works. |
| v0.2 | Visible Output | Sheet music rendered in browser + basic MIDI playback |
| v0.3 | Library | Save, retrieve, and export transcriptions |
| v0.4 | PWA + Mobile | Installable, mobile-optimised, polished UI |
| v1.0 | Production | Deployed, authenticated, error-handled, publicly usable |

---

## Epics

### Epic 1 — Infrastructure & Project Setup
Set up the development environment, project scaffolding, CI basics, and communication between frontend and backend.

### Epic 2 — Audio Extraction Pipeline
Accept a TikTok URL, download the audio, and isolate the piano signal using source separation.

### Epic 3 — Piano Transcription
Convert isolated piano audio to a MIDI file using Basic Pitch, and apply rhythm quantization.

### Epic 4 — Sheet Music Rendering
Render the MIDI as readable sheet music in the browser using VexFlow, and generate a downloadable PDF using LilyPond server-side.

### Epic 5 — MIDI Playback & Visualizer
Play back the transcribed MIDI in the browser using Tone.js, with a falling-note visualizer synced to playback.

### Epic 6 — Library & Storage
Authenticated user library — save, name, retrieve, delete transcriptions. Store MIDI and PDF files.

### Epic 7 — PWA & Mobile Experience
Make the app installable as a PWA on iOS and Android, fully responsive, with an offline-capable shell.

### Epic 8 — Error Handling, Polish & Deployment
Graceful error states for every pipeline failure point, loading states, quality indicators, final deployment.

---

## Sprints

---

### Sprint 1 — Project Scaffolding
**Epic:** Epic 1
**Version target:** v0.1
**Goal:** Both the frontend and backend repos exist, run locally, and can communicate.

**Stories:**
- As a developer, I can run the Next.js frontend locally on port 3000
- As a developer, I can run the FastAPI backend locally on port 8000
- As a developer, the frontend can send a test POST request to the backend and receive a response
- As a developer, environment variables are configured for both services (`.env.example` committed)
- As a developer, the project folder structure is defined and documented in README

**Definition of done:** `GET /health` on the backend returns 200, and the Next.js page confirms the backend is reachable.

---

### Sprint 2 — Audio Download
**Epic:** Epic 2
**Version target:** v0.1
**Goal:** Given a TikTok URL, the backend downloads and returns a clean audio file.

**Stories:**
- As a developer, I can call `POST /transcribe` with a TikTok URL and receive a job ID
- As a developer, the backend validates the URL is a TikTok link before processing
- As a developer, yt-dlp downloads the audio from the TikTok URL to a temp directory
- As a developer, the downloaded audio is converted to a standard 44.1kHz WAV file
- As a developer, invalid or expired TikTok URLs return a clear error response

**Definition of done:** A valid TikTok URL submitted to the API results in a WAV file on disk.

---

### Sprint 3 — Source Separation
**Epic:** Epic 2
**Version target:** v0.1
**Goal:** The downloaded audio is processed by Demucs to isolate the piano stem.

**Stories:**
- As a developer, the WAV file is passed through Demucs and returns an isolated instrument stem
- As a developer, the Demucs model is configured to extract the "other" stem (piano/instruments)
- As a developer, separated audio is saved to a job-specific temp folder
- As a developer, processing time is logged per job for performance monitoring

**Definition of done:** A clean audio file containing only the piano signal exists on disk after processing.

---

### Sprint 4 — MIDI Transcription
**Epic:** Epic 3
**Version target:** v0.1
**Goal:** The isolated piano audio is transcribed to a MIDI file.

**Stories:**
- As a developer, Basic Pitch processes the separated audio and outputs a raw MIDI file
- As a developer, a quantization step snaps note onsets to a rhythmic grid (selectable resolution: 1/8, 1/16)
- As a developer, the MIDI file is saved to the job folder and its path is returned in the job status
- As a developer, `GET /job/{id}` returns the current status and output file paths
- As a developer, jobs are cleaned up from disk after 24 hours

**Definition of done:** Submitting a clean solo piano TikTok URL produces a playable MIDI file.

---

### Sprint 5 — Sheet Music Rendering
**Epic:** Epic 4
**Version target:** v0.2
**Goal:** The MIDI file is parsed and displayed as sheet music in the browser.

**Stories:**
- As a user, I can see sheet music rendered in the browser after transcription completes
- As a developer, the MIDI is parsed into a note data structure consumable by VexFlow
- As a developer, VexFlow renders treble and bass clef staves from the note data
- As a developer, the score scrolls horizontally or paginates for longer pieces
- As a user, I can download the sheet music as a PDF
- As a developer, LilyPond on the server generates a PDF from the MIDI and returns a download link

**Definition of done:** A completed transcription displays readable sheet music in the browser and produces a downloadable PDF.

---

### Sprint 6 — MIDI Playback
**Epic:** Epic 5
**Version target:** v0.2
**Goal:** Users can play back the transcribed MIDI in the browser with playback controls.

**Stories:**
- As a user, I can press Play and hear the transcribed MIDI played back using a piano sound
- As a user, I can pause and resume playback
- As a user, I can seek to any point in the piece using a progress bar
- As a user, I can adjust playback speed (0.5×, 0.75×, 1×)
- As a developer, Tone.js is initialised on user gesture (required by browser audio policy)

**Definition of done:** MIDI plays back cleanly in Chrome and Safari on both desktop and mobile.

---

### Sprint 7 — Falling-Note Visualizer
**Epic:** Epic 5
**Version target:** v0.2
**Goal:** A falling-note visualizer displays which keys are playing in sync with MIDI playback.

**Stories:**
- As a user, I see a piano keyboard at the bottom of the visualizer
- As a user, coloured bars fall from the top of the screen toward the keyboard keys in sync with the MIDI
- As a user, the visualizer pauses and resumes in sync with the playback controls
- As a developer, the visualizer is rendered on an HTML Canvas element for performance
- As a user, I can toggle between sheet music view and visualizer view

**Definition of done:** The visualizer plays in sync with Tone.js with no visible timing drift on a 60fps display.

---

### Sprint 8 — User Authentication
**Epic:** Epic 6
**Version target:** v0.3
**Goal:** Users can create an account and log in, with sessions persisting across devices.

**Stories:**
- As a user, I can sign up with an email and password
- As a user, I can log in and my session persists across page refreshes
- As a user, I can log out
- As a developer, authentication is handled via Supabase Auth (JWT-based)
- As a developer, all library endpoints require a valid session token

**Definition of done:** A user can sign up, log in, and their identity is attached to subsequent API calls.

---

### Sprint 9 — Library: Save & Retrieve
**Epic:** Epic 6
**Version target:** v0.3
**Goal:** Users can save transcriptions to a personal library and retrieve them.

**Stories:**
- As a user, I can save a completed transcription to my library with a title
- As a user, I can view all my saved transcriptions in a Library tab
- As a user, I can open a saved transcription and see the sheet music and playback
- As a developer, each library entry stores: title, TikTok URL, MIDI path, PDF path, created_at
- As a user, I can rename a saved transcription
- As a user, I can delete a saved transcription from my library

**Definition of done:** A user can save, browse, open, rename, and delete transcriptions from their library.

---

### Sprint 10 — Export
**Epic:** Epic 6
**Version target:** v0.3
**Goal:** Users can download their transcriptions as PDF and MIDI files.

**Stories:**
- As a user, I can download the sheet music as a PDF from any saved transcription
- As a user, I can download the MIDI as a `.mid` file from any saved transcription
- As a developer, download endpoints are scoped to the authenticated user's own library entries
- As a developer, files are served with correct Content-Type and Content-Disposition headers

**Definition of done:** Both PDF and MIDI files download correctly on desktop and mobile browsers.

---

### Sprint 11 — PWA & Responsive UI
**Epic:** Epic 7
**Version target:** v0.4
**Goal:** The app is installable as a PWA and fully usable on mobile.

**Stories:**
- As a user on iOS Safari, I can add PianoScribe to my home screen and it opens as a full-screen app
- As a user on Android Chrome, I see an "Install App" prompt and can install PianoScribe
- As a user on mobile, all screens are readable and tappable at 375px viewport width
- As a developer, a Web App Manifest is configured with correct icons and theme colours
- As a developer, a service worker caches the app shell for fast repeat loads
- As a user, the app loads a skeleton UI immediately even on slow connections

**Definition of done:** App passes Lighthouse PWA audit and installs on both iOS Safari and Android Chrome.

---

### Sprint 12 — Error Handling & Edge Cases
**Epic:** Epic 8
**Version target:** v1.0
**Goal:** Every failure point in the pipeline has a graceful, user-friendly error state.

**Stories:**
- As a user, submitting an invalid TikTok URL shows a clear error message, not a crash
- As a user, submitting a TikTok video with no piano (e.g. a dance video) shows a "no piano detected" message
- As a user, if transcription takes longer than 90 seconds, I see a timeout message and can retry
- As a developer, all pipeline exceptions are caught and mapped to user-friendly error codes
- As a developer, errors are logged server-side with job ID and stack trace
- As a user, a confidence indicator on the sheet music warns me if transcription quality is low

**Definition of done:** All identified failure cases return a user-friendly message. No raw errors are shown to the user.

---

### Sprint 13 — Performance & Deployment
**Epic:** Epic 8
**Version target:** v1.0
**Goal:** The app is deployed to production and meets performance targets.

**Stories:**
- As a developer, the FastAPI backend is deployed to Railway with environment variables configured
- As a developer, the Next.js frontend is deployed to Vercel with production environment variables
- As a developer, the Supabase database and storage bucket are configured for production
- As a developer, the full pipeline completes in under 60 seconds for a 60-second TikTok clip
- As a developer, the Demucs model is cached on startup and not re-loaded per request
- As a user, the app is accessible at a public URL

**Definition of done:** A fresh user can visit the public URL, paste a TikTok link, and receive sheet music end-to-end on both mobile and desktop.

---

## Version Feature Summary

### v0.1 — Core Pipeline (Sprints 1–4)
- Project scaffolded, frontend and backend running
- TikTok URL → WAV download → piano isolation → MIDI output
- No UI — validated via API calls only
- Proves the core pipeline is technically feasible

### v0.2 — Visible Output (Sprints 5–7)
- Basic Next.js UI with URL input field
- Sheet music displayed in browser via VexFlow
- MIDI playback via Tone.js (play/pause/seek/speed)
- Falling-note visualizer on Canvas
- PDF download available

### v0.3 — Library (Sprints 8–10)
- User sign-up and login via Supabase Auth
- Save/retrieve/rename/delete transcriptions
- Personal library tab
- MIDI and PDF export

### v0.4 — PWA & Mobile (Sprint 11)
- Installable as PWA on iOS and Android
- Fully responsive UI at all screen sizes
- App shell cached for fast loads

### v1.0 — Production (Sprints 12–13)
- All error states handled gracefully
- Confidence indicator on transcriptions
- Deployed to Vercel + Railway
- Meets 60-second pipeline performance target
- Publicly accessible
