import React from 'react';
import { Box, CssBaseline, Drawer, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemIcon, ListItemText, IconButton, InputBase, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import HistoryIcon from '@mui/icons-material/History';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';

const drawerWidth = 280;

const Chat: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#f5f5f5',
            color: '#000',
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Chatbot
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Conversation History" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Contacts" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#f0f0f0', p: 3 }}
      >
        <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, backgroundColor: '#fff', color: '#000' }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Chatbot
            </Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 64px)' }}>
          <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#fff', borderRadius: 1, overflow: 'auto' }}>
            {/* Chat messages */}
            <Typography variant="body1" gutterBottom><b>You:</b> Hello, I'm looking for information on the latest advancements in AI chatbots. Can you provide an overview?</Typography>
            <Typography variant="body1" gutterBottom><b>Chatbot:</b> Absolutely! The field of AI chatbots has seen rapid advancements in recent years. Some of the key developments include:</Typography>
            <Typography variant="body1" gutterBottom><b>You:</b> That's really interesting, thank you for the overview. What are some of the key use cases for advanced chatbots today?</Typography>
            <Typography variant="body1" gutterBottom><b>Chatbot:</b> Some of the key use cases for advanced chatbots today include:</Typography>
          </Box>
          <Paper component="form" sx={{ display: 'flex', alignItems: 'center', p: 1, mt: 2 }}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Message Chatbot..."
              inputProps={{ 'aria-label': 'message chatbot' }}
            />
            <IconButton type="submit" sx={{ p: 1 }} aria-label="send">
              <SendIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
