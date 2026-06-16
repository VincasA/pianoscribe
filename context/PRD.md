# Product Requirements Document
## PianoScribe — TikTok Piano Transcription App
**Version:** 0.1 (Draft)
**Last Updated:** June 2026
**Status:** Pre-development

---

## 1. Overview

PianoScribe is a cross-platform Progressive Web App (PWA) that allows users to paste a TikTok link containing piano playing and receive an accurate transcription as sheet music and an interactive MIDI playback. The core use case is a musician or learner who discovers a piano piece on TikTok and wants to learn to play it — without having to transcribe it by ear.

---

## 2. Problem Statement

When a user finds a piano piece on TikTok they want to learn, their only options today are:
- Transcribing the piece by ear (requires advanced musical skill)
- Searching for the piece manually online (often not findable)
- Paying a musician to transcribe it

There is no fast, accessible tool that takes a TikTok URL and produces playable sheet music automatically.

---

## 3. Target User

A beginner to intermediate piano learner who:
- Regularly discovers piano content on TikTok
- Wants to learn pieces they find but lacks the ear training to transcribe them
- Is comfortable copying a link and pasting it into an app
- Wants to save and revisit their transcriptions in a personal library

---

## 4. Goals

### Primary Goals
- Reduce time from "finding a TikTok piano video" to "having sheet music" to under 60 seconds
- Produce sheet music accurate enough that a beginner can follow along
- Provide a MIDI playback so users can hear and follow the transcription before playing

### Secondary Goals
- Let users build a personal library of saved transcriptions
- Work seamlessly on both desktop and mobile without installation

---

## 5. Tech Stack

### Frontend
| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 14 (App Router) | React-based, PWA support, TypeScript native |
| Language | TypeScript | Type safety, maintainability |
| Styling | Tailwind CSS | Utility-first, fast to build responsive layouts |
| Sheet Music | VexFlow | Mature JS library for rendering music notation in browser |
| MIDI Playback | Tone.js | Web Audio API wrapper, MIDI scheduling and synthesis |
| PWA | next-pwa | Service worker, installable on mobile and desktop |

### Backend
| Layer | Technology | Rationale |
|---|---|---|
| Framework | FastAPI (Python) | Async, fast, Python-native for ML pipeline integration |
| Audio Download | yt-dlp | Supports TikTok, actively maintained |
| Source Separation | Demucs (Meta) | Best open-source model for isolating piano from mix |
| Transcription | Basic Pitch (Spotify) | Lightweight, accurate audio-to-MIDI, runs locally |
| Sheet Music Render | LilyPond (server-side) | Professional quality sheet music PDF output |
| Database | PostgreSQL | Relational, reliable, handles user library |
| File Storage | S3-compatible (or local FS for dev) | MIDI and PDF file storage |

### Infrastructure
| Layer | Technology |
|---|---|
| Frontend Hosting | Vercel |
| Backend Hosting | Railway or Render |
| Database | Supabase (managed Postgres) |

---

## 6. What the App Does

### 6.1 Core Features

**URL Input & Audio Extraction**
The user pastes a TikTok URL into the app. The backend downloads the audio track using yt-dlp, then passes it through Demucs to isolate the piano signal from any background music, voice, or other instruments.

**Piano Transcription**
The isolated piano audio is processed by Basic Pitch to produce a MIDI file. A quantization step snaps raw note onsets to a rhythmic grid, making the output readable as sheet music.

**Sheet Music Display**
The MIDI is rendered as sheet music in the browser using VexFlow. The user sees a standard musical score — treble and bass clef — they can read and play from.

**MIDI Playback**
Tone.js plays back the transcribed MIDI in the browser. A falling-note visualizer highlights which keys are being played in sync with the audio, giving the user a visual guide to the piece.

**Library**
Users can save a transcription to their personal library. Each saved entry stores the TikTok URL, the generated MIDI file, the PDF sheet music, a title, and a timestamp. The library is accessible from any device when logged in.

**Export**
Users can download the sheet music as a PDF and the MIDI as a `.mid` file.

---

## 7. What the App Does NOT Do

- **Does not support non-piano audio.** The app is designed specifically for solo or accompanied piano. Transcribing guitar, voice, drums, or full band arrangements is out of scope.
- **Does not support platforms other than TikTok** (v1). YouTube, Instagram Reels, and other platforms are not supported in the initial version.
- **Does not perform optical music recognition (OMR).** The app transcribes audio, not images or video of sheet music.
- **Does not teach music theory.** The app provides sheet music output but does not explain concepts, fingering, or technique.
- **Does not support real-time input.** The app transcribes from TikTok links only — it does not accept microphone input or live audio.
- **Does not guarantee perfect transcription.** Accuracy depends heavily on audio quality. Noisy recordings, heavy reverb, or very fast passages will produce imperfect results. The app communicates confidence levels to the user where possible.
- **Does not store user-uploaded files.** Input is via TikTok URL only — no direct audio file uploads in v1.
- **Does not have social features.** No sharing, comments, or public library in v1.

---

## 8. Core User Flow

```
1. User opens PianoScribe on mobile or desktop (browser, no install required)
2. User pastes a TikTok URL into the input field
3. User taps "Transcribe"
4. App shows a progress indicator with pipeline stages:
     Downloading audio... ✓
     Isolating piano...   ✓
     Transcribing...      ✓
     Rendering score...   ✓
5. Sheet music appears in the browser, rendered as a standard score
6. MIDI playback controls appear below the score
7. User plays back the MIDI with the falling-note visualizer
8. User taps "Save to Library"
9. Transcription is saved with an auto-generated or user-edited title
10. User can access saved transcriptions from the Library tab
11. User can download PDF or MIDI from any saved transcription
```

---

## 9. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-01 | Accept a valid TikTok URL and extract audio | Must have |
| FR-02 | Isolate piano signal using source separation | Must have |
| FR-03 | Transcribe piano audio to MIDI | Must have |
| FR-04 | Render MIDI as sheet music in the browser | Must have |
| FR-05 | Provide MIDI playback with play/pause/seek controls | Must have |
| FR-06 | Show a falling-note MIDI visualizer synced to playback | Should have |
| FR-07 | Allow user to save transcriptions to a personal library | Must have |
| FR-08 | Allow export of sheet music as PDF | Must have |
| FR-09 | Allow export of MIDI as .mid file | Must have |
| FR-10 | Display transcription confidence/quality indicator | Should have |
| FR-11 | App is installable as a PWA on iOS and Android | Must have |
| FR-12 | Support user authentication (library persistence) | Must have |
| FR-13 | Allow user to rename saved transcriptions | Should have |
| FR-14 | Allow user to delete saved transcriptions | Should have |

---

## 10. Non-Functional Requirements

- **Performance:** Transcription pipeline should complete in under 60 seconds for a typical 60-second TikTok clip
- **Responsiveness:** UI must be fully functional on screens from 375px (iPhone SE) to 1440px (desktop)
- **Reliability:** Pipeline failures must return a clear, user-friendly error — never a raw stack trace
- **Accuracy:** Transcription should be usable (not perfect) for clean solo piano recordings
- **Security:** TikTok URLs are the only external input — no arbitrary URL fetching; user files are scoped to authenticated sessions

---

## 11. Success Metrics (v1)

- Transcription completes in under 60 seconds for a 60-second clip
- Sheet music is readable and followable for a clean solo piano TikTok
- User can save, retrieve, and export a transcription end-to-end
- App installs and functions on iOS Safari and Android Chrome as a PWA
