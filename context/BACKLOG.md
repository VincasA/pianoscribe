# Backlog
## PianoScribe — TikTok Piano Transcription App

Status key: `[ ]` To Do · `[~]` In Progress · `[r]` In Review · `[x]` Done

---

## Epics

| Key | Epic | Sprints | Version |
|---|---|---|---|
| PIAN-1 | Infrastructure & Project Setup | Sprint 1 | v0.1 |
| PIAN-2 | Audio Extraction Pipeline | Sprints 2–3 | v0.1 |
| PIAN-3 | Piano Transcription | Sprint 4 | v0.1 |
| PIAN-4 | Sheet Music Rendering | Sprint 5 | v0.2 |
| PIAN-5 | MIDI Playback & Visualizer | Sprints 6–7 | v0.2 |
| PIAN-6 | Library & Storage | Sprints 8–10 | v0.3 |
| PIAN-7 | PWA & Mobile Experience | Sprint 11 | v0.4 |
| PIAN-8 | Error Handling, Polish & Deployment | Sprints 12–13 | v1.0 |

---

## Sprint 1 — Project Scaffolding
**Epic:** PIAN-1 · **Version:** v0.1  
**Goal:** Both the frontend and backend repos exist, run locally, and can communicate.

- [x] PIAN-9 · Scaffold Next.js frontend running on port 3000
- [x] PIAN-10 · Scaffold FastAPI backend running on port 8000
- [x] PIAN-11 · Frontend communicates with backend via test POST request
- [x] PIAN-12 · Configure and commit environment variables for frontend and backend
- [x] PIAN-13 · Define and document project folder structure in README

**Definition of done:** `GET /health` on the backend returns 200, and the Next.js page confirms the backend is reachable.

---

## Sprint 2 — Audio Download
**Epic:** PIAN-2 · **Version:** v0.1  
**Goal:** Given a TikTok URL, the backend downloads and returns a clean audio file.

- [ ] PIAN-14 · POST /transcribe accepts a TikTok URL and returns a job ID
- [ ] PIAN-15 · Backend validates that submitted URL is a TikTok link
- [ ] PIAN-16 · yt-dlp downloads audio from TikTok URL to a temp directory
- [ ] PIAN-17 · Downloaded audio is converted to 44.1kHz WAV
- [ ] PIAN-18 · Invalid or expired TikTok URLs return a clear error response

**Definition of done:** A valid TikTok URL submitted to the API results in a WAV file on disk.

---

## Sprint 3 — Source Separation
**Epic:** PIAN-2 · **Version:** v0.1  
**Goal:** The downloaded audio is processed by Demucs to isolate the piano stem.

- [ ] PIAN-19 · WAV file is passed through Demucs to produce an isolated instrument stem
- [ ] PIAN-20 · Demucs configured to extract the "other" stem for piano/instruments
- [ ] PIAN-21 · Separated audio is saved to a job-specific temp folder
- [ ] PIAN-22 · Processing time is logged per job for performance monitoring

**Definition of done:** A clean audio file containing only the piano signal exists on disk after processing.

---

## Sprint 4 — MIDI Transcription
**Epic:** PIAN-3 · **Version:** v0.1  
**Goal:** The isolated piano audio is transcribed to a MIDI file.

- [ ] PIAN-23 · Basic Pitch processes separated audio and outputs a raw MIDI file
- [ ] PIAN-24 · Quantization snaps note onsets to a rhythmic grid (1/8 or 1/16 resolution)
- [ ] PIAN-25 · MIDI file is saved to job folder and its path is returned in job status
- [ ] PIAN-26 · GET /job/{id} returns current status and output file paths
- [ ] PIAN-27 · Jobs and temp files are cleaned up from disk after 24 hours

**Definition of done:** Submitting a clean solo piano TikTok URL produces a playable MIDI file.

---

## Sprint 5 — Sheet Music Rendering
**Epic:** PIAN-4 · **Version:** v0.2  
**Goal:** The MIDI file is parsed and displayed as sheet music in the browser.

- [ ] PIAN-28 · Sheet music is rendered in the browser after transcription completes
- [ ] PIAN-29 · MIDI is parsed into a note data structure consumable by VexFlow
- [ ] PIAN-30 · VexFlow renders treble and bass clef staves from parsed note data
- [ ] PIAN-31 · Score scrolls horizontally or paginates for longer pieces
- [ ] PIAN-32 · User can download the sheet music as a PDF
- [ ] PIAN-33 · LilyPond generates a PDF from the MIDI and returns a download link

**Definition of done:** A completed transcription displays readable sheet music in the browser and produces a downloadable PDF.

---

## Sprint 6 — MIDI Playback
**Epic:** PIAN-5 · **Version:** v0.2  
**Goal:** Users can play back the transcribed MIDI in the browser with playback controls.

- [ ] PIAN-34 · User can press Play to hear the MIDI played back with a piano sound
- [ ] PIAN-35 · User can pause and resume MIDI playback
- [ ] PIAN-36 · User can seek to any point in the piece using a progress bar
- [ ] PIAN-37 · User can adjust playback speed (0.5×, 0.75×, 1×)

