import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/' >
            <Route index element={<Home />}></Route>
            <Route path='upcoming-Launches' element={<Home />}></Route>
            <Route path='succesfull-Launches' element={<Home />}></Route>
            <Route path='failed-Launches' element={<Home />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
