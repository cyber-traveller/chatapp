import { IconButton, Box, Tooltip } from '@mui/material';
import { AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ProfileButton = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
      <Tooltip title="Profile" arrow>
        <IconButton
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          <AccountCircleIcon sx={{ fontSize: 32, color: 'white' }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ProfileButton;