import React, {useEffect, useState} from "react";
import Stepper from 'react-stepper-horizontal';

const Levels = ({levelNames, quizLevel}) => {

    const [levels, setLevels] = useState([]);

    useEffect(() => {
        const quizStep = levelNames.map(level => ({title: level.toUpperCase()}));
        setLevels(quizStep);
    }, [levelNames])

    console.log(levels);

    return (
        <div className="levelsContainer" style={{background: 'transparent'}}>
                <Stepper
                    steps={levels}
                    activeStep={ quizLevel }
                    activeTitleColor={'#d31017'}
                    activeColor={'#d31017'}
                    completeTitleColor={'#E0E0E0'}
                    completeColor={'#E0E0E0'}
                    completeBarColor={'#E0E0E0'}
                    size={45}
                    circleFontSize={20}
                />
        </div>
    );
}
export default React.memo(Levels);
