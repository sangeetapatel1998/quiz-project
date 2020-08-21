import React, { Component } from 'react';
import questions from '../../questions.json';
import isEmpty from '../../utils/Is-empty';
import M from 'materialize-css';
import './playstyle.css';
import classnames from 'classnames';
class Play extends Component {

    constructor(props){
        super(props);
        this.state={
         questions:questions,
        currentQuestion:{},
        nextQuestion:{},
        nextButtonDisabled:false,
        previousButtonDisabled:false,
        previousQuestion:{},
        answer:'',
        numberofQuestions:15,
        numberofAnsweredQuestion:0,
        currentQuestionIndex:0,
        score:0,
        correctAnswers:0,
        wrongAnswers:0,
        time:{}
    };
    this.interval=null
        
    }

    componentDidMount(){
        const{questions,currentQuestion,nextQuestion,previousQuestion}=this.state;
        this.displayQuestions(questions,currentQuestion,nextQuestion,previousQuestion);
        this.startTimer();
        }

    displayQuestions=(questions=this.state.questions,currentQuestion,nextQuestion,previousQuestion)=>{
        let{currentQuestionIndex}=this.state;
        if(!isEmpty(this.state.questions)){
            questions=this.state.questions;
            currentQuestion=questions[currentQuestionIndex];
            nextQuestion=questions[currentQuestionIndex+1];
            previousQuestion=questions[currentQuestionIndex-1];

            const answer=currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                answer
                   
            },()=>{
                this.handleDisableButton();
            });

        }
    };

    handleOptionClick=(e)=>{
          if(e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()){
              this.correctAnswer();
          } 
          else{
          this.wrongAnswer();
          }

    }

    handleNextButtonClick=()=>{
         if(this.state.nextQuestion !== undefined){
             this.setState(prevState => ({
                  currentQuestionIndex:prevState.currentQuestionIndex+1
             }), () =>{
                 this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
             });
         }
    };

    handlePreviousButtonClick=()=>{
        if(this.state.previousQuestion !== undefined){
            this.setState(prevState => ({
                 currentQuestionIndex:prevState.currentQuestionIndex-1
            }), () =>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            });
        }
   };

   handleQuitButtonClick=()=>{
          window.confirm('Are you sure you want to quit?');
          if(window.confirm('Are you sure you want to quit?')){
              this.props.history.push('/');

          }
   };



    correctAnswer=()=>{
        M.toast({
            html:'correct Answer',
            classes:'toast-valid',
            displayLength:1500
        });
        this.setState(prevState=>({
            score:prevState.score+1,
            correctAnswers:prevState.correctAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex +1,
            numberofAnsweredQuestion:prevState.numberofAnsweredQuestion + 1 
        }),() =>{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
             

        });
    }

    wrongAnswer=()=>{
        navigator.vibrate(1000);
        M.toast({
            html:'wrong Answer',
            classes:'toast-invalid',
            displayLength:1500
        });
        this.setState(prevState=>({
            wrongAnswers:prevState.wrongAnswers + 1,
            currentQuestionIndex:prevState.currentQuestionIndex + 1,
            numberofAnsweredQuestion:prevState.numberofAnsweredQuestion 

        }),() =>{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion);
            

        });
    }

    startTimer=()=>{
        const countDownTime= Date.now() * 180000;
        this.interval=setInterval(()=>{
           const now=new Date();
           const distance=countDownTime-now;

           const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
           const seconds=Math.floor((distance%(1000*60))/1000);

           if(distance<0){
               clearInterval(this.interval);
               this.setState({
                  time:{
                      minutes:0,
                      seconds:0
                  }
               },()=>{
                   alert('quiz has ended');
                   this.props.history.push('/');
               });
           } else{
               this.setState({
                   time:{
                       minutes,
                       seconds
                   }
               });
           }

        },1000);
    }

    handleDisableButton=()=>{
        if(this.state.previousQuestion===undefined || this.state.currentQuestionIndex===0){
              this.setState({
                  previousButtonDisabled:true
              });

        }
        else{
            this.setState({
                previousButtonDisabled:false
             });

        }

        if(this.state.nextQuestion===undefined || this.state.currentQuestionIndex+1=== this .state.numberofQuestions){
            this.setState({
                nextButtonDisabled:true
            });

      }
      else{
          this.setState({
              nextButtonDisabled:false
           });

      }
    }



    render() {
        const {
            currentQuestion,
            currentQuestionIndex,
            numberofQuestions,
            time
             }=this.state;
        return (
            <div className="questions">
                <h2>Quiz Mode</h2>
                <div className="head">
                    <p className="timer">
        <span className="no-question">{currentQuestionIndex+1}:{numberofQuestions}</span>
        <span className="clock">Timer:{time.minutes}:{time.seconds}</span>
                    </p>
                </div>
               <h3>{currentQuestion.question}</h3>
                <div classname="options-container">
                    <p  onClick={this.handleOptionClick} className="options">{currentQuestion.optionA} </p>
                   <p onClick={this.handleOptionClick} className="options">{currentQuestion.optionB}</p>
                 </div>
                 <div classname="options-container">
                    <p  onClick={this.handleOptionClick} className="options">{currentQuestion.optionC} </p>
                    <p onClick={this.handleOptionClick}  className="options">{currentQuestion.optionD} </p>
                 </div>

                 <div className="button-container">
                     <button 
                     className={classnames('',{'disable':this.state.previousButtonDisabled})}
                     id="previous-button" 
                     onClick={this.handlePreviousButtonClick}>
                         Previous
                         </button>
                     <button 
                     className={classnames('',{'disable':this.state.nextButtonDisabled})}
                     id="next-button" onClick={this.handleNextButtonClick}>Next</button>
                     <button id="quit button" onClick={this.handleQuitButtonClick}>Quit</button>
                </div>
            </div>

         
        );
    }
}

export default Play;