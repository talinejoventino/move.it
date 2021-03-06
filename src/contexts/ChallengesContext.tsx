import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import {isMobile} from 'react-device-detect'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesConstextData{
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelup: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export const challengesContext = createContext({} as ChallengesConstextData);

export function ChallengesProvider({children, ...rest} : ChallengesProviderProps){
    const [level, setLevel ] = useState(rest.level ?? 1);
    const [currentExperience, setcurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModal, setIsLevelUpModal] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1)* 4,2)

    useEffect(()=>{
        Notification.requestPermission();
    }, [])

    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted])

    const closeLevelUpModal = () =>{
        setIsLevelUpModal(false)
    }

    const levelup = () =>{
        setLevel(level+1);
        setIsLevelUpModal(true)
    }

    function startNewChallenge(){
        const randonChallengesIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randonChallengesIndex]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(!isMobile && Notification.permission == 'granted'){
            new Notification('Novo desafio o/', {
                body: `Valendo ${challenge.amount} xp!`,
                icon: 'favicon.png',
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }
    function completeChallenge(){
        if (!activeChallenge){
            return;
        }

        const {amount} = activeChallenge

        let finalExperience = currentExperience + amount;

        if (finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelup();
        }
        setcurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return(
        <challengesContext.Provider 
        value={{level,
         currentExperience,
         challengesCompleted,
         experienceToNextLevel,
         activeChallenge,
         levelup,
         startNewChallenge,
         resetChallenge,
         completeChallenge,
         closeLevelUpModal}}>
            {children}
            {isLevelUpModal && <LevelUpModal/>}
        </challengesContext.Provider>
    )
}