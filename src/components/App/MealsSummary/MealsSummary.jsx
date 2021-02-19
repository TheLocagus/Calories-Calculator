import React, { useContext } from 'react';
import { StoreContext } from '../../../store/StoreProvider';

import bemCssModules from 'bem-css-modules';
import { default as MealsSummaryStyles } from './MealsSummary.module.scss';

const style = bemCssModules(MealsSummaryStyles);

const MealsSummary = () => {
    const { summary } = useContext(StoreContext);

    const caloriesArray = summary.map(item => {
        let caloriesTaken = [];
        caloriesTaken.push(item.calories);
        let calories = Number(caloriesTaken.toString());
        return calories
    })
    const proteinsArray = summary.map(item => {
        let proteinsTaken = [];
        proteinsTaken.push(item.proteins);
        let proteins = Number(proteinsTaken);
        return proteins
    });
    const carbohydratesArray = summary.map(item => {
        let carbohydratesTaken = [];
        carbohydratesTaken.push(item.carbohydrates);
        let carbohydrates = Number(carbohydratesTaken);
        return carbohydrates
    });
    const fatsArray = summary.map(item => {
        let fatsTaken = [];
        fatsTaken.push(item.fats);
        let fats = Number(fatsTaken);
        return fats
    });

    let caloriesValue = caloriesArray.reduce(function (a, b) {
        return a + b;
    }, 0);
    let proteinsValue = proteinsArray.reduce(function (a, b) {
        return a + b;
    }, 0);
    let carbohydratesValue = carbohydratesArray.reduce(function (a, b) {
        return a + b;
    }, 0);
    let fatsValue = fatsArray.reduce(function (a, b) {
        return a + b;
    }, 0);

    return (
        <div className={style()}>
            <h2>Podsumowanie:</h2>
            <div className={style('calories')}>
                <p><span>{Number(caloriesValue)} kcal</span></p>
            </div>
            <div className={style('macros')}>
                <p className={style('macros-details')}>Białko: <span>{Number(proteinsValue)}g</span></p>
                <p className={style('macros-details')}>Węglowodany: <span>{Number(carbohydratesValue)}g</span></p>
                <p className={style('macros-details')}>Tłuszcze: <span>{Number(fatsValue)}g</span></p>
            </div>
        </div>
    );
}

export default MealsSummary;