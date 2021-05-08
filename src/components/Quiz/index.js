import React, {Component} from 'react';
import {QuizMarvel} from "../quizMarvel";
import Levels from "../Levels";
import Progressbar from "../Progressbar";


class Quiz extends Component{

    state = {
        levelNames: ["debutant", "confirme", "expert"],
        quizLevel: 0
    }

    loadQuestions = level => {
        console.log(level);
    }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }

    render() {
        const {pseudo} = this.props.myPseudo;
        return (
            <div>
                {/*<h2>Pseudo: {pseudo}</h2>*/}
                <Levels />
                <Progressbar />
                <h2>Notre question quiz</h2>
                <p className="answerOptions">reponse 1</p>
                <p className="answerOptions">reponse 2</p>
                <p className="answerOptions">reponse 3</p>
                <p className="answerOptions">reponse 4</p>
                <button className="btnSubmit">suivant</button>
            </div>

        );
    }
}
export default Quiz;
