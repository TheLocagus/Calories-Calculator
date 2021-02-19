import React, { useContext, useReducer, useState } from 'react';

import bemCssModules from 'bem-css-modules';
import { default as MealStyles } from './Meal.module.scss';

import ChosenProducts from './subcomponents/ChosenProducts/ChosenProducts';
import Product from './subcomponents/Product/Product';
import MealSummary from './subcomponents/MealSummary/MealSummary';
import { StoreContext } from '../../../store/StoreProvider';

const style = bemCssModules(MealStyles)
const productsReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.newProduct];
        case 'REMOVE':
            return state.filter(product => product.id !== action.id);
        case 'EDIT':
            return (
                state.map(item => {
                    if (item.id !== action.id) return item;
                    else return item = action.newProduct;
                })
            )
        default:
            throw new Error('Something went wrong');
    }
};

const Meal = ({ number, meals, id, setMeals }) => {
    const [isProductFormVisible, setIsProductFormVisible] = useState(false);

    const [productsChosen, dispatch] = useReducer(productsReducer, []);

    const { summaryDispatch } = useContext(StoreContext);

    const handleDelete = (id) => {
        let value = 0;
        let modifiedMeals = [...meals];
        modifiedMeals = modifiedMeals.filter(item => item.id !== id
        );
        modifiedMeals = modifiedMeals.map(item => {
            if (true) {
                item.number = ++value;
            }
            return item
        });
        summaryDispatch({ type: 'REMOVE_MEAL', mealId: number });
        setMeals(prev => [...modifiedMeals])
    };
    const handleAddProduct = () => {
        setIsProductFormVisible(true)
    };


    return (
        <section className={style()}>
            <div className={style('title')}>
                <p className={style('title_name')}>Posiłek nr. {number}</p>
                <button className={style('title_button')} onClick={() => handleDelete(id)}>X</button>
            </div>

            {productsChosen.length > 0 && <ChosenProducts mealId={number} editHandler={dispatch} removeHandler={dispatch} productsChosen={productsChosen} />}
            {isProductFormVisible && <Product mealId={number} addHandler={dispatch} setIsProductFormVisible={setIsProductFormVisible} />}
            <div className={style('add')}>
                <button className={style('add_button')} onClick={handleAddProduct}>Dodaj produkt</button>
            </div>
            {productsChosen.length > 0 && <MealSummary productsChosen={productsChosen} id={id} />}
        </section>
    );
}

export default Meal;