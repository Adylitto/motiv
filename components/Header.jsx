import React from 'react'
import styles from '../styles/TopSection.module.css';
import Image from 'next/image';
import Link from 'next/link';
import GitHubButton from 'react-github-btn'
import logo from "/public/motiv.png"


const Header = () => {
    return (
        <>
            <div className={styles.topHeader}>
                <Link href="/">
                    <Image
                        src={logo}
                        alt="logo"
                        width={300}
                        height={100}
                        className={styles.img}
                    />
                </Link>
                <GitHubButton href="https://github.com/Adylitto/motiv" data-size="large" aria-label="Star Adylitto/motiv on GitHub">Star</GitHubButton>
            </div>
        </>
    )
}

export default Header