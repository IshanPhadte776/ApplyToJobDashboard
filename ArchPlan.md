# Job Tracker — Full Project Plan

## Project Summary
The Job Tracker is a **full-stack application** to manage job applications efficiently. Users can track applied jobs, store account credentials securely, manage resumes and cover letters (1-to-1 mapping), save default job searches, and store GitHub scraper project links. The dashboard includes a **daily goal tracker** (e.g., 10 jobs/day) and optional analytics. Starts with **NoSQL (MongoDB Atlas)** for flexible schema and can swap to SQL later. Goal: NG-friendly, secure, and scalable personal job management tool.

## Tech Stack
- **Frontend:** React + Material-UI + Axios + React Router  
- **Backend:** ASP.NET Core Web API + MongoDB Driver  
- **Database:** MongoDB Atlas (NoSQL) → swappable to SQL  
- **Authentication:** JWT, BCrypt for passwords, AES for account credentials  
- **File Storage:** Local initially; optional Azure Blob Storage later  
- **Deployment:** Azure App Service (backend), Azure Static Web App (frontend)  

---

## Frontend Pages / Components
- **LoginPage.jsx / RegisterPage.jsx:** Auth pages  
- **Dashboard.jsx:** Daily goal tracker, stats, trends  
- **JobList.jsx / JobForm.jsx:** Job applications CRUD, priority, location, resume/cover letter links  
- **AccountList.jsx / AccountForm.jsx:** Store user accounts (AES encrypted)  
- **ResumeList.jsx / ResumeForm.jsx:** Manage resumes, link cover letters  
- **CoverLetterList.jsx / CoverLetterForm.jsx:** Manage cover letters, link resumes  
- **SearchList.jsx / SearchForm.jsx:** Saved job searches  
- **ScraperList.jsx / ScraperForm.jsx:** GitHub scraper project links  
- **DailyGoalTracker.jsx / StatsCards.jsx:** Dashboard components  

---

## Backend Structure (ASP.NET Core)

JobTrackerAPI/
├─ Program.cs
├─ appsettings.json
├─ Controllers/
│ ├─ AuthController.cs
│ ├─ JobsController.cs
│ ├─ AccountsController.cs
│ ├─ ResumesController.cs
│ ├─ CoverLettersController.cs
│ ├─ SearchesController.cs
│ └─ ScraperProjectsController.cs
├─ Models/
│ ├─ User.cs
│ ├─ JobApplication.cs
│ ├─ Account.cs
│ ├─ Resume.cs
│ ├─ CoverLetter.cs
│ ├─ SavedSearch.cs
│ └─ ScraperProject.cs
├─ Repositories/ # CRUD interfaces & MongoDB implementations
├─ Services/ # AuthService, EncryptionService, FileService
├─ DTOs/
├─ Helpers/ # JWT, Date utilities


---

## Phased Implementation

### Phase 1: Setup & MVP Frontend
1. Initialize React (Vite) + Material-UI  
2. Create MVP pages: Login, Register, Dashboard, JobList, JobForm  
3. Shared components: NavBar, DailyGoalTracker, StatsCards  
4. Navigation (AppBar/Drawer)  
5. Use dummy data to test UI  

### Phase 2: MVP Backend
1. Initialize ASP.NET Core Web API  
2. Connect to MongoDB Atlas; use environment variables  
3. AuthController (JWT, BCrypt)  
4. JobsController CRUD endpoints  
5. Enable CORS for React frontend  
6. Test endpoints with Postman  

### Phase 3: Extend Frontend
1. Connect frontend to backend via Axios  
2. Implement live daily goal tracker  
3. Add priority flags, location tags in JobList/JobForm  
4. Add Resume/CoverLetter UI (upload + 1-to-1 mapping)  
5. Add ScraperProjects UI (GitHub links)  
6. Test full frontend-backend integration  

### Phase 4: Extend Backend
1. AccountsController (AES encryption)  
2. ResumeController & CoverLetterController (file upload/download)  
3. SavedSearchesController & ScraperProjectsController  
4. Services: AuthService, FileService, DateHelpers  
5. DTOs to protect sensitive data  
6. Test all endpoints  

### Phase 5: Optional Enhancements & Deployment
- Dashboard charts/stats (Recharts/Chart.js)  
- Filters/search for jobs (priority, location, status)  
- Optional: Azure Blob Storage for files  
- Deploy backend: Azure App Service  
- Deploy frontend: Azure Static Web App  
- Configure environment variables (MongoDB URI, JWT secret)  

---

## Notes
- **Frontend MVP first**, then **backend MVP**, then extend frontend, then backend  
- MongoDB Atlas handles DB; no Azure MongoDB needed for MVP  
- Ensure HTTPS and proper auth before deployment  
- Environment variables for secrets (MongoDB URI, JWT secret)

