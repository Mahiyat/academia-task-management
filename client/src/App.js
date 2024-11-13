import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReportGeneration from './Components/ReportGeneration';
import TeacherDashboard from './Components/TeacherDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<SemesterList />} /> */}
        {/* <Route path="/semester/:id" element={<SemesterDetails />} /> */}
        <Route path="/report" element={<ReportGeneration teacherId="6722664b2722d82a38dd1fc8"/>} />
        <Route path="/" element={<TeacherDashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;
