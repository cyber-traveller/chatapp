import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState, useEffect } from "react";
import useSignup from "../../hooks/useSignup";
import { TextField, Button, Paper, Typography, Box, Container, FormControl, IconButton, Fade, Grow } from "@mui/material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";
import { PersonOutline, LockOutlined, Person, Badge, Email, Visibility, VisibilityOff } from "@mui/icons-material";

const shakeAnimation = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const AnimatedTextField = styled(TextField)`
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
  }
`;

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: "" });

	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const calculatePasswordStrength = (password) => {
		let score = 0;
		if (!password) return { score: 0, label: "" };

		// Length check
		if (password.length >= 8) score += 1;
		if (password.length >= 12) score += 1;

		// Complexity checks
		if (/[A-Z]/.test(password)) score += 1;
		if (/[0-9]/.test(password)) score += 1;
		if (/[^A-Za-z0-9]/.test(password)) score += 1;

		// Determine label based on score
		let label = "";
		if (score <= 2) label = "Weak";
		else if (score <= 3) label = "Medium";
		else label = "Strong";

		return { score, label };
	};

	useEffect(() => {
		const strength = calculatePasswordStrength(inputs.password);
		setPasswordStrength(strength);
	}, [inputs.password]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<Fade in timeout={800}>
		<Container maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
			<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
				<Paper elevation={6} sx={{ p: { xs: 2, sm: 3, md: 4 }, width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
					<Typography component="h1" variant="h4" align="center" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
						Sign Up for <Typography component="span" color="primary" variant="h4">ChatApp</Typography>
					</Typography>

					<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
						<AnimatedTextField
							margin="normal"
							required
							fullWidth
							id="fullName"
							label="Full Name"
							name="fullName"
							autoComplete="name"
							autoFocus
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
							InputProps={{
								startAdornment: <Badge sx={{ mr: 1, color: 'text.secondary' }} />
							}}
						/>

						<AnimatedTextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
							InputProps={{
								startAdornment: <PersonOutline sx={{ mr: 1, color: 'text.secondary' }} />
							}}
						/>

						<AnimatedTextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							type="email"
							autoComplete="email"
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
							InputProps={{
								startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
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
							autoComplete="new-password"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
							InputProps={{
								startAdornment: <LockOutlined sx={{ mr: 1, color: 'text.secondary' }} />,
								endAdornment: (
									<Grow in>
										<Box component="button" type="button" onClick={() => setShowPassword(!showPassword)} sx={{ p: 0.5, cursor: 'pointer', bgcolor: 'transparent', border: 'none' }}>
											{showPassword ? <VisibilityOff sx={{ color: 'text.secondary' }} /> : <Visibility sx={{ color: 'text.secondary' }} />}
										</Box>
									</Grow>
								)
							}}
							sx={{
							'& .MuiFormHelperText-root': {
								transition: 'all 0.3s ease-in-out'
							},
							...(inputs.password && inputs.password.length > 0 && passwordStrength.label === "Weak" && {
								animation: `${shakeAnimation} 0.5s ease-in-out`
							})
						}}
						helperText={
								inputs.password && (
									<Typography
										variant="caption"
										color={passwordStrength.label === "Strong" ? "success.main" : passwordStrength.label === "Medium" ? "warning.main" : "error.main"}
									>
										Password Strength: {passwordStrength.label}
									</Typography>
								)
							}
						/>

						<AnimatedTextField
							margin="normal"
							required
							fullWidth
							name="confirmPassword"
							label="Confirm Password"
							type={showConfirmPassword ? "text" : "password"}
							id="confirmPassword"
							autoComplete="new-password"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
							InputProps={{
								startAdornment: <LockOutlined sx={{ mr: 1, color: 'text.secondary' }} />,
								endAdornment: (
									<Grow in>
										<Box component="button" type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ p: 0.5, cursor: 'pointer', bgcolor: 'transparent', border: 'none' }}>
											{showConfirmPassword ? <VisibilityOff sx={{ color: 'text.secondary' }} /> : <Visibility sx={{ color: 'text.secondary' }} />}
										</Box>
									</Grow>
								)
							}}
						/>

						<Box sx={{ mt: 2 }}>
							<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
						</Box>

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
									<Box sx={{ mr: 1 }}>Creating Account</Box>
									<Box sx={{ width: 20, height: 20 }} className="loading loading-spinner" />
								</Box>
							) : (
								"Sign Up"
							)}
						</Button>

						<Box sx={{ textAlign: 'center' }}>
							<Link
								to="/login"
								style={{ textDecoration: 'none' }}
							>
								<Typography color="primary" variant="body2">
									Already have an account? Login
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
export default SignUp;
