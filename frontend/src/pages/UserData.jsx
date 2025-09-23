import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate } from "react-router-dom";

function UserData() {
  const navigate = useNavigate();
  const userId = "IP083"; // hardcoded for now
  const [userData, setUserData] = useState({
    phoneNumber: "",
    linkedinUrl: "",
    githubUrl: "",
    personalWebsiteUrl: "",
  });

  const [form, setForm] = useState({ ...userData });

  // Fetch userData from backend
  const fetchUserData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/userdata/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        setForm(data);
      } else {
        console.error("UserData not found");
      }
    } catch (err) {
      console.error("Error fetching userData:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/v1/userdata/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        fetchUserData(); // refresh display
      }
    } catch (err) {
      console.error("Error updating userData:", err);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Container>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 2 }}
      >
        Back to Dashboard
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        User Data
      </Typography>

      {/* Display userData with copy buttons */}
      <Box sx={{ mb: 3 }}>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={10}>
            <Typography variant="h6">Phone Number: {userData.phoneNumber}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Copy Phone Number">
              <IconButton onClick={() => copyToClipboard(userData.phoneNumber)}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={10}>
            <Typography variant="h6">LinkedIn: {userData.linkedinUrl}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Copy LinkedIn URL">
              <IconButton onClick={() => copyToClipboard(userData.linkedinUrl)}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={10}>
            <Typography variant="h6">GitHub: {userData.githubUrl}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Copy GitHub URL">
              <IconButton onClick={() => copyToClipboard(userData.githubUrl)}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Grid>

          <Grid item xs={10}>
            <Typography variant="h6">Website: {userData.personalWebsiteUrl}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Tooltip title="Copy Website URL">
              <IconButton onClick={() => copyToClipboard(userData.personalWebsiteUrl)}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      {/* Edit userData form */}
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="linkedinUrl"
              label="LinkedIn URL"
              value={form.linkedinUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="githubUrl"
              label="GitHub URL"
              value={form.githubUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="personalWebsiteUrl"
              label="Personal Website URL"
              value={form.personalWebsiteUrl}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Update User Data
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default UserData;
