import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SemesterList from './Components/SemesterList';
import SemesterDetails from './Components/SemesterDetails';
import TeacherDashboard from './Components/TeacherDashboard';

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
