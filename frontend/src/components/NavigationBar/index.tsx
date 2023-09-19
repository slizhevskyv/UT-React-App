import React, { useCallback } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Route } from '../../enums';

const NavigationBar = () => {
	const navigate = useNavigate();

	const handleReportClick = useCallback(() => {
		navigate(Route.report);
	}, [navigate]);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						User Tracking App
					</Typography>
					<Button onClick={handleReportClick} color="inherit">
						Report
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavigationBar;
