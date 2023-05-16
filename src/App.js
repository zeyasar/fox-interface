import DataTable from "./components/DataTable";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IpCheck from "./components/IpCheck";
import DomainCheck from "./components/DomainCheck";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/zararli-siteler" element={<DataTable />} />
          <Route exact path="/:id" element={<DomainCheck />} />
          <Route path="/ip-check" element={<IpCheck />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
