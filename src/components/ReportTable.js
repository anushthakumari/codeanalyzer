import * as React from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import Output from "./Output";

export default function ReportTable({ codeContents }) {
	const [isLoading, setisLoading] = React.useState(false);
	const [reportData, setreportData] = React.useState([]);
	const [openModal, setopenModal] = React.useState(false);

	if (!codeContents.length) {
		return null;
	}

	const handleSubmit = async () => {
		setisLoading(true);
		const rData = [];
		for (let i = 0; i < codeContents.length; i++) {
			const codeData = codeContents[i];

			try {
				const { data } = await axios.post(
					"https://emkc.org/api/v2/piston/execute",
					{
						language: codeData.language,
						version: codeData.version,
						files: [
							{
								name: codeData.filename,
								content: codeData.content,
							},
						],
					}
				);
				rData.push({
					...data,
					filename: codeData.filename,
					content: codeData.content,
					time: new Date().toUTCString(),
				});
			} catch (e) {}
		}
		setreportData(rData);
		setopenModal(true);
		setisLoading(false);
	};

	return (
		<React.Fragment>
			<TableContainer sx={{ marginTop: "10px" }} component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>File Name</TableCell>
							<TableCell align="right">Language</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{codeContents.map((row, i) => (
							<TableRow
								key={i}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									{row.filename}
								</TableCell>
								<TableCell align="right">
									{row.language + "(" + row.version + ")"}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Button
				onClick={handleSubmit}
				variant="contained"
				sx={{ marginTop: "15px", fontSize: "15px" }}
				disabled={isLoading}
				fullWidth>
				{isLoading ? "Loading..." : "Generate Report"}
			</Button>
			<Output
				open={openModal}
				onClose={() => setopenModal(false)}
				reportData={reportData}
			/>
		</React.Fragment>
	);
}
