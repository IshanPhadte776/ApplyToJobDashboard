# 📡 Job Tracker – API Schema (Versioned v1)

**Base URL (local):** `https://localhost:5001/api/v1`  
**Base URL (prod):** `https://<your-azure-app>.azurewebsites.net/api/v1`  

> All endpoints are versioned as `v1`. Future versions can be added as `/api/v2/...` without breaking existing clients.

---

## 🔑 AuthController (`/api/v1/auth`)

**POST /register**  
- Register a new user  
- Body:  
```json
{
  "username": "Ishan Phadte",
  "password": "password",
  "userDataID": "IP083"
}
Response:

json
Copy code
{
  "userId": "123",
  "username": "ishan"
}
POST /login

Authenticate user and return JWT

Body:

json
Copy code
{
  "username": "ishan",
  "password": "securePass123"
}
Response:

json
Copy code
{
  "token": "<jwt-token>",
  "expiresIn": 3600
}
📋 JobsController (/api/v1/jobs)
GET / → Get all job applications for logged-in user

GET /{id} → Get a specific job application

POST / → Add new job application

json
Copy code
{
  "jobTitle": "Backend Engineer",
  "company": "Google",
  "status": "Applied",
  "dateApplied": "2025-09-12",
  "accountNeeded": true,
  "jobUrl": "https://google.com/job/123"
}
PUT /{id} → Update job application

DELETE /{id} → Delete job application

🏢 AccountsController (/api/v1/accounts)
GET / → List all company accounts

POST / → Add new company account

json
Copy code
{
  "companyName": "CIBC",
  "email": "user@cibc.com",
  "password": "secret123",
  "portalUrl": "https://careers.cibc.com"
}
PUT /{id} → Update account

DELETE /{id} → Delete account

📄 ResumesController (/api/v1/resumes)
GET / → Get all resumes

POST /upload → Upload resume (multipart/form-data: file, title)

GET /{id} → Download specific resume

DELETE /{id} → Delete resume

📝 CoverLettersController (/api/v1/coverletters)
GET / → Get all cover letters

POST /upload → Upload cover letter (multipart/form-data: file, title, resumeId)

GET /{id} → Download specific cover letter

DELETE /{id} → Delete cover letter

🔍 SearchesController (/api/v1/searches)
GET / → Get saved job searches

POST / → Add saved search

json
Copy code
{
  "platform": "LinkedIn",
  "query": "Software Engineer Remote",
  "url": "https://linkedin.com/jobs/search/..."
}
DELETE /{id} → Delete saved search

🖥 ScraperProjectsController (/api/v1/scraperprojects)
GET / → List GitHub scraper projects

POST / → Add scraper project link

json
Copy code
{
  "title": "LinkedIn Scraper",
  "url": "https://github.com/ishan/job-scraper"
}
DELETE /{id} → Remove project link