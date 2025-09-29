import { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WorkIcon from "@mui/icons-material/Work";
import TodayIcon from "@mui/icons-material/Today";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import DailyGoalTracker from "../components/DailyGoalTracker";
import { UserContext } from "../context/UserContext";

function Applications() {
  const navigate = useNavigate();
  const { userID, name } = useContext(UserContext);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [form, setForm] = useState({
    jobTitle: "",
    company: "",
    status: "Applied",
    dateApplied: getESTDate(),
    accountNeeded: false,
    applicationURL: "",
    userID: userID || "",
  });
  const [filters, setFilters] = useState({ jobTitle: "", status: "", dateApplied: "", company: "" });

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const STATUS_OPTIONS = ["Applied", "OA" ,"Interviewing", "Offer", "Rejected"];


  function getESTDate() {
    const estDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const d = new Date(estDate);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  const fetchApplications = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/users/${userID}/applications?page=0&size=20`);
      const data = await res.json();
      console.log("Applications response:", data);

      setApplications(Array.isArray(data) ? data : data.applications || []);
      setFilteredApplications(Array.isArray(data) ? data : data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
      setFilteredApplications([]);
    }
  };



  useEffect(() => {
    if (userID) fetchApplications();
  }, [userID]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
      userID: userID,
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const generateApplicationID = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${userID}-${randomNum}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApplication = {
      applicationID: generateApplicationID(),
      jobTitle: form.jobTitle,
      company: form.company,
      status: form.status,
      dateApplied: form.dateApplied,
      accountNeeded: form.accountNeeded,
      applicationURL: form.applicationURL,
      userID: userID,
    };

    try {
      const res = await fetch("http://localhost:8080/api/v1/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApplication),
      });
      if (res.ok) {
        setForm({
          jobTitle: "",
          company: "",
          status: "Applied",
          dateApplied: getESTDate(),
          accountNeeded: false,
          applicationURL: "",
        });
        fetchApplications();
      }
    } catch (err) {
      console.error("Error adding application:", err);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const applyFilters = () => {
    const filtered = applications.filter((app) => {
      const matchesTitle = app.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase());
      const matchesStatus = app.status.toLowerCase().includes(filters.status.toLowerCase());
      const matchesDate = !filters.dateApplied || app.dateApplied === filters.dateApplied;
      const matchesCompany = app.company.toLowerCase().includes(filters.company.toLowerCase());
      return matchesTitle && matchesStatus && matchesDate && matchesCompany;
    });
    setFilteredApplications(filtered);
  };

  // Modal handlers
  const handleOpenModal = (app) => {
    setSelectedApp({ ...app });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedApp(null);
    setOpenModal(false);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedApp({ ...selectedApp, [name]: value });
  };

  const handleUpdateApplication = async () => {
    if (!selectedApp) return;

    const url = `http://localhost:8080/api/v1/applications/${selectedApp.applicationID}`;
    const payload = {
      status: selectedApp.status,
      applicationURL: selectedApp.applicationURL,
    };

    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Update response:", data);

      if (res.ok) {
        fetchApplications();
        handleCloseModal();
      } else {
        console.error("Update failed:", data);
      }
    } catch (err) {
      console.error("Error updating application:", err);
    }
  };



  const handleDeleteApplication = async (applicationID) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/applications/${applicationID}`, {
        method: "DELETE",
      });

      const data = await res.json();
      console.log("Delete response:", data);

      if (res.ok) fetchApplications();
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };


  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button variant="outlined" color="secondary" onClick={() => navigate("/dashboard")} sx={{ mb: 3 }}>
        Back to Dashboard
      </Button>

      <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
        Applications
      </Typography>

      <Typography variant="subtitle1" align="center" gutterBottom>
        Welcome, {name || "User"}
      </Typography>

      <DailyGoalTracker goal={10} />

      {/* Application Form */}
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add New Application
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField name="jobTitle" label="Job Title" value={form.jobTitle} onChange={handleChange} required />
            <TextField name="company" label="Company" value={form.company} onChange={handleChange} required />
            <TextField name="status" label="Status" value={form.status} onChange={handleChange} />
            <TextField
              name="dateApplied"
              label="Date Applied"
              type="date"
              value={form.dateApplied}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField name="applicationURL" label="Job URL" value={form.applicationURL} onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary">
              Add Application
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Filters */}
      <Paper elevation={2} sx={{ p: 3, mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Filter by Job Title"
              name="jobTitle"
              value={filters.jobTitle}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Filter by Status" name="status" value={filters.status} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Filter by Date"
              name="dateApplied"
              type="date"
              value={filters.dateApplied}
              onChange={handleFilterChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Filter by Company" name="company" value={filters.company} onChange={handleFilterChange} />
          </Grid>
        </Grid>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={applyFilters}>
          Apply Filters
        </Button>
      </Paper>

      {/* Application List */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          My Applications
        </Typography>
        <Grid container spacing={3}>
          {filteredApplications.map((app, idx) => (
            <Grid item xs={12} key={idx}>
              <Card elevation={3} sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {app.jobTitle} @ {app.company}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Stack spacing={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <WorkIcon color="primary" />
                      <Typography>Status: {app.status}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <TodayIcon color="secondary" />
                      <Typography>Date Applied: {app.dateApplied}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LinkIcon color="action" />
                      <Typography sx={{ wordBreak: "break-word" }}>{app.applicationURL}</Typography>
                      <Tooltip title="Copy Job URL">
                        <IconButton size="small" onClick={() => copyToClipboard(app.applicationURL)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button size="small" color="primary" onClick={() => handleOpenModal(app)}>
                    View Details
                  </Button>
                  <Button size="small" color="error" onClick={() => handleDeleteApplication(app.applicationID)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Edit Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit Application</DialogTitle>
        <DialogContent>
          {selectedApp && (
            <Stack spacing={2} sx={{ mt: 1 }}>
              {/* 🔹 Status dropdown */}
              <Select
                label="Status"
                name="status"
                value={selectedApp.status}
                onChange={handleModalChange}
                fullWidth
              >
                {["Applied", "OA", "Interviewing", "Offer", "Rejected"].map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>

              {/* Application URL */}
              <TextField
                label="Application URL"
                name="applicationURL"
                value={selectedApp.applicationURL}
                onChange={handleModalChange}
                fullWidth
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateApplication}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Applications;
