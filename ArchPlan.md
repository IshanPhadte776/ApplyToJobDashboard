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
3_5. Login Controller
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

# Job Tracker Database Schema

## Collections / Tables

### 1. Users
Stores login and personal info.

- **_id** (ObjectId / INT PK)
- **username** (string, unique)
- **passwordHash** (string, hashed with BCrypt)
- **name** (string)
- **userDataId** (ObjectId / FK → UserData)

---

### 2. JobApplications
Stores jobs the user applied for.

- **_id** (ObjectId / INT PK)
- **userId** (ObjectId / FK → Users)
- **jobTitle** (string)
- **company** (string)
- **status** (string, e.g., "Applied", "Interview", "Rejected", "Offer")
- **dateApplied** (date)
- **accountNeeded** (boolean)
- **jobUrl** (string, job posting link)

---

### 3. CompanyAccounts
Stores credentials for company-specific job portals.

- **_id** (ObjectId / INT PK)
- **userId** (ObjectId / FK → Users)
- **companyName** (string, e.g., "CIBC")
- **email** (string)
- **password** (string, AES encrypted)
- **portalUrl** (string)

---

### 4. UserData
Stores general profile info and user documents.

- **_id** (ObjectId / INT PK)
- **userId** (ObjectId / FK → Users)
- **linkedinUrl** (string)
- **githubUrl** (string)
- **personalWebsiteUrl** (string)

#### Embedded / Related Collections

**Resumes**
- **_id** (ObjectId / INT PK)
- **userDataId** (ObjectId / FK → UserData)
- **title** (string, e.g., "Software Engineer Resume")
- **filePath** or **fileUrl** (string → local or Azure Blob Storage)
- **createdAt** (date)

**CoverLetters**
- **_id** (ObjectId / INT PK)
- **userDataId** (ObjectId / FK → UserData)
- **title** (string, e.g., "Cover Letter for Backend Role")
- **filePath** or **fileUrl** (string → local or Azure Blob Storage)
- **resumeId** (ObjectId / FK → Resumes, for 1-to-1 mapping)
- **createdAt** (date)

---

# 🌐 Page Routing Overview  

- **`/login` → Dashboard**  
  - After successful login, the user is redirected to `/dashboard`.  

- **`/dashboard`** → Central hub  
  - From here, users can navigate to all other sections.  

---

# 🛠 Pages and Components  

## 1. Login Page (`/login`)
- **Components**:  
  - `LoginForm` (username + password)  
  - `AuthProvider` (handles session/token)  
- **Routes to**:  
  - `/dashboard` on success  

---

## 2. Dashboard Page (`/dashboard`)
- **Components**:  
  - `Navbar` (links to all sections)  
  - `Sidebar` (optional quick navigation)  
  - `DashboardOverview` (summary: applications count, saved companies, etc.)  
- **Routes to**:  
  - `/applications`  
  - `/companies`  
  - `/userdata`  

---

## 3. Job Applications Page (`/applications`)
- **Components**:  
  - `ApplicationsList` (table of job postings with status, company, date applied, etc.)  
  - `ApplicationForm` (add/update job application)  
  - `FilterSortBar` (search/filter by status, company, date applied)  
- **Routes from Dashboard**:  
  - `/applications/:id` (view/edit specific application)  

---

## 4. Company Accounts Page (`/companies`)
- **Components**:  
  - `CompanyList` (saved company accounts with name, email, portal URL)  
  - `CompanyForm` (add/edit company account)  
- **Routes from Dashboard**:  
  - `/companies/:id` (edit a specific company account)  

---

## 5. User Data Page (`/userdata`)
- **Components**:  
  - `UserDataForm` (LinkedIn, GitHub, website, email, password)  
  - `UserDataView` (preview stored personal data)  
- **Routes from Dashboard**:  
  - `/userdata/edit`  

---

# 🔄 Routing Flow Summary  

- **Login → Dashboard**  
- **Dashboard → Applications | Companies | UserData**  
- **Applications → Specific Application**  
- **Companies → Specific Company**  
- **UserData → Edit User Data**  

---

# 🎨 Job Tracker – Frontend Style Guide  

## 🌐 Framework  
- **React (Vite)** for frontend  
- **Material UI (MUI v5)** for components & styling  
- **Custom overrides** only when necessary  

---

## 🖋 Typography  
- **Font Family**: Roboto (default with MUI)  
- **Font Sizes**:  
  - Headings: `h1, h2, h3` → MUI defaults (responsive)  
  - Body: `body1` (primary text), `body2` (secondary text/hints)  
  - Buttons: `button` variant  

- **Colors**:  
  - Primary Text: `#212121` (dark grey)  
  - Secondary Text: `#616161` (medium grey)  
  - Links: `#0288d1` (soft blue)  

---

## 🎨 Color Palette (Light Orange + Light Blue Theme)  
- **Primary (Light Blue)**: `#4FC3F7`  
- **Secondary (Light Orange)**: `#FFB74D`  
- **Accent (Deeper Orange for buttons/highlights)**: `#FF9800`  
- **Error**: `#E57373` (soft red)  
- **Success**: `#81C784` (soft green)  
- **Background**: `#FAFAFA` (light grey/white)  
- **Surface / Cards**: White `#FFFFFF`  

---

## 📦 Layout & Components  

### App Layout  
- Use `AppBar` with **primary (light blue)** background  
- Use `Drawer` with **secondary (light orange)** highlights for active menu items  
- Wrap page content inside `Container` for consistent spacing  
- Use `Box` + `Grid` for responsive layout  

### Buttons  
- Primary actions → `contained` with **light blue**  
- Secondary actions → `outlined` with **light orange**  
- Hover states → slightly darker shade of each color  

### Forms  
- `TextField` fullWidth with subtle **blue underline** focus state  
- Validation:  
  - Error → `#E57373` border + helper text  
  - Success → normal grey, no need for explicit green unless critical  
- Submit buttons → light orange (`contained`)  

### Tables / Lists  
- Job applications → `DataGrid` with alternating row background (`#F5F5F5`)  
- Company accounts → `List` with icons in **orange**  

### Cards  
- Use `Card` with subtle shadow  
- Header background can use **light blue** for consistency  
- Content → white with orange accents  

---

## 🔄 Theming  
```js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#4FC3F7" }, // light blue
    secondary: { main: "#FFB74D" }, // light orange
    background: { default: "#FAFAFA" },
    error: { main: "#E57373" },
    success: { main: "#81C784" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
});
export default theme;

---

## Notes
- **Frontend MVP first**, then **backend MVP**, then extend frontend, then backend  
- MongoDB Atlas handles DB; no Azure MongoDB needed for MVP  
- Ensure HTTPS and proper auth before deployment  
- Environment variables for secrets (MongoDB URI, JWT secret)

