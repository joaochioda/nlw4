import { createContext, useState } from 'react';

import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesContext {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContext);

export function ChallengesProvider({children}) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level+ 1) *4, 2);

  function levelUp() {
    setLevel(level +1);
  }

  function resetChallenge() {
      setActiveChallenge(null);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);
  }
    return (
  <ChallengesContext.Provider value={{experienceToNextLevel, resetChallenge, activeChallenge, startNewChallenge, level, currentExperience, challengesCompleted, levelUp}}>
    {children}
  </ChallengesContext.Provider>


    )
}