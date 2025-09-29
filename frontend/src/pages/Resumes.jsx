import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const API_BASE = "http://localhost:8080/api/v1";

function Documents() {
  const navigate = useNavigate();
  const { userID } = useContext(UserContext);

  const [resumes, setResumes] = useState([]);
  const [coverLetters, setCoverLetters] = useState([]);

  const [resumeForm, setResumeForm] = useState({ title: "", file: null });
  const [coverForm, setCoverForm] = useState({ title: "", file: null });

  // Fetch documents
  const fetchDocuments = async () => {
    if (!userID) return;
    try {
      const resResumes = await fetch(`${API_BASE}/resumes/${userID}`);
      const resumesData = resResumes.ok ? await resResumes.json() : [];
      setResumes(Array.isArray(resumesData) ? resumesData : []);

      const resCovers = await fetch(`${API_BASE}/coverletters/${userID}`);
      const coversData = resCovers.ok ? await resCovers.json() : [];
      setCoverLetters(Array.isArray(coversData) ? coversData : []);
    } catch (err) {
      console.error("Failed to fetch documents:", err);
      setResumes([]);
      setCoverLetters([]);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [userID]);

  console.log("User ID from context:", userID);

  const handleChange = (e, formSetter) => {
    const { name, value, files } = e.target;
    formSetter((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleUpload = async (form, endpoint, resetForm) => {
    if (!form.title || !form.file || !userID) {
      alert("Please provide both title and file");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("file", form.file);
    formData.append("userID", userID);

    try {
      const res = await fetch(`${API_BASE}/${endpoint}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      resetForm({ title: "", file: null });
      fetchDocuments();
    } catch (err) {
      console.error(`Failed to upload ${endpoint}:`, err);
    }
  };

  const handleDelete = async (id, endpoint) => {
    if (!userID) return;
    await fetch(`${API_BASE}/${endpoint}/${id}?userID=${userID}`, { method: "DELETE" });
    fetchDocuments();
  };

  const handleDownload = async (fileID, filename, endpoint) => {
    try {
      const res = await fetch(`${API_BASE}/${endpoint}/download/${fileID}`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "document.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Failed to download document:", err);
    }
  };

  const renderDocumentList = (items, type) => (
    <List>
      {items.map((doc) => (
        <ListItem
          key={doc.id}
          divider
          sx={{ flexDirection: "column", alignItems: "flex-start" }}
        >
          <ListItemText
            primary={doc.title}
            secondary={`Created At: ${new Date(doc.createdAt).toLocaleString()}`}
          />
          <Box sx={{ mt: 1 }}>
            <Button
              variant="outlined"
              onClick={() => handleDownload(doc.fileID, doc.title, type)}
              sx={{ mr: 1 }}
            >
              Download
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(doc.id, type)}
            >
              Delete
            </Button>
          </Box>
        </ListItem>
      ))}
    </List>
  );

  return (
  <Container>
    <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </Button>
    </Box>

    <Typography variant="h4" align="center" gutterBottom>
      My Documents
    </Typography>

    {/* Upload Resume */}
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6">Upload Resume</Typography>
      <TextField
        name="title"
        label="Title"
        value={resumeForm.title}
        onChange={(e) => handleChange(e, setResumeForm)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          Upload File
          <input
            type="file"
            hidden
            name="file"
            onChange={(e) => handleChange(e, setResumeForm)}
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpload(resumeForm, "resumes", setResumeForm)}
        >
          Submit Resume
        </Button>
      </Box>
      {resumeForm.file && (
        <Typography variant="body2">Selected file: {resumeForm.file.name}</Typography>
      )}
    </Box>

    {/* List of Resumes */}
    <Typography variant="h6">My Resumes</Typography>
    {renderDocumentList(resumes, "resumes")}

    {/* Upload Cover Letter */}
    <Box sx={{ mt: 4, mb: 3 }}>
      <Typography variant="h6">Upload Cover Letter</Typography>
      <TextField
        name="title"
        label="Title"
        value={coverForm.title}
        onChange={(e) => handleChange(e, setCoverForm)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          Upload File
          <input
            type="file"
            hidden
            name="file"
            onChange={(e) => handleChange(e, setCoverForm)}
          />
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpload(coverForm, "coverletters", setCoverForm)}
        >
          Submit Cover Letter
        </Button>
      </Box>
      {coverForm.file && (
        <Typography variant="body2">Selected file: {coverForm.file.name}</Typography>
      )}
    </Box>

    {/* List of Cover Letters */}
    <Typography variant="h6">My Cover Letters</Typography>
    {renderDocumentList(coverLetters, "coverletters")}
  </Container>
);

}

export default Documents;
