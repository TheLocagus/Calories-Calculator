import React, { useContext, useEffect, useState } from 'react';

import bemCssModules from 'bem-css-modules';
import { default as ChosenProductStyles } from './ChosenProduct.module.scss';
import { StoreContext } from '../../../../../../store/StoreProvider';

const style = bemCssModules(ChosenProductStyles);

const ChosenProduct = ({ mealId, editHandler, removeHandler, name, calories, proteins, carbohydrates, fats, amount, id, productsChosen }) => {

    const [input, setInput] = useState(100);
    const [inputValue, setInputValue] = useState(input)
    const [basicCalories] = useState(calories);
    const [basicProteins] = useState(proteins);
    const [basicCarbohydrates] = useState(carbohydrates);
    const [basicFats] = useState(fats);
    const [isEditActive, setIsEditActive] = useState(false);

    const { summaryDispatch } = useContext(StoreContext);


    const handleInput = (e) => {
        setInput(prev => e.target.value);
    }
    const handleEdit = () => {
        setIsEditActive(prev => !prev);
    };
    const handleRemove = (id) => {
        removeHandler({ type: 'REMOVE', id });
        summaryDispatch({ type: 'REMOVE', id });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setInputValue(input);
        setIsEditActive(false)
    };

    useEffect(() => {
        const editedProduct = {
            mealId,
            amount: inputValue,
            calories: (basicCalories * (inputValue / 100)).toFixed(1),
            proteins: (basicProteins * (inputValue / 100)).toFixed(1),
            carbohydrates: Number((basicCarbohydrates * (inputValue / 100)).toFixed(1).toString()),
            fats: (basicFats * (inputValue / 100)).toFixed(1),
            id,
            name,
        };
        editHandler({ type: 'EDIT', id, newProduct: editedProduct });
        summaryDispatch({ type: 'UPDATE', id, mealSummary: editedProduct });
    }, [basicCalories, basicCarbohydrates, basicFats, basicProteins, editHandler, id, inputValue, mealId, name, summaryDispatch]);

    return (
        <>
            <li className={style()}>
                <div className={style('amount')}>
                    <p>{inputValue}g</p>
                </div>
                <div className={style('product-details')}>
                    <div className={style('top')}>
                        <div className={style('product-name')}>
                            <p>{name}</p>
                        </div>
                        <div className={style('buttons')}>
                            <button className={style('edit-button')} onClick={handleEdit}>Edytuj</button>
                            <button className={style('cancel-button')} onClick={() => handleRemove(id)}>X</button>
                        </div>
                    </div>
                    <div className={style('mid')}>
                        {isEditActive && (
                            <form onSubmit={handleSubmit}>
                                <input className={style('edit-input')} type="number" onChange={handleInput} value={input} />
                            </form>)}
                    </div>
                    <div className={style('bot')}>
                        <p>
                            <span>K: {calories} kcal</span>
                            <span> B: {proteins} g</span>
                            <span> W: {carbohydrates} g</span>
                            <span> T: {fats} g</span>
                        </p>
                    </div>
                </div>
            </li>
        </>
    );
};

export default ChosenProduct;
