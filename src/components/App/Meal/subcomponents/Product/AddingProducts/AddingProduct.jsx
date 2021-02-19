import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../../../../store/StoreProvider';

import bemCssModules from 'bem-css-modules';
import { default as AddingProductStyles } from './AddingProduct.module.scss';

const style = bemCssModules(AddingProductStyles)

const AddingProduct = ({ mealId, addHandler, setIsAddingProductVisible }) => {

    const [inputName, setInputName] = useState('');
    const [inputCalories, setInputCalories] = useState('');
    const [inputProteins, setInputProteins] = useState('');
    const [inputCarbohydrates, setInputCarbohydrates] = useState('');
    const [inputFats, setInputFats] = useState('');
    const { newProductId, setNewProductId, productsAddedByUser, setProductsAddedByUser, summaryDispatch } = useContext(StoreContext);

    const handleCancel = (e) => {
        e.preventDefault();
        setIsAddingProductVisible(false);
    };

    const handleInputName = e => {
        setInputName(e.target.value);
    };

    const handleInputCalories = e => {
        setInputCalories(e.target.value);
    };

    const handleInputProteins = e => {
        setInputProteins(e.target.value);
    };

    const handleInputCarbohydrates = e => {
        setInputCarbohydrates(e.target.value);
    };

    const handleInputFats = e => {
        setInputFats(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const newProductInMeal = {
            id: `${mealId}-${newProductId}`,
            mealId,
            name: inputName,
            calories: Number(inputCalories),
            proteins: Number(inputProteins),
            carbohydrates: Number(inputCarbohydrates),
            fats: Number(inputFats),
            amount: 100,
            addedByUser: true,
        };
        setIsAddingProductVisible(false);
        setNewProductId(prev => prev + 1);
        setProductsAddedByUser([...productsAddedByUser, newProductInMeal]);
        addHandler({ type: 'ADD', newProduct: newProductInMeal });
        summaryDispatch({ type: 'ADD', mealSummary: newProductInMeal });
    }

    return (
        <form className={style()} onSubmit={handleSubmit}>
            <div className={style('inputs')}>
                <div className={style('name')}>
                    <label className={style('label-name')}>Nazwa:
                    <input className={style('input-name')} type="text" onChange={handleInputName} value={inputName} />
                    </label>
                </div>
                <div className={style('makro')}>
                    <label className={style('label')}>Białko:
                        <input className={style('input')} type="text" onChange={handleInputProteins} value={inputProteins} />
                    </label>
                    <label className={style('label')}>Węglowodany:
                        <input className={style('input')} type="text" onChange={handleInputCarbohydrates} value={inputCarbohydrates} />
                    </label>
                    <label className={style('label')}>Tłuszcze:
                        <input className={style('input')} type="text" onChange={handleInputFats} value={inputFats} />
                    </label>
                    <label className={style('label')}>Kalorie:
                        <input className={style('input')} type="text" onChange={handleInputCalories} value={inputCalories} />
                    </label>
                </div>
            </div>
            <div className={style('buttons')}>
                <button className={style('button')} type='submit'>Potwierdź</button>
                <button className={style('button')} onClick={handleCancel}>Anuluj</button>
            </div>

        </form>
    );
}

export default AddingProduct;