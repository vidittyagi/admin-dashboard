import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Typography,
  Paper,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Avatar,
  Grid,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { FormInput } from "../components/FormInput";

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [profileUpdateSuccess, setProfileUpdateSuccess] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    control: profileControl,
    handleSubmit: handleProfileSubmit,
    formState: { isSubmitting: isProfileSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    watch,
    formState: { isSubmitting: isPasswordSubmitting },
  } = useForm();

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleProfileUpdate = async (data) => {
    try {
      await updateUser(data);
      setProfileUpdateSuccess(true);
      setTimeout(() => setProfileUpdateSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordUpdate = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("userCreds", JSON.stringify({email:user.email, password:data.newPassword}));
      setPasswordUpdateSuccess(true);
      resetPasswordForm();
      setTimeout(() => setPasswordUpdateSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Settings
            </Typography>
            <Box
              component="form"
              onSubmit={handleProfileSubmit(handleProfileUpdate)}
              sx={{ mt: 2 }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <Avatar sx={{ width: 100, height: 100 }}>
                  {user?.name?.charAt(0) || "A"}
                </Avatar>
              </Box>

              <FormInput
                control={profileControl}
                name="name"
                label="Name"
                rules={{ required: "Name is required" }}
              />

              <FormInput
                control={profileControl}
                name="email"
                label="Email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
              />

              {profileUpdateSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  Profile updated successfully!
                </Alert>
              )}

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
                fullWidth
                disabled={isProfileSubmitting}
              >
                {isProfileSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>

            <Box sx={{ mt: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={darkMode}
                    onChange={handleThemeChange}
                    color="primary"
                  />
                }
                label="Dark Mode"
              />

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom>
                Change Password
              </Typography>

              <Box
                component="form"
                onSubmit={handlePasswordSubmit(handlePasswordUpdate)}
              >
                <FormInput
                  control={passwordControl}
                  name="currentPassword"
                  label="Current Password"
                  type="password"
                  rules={{
                    required: "Current password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  }}
                />

                <FormInput
                  control={passwordControl}
                  name="newPassword"
                  label="New Password"
                  type="password"
                  rules={{
                    required: "New password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  }}
                />

                <FormInput
                  control={passwordControl}
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  rules={{
                    required: "Please confirm your new password",
                    validate: (value) =>
                      value === watch("newPassword") ||
                      "Passwords do not match",
                  }}
                />

                {passwordUpdateSuccess && (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Password updated successfully!
                  </Alert>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  fullWidth
                  disabled={isPasswordSubmitting}
                >
                  {isPasswordSubmitting ? "Updating..." : "Change Password"}
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Button
                variant="outlined"
                color="error"
                onClick={logout}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}