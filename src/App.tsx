import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FirstPage from './components/FirstPage';
import './App.css'
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
    return (
      // ROUTING FOR NAVIGATING BETWEEN THE COMPONENTS
        <Router>
            <Routes>
                <Route path = "/" element = {<FirstPage />} />
                <Route path = "/second-page" element = {<SecondPage />} />
            </Routes>
        </Router>
    );
};

export default App;
