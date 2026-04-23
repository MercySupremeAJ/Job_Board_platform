# 🌍 AfriHire — Remote Tech Job Board for African Talent

![AfriHire Banner](https://img.shields.io/badge/AfriHire-Remote%20Tech%20Jobs-7C3AED?style=for-the-badge&logo=globe&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?style=flat-square&logo=redux)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

> A full-featured, two-sided job board platform connecting **Africa's brightest tech talent** with **global remote opportunities**. Built with React, Redux Toolkit, and modern glassmorphic design.

---

## 📋 Table of Contents

- [Product Overview](#-product-overview)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Core Features](#-core-features)
- [Technical Architecture](#-technical-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Demo Credentials](#-demo-credentials)
- [Screenshots](#-screenshots)
- [Milestones](#-milestones)
- [Innovation](#-innovation--make-it-yours)
- [Future Improvements](#-future-improvements)
- [Author](#-author)

---

## 🧠 Product Overview

AfriHire is a **two-sided platform** connecting:

| Side | Description |
|------|-------------|
| 🧑‍💻 **African Tech Talent** (Candidates) | Search, filter, and apply to remote tech jobs globally |
| 🏢 **Global Companies** (Employers) | Post jobs, view applications, and manage candidate pipelines |

The platform focuses exclusively on **remote opportunities**, addressing the growing demand for distributed work and bridging the gap between African developers and international employers.

---

## 🎯 Problem Statement

### For Candidates
- ❌ Limited access to global job opportunities
- ❌ Poor visibility to international employers
- ❌ Fragmented job platforms with irrelevant listings

### For Companies
- ❌ Struggle to find qualified remote talent efficiently
- ❌ No centralized platform for African tech hiring

---

## 💡 Solution

AfriHire provides:

- ✅ A **centralized, niche job board** for remote tech roles
- ✅ **Role-based experiences** for Candidates and Companies
- ✅ **AI-powered job recommendations** based on skill matching
- ✅ **Real-time application tracking** with status workflows
- ✅ **Smart search & filtering** with debounced search and URL-synced params
- ✅ **Email-style notifications** for application status changes

---

## 🧩 Core Features

### 🔐 Authentication System
- Role-based login (**Candidate** / **Company**)
- Secure session management with localStorage persistence
- Multi-step registration with validation
- Demo credentials for quick testing

### 👩‍💻 Candidate Features
- **Profile creation** — skills, experience timeline, GitHub/LinkedIn/portfolio links
- **Job search & filtering** — search by title, company, or skill with debounced input
- **Apply to jobs** — cover letter submission with real-time validation
- **Application tracking** — kanban-style status board (Applied → Reviewed → Shortlisted/Rejected)
- **Save jobs** — bookmark jobs for later viewing
- **AI job recommendations** — skill-based matching algorithm with percentage scores

### 🏢 Company Features
- **Post, edit, delete job listings** — full CRUD with form validation
- **View applications per job** — grouped by listing with applicant details
- **Manage candidate pipeline** — mark applications as Reviewed, Shortlisted, or Rejected
- **Dashboard analytics** — active jobs, total applications, status breakdowns

### 🔍 Job Discovery System
- **Debounced search** with 300ms delay for optimal performance
- **URL-synced filters** via `useSearchParams` for shareable search states
- **Filter by**: Skills, Location, Experience Level, Job Type, Remote-only
- **Sort by**: Newest, Oldest, Highest Salary, Lowest Salary, Most Applicants
- **22+ realistic job listings** from real African & global tech companies

### 📊 Application Tracking
- Status workflow: `Applied` → `Reviewed` → `Shortlisted` / `Rejected`
- Real-time notifications on status changes
- Company-side pipeline management with one-click status updates

### 🔔 Notification System
- Email-style notification center with read/unread state
- Auto-generated notifications for:
  - Application submissions
  - Status changes
  - New applicants (for companies)
- Notification badge with unread count

---

## ⚙️ Technical Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    React UI Layer                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌─────────┐ │
│  │  Pages   │ │Components│ │  Hooks   │ │   UI    │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬────┘ │
│       │             │            │             │      │
│  ┌────┴─────────────┴────────────┴─────────────┴────┐ │
│  │              Redux Toolkit Store                  │ │
│  │  ┌─────────┐ ┌─────────┐ ┌────────────┐ ┌──────┐│ │
│  │  │  Auth   │ │  Jobs   │ │Applications│ │Notif.││ │
│  │  │  Slice  │ │  Slice  │ │   Slice    │ │Slice ││ │
│  │  └─────────┘ └─────────┘ └────────────┘ └──────┘│ │
│  └──────────────────┬───────────────────────────────┘ │
│                     │                                 │
│  ┌──────────────────┴───────────────────────────────┐ │
│  │           API Simulation Layer                    │ │
│  │   (Mock async calls with realistic delays)        │ │
│  └───────────────────┬──────────────────────────────┘ │
│                      │                                │
│  ┌───────────────────┴──────────────────────────────┐ │
│  │         localStorage Persistence                  │ │
│  └──────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Role-Based State Management** | Separate logic for candidates and companies ensures clean, scalable architecture |
| **Normalized Data (Entity Adapter)** | Jobs stored in normalized structure preventing duplication and improving lookup performance |
| **createAsyncThunk** | Handles async operations (job fetching, application submission) with loading/error states |
| **Persistent State** | Cart-like persistence for saved jobs, user sessions, and application data via localStorage |
| **URL-synced Filters** | `useSearchParams` for filter state enables shareable/bookmarkable search URLs |
| **Custom Hooks** | `useJobSearch` (debounce), `useAuth`, `useJobRecommendations` encapsulate complex logic |
| **Glassmorphism Design** | Modern, premium dark theme with backdrop blur effects and gradient accents |

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI component library |
| **Redux Toolkit** | Global state management with slices and entity adapters |
| **React Router v7** | Client-side routing with protected routes |
| **Vite 8** | Lightning-fast build tool and dev server |
| **CSS Custom Properties** | Design system tokens for consistent theming |
| **localStorage** | State persistence for sessions, saved jobs, and applications |

### React Concepts Used
- `Redux Toolkit` with role-based state (company vs. candidate)
- `React Router` with role-based protected routes
- `useSearchParams` for filter state in the URL
- `useMemo` for filtering and sorting job listings
- Custom `useJobSearch` hook with debounce
- `createAsyncThunk` for async apply/post actions
- `createEntityAdapter` for normalized job storage

---

## 📁 Project Structure

```
Job_Board_Platform/
├── index.html                    # Entry HTML with SEO meta tags
├── package.json                  # Dependencies and scripts
├── vite.config.js                # Vite configuration with aliases
├── src/
│   ├── main.jsx                  # App entry point with providers
│   ├── App.jsx                   # Root component with routing
│   ├── index.css                 # Design system & global styles
│   ├── components/
│   │   ├── applications/
│   │   │   ├── ApplicationList.jsx    # Company view: manage applicants
│   │   │   ├── ApplicationTracker.jsx # Candidate view: track statuses
│   │   │   └── ApplyModal.jsx         # Job application modal
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx          # Login with demo credentials
│   │   │   ├── RegisterForm.jsx       # Multi-step registration
│   │   │   └── ProtectedRoute.jsx     # Role-based route guard
│   │   ├── jobs/
│   │   │   ├── JobCard.jsx            # Glassmorphism job card
│   │   │   ├── JobDetail.jsx          # Full job details view
│   │   │   ├── JobFilters.jsx         # Smart filter sidebar
│   │   │   ├── JobForm.jsx            # Post/edit job form
│   │   │   └── JobList.jsx            # Grid with skeleton loading
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx    # Sidebar + main area wrapper
│   │   │   ├── Footer.jsx             # Site footer
│   │   │   ├── Navbar.jsx             # Role-aware navigation
│   │   │   └── Sidebar.jsx            # Dashboard sidebar menu
│   │   ├── profile/
│   │   │   ├── CandidateProfile.jsx   # Skills, experience, links
│   │   │   ├── CompanyProfile.jsx     # Company info management
│   │   │   └── SkillSelector.jsx      # Multi-select skill picker
│   │   └── ui/
│   │       ├── Badge.jsx              # Status badges with variants
│   │       ├── Button.jsx             # Gradient button system
│   │       ├── Modal.jsx              # Reusable modal with blur
│   │       ├── NotificationPanel.jsx  # Dropdown notification center
│   │       ├── SharedUI.jsx           # SearchBar, Skeleton, StatsCard
│   │       └── Toast.jsx              # Auto-dismiss toast system
│   ├── data/
│   │   ├── mockJobs.js               # 22+ realistic job listings
│   │   └── mockUsers.js              # Demo candidate & company accounts
│   ├── hooks/
│   │   ├── useAuth.js                # Authentication convenience hook
│   │   ├── useJobRecommendations.js  # Skill-based recommendation engine
│   │   └── useJobSearch.js           # Debounced search with URL sync
│   ├── pages/
│   │   ├── ApplicationsPage.jsx      # Application tracker/pipeline
│   │   ├── CandidateDashboard.jsx    # Candidate overview
│   │   ├── CompanyDashboard.jsx      # Company overview
│   │   ├── JobDetailPage.jsx         # Job detail view
│   │   ├── JobsPage.jsx              # Browse all jobs
│   │   ├── LandingPage.jsx           # Hero + features + CTA
│   │   ├── LoginPage.jsx             # Sign in page
│   │   ├── NotFoundPage.jsx          # 404 page
│   │   ├── PostJobPage.jsx           # Post/edit job
│   │   ├── ProfilePage.jsx           # Profile management
│   │   ├── RegisterPage.jsx          # Registration page
│   │   └── SavedJobsPage.jsx         # Saved jobs list
│   ├── store/
│   │   ├── applicationsSlice.js      # Application CRUD + status
│   │   ├── authSlice.js              # Auth with role-based logic
│   │   ├── jobsSlice.js              # Jobs with entity adapter
│   │   ├── notificationsSlice.js     # Notification management
│   │   ├── profileSlice.js           # Profile management
│   │   └── store.js                  # Store configuration
│   └── utils/
│       ├── api.js                    # Simulated API calls
│       └── helpers.js                # Date, skill matching, formatting
└── .gitignore                        # Git ignore rules
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.0
- **npm** >= 9.0

### Installation

```bash
# Clone the repository
git clone https://github.com/MercySupremeAJ/Job_Board_platform.git

# Navigate to the project
cd Job_Board_platform

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👩‍💻 **Candidate** | `amara.okafor@email.com` | `demo123` |
| 🏢 **Company** | `hr@techcorp.com` | `demo123` |

> 💡 Use the **Quick Demo Login** buttons on the login page for instant access!

---

## 📸 Screenshots

### Landing Page
- Animated hero section with floating gradient orbs
- Platform statistics and feature highlights
- Featured job listings with glassmorphism cards

### Job Discovery
- Smart search with debounced input
- Multi-faceted filter sidebar (skills, location, experience, type)
- URL-synced filter state for shareable searches

### Candidate Dashboard
- Application overview with status breakdown
- AI-powered job recommendations based on skills
- Saved jobs quick access

### Company Dashboard
- Posted jobs with applicant counts
- One-click job management (view, edit, delete)
- Pipeline statistics

---

## ✅ Milestones

| # | Milestone | Status |
|---|-----------|--------|
| 23 | Implement authentication with two roles: candidate and company | ✅ |
| 24 | Candidates can build a profile with skills, experience, and links | ✅ |
| 25 | Companies can post, edit, and delete job listings | ✅ |
| 26 | Companies can view the number of applications per listing | ✅ |
| 27 | Candidates can search and filter listings, then apply | ✅ |
| 28 | Candidates can track all jobs they have applied for | ✅ |
| 29 | Make the layout fully responsive | ✅ |

### ⭐ Bonus Challenges

| Challenge | Status |
|-----------|--------|
| ★ Recommend jobs to candidates based on skills in their profile | ✅ |
| ★ Allow companies to mark an application as reviewed, shortlisted, or rejected | ✅ |
| ★ Add email-style notifications when an application status changes | ✅ |

---

## 🧠 Innovation — "Make It Yours"

This project stands out because it:

1. **Focuses on a specific niche** — Remote tech jobs for African talent
2. **Solves a real-world economic problem** — bridging the gap between African developers and global opportunities
3. **Implements role-based UI logic** — completely different experiences for candidates vs. companies
4. **Features a real-world workflow simulation** — full hiring pipeline from job posting to application tracking
5. **Uses AI-powered recommendations** — skill-based matching algorithm with percentage scores

> 🎯 It is not just a CRUD app — it is a **mini hiring ecosystem**.

---

## 📈 Expected Impact

- 🌍 **Empowers African developers** with global remote opportunities
- 🏢 **Helps companies** access diverse, skilled talent pools
- 📐 **Demonstrates scalable** product design with clean architecture

---

## 🔮 Future Improvements

- [ ] AI-powered job recommendations with NLP
- [ ] Resume parsing and skill extraction
- [ ] Real-time messaging between candidates and recruiters
- [ ] Email/push notification system
- [ ] Company verification badges
- [ ] Interview scheduling integration
- [ ] Analytics dashboard for companies

---

## 👩‍💻 Author

**Mercy Ajoke Supreme** — _Full Stack Developer_

- GitHub: [@MercySupremeAJ](https://github.com/MercySupremeAJ)

---

## 📄 License

This project is licensed under the MIT License.

---

<p align="center">
  Built with 💜 for Africa's tech future
  <br />
  <strong>© 2026 AfriHire</strong>
</p>
