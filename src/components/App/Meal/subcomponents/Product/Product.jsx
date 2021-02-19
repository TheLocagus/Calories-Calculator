import React, { useState } from 'react';

import bemCssModules from 'bem-css-modules';
import { default as ProductStyles } from './Product.module.scss';

import AddingProduct from './AddingProducts/AddingProduct';
import FilterProducts from './FilterProducts/FilterProducts';

const style = bemCssModules(ProductStyles)

const Product = ({ mealId, addHandler, productsAddedByUser, setProductsAddedByUser, productsChosen, setProductsChosen, setIsProductFormVisible }) => {
    const [isFilterProductsVisible, setIsFilterProductsVisible] = useState(false);
    const [isAddingProductVisible, setIsAddingProductVisible] = useState(false);

    const handleFilter = () => {
        if (isAddingProductVisible) {
            setIsAddingProductVisible(false);
        }
        setIsFilterProductsVisible(!isFilterProductsVisible);
    };
    const handleAdd = () => {
        if (isFilterProductsVisible) {
            setIsFilterProductsVisible(false);
        }
        setIsAddingProductVisible(!isAddingProductVisible);
    };
    const handleProductFormCancel = () => {
        setIsProductFormVisible(false);
    };

    return (
        <>
            {isAddingProductVisible && <AddingProduct mealId={mealId} addHandler={addHandler} productsChosen={productsChosen} setProductsChosen={setProductsChosen} setIsAddingProductVisible={setIsAddingProductVisible} />}
            {isFilterProductsVisible && <FilterProducts setIsFilterProductsVisible={setIsFilterProductsVisible} mealId={mealId} addHandler={addHandler} productsChosen={productsChosen} setProductsChosen={setProductsChosen} />}
            <div className={style()}>
                <button className={style('filter')} onClick={handleFilter}>Wyszukaj produkt</button>
                <button className={style('add')} onClick={handleAdd}>Dodaj własny produkt</button>
                <button className={style('cancel')} onClick={handleProductFormCancel}>X</button>
            </div>
        </>
    );
};

export default Product;