import { useEffect, useState } from "react";
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

const API_BASE = "http://localhost:8080/api/v1";

function Resumes() {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [resumeForm, setResumeForm] = useState({ title: "", file: null, userDataId: "IP083" });

  // Fetch resumes
  const fetchResumes = async () => {
    try {
      const res = await fetch(`${API_BASE}/resumes/${resumeForm.userDataId}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setResumes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch resumes:", err);
      setResumes([]);
    }
  };

  useEffect(() => { fetchResumes(); }, []);

  // Handle form input
  const handleResumeChange = (e) => {
    const { name, value, files } = e.target;
    setResumeForm({ ...resumeForm, [name]: files ? files[0] : value });
  };

  // Submit new resume
  const submitResume = async () => {
    if (!resumeForm.title || !resumeForm.file) {
      alert("Please provide both title and file");
      return;
    }

    const formData = new FormData();
    formData.append("title", resumeForm.title);
    formData.append("file", resumeForm.file);
    formData.append("userDataId", resumeForm.userDataId);

    try {
      const res = await fetch(`${API_BASE}/resumes/upload`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      setResumeForm({ title: "", file: null, userDataId: resumeForm.userDataId });
      fetchResumes();
    } catch (err) {
      console.error("Failed to upload resume:", err);
    }
  };

  // Delete resume
  const deleteResume = async (id) => {
    await fetch(`${API_BASE}/resumes/${id}?userDataId=${resumeForm.userDataId}`, { method: "DELETE" });
    fetchResumes();
  };

  // Download resume
  const downloadResume = async (fileId, filename) => {
    try {
      const res = await fetch(`${API_BASE}/resumes/download/${fileId}`);
      if (!res.ok) throw new Error("Download failed");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error("Failed to download resume:", err);
    }
  };

  return (
    <Container>
  {/* Back to Dashboard */}
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
    My Resumes
  </Typography>


      {/* Upload Resume Form */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Upload Resume</Typography>
        <TextField
          name="title"
          label="Title"
          value={resumeForm.title}
          onChange={handleResumeChange}
          fullWidth
          sx={{ mb: 1 }}
        />
        <Button
          variant="contained"
          component="label"
          startIcon={<UploadFileIcon />}
          sx={{ mb: 1 }}
        >
          Upload File
          <input type="file" hidden name="file" onChange={handleResumeChange} />
        </Button>
        <Button variant="contained" color="primary" onClick={submitResume}>
          Submit Resume
        </Button>
      </Box>

      {/* List of Resumes */}
      <List>
        {resumes.map((r) => (
          <ListItem key={r.id} divider sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            <ListItemText
              primary={r.title}
              secondary={`Created At: ${new Date(r.createdAt).toLocaleString()}`}
            />
            <Box sx={{ mt: 1 }}>
              <Button
                variant="outlined"
                onClick={() => downloadResume(r.fileId, r.title)}
                sx={{ mr: 1 }}
              >
                Download
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteResume(r.id)}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Resumes;
