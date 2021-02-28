import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

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
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContext);

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);


  const experienceToNextLevel = Math.pow((level+ 1) *4, 2);

  useEffect(() => {
    Notification.requestPermission();
  },[])

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));

  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setIsLevelUpModalOpen(true);
    setLevel(level +1);
  }

  function resetChallenge() {
      setActiveChallenge(null);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === 'granted') {
      console.log('oi');
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp!`
      })
    }
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const {amount} = activeChallenge;
    let finalExperience = currentExperience + amount;
    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }
    return (
  <ChallengesContext.Provider value={{closeLevelUpModal, completeChallenge, experienceToNextLevel, resetChallenge, activeChallenge, startNewChallenge, level, currentExperience, challengesCompleted, levelUp}}>
    {children}
    {isLevelUpModalOpen && <LevelUpModal/>}
  </ChallengesContext.Provider>


    )
}