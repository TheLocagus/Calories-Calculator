import React, { useContext, useState } from 'react';
import { StoreContext } from '../../../../../../store/StoreProvider';

import bemCssModules from 'bem-css-modules';
import { default as FilterProductsStyles } from './FilterProducts.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';

import FilteredList from './FilteredList/FilteredList';

const style = bemCssModules(FilterProductsStyles);
const element = <FontAwesomeIcon icon={faUtensils} />;

const FilterProducts = ({ setIsFilterProductsVisible, mealId, addHandler, productsChosen, setProductsChosen }) => {

    const [input, setInput] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { products } = useContext(StoreContext);

    const handleChange = e => {
        setInput(e.target.value);

        let filterProducts = [...products];
        filterProducts = filterProducts.filter(product => product.name.replace(/ /g, '').toLowerCase().includes(e.target.value.toLowerCase().replace(/ /g, '')));
        setFilteredProducts(prev => [...filterProducts]);
    };


    const filteredList = filteredProducts.map(product => <FilteredList key={product.id} {...product} productsChosen={productsChosen} setProductsChosen={setProductsChosen} setSearchProductInput={setInput} addHandler={addHandler} mealId={mealId} setIsFilterProductsVisible={setIsFilterProductsVisible} />);
    return (
        <div className={style()}>
            <div className={style('wrapper')}>
                <span className={style('span')}>{element}</span>
                <input className={style('input')} onChange={handleChange} type="text" placeholder={'Wyszukaj produkt'} value={input}></input>
            </div>
            {input.length
                ?
                <ul className={style('filtered_list')}>
                    {filteredList}
                </ul>
                : null
            }
        </div>
    );
}

export default FilterProducts;