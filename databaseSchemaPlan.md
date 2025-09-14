# Job Tracker Database Schema

## Collections / Tables

### 1. Users
Stores login and personal info.

- **_id** (ObjectId / INT PK)
- **username** (string, unique)
- **password** (string, hashed with BCrypt)
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
