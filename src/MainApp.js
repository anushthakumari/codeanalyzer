// App.js
import { Routes, Route } from "react-router-dom";

import Home from "./pages/App";
import Report from "./pages/Report";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/report" element={<Report />} />
			</Routes>
		</>
	);
};

export default App;
