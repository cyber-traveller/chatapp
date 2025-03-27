import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<Box
			component="div"
			sx={{
				px: { xs: 2, sm: 3 },
				flex: 1,
				overflowY: 'auto',
				overflowX: 'hidden',
				'&::-webkit-scrollbar': {
					width: '8px',
				},
				'&::-webkit-scrollbar-track': {
					backgroundColor: 'background.paper',
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: 'primary.main',
					borderRadius: '4px',
					'&:hover': {
						backgroundColor: 'primary.dark',
					},
				},
			}}
		>
			<AnimatePresence>
				{!loading && messages.length > 0 && messages.map((message) => (
					<motion.div
						key={message._id}
						ref={lastMessageRef}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					>
						<Message message={message} />
					</motion.div>
				))}
			</AnimatePresence>

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

			{!loading && messages.length === 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
					className="flex flex-col items-center justify-center h-full"
				>
					<p className="text-center text-gray-500">Send a message to start the conversation</p>
				</motion.div>
			)}
		</Box>
	);
};

export default Messages;

// STARTER CODE SNIPPET
// import Message from "./Message";

// const Messages = () => {
// 	return (
// 		<div className='px-4 flex-1 overflow-auto'>
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 			<Message />
// 		</div>
// 	);
// };
// export default Messages;
