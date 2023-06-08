import React, { useEffect, useState } from "react";
import {
	Typography,
	FormControl,
	MenuItem,
	InputLabel,
	Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

import "../components/styles/Content.css";
import ReportTable from "./ReportTable";

const Content = () => {
	const [languages, setlanguages] = useState([]);
	const [currentSelectedLang, setcurrentSelectedLang] = useState({});
	const [codeContents, setcodeContents] = useState([]);

	const onChangeHandler = async (e) => {
		const files = e.target.files;
		if (!files || !files.length) {
			return;
		}

		if (!currentSelectedLang.lang) {
			alert("Please Select language!");
			return;
		}

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const values = await readFile(file);
			setcodeContents((prev) => [
				...prev,
				{
					filename: file.name,
					content: values,
					language: currentSelectedLang.lang,
					version: currentSelectedLang.version,
				},
			]);
			setcurrentSelectedLang({});
		}
	};

	const onSelectChangeHandler = (e) => {
		const vals = e.target.value.split("-");
		setcurrentSelectedLang({ lang: vals[0], version: vals[1] });
	};

	useEffect(() => {
		axios
			.get("https://emkc.org/api/v2/piston/runtimes")
			.then((res) => {
				setlanguages(
					res.data.map((l) => ({ lang: l.language, version: l.version }))
				);
			})
			.catch((err) => {
				alert("Something went wrong while fetching languages!");
			});
	}, []);

	return (
		<div className="mainContainer">
			<div className="heading">
				<Typography
					variant="h2"
					textAlign={"center"}
					sx={{ padding: "1rem", letterSpacing: ".3rem" }}>
					Analyse your Code Quick
				</Typography>
				<Typography variant="h5">
					Get quick check for any of your code
				</Typography>
			</div>
			<div className="wrapContainer">
				{/* Code upload */}
				<div className="wholecnt">
					<form className="container">
						<FormControl sx={{ m: 1, width: 200 }} size="small">
							<InputLabel
								id="demo-simple-select-label"
								sx={{ fontSize: "15px" }}>
								Language
							</InputLabel>
							<Select
								sx={{ fontSize: "15px" }}
								value={
									currentSelectedLang.lang + "-" + currentSelectedLang.version
								}
								label="Language"
								onChange={onSelectChangeHandler}>
								{languages.map((e, i) => (
									<MenuItem
										sx={{ fontSize: "15px" }}
										key={i}
										value={e.lang + "-" + e.version}>
										{e.lang}({e.version})
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<input
							id="file-upload"
							type="file"
							style={{ display: "none" }}
							onChange={onChangeHandler}
							accept=".txt"
						/>
						<Button
							variant="contained"
							sx={{
								padding: "15px 30px",
								fontSize: "15px",
								borderRadius: "10px",
								width: 200,
							}}>
							<label htmlFor="file-upload" className="custom-file-upload">
								{codeContents.length ? "Add More" : "Upload Code"}
							</label>
						</Button>
						<Typography margin={1} fontWeight={600} variant="h6">
							Upload your files in .txt format
						</Typography>
					</form>
					<ReportTable codeContents={codeContents} />
				</div>
			</div>
		</div>
	);
};

export default Content;

const readFile = (file) =>
	new Promise(function (resolve, reject) {
		const reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function () {
			const values = reader.result;
			resolve(values);
		};

		reader.onerror = function (e) {
			reject(e);
		};
	});
