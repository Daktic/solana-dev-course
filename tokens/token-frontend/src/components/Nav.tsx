import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import React from 'react';

type NavContainerProps = {
    title?: string;
    children?: React.ReactNode;
}

const NavContainer: React.FC<NavContainerProps> = ({ children, title }) => {
    return (
        <nav style={styles.navbar}>
            <h1>{title || 'Default Navbar Title'}</h1>
            <div>{children}</div>
        </nav>
    );
};

const Navbar = () => {
    return (
        <NavContainer title="Solana Wallet">
            <WalletMultiButton />
        </NavContainer>
    )
}

export { Navbar }

const styles = {
    navbar: {
        position: 'fixed' as const, // Fixes the Navbar at a specific position
        top: 0,            // Positions it at the top of the screen
        left: 0,           // Stretches it to start from the left
        width: '100%',     // Takes the full width of the viewport
        zIndex: 1000,      // Adds a stacking order to ensure it appears above other elements
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#333',
        color: 'white',
        borderRadius: '0px', // Avoids rounding corners at the top
        boxSizing: 'border-box' as const, // Includes padding in the width calculation
    }
};