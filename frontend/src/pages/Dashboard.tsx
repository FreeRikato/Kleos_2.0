import { useState } from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, IconButton, Link, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import RouteIcon from '@mui/icons-material/Route';
import Chart1 from '../components/Chart1';
import Chart2 from '../components/Chart2';

const drawerWidth = 240;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider sx={{ backgroundColor: 'white' }} />
      <List>
        {['Dashboard', 'Chat', 'Blog', 'Calendar', 'Roadmap'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: 'white' }}>
                {index === 0 && <DashboardIcon />}
                {index === 1 && < ChatIcon/>}
                {index === 2 && <BookIcon />}
                {index === 3 && <CalendarTodayIcon />}
                {index === 4 && <RouteIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: 'white' }} />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#1c1c1c' }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component={Link} href="/dashboard" color="inherit" sx={{ textDecoration: 'none', fontWeight: 'bold' }}>
            MirAI
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#1c1c1c',
            color: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#1c1c1c',
            color: 'white',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#2e2e2e', p: 0, m: 0 }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom sx={{ p: 2, m: 0, color: 'white' }}>
          Charts
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, p: 2, m: 0 }}>
          <Box sx={{ flex: 1, bgcolor: 'white', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Chart 1
            </Typography>
            <Chart1 />
          </Box>
          <Box sx={{ flex: 1, bgcolor: 'white', p: 2, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Chart 2
            </Typography>
            <Chart2 />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
