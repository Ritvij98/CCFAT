# Central Computing Facility Automation Tool (CCFAT)

![CI](https://example.com/ci-badge.svg)

## About the Project
CCFAT replaces manual, Excel-based lab reservations with a ⚡ MERN portal.

## Table of Contents
- [Features](#features)
- [Tech-Stack](#tech-stack)
- [Getting-Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Roadmap--Future-Work](#roadmap--future-work)
- [Contributing](#contributing)
- [License](#license)
- [Contact--Acknowledgements](#contact--acknowledgements)

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
| ![Wireframe Login](assets/ccfat_wireframe_login.png) | ![Wireframe Booking](assets/ccfat_wireframe_booking.png) |

#### Live Application
| Login (prod) | Check Availability (prod) |
|--------------|---------------------------|
| ![App Login](assets/ccfat_app_login.png) | ![App Availability](assets/ccfat_app_check_availability.png) |

| Admin Dashboard (prod) |
|------------------------|
| ![Admin Dashboard](assets/ccfat_app_admin_dashboard.png) |

## Roadmap / Future Work
- Multi-lab support
- Google Calendar sync
- Richer analytics
- Customizable email templates

## Contributing
Fork the repo, clone, create a branch, commit, and open a PR. Follow ESLint/Prettier rules.

## License
MIT

## Contact & Acknowledgements
Author – Manipal Institute of Technology. Mentor guidance appreciated. 🛠️
