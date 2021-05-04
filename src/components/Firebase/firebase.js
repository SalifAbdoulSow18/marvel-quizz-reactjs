import app from "firebase/app";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBDYZF6ZO2z85fHezJhIXH8H4uQMZ_IzXg",
    authDomain: "marvel-quizz-3d6ce.firebaseapp.com",
    projectId: "marvel-quizz-3d6ce",
    storageBucket: "marvel-quizz-3d6ce.appspot.com",
    messagingSenderId: "1041996980566",
    appId: "1:1041996980566:web:73a526dc7db443e801f6f7"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
    }

    //Inscription
    signupUser = (email, password) => {
        this.auth.createUserWithEmailAndPassword(email, password);
    }

    //Connexion
    loginUser = (email, password) => {
        this.auth.signInWithEmailAndPassword(email, password);
    }

    //Deconnexion
    signoutUser = () => this.auth.signOut();
}

export default Firebase;
