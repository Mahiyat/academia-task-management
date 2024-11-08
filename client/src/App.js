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
        <Route path="/" element={<SemesterList />} />
        <Route path="/semester/:id" element={<SemesterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
