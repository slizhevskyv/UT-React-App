import React, { useState, useEffect, useMemo } from 'react';
import {
	Table,
	Paper,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Container,
	Typography,
} from '@mui/material';
import { APIService } from '../../services';

function createRowData(name: string, amount: number, percent: number) {
	return { name, amount, percent: `${percent}%` };
}

const ReportView = () => {
	const [reportData, setReportData] = useState<{ totalUsers: number; engagedUsers: number } | null>(null);

	useEffect(() => {
		async function getReport() {
			const data = await APIService.instance.getReport();

			setReportData(data);
		}

		getReport();
	}, []);

	const rows = useMemo(() => {
		if (!reportData) {
			return [];
		}
		const { totalUsers, engagedUsers } = reportData;
		const engagedPercent = ((engagedUsers * 100) / totalUsers).toFixed(2);

		return [
			createRowData('Total User', totalUsers, 100),
			createRowData('Engaged Users', engagedUsers, +engagedPercent),
		];
	}, [reportData]);

	return (
		<Container>
			<Typography variant="h2" align="right" gutterBottom>
				User Tracking Report
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="report table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">Amount</TableCell>
							<TableCell align="right">%</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => (
							<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.name}
								</TableCell>
								<TableCell align="right">{row.amount}</TableCell>
								<TableCell align="right">{row.percent}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default ReportView;
