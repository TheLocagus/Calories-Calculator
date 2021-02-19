import React, { useContext, useState } from 'react';

import LoginForm from '../LoginForm/LoginForm';

import bemCssModules from 'bem-css-modules';
import { default as MenuStyles } from './Menu.module.scss';
import { StoreContext } from '../../store/StoreProvider';

const style = bemCssModules(MenuStyles);
const Menu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, setUser } = useContext(StoreContext)

    const handleOnClose = () => setIsModalOpen(false);

    const handleOnClick = () => {
        if (Boolean(user)) {
            setUser(null);
        } else {
            setIsModalOpen(true);
        }
    }

    const setProperlyLabel = Boolean(user) ? 'Wyloguj się' : 'Zaloguj się';

    return (
        <nav className={style()}>
            <button className={style('login-button')} onClick={handleOnClick}>{setProperlyLabel}</button>
            <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
        </nav>
    );
}

export default Menu;