import React from 'react';
import ChosenProduct from './ChosenProduct/ChosenProduct';

import bemCssModules from 'bem-css-modules';
import { default as ChosenProductsStyles } from './ChosenProducts.module.scss';

const style = bemCssModules(ChosenProductsStyles);

const ChosenProducts = ({ mealId, editHandler, removeHandler, productsChosen }) => {

    const productsInMeal = productsChosen.map(product => <ChosenProduct mealId={mealId} editHandler={editHandler} removeHandler={removeHandler} productsChosen={productsChosen} key={product.id} {...product} />)
    return (
        <ul className={style()}>
            {productsInMeal}
        </ul>
    );
}

export default ChosenProducts;