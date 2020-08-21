import React,{Component,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import './style.css';

const Quizinstruction=()=>(
    <Fragment>
        <Helmet>
            <title>Quiz Instructions-Quiz App</title>
        </Helmet>
        <div classname="instructioncontainer">
            <h1>How to play the Game</h1>
            <p>Ensure you read this guide from start to last.</p>
            <ul className="browser-default" id="main-list">
                <li>The game has a time limit of 15 min and ends as soon as your time elaspses.</li>
                <li>Each game consists if 15 questions</li>
                <li> Each question contains 4 options.</li>
                 <img src={require('../../asserts/img/Capture.JPG')}/>
                <li>Select the option which best answers the questions by clicking it.</li>
                
                
                <li>The timer starts as soon as the game loads.</li>
                <li>Let's do this if you think you have got what it takes?</li>
            </ul>
            <div className="foot">
           <div className="link1"><Link className="a" to="/">No take me back</Link> </div>  
            <div className="link2"><Link  className="a" to="/quiz">Ok let's start</Link></div>
            </div>
         </div>
    </Fragment>
    
);

export default Quizinstruction;