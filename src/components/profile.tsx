import { useContext } from "react"
import { challengesContext } from "../contexts/ChallengesContext"
import styles from "../styles/components/profile.module.css"

export function Profile(){
    const {level} = useContext(challengesContext)
    return(
        <div className={styles.profilecontainer}>
            <img src="http://github.com/talinejoventino.png" alt="foto perfil taline joventino"/>
            <div>
                <strong>Taline Joventino</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}