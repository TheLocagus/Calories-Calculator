import React, { useContext, useState } from 'react';

import bemCssModules from 'bem-css-modules';
import { default as AppStyles } from './App.module.scss';

import Meal from './Meal/Meal';
import MealsSummary from './MealsSummary/MealsSummary';
import { StoreContext } from '../../store/StoreProvider';

const style = bemCssModules(AppStyles)

function App() {
  const [id, setId] = useState(0)
  const [meals, setMeals] = useState([]);

  const { summary } = useContext(StoreContext)

  const handleOnClick = () => {
    const newMeal = {
      id,
      number: meals.length + 1,
    }
    setId(prev => prev + 1)
    setMeals([...meals, newMeal]);
  }

  const addingMeals = meals.map(meal => <Meal id={meal.id} key={meal.id} meals={meals} number={meal.number} setMeals={setMeals} />)


  return (
    <div className={style()}>
      <h1 className={style('title')}>Kalkulator kalorii</h1>
      <h3>by Locagus</h3>
      <section className={style('wrapper')}>
        {addingMeals}
      </section>
      {summary.length > 0 ? <MealsSummary /> : null}
      <button className={style('add_button')} onClick={handleOnClick}>Dodaj posiłek</button>
    </div>
  );
}

export default App;
