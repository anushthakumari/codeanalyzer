import * as React from "react";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

export default function Output(props) {
	const { onClose, open, reportData } = props;

	const handleClose = () => {
		onClose();
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Get Report</DialogTitle>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>File Name</TableCell>
						<TableCell align="right">Language</TableCell>
						<TableCell align="right">Report</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{reportData.map((row, i) => (
						<TableRow
							key={i}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell component="th" scope="row">
								{row.filename}
							</TableCell>
							<TableCell align="right">
								{row.language + "(" + row.version + ")"}
							</TableCell>
							<TableCell align="right">
								<Button
									onClick={() => {
										const uri = encodeURI(
											`/report?filename=${row.filename}&lang=${row.language}&version=${row.version}&err=${row.run.stderr}&out=${row.run.stdout}&code=${row.content}&time=${row.time}`
										);

										window.open(uri, "_blank");
									}}
									variant="contained">
									Get Report
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Dialog>
	);
}
