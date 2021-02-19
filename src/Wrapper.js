import React from 'react';
import App from './components/App/App';
import Menu from './components/Menu/Menu';


import bemCssModules from 'bem-css-modules';
import { default as WrapperStyles } from './Wrapper.module.scss';

import StoreProvider from './store/StoreProvider';

const style = bemCssModules(WrapperStyles);
const Wrapper = () => {
    return (
        <StoreProvider>
            <div className={style()}>
                <Menu />
                <App />
            </div>
        </StoreProvider>
    );
}

export default Wrapper;