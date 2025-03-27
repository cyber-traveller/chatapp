import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { Paper, Typography, Box, Divider } from "@mui/material";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<Box sx={{ width: '100%', minWidth: { sm: '350px', md: '450px' }, display: 'flex', flexDirection: 'column', height: '100%' }}>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					<Paper 
						elevation={2} 
						sx={{ 
							px: { xs: 1.5, sm: 2 }, 
							py: 1.5, 
							mb: 2, 
							bgcolor: 'background.paper',
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							overflow: 'hidden'
						}}
					>
						<Typography variant="body2" color="text.secondary">To:</Typography>
						<Typography variant="body1" fontWeight="500">{selectedConversation.fullName}</Typography>
					</Paper>
					<Box sx={{ flex: 1, overflow: 'hidden' }}>
						<Messages />
					</Box>
					<MessageInput />
				</>
			)}
		</Box>
	);
};
export default MessageContainer;

const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<Box 
			sx={{ 
				display: 'flex', 
				alignItems: 'center', 
				justifyContent: 'center', 
				width: '100%', 
				height: '100%'
			}}
		>
			<Box sx={{ 
				px: 4, 
				textAlign: 'center',
				display: 'flex', 
				flexDirection: 'column', 
				alignItems: 'center', 
				gap: 2
			}}>
				<Typography 
					variant="h6" 
					color="text.primary"
					gutterBottom
				>
					Welcome 👋 {authUser.fullName} 
				</Typography>
				<Typography 
					variant="body1" 
					color="text.secondary"
				>
					Select a chat to start messaging
				</Typography>
				<TiMessages style={{ fontSize: '3rem' }} />
			</Box>
		</Box>
	);
};

// STARTER CODE SNIPPET
// import MessageInput from "./MessageInput";
// import Messages from "./Messages";

// const MessageContainer = () => {
// 	return (
// 		<div className='md:min-w-[450px] flex flex-col'>
// 			<>
// 				{/* Header */}
// 				<div className='bg-slate-500 px-4 py-2 mb-2'>
// 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John doe</span>
// 				</div>

// 				<Messages />
// 				<MessageInput />
// 			</>
// 		</div>
// 	);
// };
// export default MessageContainer;
