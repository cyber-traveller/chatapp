import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ type: "spring", stiffness: 500, damping: 30 }}
		>
			<Box
				component={motion.div}
				whileHover={{ scale: 1.02, transition: { duration: 0.3, ease: 'easeOut' } }}
				sx={{
					display: 'flex',
					justifyContent: fromMe ? 'flex-end' : 'flex-start',
					my: 1.2,
					px: 1.5,
				}}
			>
				<Box
					component={motion.div}
					whileTap={{ scale: 0.98 }}
					sx={{
						backgroundImage: fromMe 
							? 'linear-gradient(135deg, #2979ff 0%, #1565c0 100%)' 
							: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
						color: fromMe ? '#fff' : '#2c3e50',
						padding: '12px 18px',
						borderRadius: fromMe ? '20px 4px 20px 20px' : '4px 20px 20px 20px',
						maxWidth: '75%',
						wordWrap: 'break-word',
						boxShadow: fromMe 
							? '0 4px 15px rgba(41, 121, 255, 0.15)' 
							: '0 4px 15px rgba(0, 0, 0, 0.05)',
						transform: 'translateZ(0)',
						backfaceVisibility: 'hidden',
						transition: 'all 0.2s ease-in-out'
					}}
				>
					<Typography 
						variant="body1" 
						component="div"
						sx={{ 
							lineHeight: 1.5,
							fontWeight: 450,
							whiteSpace: 'pre-wrap',
							wordBreak: 'break-word',
							letterSpacing: '0.2px'
						}}
					>
						{message.message}
					</Typography>
					<Typography
						variant="caption"
						color={fromMe ? 'rgba(255,255,255,0.9)' : 'text.secondary'}
						component="div"
						sx={{
							display: 'block',
							textAlign: fromMe ? 'right' : 'left',
							mt: 0.5,
							fontSize: '0.7rem',
							letterSpacing: '0.3px',
							opacity: 0.9
						}}
					>
						{formattedTime}
					</Typography>
				</Box>
			</Box>
		</motion.div>
	);
};

export default Message;
