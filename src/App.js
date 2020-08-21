import React from 'react';
import './index.js';
import './App.css';
//import ReactDOM from 'react-dom';
import Home from './components/Home';
import Quizinstruction from './components/quiz/Quizinstruction';
import Play from './components/quiz/Play';
import {BrowserRouter as Router,Route} from 'react-router-dom';
function App() {
  return (
    
    <Router>
      <Route path="/" exact  component={Home}/>
      <Route path="/play/instructions" exact component={Quizinstruction}/>
      <Route path="/quiz" exact component={Play}/>
    </Router>
  );
}

export default App;
