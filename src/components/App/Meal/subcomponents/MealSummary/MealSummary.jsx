import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../../../../store/StoreProvider';

import bemCssModules from 'bem-css-modules';
import { default as MealSummaryStyles } from './MealSummary.module.scss';

const style = bemCssModules(MealSummaryStyles);

const MealSummary = ({ editSummaryHandler, productsChosen, id }) => {

    const { summaryDispatch } = useContext(StoreContext)

    let caloriesValue = productsChosen.map(item => {
        let kcal = [];
        kcal.push(item.calories);
        let kcals = Number(kcal.toString());
        return kcals
    });
    let proteinsValue = productsChosen.map(item => {
        let protein = [];
        protein.push(item.proteins);
        let proteins = Number(protein.toString());
        return proteins
    })
    let carbohydratesValue = productsChosen.map(item => {
        let carbohydrate = [];
        carbohydrate.push(item.carbohydrates);
        let carbohydrates = Number(carbohydrate.toString());
        return carbohydrates
    })
    let fatsValue = productsChosen.map(item => {
        let fat = [];
        fat.push(item.fats);
        let fats = Number(fat.toString());
        return fats
    });

    let calories = caloriesValue.reduce(function (a, b) {
        return a + b;
    }, 0);
    let proteins = proteinsValue.reduce(function (a, b) {
        return a + b;
    }, 0);
    let carbohydrates = carbohydratesValue.reduce(function (a, b) {
        return a + b;
    }, 0);
    let fats = fatsValue.reduce(function (a, b) {
        return a + b;
    }, 0);

    useEffect(() => {
        if (productsChosen) {
            const mealSummary = {
                id,
                calories,
                proteins,
                carbohydrates,
                fats,
            };
            summaryDispatch({ type: 'UPDATE', mealSummary, id })
        } else {
            const mealSummary = {
                id,
                calories: 0,
                proteins: 0,
                carbohydrates: 0,
                fats: 0,
            };
            summaryDispatch({ type: 'UPDATE', mealSummary, id })
        }
        return console.log('Odmontowano')

    }, [productsChosen, calories, carbohydrates, fats, id, proteins, summaryDispatch]);

    return (
        <>
            <div className={style()}>
                <div className={style('calories')}>
                    <p>Kalorie: <span>{calories} kcal</span></p>
                </div>
                <div className={style('makros')}>
                    <p className={style('makros-details')}>Białko: <span>{proteins} g</span></p>
                    <p className={style('makros-details')}>Węglowodany: <span>{carbohydrates} g</span></p>
                    <p className={style('makros-details')}>Tłuszcze: <span>{fats} g</span></p>
                </div>

                {/* <p>
                    <span>Kalorie: {calories} kcal</span>
                    <span> Białko: {proteins} g</span>
                    <span> Węglowodany: {carbohydrates} g</span>
                    <span> Tłuszcze: {fats} g</span>
                </p> */}
            </div>
        </>
    );
}


export default MealSummary;