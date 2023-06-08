import React from "react";
import { PDFViewer, StyleSheet } from "@react-pdf/renderer";
import { useSearchParams } from "react-router-dom";

import ReportView from "../components/ReportView";

const styles = StyleSheet.create({
	viewer: {
		width: window.innerWidth,
		height: window.innerHeight,
	},
});

export default function ReportViewDialog() {
	const [searchparams] = useSearchParams();

	const filename = searchparams.get("filename");
	const lang = searchparams.get("lang");
	const version = searchparams.get("version");
	const err = searchparams.get("err");
	const out = searchparams.get("out");
	const code = searchparams.get("code");
	const time = searchparams.get("time");

	const data = {
		filename,
		lang,
		err,
		version,
		out,
		code,
		time,
	};

	console.log(data);

	return (
		<PDFViewer style={styles.viewer}>
			<ReportView data={data} />
		</PDFViewer>
	);
}
