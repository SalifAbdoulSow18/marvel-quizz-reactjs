import React, {useRef, useEffect, useState, Fragment} from 'react';

const Accueil = () => {
    const [btn, setBtn] = useState(false);

    const refWolverine = useRef(null);

    useEffect(()=>{

        // Rajouter des griffes sur l'image de la balise main class="welcomePage"
        refWolverine.current.classList.add("startingImg");

        // Le temps d'execution avant la suppression des griffes
        setTimeout(()=>{
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1500)

    }, [])

    // fonction qui affiche la griffe gauche si nous sommes dans la div gauche
    const setLeftImg = () =>{
        refWolverine.current.classList.add("leftImg");
    }

    // fonction qui affiche la griffe droite si nous sommes dans la div droite
    const setRightImg = () =>{
        refWolverine.current.classList.add("rightImg");
    }

    // fonction qui efface la griffe lorsque nous quittons la div
    const clearImg = () => {
        if (refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg");
        }else if (refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg");
        }
    }

    // fonction d'Affichage des buttons lorsque les griffes disparaissent
    const displayBtn = btn && (
        <Fragment>
            <div onMouseOver={setLeftImg} onMouseOut={clearImg} className="leftBox">
                <button className="btn-welcome">Inscription</button>
            </div>
            <div onMouseOver={setRightImg} onMouseOut={clearImg} className="rightBox">
                <button className="btn-welcome">Connexion</button>
            </div>
        </Fragment>
    )

    return (
        <main ref={refWolverine} className="welcomePage">
            {displayBtn}
        </main>
    );
}

export default Accueil;
