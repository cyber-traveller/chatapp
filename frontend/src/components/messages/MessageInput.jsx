import { useState } from "react";
import { Send } from "@mui/icons-material";
import useSendMessage from "../../hooks/useSendMessage";
import { Box, TextField, IconButton, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['border-color', 'box-shadow', 'transform']),
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[2]
    },
    '&.Mui-focused': {
      transform: 'translateY(-1px)',
      boxShadow: theme.shadows[3]
    }
  }
}));

const MessageInput = () => {
	const [message, setMessage] = useState("");
	const { loading, sendMessage } = useSendMessage();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!message) return;
		await sendMessage(message);
		setMessage("");
	};

	return (
		<Paper 
			elevation={3} 
			component="form" 
			onSubmit={handleSubmit}
			sx={{ 
				px: { xs: 1, sm: 2 }, 
				py: { xs: 1, sm: 1.5 },
				m: 1,
				position: 'relative',
				display: 'flex',
				alignItems: 'center',
				gap: 1
			}}
		>
			<StyledTextField
				fullWidth
				size="small"
				placeholder="Send a message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				InputProps={{
					endAdornment: (
						<IconButton 
							type="submit" 
							color="primary"
							disabled={loading}
							size="small"
						>
							{loading ? (
								<CircularProgress size={20} />
							) : (
								<Send />
							)}
						</IconButton>
					)
				}}
			/>
		</Paper>
	);
};
export default MessageInput;

// STARTER CODE SNIPPET
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
// 	return (
// 		<form className='px-4 my-3'>
// 			<div className='w-full'>
// 				<input
// 					type='text'
// 					className='border text-sm rounded-lg block w-full p-2 sm:p-2.5 bg-gray-700 border-gray-600 text-white'
// 					placeholder='Send a message'
// 				/>
// 				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
// 					<BsSend />
// 				</button>
// 			</div>
// 		</form>
// 	);
// };
// export default MessageInput;
