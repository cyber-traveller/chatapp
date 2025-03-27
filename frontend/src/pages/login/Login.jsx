import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { TextField, Button, Paper, Typography, Box, Container, Fade } from "@mui/material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";
import { PersonOutline, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";

const AnimatedTextField = styled(TextField)({
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-2px)"
  }
});

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { loading, login } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<Fade in timeout={800}>
		<Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
				<Paper elevation={6} sx={{ p: { xs: 2, sm: 3, md: 4 }, width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
					<Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
						Login to <Typography component="span" color="primary" variant="h4">ChatApp</Typography>
					</Typography>

					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
						<AnimatedTextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							autoFocus
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							InputProps={{
								startAdornment: <PersonOutline sx={{ mr: 1, color: 'text.secondary' }} />
							}}
						/>

						<AnimatedTextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type={showPassword ? "text" : "password"}
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							InputProps={{
								startAdornment: <LockOutlined sx={{ mr: 1, color: 'text.secondary' }} />,
							endAdornment: (
								<Box component="button" type="button" onClick={() => setShowPassword(!showPassword)} sx={{ p: 0.5, cursor: 'pointer', bgcolor: 'transparent', border: 'none' }}>
									{showPassword ? <VisibilityOff sx={{ color: 'text.secondary' }} /> : <Visibility sx={{ color: 'text.secondary' }} />}
								</Box>
							)
							}}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							size="large"
							disabled={loading}
							sx={{ mt: 3, mb: 2 }}
						>
							{loading ? (
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Box sx={{ mr: 1 }}>Logging in</Box>
									<Box sx={{ width: 20, height: 20 }} className="loading loading-spinner" />
								</Box>
							) : (
								"Login"
							)}
						</Button>

						<Box sx={{ textAlign: 'center' }}>
							<Link
								to='/signup'
								style={{ textDecoration: 'none' }}
							>
								<Typography color="primary" variant="body2">
									Don't have an account? Sign Up
								</Typography>
							</Link>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Container>
		</Fade>
	);
};
export default Login;
