import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 655b710 (add semesterprogress tracking frontend+backend)
import SemesterList from './components/SemesterList';
import SemesterDetails from './components/SemesterDetails';
import TeacherDashboard from './components/TeacherDashboard';
import SemesterProgressTracker from './components/semesterProgressTracking/SemesterProgressTracker';
<<<<<<< HEAD
import ExamCommitteeSelection from './components/ExamCommitteeSelection';
=======



import SendMessage from './Components/SendMessage';
>>>>>>> 47a2ce6 (add soad-messagingsystem)
=======
import SemesterList from './Components/SemesterList';
import SemesterDetails from './Components/SemesterDetails';
import TeacherDashboard from './Components/TeacherDashboard';
>>>>>>> 6ae58bb (Done)
=======
>>>>>>> 655b710 (add semesterprogress tracking frontend+backend)
=======
// import SemesterList from './components/SemesterList';
// import SemesterDetails from './components/SemesterDetails';
// import TeacherDashboard from './components/TeacherDashboard';
// import SemesterProgressTracker from './components/semesterProgressTracking/SemesterProgressTracker';
import SemesterProgress from './components/SemesterProgress';
<<<<<<< HEAD
>>>>>>> 51596e1 ( test and backend done with partial forntend)
=======
import SemesterList from './components/SemesterList';
import SemesterDetails from './components/SemesterDetails';
import TeacherDashboard from './components/TeacherDashboard';
import SemesterProgressTracker from './components/semesterProgressTracking/SemesterProgressTracker';
import ExamCommitteeSelection from './components/ExamCommitteeSelection';
>>>>>>> 0062759 (modify frontend for assignExamCommittee)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SemesterProgressTracker />} />
        <Route path="/semester/:id" element={<SemesterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
