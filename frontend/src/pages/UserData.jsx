import { useEffect, useState, useContext } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function UserData() {
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);

  const [userData, setUserData] = useState({
    phoneNumber: "",
    linkedinUrl: "",
    githubUrl: "",
    personalWebsiteUrl: "",
  });

  const [openField, setOpenField] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const fetchUserData = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`http://localhost:8080/api/v1/userdata/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      } else {
        console.error("UserData not found");
      }
    } catch (err) {
      console.error("Error fetching userData:", err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const handleEditClick = (field) => {
    setOpenField(field);
    setTempValue(userData[field] || "");
  };

  const handleSave = async () => {
    if (!userId || !openField) return;

    const updatedData = { ...userData, [openField]: tempValue };

    try {
      const res = await fetch(`http://localhost:8080/api/v1/userdata/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        setUserData(updatedData);
      }
    } catch (err) {
      console.error("Error updating userData:", err);
    }
    setOpenField(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const fields = [
    { key: "phoneNumber", label: "Phone Number", icon: <PhoneIcon fontSize="large" /> },
    { key: "linkedinUrl", label: "LinkedIn", icon: <LinkedInIcon fontSize="large" /> },
    { key: "githubUrl", label: "GitHub", icon: <GitHubIcon fontSize="large" /> },
    { key: "personalWebsiteUrl", label: "Website", icon: <LanguageIcon fontSize="large" /> },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/dashboard")}
        sx={{ mb: 4 }}
      >
        Back to Dashboard
      </Button>

      <Box textAlign="center" mb={4}>
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: 100,
            height: 100,
            margin: "0 auto",
            fontSize: 36,
          }}
        >
          {userId ? userId.charAt(0).toUpperCase() : "U"}
        </Avatar>
        <Typography variant="h4" fontWeight={700} mt={2}>
          User Data
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Manage and update your profile details
        </Typography>
      </Box>

      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          {fields.map(({ key, label, icon }, idx) => (
            <Box key={key}>
              <Grid
                container
                alignItems="center"
                spacing={3}
                sx={{ py: 2 }}
              >
                <Grid item>{icon}</Grid>
                <Grid item xs>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {label}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {userData[key] || "Not set"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <Tooltip title={`Copy ${label}`}>
                      <IconButton
                        size="medium"
                        onClick={() => copyToClipboard(userData[key])}
                      >
                        <ContentCopyIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={`Edit ${label}`}>
                      <IconButton
                        size="medium"
                        color="primary"
                        onClick={() => handleEditClick(key)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
              </Grid>
              {idx < fields.length - 1 && <Divider />}
            </Box>
          ))}
        </CardContent>
      </Card>

      <Dialog open={Boolean(openField)} onClose={() => setOpenField(null)}>
        <DialogTitle>Edit {openField}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenField(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default UserData;
