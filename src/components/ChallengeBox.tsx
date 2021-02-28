import { useContext } from "react";
import { challengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallengeBox.module.css"

export function ChallengeBox(){
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(challengesContext)
    const {resetCountdown} = useContext(CountdownContext)

    function handleChallengeSucceeded(){
        completeChallenge();
        resetCountdown();
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.ChallengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.ChallengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="seta"/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button type='button'
                        className={styles.buttonFailed}
                        onClick={handleChallengeFailed}
                        >Falhei</button>

                        <button type='button'
                        className={styles.buttonCompleted}
                        onClick={handleChallengeSucceeded}
                        >Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.ChallengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio</strong>
                <p>
                    <img src="icons/level-up.svg" alt="level up"/>
                    Avance de level completando desafios.
                </p>
                </div>
            )}
        </div>
    )
}