**Definition of done:** MIDI plays back cleanly in Chrome and Safari on both desktop and mobile.

---

## Sprint 7 — Falling-Note Visualizer
**Epic:** PIAN-5 · **Version:** v0.2  
**Goal:** A falling-note visualizer displays which keys are playing in sync with MIDI playback.

- [ ] PIAN-38 · Piano keyboard is displayed at the bottom of the falling-note visualizer
- [ ] PIAN-39 · Coloured note bars fall from top toward keyboard keys in sync with MIDI playback
- [ ] PIAN-40 · Visualizer pauses and resumes in sync with playback controls
- [ ] PIAN-41 · Visualizer is rendered on an HTML Canvas element for performance
- [ ] PIAN-42 · User can toggle between sheet music view and visualizer view

**Definition of done:** The visualizer plays in sync with Tone.js with no visible timing drift on a 60fps display.

---

## Sprint 8 — User Authentication
**Epic:** PIAN-6 · **Version:** v0.3  
**Goal:** Users can create an account and log in, with sessions persisting across devices.

- [ ] PIAN-43 · User can sign up with an email and password
- [ ] PIAN-44 · User can log in and session persists across page refreshes
- [ ] PIAN-45 · User can log out
- [ ] PIAN-46 · Authentication handled via Supabase Auth with JWT sessions
- [ ] PIAN-47 · All library endpoints require a valid session token

**Definition of done:** A user can sign up, log in, and their identity is attached to subsequent API calls.

---

## Sprint 9 — Library: Save & Retrieve
**Epic:** PIAN-6 · **Version:** v0.3  
**Goal:** Users can save transcriptions to a personal library and retrieve them.

- [ ] PIAN-48 · User can save a completed transcription to their library with a title
- [ ] PIAN-49 · User can view all saved transcriptions in a Library tab
- [ ] PIAN-50 · User can open a saved transcription and see sheet music and playback
- [ ] PIAN-51 · User can rename a saved transcription
- [ ] PIAN-52 · User can delete a saved transcription from their library

**Definition of done:** A user can save, browse, open, rename, and delete transcriptions from their library.

---

## Sprint 10 — Export
**Epic:** PIAN-6 · **Version:** v0.3  
**Goal:** Users can download their transcriptions as PDF and MIDI files.

- [ ] PIAN-53 · User can download sheet music as PDF from any saved transcription
- [ ] PIAN-54 · User can download MIDI as a .mid file from any saved transcription
- [ ] PIAN-55 · Download endpoints are scoped to the authenticated user's own library
- [ ] PIAN-56 · Files are served with correct Content-Type and Content-Disposition headers

**Definition of done:** Both PDF and MIDI files download correctly on desktop and mobile browsers.

---

## Sprint 11 — PWA & Responsive UI
**Epic:** PIAN-7 · **Version:** v0.4  
**Goal:** The app is installable as a PWA and fully usable on mobile.

- [ ] PIAN-57 · iOS Safari: app can be added to home screen and opens as full-screen PWA
- [ ] PIAN-58 · Android Chrome shows "Install App" prompt for PianoScribe
- [ ] PIAN-59 · All screens are readable and tappable at 375px viewport width
- [ ] PIAN-60 · Web App Manifest configured with correct icons and theme colours
- [ ] PIAN-61 · Service worker caches app shell for fast repeat loads
- [ ] PIAN-62 · App loads a skeleton UI immediately on slow connections

**Definition of done:** App passes Lighthouse PWA audit and installs on both iOS Safari and Android Chrome.

---

## Sprint 12 — Error Handling & Edge Cases
**Epic:** PIAN-8 · **Version:** v1.0  
**Goal:** Every failure point in the pipeline has a graceful, user-friendly error state.

- [ ] PIAN-63 · Invalid TikTok URL shows a clear error message, not a crash
- [ ] PIAN-64 · TikTok video with no piano shows a "no piano detected" message
- [ ] PIAN-65 · Transcription timeout after 90 seconds shows user-friendly message with retry
- [ ] PIAN-66 · All pipeline exceptions are caught and mapped to user-friendly error codes
- [ ] PIAN-67 · Errors are logged server-side with job ID and stack trace
- [ ] PIAN-68 · Confidence indicator warns user if transcription quality is low

**Definition of done:** All identified failure cases return a user-friendly message. No raw errors are shown to the user.

---

## Sprint 13 — Performance & Deployment
**Epic:** PIAN-8 · **Version:** v1.0  
**Goal:** The app is deployed to production and meets performance targets.

- [ ] PIAN-69 · FastAPI backend deployed to Railway with environment variables configured
- [ ] PIAN-70 · Next.js frontend deployed to Vercel with production environment variables
- [ ] PIAN-71 · Supabase database and storage bucket configured for production
- [ ] PIAN-72 · Full pipeline completes in under 60 seconds for a 60-second TikTok clip
- [ ] PIAN-73 · Demucs model is cached on startup and not re-loaded per request
- [ ] PIAN-74 · App is accessible at a public URL and end-to-end flow works on mobile and desktop

**Definition of done:** A fresh user can visit the public URL, paste a TikTok link, and receive sheet music end-to-end on both mobile and desktop.
