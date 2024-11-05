import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportGeneration from './Components/ReportGeneration';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<SemesterList />} /> */}
        {/* <Route path="/semester/:id" element={<SemesterDetails />} /> */}
        <Route path="/" element={<ReportGeneration teacherId="6722664b2722d82a38dd1fc8"/>} />
      </Routes>
    </Router>
  );
}

export default App;
