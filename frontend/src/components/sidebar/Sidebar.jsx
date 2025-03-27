import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import ProfileButton from "./ProfileButton";
import { Box, Paper } from "@mui/material";

const Sidebar = () => {
	return (
		<Paper 
			elevation={4}
			component="aside"
			sx={{
				borderRight: 1,
				borderColor: 'divider',
				p: { xs: 2, sm: 3 },
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				height: '100%',
				backgroundColor: 'background.paper',
				transition: 'box-shadow 0.3s ease-in-out',
				'&:hover': {
					boxShadow: 6
				}
			}}
		>
			<ProfileButton />
			<SearchInput />
			<Box 
				component="hr"
				sx={{ 
					my: 1,
					border: 'none',
					borderBottom: 1,
					borderColor: 'divider',
					width: '100%'
				}}
			/>
			<Box sx={{ flex: 1, overflow: 'hidden' }}>
				<Conversations />
			</Box>
			<LogoutButton />
		</Paper>
	);
};
export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;
