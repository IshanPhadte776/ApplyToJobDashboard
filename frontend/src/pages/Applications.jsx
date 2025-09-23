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
  IconButton,
  Tooltip,
  Grid,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useNavigate } from "react-router-dom";
import DailyGoalTracker from "../components/DailyGoalTracker";

function Applications() {
  const navigate = useNavigate();
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
    userDataID: "IP083",
  });

  const [filters, setFilters] = useState({ jobTitle: "", status: "", dateApplied: "", company: "" });

  function getESTDate() {
    const estDate = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const d = new Date(estDate);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const fetchApplications = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/jobs?userDataID=${form.userDataID}`
      );
      const data = await res.json();
      setApplications(data);
      setFilteredApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const generateJobId = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `IP083-${randomNum}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newApplication = { ...form, jobId: generateJobId() };

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
          userDataID: "IP083",
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
        Applications
      </Typography>

      <DailyGoalTracker goal={10} />

      {/* Application Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          name="jobTitle"
          label="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="company"
          label="Company"
          value={form.company}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="status"
          label="Status"
          value={form.status}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="dateApplied"
          label="Date Applied"
          type="date"
          value={form.dateApplied}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          name="jobUrl"
          label="Job URL"
          value={form.jobUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Application
        </Button>
      </Box>

      {/* Filters */}
      <Box sx={{ mb: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          label="Filter by Job Title"
          name="jobTitle"
          value={filters.jobTitle}
          onChange={handleFilterChange}
          fullWidth
        />
        <TextField
          label="Filter by Status"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          fullWidth
        />
        <TextField
          label="Filter by Date"
          name="dateApplied"
          type="date"
          value={filters.dateApplied}
          onChange={handleFilterChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Filter by Company"
          name="company"
          value={filters.company}
          onChange={handleFilterChange}
          fullWidth
        />
        <Button variant="contained" color="secondary" onClick={applyFilters}>
          Search by Filter
        </Button>
      </Box>

      {/* Application List */}
      <Typography variant="h6">My Applications</Typography>
      <List>
        {filteredApplications.map((app, idx) => (
          <ListItem
            key={idx}
            divider
            sx={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Typography variant="h6">{app.jobTitle} - {app.company}</Typography>

            <Grid container alignItems="center">
              <Grid item xs>
                <ListItemText primary={`Status: ${app.status}`} />
              </Grid>
            
            </Grid>

            <Grid container alignItems="center">
              <Grid item xs>
                <ListItemText primary={`Date Applied: ${app.dateApplied}`} />
              </Grid>
            </Grid>

            <Grid container alignItems="center">
              <Grid item xs>
                <ListItemText primary={`Job URL: ${app.jobUrl}`} />
              </Grid>
              <Grid item>
                <Tooltip title="Copy Job URL">
                  <IconButton onClick={() => copyToClipboard(app.jobUrl)}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Applications;
