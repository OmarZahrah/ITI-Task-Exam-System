# ITI Task Exam System

A front-end online exam application built with HTML, CSS, and vanilla JavaScript.
The project includes authentication pages, a timed quiz experience, instant results,
and a full answer-review screen.

## Overview

This system is designed as a lightweight browser-based quiz platform.
Users can:

- Create an account
- Log in
- Take a timed multiple-choice quiz
- Track progress during the exam
- Submit answers and get instant scoring
- Review each question with correct vs selected answers

All data is managed in `localStorage` (no backend required).

## Features

- User signup and login flow
- Client-side input validation (email/password/confirm password)
- Timed quiz with countdown and danger state for last 5 minutes
- Question navigation sidebar with current/answered/flagged states
- Flag/unflag questions for review
- Auto-save quiz state in local storage while solving
- Score calculation with percentage after submission
- Detailed answers review page
- Logout support and session-like user state handling

## Tech Stack

- HTML5
- CSS3 + Bootstrap 5
- Vanilla JavaScript (ES Modules)
- Browser `localStorage`

## How It Works

1. User signs up from `signup.html` (saved to `localStorage` key: `users`).
2. User logs in from `login.html` (saved to `localStorage` key: `currentUser`).
3. Quiz loads questions from `js/questions.json`.
4. Answers and quiz progress are auto-saved in `localStorage` key: `quiz`.
5. On submit (or timer end), result is stored in `localStorage` key: `quizResult`.
6. `results.html` and `answers.html` display summary and full review.

## Getting Started

Because the app fetches `js/questions.json`, run it using a local HTTP server
(not by opening HTML files directly via `file://`).
