import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: "row",
		backgroundColor: "#E4E4E4",
	},
	section: {
		margin: 10,
		padding: 10,
		flexGrow: 1,
		border: "2px solid black",
	},

	filenameStyle: {
		marginVertical: 5,
	},

	success: {
		color: "green",
	},

	fail: {
		color: "red",
	},

	marginTop5: {
		marginTop: 15,
	},
});

// Create Document Component
const ReportView = ({ data }) => (
	<Document>
		<Page size="A4" style={styles.page}>
			<View style={styles.section}>
				<Text style={styles.filenameStyle}>Filename: {data.filename}</Text>
				<Text>Time: {data.time}</Text>
				<Text
					style={[styles.marginTop5, data.err ? styles.fail : styles.success]}>
					Result: {data.err ? "Execution failed!!" : "Successfully Executed!"}
				</Text>

				<View style={styles.marginTop5}>
					<Text>Code: </Text>
					<Text>{data.code}</Text>
				</View>

				{data.err ? (
					<View style={styles.marginTop5}>
						<Text style={styles.filenameStyle}>Error Stack: </Text>
						<Text style={styles.fail}>{data.err}</Text>
					</View>
				) : (
					<View style={styles.marginTop5}>
						<Text style={styles.success}>Output:</Text>
						<Text>{data.out}</Text>
					</View>
				)}
			</View>
		</Page>
	</Document>
);

export default ReportView;
