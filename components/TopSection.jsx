import React from 'react';
import styles from '../styles/TopSection.module.css';
import Link from 'next/link';
import Header from './Header';
import Button from './Button';


const TopSection = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <p>Boostes ta <span>recherche d emploi</span> avec l IA</p>
                </div>
                <div className={styles.description}>
                    <p>Augmentes considérablement tes chances de décrocher un entretien en générant une lettre de motivation hautement personnalisée et professionnelle,
                         adaptée à l emploi spécifique pour lequel tu postules.</p>
                </div>
                <Link href="/generate">
                    <Button text={"ESSAI GRATUIT"} />
                </Link>
                <span>Pas Email. Pas de Signup.</span>
            </div>
        </div>
    )
}

export default TopSection