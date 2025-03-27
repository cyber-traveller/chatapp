import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";
import { Paper, Grid, Box } from "@mui/material";

const Home = () => {
	return (
		<Box sx={{ height: { sm: '450px', md: '550px' }, maxWidth: '1200px', mx: 'auto' }}>
			<Paper 
				elevation={8} 
				sx={{ 
					height: '100%',
					overflow: 'hidden',
					display: 'flex',
					borderRadius: 2,
					bgcolor: 'background.paper'
				}}
			>
				<Grid container sx={{ height: '100%' }}>
					<Grid item xs={12} sm={4} md={3} sx={{ borderRight: 1, borderColor: 'divider' }}>
						<Sidebar />
					</Grid>
					<Grid item xs={12} sm={8} md={9}>
						<MessageContainer />
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};
export default Home;
