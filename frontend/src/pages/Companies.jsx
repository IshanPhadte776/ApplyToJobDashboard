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
  IconButton,
  Tooltip,
  Stack,
  Grid,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const API_BASE = "http://localhost:8080/api/v1";

function CompanyAccounts() {
  const navigate = useNavigate();
  const { userID, name } = useContext(UserContext); // get userID and name from context

  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    password: "",
    portalURL: "",
  });

  const [revealedPasswords, setRevealedPasswords] = useState({}); // Track revealed passwords


  // ✅ Fetch all accounts for user
  const fetchAccounts = async () => {
    if (!userID) return;
    try {
      const res = await fetch(`${API_BASE}/companyaccounts?userID=${userID}`);
      const data = await res.json();
      console.log("Fetched accounts:", data);
      setAccounts(data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  console.log("User ID from context:", userID);


  useEffect(() => {
    fetchAccounts();
  }, [userID]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Generate account ID like AC123456
  const generateAccountID = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000); // 6 digits
    return `AC${randomNum}`;
  };

  // ✅ Add a new account
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userID) return;

    const newAccount = {
      ...form,
      accountID: generateAccountID(),
      userID: userID, // use userId from context
    };

    try {
      const res = await fetch(`${API_BASE}/companyaccounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      });
      if (res.ok) {
        setForm({
          companyName: "",
          email: "",
          password: "",
          portalURL: "",
        });
        fetchAccounts(); // refresh list
      }
    } catch (err) {
      console.error("Error adding account:", err);
    }
  };

  // ✅ Copy helper
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

   const togglePasswordVisibility = (accountID) => {
    setRevealedPasswords((prev) => ({
      ...prev,
      [accountID]: !prev[accountID],
    }));
  };

  return (
    <Container>
      {/* ✅ Back button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 2 }}
      >
        Back to Dashboard
      </Button>

      <Typography variant="h4" align="center" gutterBottom>
        {name ? `${name}'s Company Accounts` : "Company Accounts"}
      </Typography>

      {/* ✅ Account Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          name="companyName"
          label="Company Name"
          value={form.companyName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="email"
          label="Email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="password"
          label="Password"
          type="text"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="portalURL"
          label="Portal URL"
          value={form.portalURL}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Account
        </Button>
      </Box>

      {/* ✅ Account List */}
      <Typography variant="h6">My Accounts</Typography>
      <List>
        {accounts.map((acc, idx) => (
          <ListItem
            key={idx}
            divider
            sx={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Typography variant="h6">{acc.companyName}</Typography>

            {/* Email */}
            <Grid container alignItems="center">
              <Grid item xs>
                <ListItemText primary={`Email: ${acc.email}`} />
              </Grid>
              <Grid item>
                <Tooltip title="Copy Email">
                  <IconButton onClick={() => copyToClipboard(acc.email)}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>

            {/* Password */}
            <Grid container alignItems="center">
  <Grid item xs>
    <ListItemText
      primary={`Password: ${
        revealedPasswords[acc.accountID] ? acc.password : "***"
      }`}
    />
  </Grid>
  <Grid item>
    <Stack direction="row" spacing={1}>
      <Tooltip title="Copy Password">
        <IconButton onClick={() => copyToClipboard(acc.password)}>
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip
        title={
          revealedPasswords[acc.accountID] ? "Hide Password" : "Reveal Password"
        }
      >
        <IconButton onClick={() => togglePasswordVisibility(acc.accountID)}>
          {revealedPasswords[acc.accountID] ? (
            <VisibilityOffIcon fontSize="small" />
          ) : (
            <VisibilityIcon fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    </Stack>
  </Grid>
</Grid>

            {/* Portal URL */}
            <Grid container alignItems="center">
              <Grid item xs>
                <ListItemText primary={`Portal: ${acc.portalURL}`} />
              </Grid>
              <Grid item>
                <Tooltip title="Copy Portal URL">
                  <IconButton onClick={() => copyToClipboard(acc.portalURL)}>
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

export default CompanyAccounts;
