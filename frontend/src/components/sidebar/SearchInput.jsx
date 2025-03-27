import { useState } from "react";
import { Search } from "@mui/icons-material";
import { Box, TextField, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/system";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '24px',
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

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};

	return (
		<Paper 
			component={motion.form}
			onSubmit={handleSubmit}
			initial={{ width: '100%', scale: 1 }}
			animate={{ 
				width: isFocused ? '112%' : '100%',
				x: isFocused ? '-6%' : '0%',
				scale: isFocused ? 1.02 : 1,
				y: isFocused ? -4 : 0
			}}
			transition={{ 
				type: "spring",
				stiffness: 400,
				damping: 30,
				mass: 1.2
			}}
			whileHover={{ scale: 1.01, y: -2 }}
			whileTap={{ scale: 0.98 }}
			sx={{ 
				p: 1,
				display: 'flex',
				alignItems: 'center',
				gap: 1,
				backgroundColor: 'background.paper',
				borderRadius: '28px',
				boxShadow: isFocused ? 4 : 1
			}}
		>
			<StyledTextField
				fullWidth
				size="small"
				placeholder="Search users..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			<IconButton 
				type="submit" 
				color="primary"
				size="small"
				component={motion.button}
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				sx={{ mr: 0.5 }}
			>
				<Search />
			</IconButton>
		</Paper>
	);
};
export default SearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;
