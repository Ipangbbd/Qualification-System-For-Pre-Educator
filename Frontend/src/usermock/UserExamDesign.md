---
version: 1.0
name: EduQualify-User-Exam
description: Design spec for the exam experience — question layout, progress, timers, feedback — matching the project's Apple-like tokens.
colors:
  background: "{colors.canvas}"
  foreground: "{colors.ink}"
  accent: "{colors.primary}"
  danger: "#d6453b"

typography:
  question-title:
    token: "{typography.lead}"
    use: "Question headline and prompt"
  answer-body:
    token: "{typography.body}"
    use: "Answer text and explanation"
  meta:
    token: "{typography.caption}"
    use: "Timers, progress label"

components:
  question-card:
    rounded: "{rounded.lg}"
    background: "{colors.canvas} or glass on dark tiles"
    padding: "{spacing.lg}"
    shadow: "none (keep interface flat)"

  answer-option:
    style: "list of full-width selectable rows; use outline and monochrome checkmark for selected state"
    spacing: "12–16px vertical between options"
    focus: "visible focus ring `{colors.primary-focus}`"

  timer-bar:
    style: "thin progress bar above question card; accent fills proportionally; accessible text readout"

accessibility:
  keyboard: "Answers selectable via arrow keys + enter; timer pause accessible"
  screenreader: "announce remaining time, current question index, and if answering auto-saves"
  contrast: "Ensure answer text >= 4.5:1 against background and selected states meet 3:1 at minimum for non-text UI"

Overview

The exam UI prioritizes clarity and low-distraction focus. Use generous whitespace, a single primary accent, quiet typographic hierarchy, and immediate feedback for answers. The interface must feel calm — no heavy borders or saturated colors.

Layout

- Center the question card within a max-width container (~980px) with large vertical breathing room (`{spacing.section}` reduced to 56px during exam to keep task focus).
- Place the timer bar above the question title and meta row (question index / mode). The progress indicator (e.g., 5/20) appears top-right in `{typography.meta}`.
- Answer options are stacked full-width with subtle background fill on hover/selected, rounded `{rounded.md}`.

Interaction & Feedback

- Instant local validation: when an answer is selected, briefly show a subtle success highlight (if auto-gradable) or a neutral acknowledgement if manual review required.
- Use `transform: scale(0.98)` on press for micro-interaction and a 150ms fade for selection state change.
- On submit, show a full-width confirmation CTA aligned center; use the primary accent only for final submit and critical timers warnings (switch to `danger` color for overtime states).

Implementation notes

- Avoid heavy JS animations; prefer simple CSS transitions for state changes.
- Ensure exam state is saved frequently (every change) and show a small autosave indicator in the header.
- Mobile: stack timer above question, ensure options are touch-friendly (min 44 × 44px targets).
