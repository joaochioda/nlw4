import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ChallengesContext } from './ChallengesContext';

const totalTime = 0.05 * 60;
let countedownTimeout: NodeJS.Timeout;

interface CountdownContextData {
    minutes: number,
    seconds:number,
    hasFinished: boolean,
    isActive: boolean,
    startCountDown: () => void,
    resetCountdown: () => void,
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}:CountdownProviderProps) {
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime] = useState(totalTime);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountDown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countedownTimeout);
        setIsActive(false);
        setTime(totalTime);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countedownTimeout = setTimeout(() => {
                setTime(time -1)
            }, 1000)
        } else if(isActive && time === 0){
            startNewChallenge();
            setHasFinished(true);
            setIsActive(false);
        }
    }, [isActive, time])
    
return(
    <CountdownContext.Provider value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startCountDown,
        resetCountdown

    }}>
        {children}
    </CountdownContext.Provider>
)
}