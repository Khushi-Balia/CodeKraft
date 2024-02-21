import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home, Codegen, Validate, Analyze } from "./pages";

const App = () => {
  return (
    <main className="bg-slate-300/20">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codegen" element={<Codegen />} />
          <Route path="/validate" element={<Validate />} />
          <Route path="/analyze" element={<Analyze />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
