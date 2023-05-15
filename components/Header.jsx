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
                <a href="https://www.buymeacoffee.com/adyl">
                    <img src="https://img.buymeacoffee.com/button-api/?text=M'offrir un Kawa! &emoji=&slug=adyl&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
                </a>
                <GitHubButton href="https://github.com/Adylitto/motiv" data-size="large" aria-label="Star Adylitto/motiv on GitHub">Star</GitHubButton>
            </div>
        </>
    )
}

export default Header