import styles from '../styles/components/Profile.module.css';
import {ChallengesContext} from '../contexts/ChallengesContext';
import { useContext } from 'react';

export function Profile() {
    const {level} = useContext(ChallengesContext);

    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/joaochioda.png" alt="Joao"/>
            <div>
                <strong>Joao Guilherme</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                    </p>
            </div>
        </div>
    );
}