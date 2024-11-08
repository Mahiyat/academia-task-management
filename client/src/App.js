import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import SendMessage from './Components/SendMessage';

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
