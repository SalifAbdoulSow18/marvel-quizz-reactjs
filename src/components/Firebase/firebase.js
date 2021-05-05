import app from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore'

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
        this.db = app.firestore();
    }
    //Inscription
    signupUser = (email, password) => {
        return Promise.resolve(this.auth.createUserWithEmailAndPassword(email, password));
    }

    //Connexion
    loginUser = (email, password) => {
        return Promise.resolve(this.auth.signInWithEmailAndPassword(email, password));
    }

    //Deconnexion
    signoutUser = () => this.auth.signOut();

    // Récupérer le mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    user = uid => this.db.doc(`users/${uid}`);
}

export default Firebase;
