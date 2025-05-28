import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Divider,
  Avatar,
  Grid
} from '@mui/material'
import { useAuth } from '../contexts/AuthContext';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || ''
    }
  })

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }

  const onSubmit = (data) => {
    console.log('Profile updated:', data);
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Settings
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ mt: 2 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Avatar sx={{ width: 100, height: 100 }}>
                  {user?.name?.charAt(0) || 'A'}
                </Avatar>
              </Box>
              
              <TextField
                fullWidth
                margin="normal"
                label="Name"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3 }}
                fullWidth
              >
                Update Profile
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
              
              <TextField
                fullWidth
                margin="normal"
                label="Current Password"
                type="password"
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="New Password"
                type="password"
              />
              
              <TextField
                fullWidth
                margin="normal"
                label="Confirm New Password"
                type="password"
              />
              
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
              >
                Change Password
              </Button>
              
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
  )
}