import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
import SemesterList from './components/SemesterList';
import SemesterDetails from './components/SemesterDetails';
import TeacherDashboard from './components/TeacherDashboard';
import SemesterProgressTracker from './components/semesterProgressTracking/SemesterProgressTracker';
import ExamCommitteeSelection from './components/ExamCommitteeSelection';
=======



import SendMessage from './Components/SendMessage';
>>>>>>> 47a2ce6 (add soad-messagingsystem)
=======
import SemesterList from './Components/SemesterList';
import SemesterDetails from './Components/SemesterDetails';
import TeacherDashboard from './Components/TeacherDashboard';
>>>>>>> 6ae58bb (Done)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SendMessage />} />
      
      </Routes>
    </Router>
  );
}

export default App;
