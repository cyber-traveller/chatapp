import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import { Avatar, Box, Typography, Badge, Zoom } from "@mui/material";
import { styled } from "@mui/system";

const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
		backgroundColor: theme.palette.success.main,
		color: theme.palette.success.main,
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: 'ripple 1.2s infinite cubic-bezier(0.4, 0, 0.2, 1)',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}));

const StyledPaper = styled(Box)(({ theme, "data-selected": isSelected }) => ({
	display: 'flex',
	alignItems: 'center',
	gap: theme.spacing(2),
	padding: theme.spacing(2),
	cursor: 'pointer',
	borderRadius: 16,
	backgroundColor: isSelected ? theme.palette.primary.dark : 'rgba(255, 255, 255, 0.03)',
	transition: theme.transitions.create(['background-color', 'box-shadow', 'transform'], {
		duration: theme.transitions.duration.standard,
	}),
	'&:hover': {
		backgroundColor: isSelected ? theme.palette.primary.dark : theme.palette.action.hover,
		transform: 'translateY(-2px) scale(1.02)',
		boxShadow: theme.shadows[8],
	},
	width: '100%',
	minWidth: '0',
	margin: '0 auto',
	overflow: 'hidden',
}));

const Conversation = ({ conversation, lastIdx, emoji }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	const isSelected = selectedConversation?._id === conversation._id;
	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<Zoom in timeout={300}>
			<Box sx={{ mb: !lastIdx ? 1 : 0 }}>
				<StyledPaper 
					data-selected={isSelected}
					onClick={() => setSelectedConversation(conversation)}
					elevation={isSelected ? 4 : 1}
				>
					{isOnline ? (
						<StyledBadge
							overlap="circular"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							variant="dot"
						>
							<Avatar 
								src={conversation.profilePic} 
								alt={conversation.fullName}
								sx={{ width: 48, height: 48 }}
							/>
						</StyledBadge>
					) : (
						<Avatar 
							src={conversation.profilePic} 
							alt={conversation.fullName}
							sx={{ width: 48, height: 48 }}
						/>
					)}

					<Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', minWidth: 0, maxWidth: '100%', px: 1 }}>
						<Typography 
							variant="body1" 
							component="h6" 
							noWrap 
							gutterBottom={false}
							sx={{ 
								fontWeight: 500,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								minWidth: '350px',
								maxWidth: '500px',
								flexGrow: 1,
								pr: 2
							}}
						>
							{conversation.fullName}
						</Typography>
						<Typography 
							variant="h6" 
							component="span"
							color="text.secondary"
							noWrap
							sx={{ flexShrink: 0, pl: 1 }}
						>
							{emoji}
						</Typography>
					</Box>
				</StyledPaper>
				{!lastIdx && (
					<Box 
						component="hr" 
						sx={{ 
							my: 1, 
							border: 'none', 
							borderBottom: 1, 
							borderColor: 'divider' 
						}}
					/>
				)}
			</Box>
		</Zoom>
	);
};
export default Conversation;

// STARTER CODE SNIPPET
// const Conversation = () => {
// 	return (
// 		<>
// 			<div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>
// 				<div className='avatar online'>
// 					<div className='w-12 rounded-full'>
// 						<img
// 							src='https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'
// 							alt='user avatar'
// 						/>
// 					</div>
// 				</div>

// 				<div className='flex flex-col flex-1'>
// 					<div className='flex gap-3 justify-between'>
// 						<p className='font-bold text-gray-200'>John Doe</p>
// 						<span className='text-xl'>🎃</span>
// 					</div>
// 				</div>
// 			</div>

// 			<div className='divider my-0 py-0 h-1' />
// 		</>
// 	);
// };
// export default Conversation;
