import React, { useContext, useState } from 'react';

import Modal from '../Modal/Modal';

import bemCssModules from 'bem-css-modules';
import { default as LoginFormStyles } from './LoginForm.module.scss';
import { StoreContext } from '../../store/StoreProvider';

const style = bemCssModules(LoginFormStyles);

const LoginForm = ({ handleOnClose, isModalOpen }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [validateMessage, setValidateMessage] = useState('');

    const { setUser } = useContext(StoreContext);

    const handleOnChangeLogin = e => setLogin(e.target.value);
    const handleOnChangePassword = e => setPassword(e.target.value);
    const handleOnCloseModal = e => {
        e.preventDefault();
        handleOnClose();
    }

    const validateMessageComponent = validateMessage.length ? <p className={style('validate-message')}>{validateMessage}</p>
        : null;

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeCloseOutsideClick={true}>
            {validateMessageComponent}
            <form className={style()} method='post' >
                <div className={style('row')}>
                    <label>
                        Login:
                        <input onChange={handleOnChangeLogin} type="text" value={login} />
                    </label>
                </div>
                <div className={style('row')}>
                    <label>
                        Hasło:
                        <input onChange={handleOnChangePassword} type="password" value={password} />
                    </label>
                </div>
                <div className={style('row')}>
                    <button type='submit'>Zaloguj</button>
                    <button onClick={handleOnCloseModal} type='button'>Anuluj</button>
                </div>
            </form>
        </Modal>
    );
}

export default LoginForm;