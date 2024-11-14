import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SemesterList from './components/SemesterList';
import SemesterDetails from './components/SemesterDetails';
import TeacherDashboard from './components/TeacherDashboard';
import SemesterProgressTracker from './components/semesterProgressTracking/SemesterProgressTracker';
import ExamCommitteeSelection from './components/ExamCommitteeSelection';

function App() {
  return (
    <Router>
      <Routes>
        {/* feature routes -  abrar */}

        <Route path="/" element={<SemesterList />} />
        <Route path="/semester-progress" element={<SemesterProgressTracker/>} />
        <Route path="/semester/:id" element={<SemesterDetails />} />
        <Route path="/exam-committee-selection/semesters" element={<SemesterList/>}/>

      </Routes>
    </Router>
  );
}

export default App;
