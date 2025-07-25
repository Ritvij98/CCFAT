# Central Computing Facility Automation Tool (CCFAT)


## About the Project
CCFAT replaces manual, Excel-based lab reservations with a ⚡ MERN portal.

## Table of Contents
- [Problem--Solution](#problem--solution)
- [User-Roles--Permissions](#user-roles--permissions)
- [Features](#features)
- [Tech-Stack](#tech-stack)
- [Getting-Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Roadmap--Future-Work](#roadmap--future-work)
- [Contributing](#contributing)
- [License](#license)
- [Contact--Acknowledgements](#contact--acknowledgements)

## Problem & Solution 🚧➡️🛠️
Booking a CCF lab at MAHE currently means endless back-and-forth calls, emails and Excel updates. Every request must hop from staff → CCF staff → lab in-charge, risking clashes, omissions and zero visibility for other users.

**CCFAT** replaces this tangle with a single MERN-stack portal:
* anyone with campus credentials logs in, sees a live timetable and requests a slot in seconds;
* the in-charge reviews requests from an approval queue;
* confirmations (or rejections) are emailed automatically;
* bookings, users and recurring PSUC class blocks are stored centrally, powering usage analytics.

The same pattern can be extended to any lab or shared resource on campus.

## User Roles & Permissions 🔒
| Role | Capabilities | Typical Screen |
|------|--------------|----------------|
| **MAHE Staff / Student** | View timetable; request & cancel own bookings | User Booking UI |
| **CCF Staff** | Approve / decline requests; manage recurring PSUC slots; see upcoming reservations | Admin Dashboard |
| **Administrator** | CRUD on users, departments & institutes; generate usage reports; full audit trail | Admin Records UI |

## Features
- Login/signup
- Weekly timetable grid
- One-click booking
- Admin approval
- Email notifications 📧
- Recurring slots
- Analytics
- CRUD for users/departments/institutes

## Tech Stack
MongoDB · Express.js · React · Node.js + Nodemailer, JWT, Moment.js 🗓️

## Getting Started
Prerequisites: Node.js, npm and MongoDB.
```bash
git clone https://github.com/example/CCFAT.git
cd CCFAT
```
Create `.env`:
```env
SECRET_KEY=your-secret
```
Run clients and server in parallel:
```bash
cd client/ && npm start &
cd server/ && npm start
```

## Usage
1. Make a booking.
2. Admin approves.
3. Confirmation email sent 📧.

## Screenshots
#### Wireframes
| Login (lo-fi) | Booking page (lo-fi) |
|--------------|----------------------|
| ![Wireframe Login](https://github.com/user-attachments/assets/2d459681-4ef4-4354-83c7-b587b30171b0) |![Wireframe Booking](https://github.com/user-attachments/assets/86f9cfd3-9e26-460b-ac45-cffe4341b382) |
#### Live Application
| Login (prod) | Check Availability (prod) |
|--------------|---------------------------|
| ![App Login](https://github.com/user-attachments/assets/5ff74988-7e3d-4ea6-be73-686f2810ab16) | ![App Availability](https://github.com/user-attachments/assets/55e5e7c7-0d27-4c92-90cc-05e37a33ff06) |


## Roadmap / Future Work
- Multi-lab support
- Google Calendar sync
- Richer analytics
- Customizable email templates

## Contributing
Fork the repo, clone, create a branch, commit, and open a PR. Follow ESLint/Prettier rules.

## License
MIT

