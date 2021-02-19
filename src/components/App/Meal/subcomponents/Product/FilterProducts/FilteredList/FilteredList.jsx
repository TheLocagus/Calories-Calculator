import React, { useContext } from 'react';

import bemCssModules from 'bem-css-modules';
import { default as FilteredListStyles } from './FilteredList.module.scss';
import { StoreContext } from '../../../../../../../store/StoreProvider';

const style = bemCssModules(FilteredListStyles);

const FilteredList = ({ setIsFilterProductsVisible, mealId, addHandler, amount, id, name, calories, proteins, carbohydrates, fats, setSearchProductInput }) => {

    const { summaryDispatch } = useContext(StoreContext);

    const handleChooseProduct = () => {
        const newChosenProduct = {
            id: `${mealId}-${id}`,
            mealId,
            name,
            calories,
            proteins,
            carbohydrates,
            fats,
            amount
        };
        // setProductsChosen([...productsChosen, newChosenProduct]);

        addHandler({ type: 'ADD', newProduct: newChosenProduct });
        summaryDispatch({ type: 'ADD', mealSummary: newChosenProduct });
        setSearchProductInput('');
        setIsFilterProductsVisible(false);

    }
    return (
        <li className={style()} key={id}>
            <div className={style('product-wrapper')}>
                <div className={style('product-name')}>
                    <p>{name}</p>
                </div>
                <div className={style('product-info')}>
                    <p className={style('product-details')}>
                        <span className={style('product-details-position')}>K: {calories}kcal</span>
                        <span className={style('product-details-position')}>/</span>
                        <span className={style('product-details-position')}>B: {proteins}g</span>
                        <span className={style('product-details-position')}>/</span>
                        <span className={style('product-details-position')}>W: {carbohydrates}g</span>
                        <span className={style('product-details-position')}>/</span>
                        <span className={style('product-details-position')}>T: {fats}g</span>
                    </p>
                </div>
            </div>
            <div className={style('button-area')}>
                <button className={style('button')} onClick={handleChooseProduct}>Dodaj produkt</button>
            </div>
        </li>
    );
}

export default FilteredList;