# FlowGuard — Real-Time Threat Monitor

**Team:** CodeX  
**Participant:** Arihant Jain  
**Project type:** Hackathon front-end prototype  
**Stack:** HTML, CSS, JavaScript

## Problem
The concept addresses an attacker modifying records while remaining inside a system. Security teams need to spot unusual updates quickly, reduce false-alert overload, and maintain a clear view of changes.

## Proposed solution
FlowGuard is a dashboard concept for streaming anomaly detection. It presents suspicious record changes, risk levels, a live-style record manifest, and a downloadable investigation summary. The proposal combines rule-based checks, behavior analysis, novelty signals, confidence-based prioritization, and alert filtering.

## Features in this prototype
- Responsive security dashboard for desktop and mobile.
- Example suspicious-event table with severity filtering.
- **Simulate event** button to add illustrative events interactively.
- Updating risk counts and detection overview.
- Live-style record manifest.
- Downloadable text report based on the current demo events.
- No build tools or dependencies required.

## Important limitations
This is a **front-end demonstration only**. It does not connect to a real data stream, backend, database, or security system. The event data and risk scores are illustrative; they are not measured detection results and do not demonstrate real attack detection. Production use would require a secure ingestion pipeline, authenticated data sources, a tested detection engine, access controls, logging, and validation against representative datasets.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Click **Simulate event**, change the severity filter, and try **Download demo report**.

Optional: use the VS Code **Live Server** extension and choose “Open with Live Server”.

## Project structure
```text
FlowGuard/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Publish to GitHub
1. Create a new repository named `FlowGuard` at https://github.com/new.
2. Add these four files to the repository.
3. Commit the files.
4. Copy the repository URL for your hackathon submission.

## Future development
- Connect a backend streaming API and validated audit logs.
- Add event correlation and duplicate-alert suppression.
- Calibrate risk scores against labeled data.
- Add authentication, role-based access, and immutable audit history.
- Measure detection latency, precision, recall, and false-positive rate before making performance claims.

---
FlowGuard · CodeX · Hackathon concept prototype
