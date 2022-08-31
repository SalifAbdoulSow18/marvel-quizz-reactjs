import React, {Component, Fragment} from 'react';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {QuizMarvel} from "../quizMarvel";
import Levels from "../Levels";
import Progressbar from "../Progressbar";
import QuizOver from "../QuizOver";
import { FaChevronRight } from 'react-icons/fa';

toast.configure();

   const initialState = {
        quizLevel: 0,
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        btnDisabled: true,
        userAnswer: null,
        score: 0,
        showWelcomeMsg: false,
        quizEnd: false,
        percent: null
    }

    const levelNames = ["debutant", "confirme", "expert"];
class Quiz extends Component{

    constructor(props) {
        super(props);

        this.state = initialState

        this.storeDataRef = React.createRef();
    }

    // La fonction permettant de recupérer les questions d'un niveau donné
    loadQuestions = level => {
        // La recupération des questions d'un niveau donné
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level];

        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            // La recupération de toutes les infos d'un niveau donné
            this.storeDataRef.current = fetchedArrayQuiz;

            // suppression des reponses après récupération des données
            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest);
            this.setState({
            // La recupération de toutes les infos d'un niveau donné sans les reponses
                storedQuestions: newArray
            })
        }
    }

    // La fonction de récuperation des niveau(level)
    componentDidMount() {
        this.loadQuestions(levelNames[this.state.quizLevel])
    }

    // La recupération des responses et de la question
    componentDidUpdate(prevProps, prevState, snapshot) {

        // La recupération des premieres responses et de la premiere quetion
        if ((this.state.storedQuestions !== prevState.storedQuestions) && this.state.storedQuestions.length) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        // La recupération des responses et de la question après incrementation
        if ((this.state.idQuestion !== prevState.idQuestion) && this.state.storedQuestions.length) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if (this.state.quizEnd !== prevState.quizEnd) {
            const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score);
            this.gameOver(gradePercent)
        }

        //Verifiez que le pseudo a bien été receptionné
        if (this.props.myPseudo.pseudo !== prevProps.myPseudo.pseudo) {
            this.showToastMsg(this.props.myPseudo.pseudo)
        }
    }

    // La fonction permettant d'afficher un message de bienvenue
    showToastMsg = pseudo => {
        if (!this.state.showWelcomeMsg) {
            this.setState({ showWelcomeMsg: true });

            toast.warn(`Bienvenue ${pseudo}, et bonne chance!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    // La fonction après la selection d'une reponse
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false
        })
    }

    //La fonction permettant d'avoir le % de score dans le jeux
    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    // La fonction de la fin du jeux
    gameOver = percent => {

        if (percent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent,
            })
        } else {
            this.setState({percent})
        }
    }

    // La fonction lorsqu'on veut passer la la question suivante
    nextQuestion = () => {
       if (this.state.idQuestion === this.state.maxQuestions - 1) {
        //end Game
           //this.gameOver();
           this.setState({ quizEnd: true })

       } else {
       // incrémenté le idQuestion qui regroupe toutes les info d'une question donnée
           this.setState(prevState => ({ idQuestion: prevState.idQuestion + 1, }))
       }

       // incrémenté le score

        const goodAnswer = this.storeDataRef.current[this.state.idQuestion].answer;
       if (this.state.userAnswer === goodAnswer) {
           this.setState( prevState => ({ score: prevState.score + 1 }))

           toast.success('Bravo +1', {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: false,
               progress: undefined,
               bodyClassName: "toastify-color"
           });
       } else {
           toast.error('Oups, Raté 0', {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: false,
               progress: undefined,
               bodyClassName: "toastify-color"
           });
       }
    }

    loadLevelQuestions = param => {
        this.setState({...initialState, quizLevel: param})
        this.loadQuestions(levelNames[param]);
    }

    render() {

        const {
            quizLevel,
            maxQuestions,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            quizEnd,
            percent
        } = this.state;

        const {pseudo} = this.props.myPseudo;

       const displayOptions = options.map((option, index) => {
            return(
                <p
                   key={index}
                   onClick={() => this.submitAnswer(option)}
                   className={`answerOptions ${userAnswer === option ? "selected" : null}`}>
                   <FaChevronRight />   {option}
                </p>
            )
        })

        return quizEnd ? (
            <QuizOver
               ref ={this.storeDataRef}
               levelNames = {levelNames}
               score = {score}
               maxQuestions = {maxQuestions}
               quizLevel = {quizLevel}
               percent ={percent}
               loadLevelQuestions = {this.loadLevelQuestions}
            />
        )
        :
         (
            <Fragment>
                {/*<h2>Pseudo: {pseudo}</h2>*/}

                <Levels
                    levelNames= {levelNames}
                    quizLevel= {quizLevel}
                />

                <Progressbar
                    idQuestion = {idQuestion}
                    maxQuestions = {maxQuestions}
                />
                <h2>{question}</h2>

                {displayOptions}

                <button
                    disabled={btnDisabled}
                    onClick={this.nextQuestion}
                    className="btnSubmit">
                    { idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
                </button>
            </Fragment>

        );
    }
}
export default Quiz;
