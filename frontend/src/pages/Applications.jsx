import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  Tooltip,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import TodayIcon from "@mui/icons-material/Today";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import DailyGoalTracker from "../components/DailyGoalTracker";
import { UserContext } from "../context/UserContext";

function Applications() {
  const navigate = useNavigate();
  const { userId, name } = useContext(UserContext);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [form, setForm] = useState({
    jobId: "",
    jobTitle: "",
    company: "",
    status: "Applied",
    dateApplied: getESTDate(),
    accountNeeded: false,
    jobUrl: "",
    userDataID: userId || "",
  });
  const [filters, setFilters] = useState({ jobTitle: "", status: "", dateApplied: "", company: "" });

  function getESTDate() {
    const estDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const d = new Date(estDate);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }

  const fetchApplications = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/jobs?userDataID=${userId}`);
      const data = await res.json();
      setApplications(data);
      setFilteredApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    if (userId) fetchApplications();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
      userDataID: userId,
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const generateJobId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${userId}-${randomNum}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApplication = { ...form, jobId: generateJobId(), userDataID: userId };

    try {
      const res = await fetch("http://localhost:8080/api/v1/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newApplication),
      });
      if (res.ok) {
        setForm({
          jobId: "",
          jobTitle: "",
          company: "",
          status: "Applied",
          dateApplied: getESTDate(),
          accountNeeded: false,
          jobUrl: "",
          userDataID: userId,
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
            <TextField name="jobUrl" label="Job URL" value={form.jobUrl} onChange={handleChange} />
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
            <TextField fullWidth label="Filter by Job Title" name="jobTitle" value={filters.jobTitle} onChange={handleFilterChange} />
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
                      <Typography sx={{ wordBreak: "break-word" }}>{app.jobUrl}</Typography>
                      <Tooltip title="Copy Job URL">
                        <IconButton size="small" onClick={() => copyToClipboard(app.jobUrl)}>
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button size="small" color="primary">
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Applications;
