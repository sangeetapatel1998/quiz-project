import React,{Fragment} from 'react';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';
import './style.css';
const Home=()=>(
       <fragment>
           <Helmet><title>Quiz-App Home</title></Helmet>
           <div id="home" >
              <section className="section">
                  <div>
                      <span className="mdi mdi-cube-outline cube"></span>
                  </div>
                  
                  <h1>Quiz app</h1>
                  <div className="logo-section">
                      <img className="img" src={require('../asserts/img/pic2.png')}/>
                  </div>
                  <div className="play-button-container">
                
                          <Link id="play-button" to="/play/instructions"> Play </Link>

                      </div>

                      <div className="auth-container1">
                          <Link to="/login" className="login-button" >Login</Link>
                        
                      </div>
                      <div className="auth-container2">
                      <Link to="/register" className="signup-button" >Register</Link>
                      </div>
                    
              </section>
            </div>
       </fragment>
        
    );


export default Home;