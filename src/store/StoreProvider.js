import React, { createContext, useState, useReducer } from 'react';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
    const [products, setProducts] = useState([{
        id: 1,
        name: "Serek wiejski",
        calories: 97,
        proteins: 11,
        carbohydrates: 2,
        fats: 5,
        amount: 100,
    },
    {
        id: 2,
        name: "Grejfrucik",
        calories: 36.2,
        proteins: 0.6,
        carbohydrates: 8,
        fats: 0.2,
        amount: 100,
    },
    {
        id: 3,
        name: "Jaja",
        calories: 139.7,
        proteins: 12.5,
        carbohydrates: 0.6,
        fats: 9.7,
        amount: 100,
    },
    {
        id: 4,
        name: "Mąka tortowa typ 405",
        calories: 341,
        proteins: 10,
        carbohydrates: 71.7,
        fats: 1,
        amount: 100,
    },
    {
        id: 5,
        name: "Mleko Piątnica",
        calories: 60,
        proteins: 3.1,
        carbohydrates: 4.7,
        fats: 3.2,
        amount: 100,
    },
    {
        id: 6,
        name: "Twaróg chudy Pilos - LIDL",
        calories: 96,
        proteins: 20,
        carbohydrates: 3.5,
        fats: 0.2,
        amount: 100,
    },
    {
        id: 7,
        name: "Mleko Piątnica",
        calories: 60,
        proteins: 3.1,
        carbohydrates: 4.7,
        fats: 3.2,
        amount: 100,
    },
    {
        id: 8,
        name: "Jogurt naturalny Skyr",
        calories: 64,
        proteins: 12,
        carbohydrates: 4.1,
        fats: 0,
        amount: 100,
    },
    {
        id: 9,
        name: "Mleko Piątnica",
        calories: 60,
        proteins: 3.1,
        carbohydrates: 4.7,
        fats: 3.2,
        amount: 100,
    },
    {
        id: 10,
        name: "Śmietana 18%",
        calories: 188,
        proteins: 2.6,
        carbohydrates: 3.9,
        fats: 18,
        amount: 100,
    },
    {
        id: 11,
        name: "Mleko Piątnica",
        calories: 60,
        proteins: 3.1,
        carbohydrates: 4.7,
        fats: 3.2,
        amount: 100,
    },
    {
        id: 12,
        name: "Cukier",
        calories: 386,
        proteins: 0,
        carbohydrates: 400,
        fats: 0,
        amount: 100,
    },
    {
        id: 13,
        name: "Olej kujawski",
        calories: 884,
        proteins: 0,
        carbohydrates: 0,
        fats: 100,
        amount: 100,
    }
    ]);

    const [productsAddedByUser, setProductsAddedByUser] = useState([]);
    const [newProductId, setNewProductId] = useState(255);
    const [isLoginFormActive, setIsLoginFormActive] = useState(false);

    const summaryReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return [...state, action.mealSummary];
            case 'REMOVE':
                return state.filter(item => item.id !== action.id);
            case 'REMOVE_MEAL':
                return state.filter(item => item.mealId !== action.mealId)
            case 'UPDATE':
                return state.map(item => {
                    if (item.id === action.id) {
                        return item = action.mealSummary;
                    } else return item;
                });
            default:
                throw new Error('Something went wrong!')
        };
    };
    const [summary, summaryDispatch] = useReducer(summaryReducer, []);

    return (
        <StoreContext.Provider value={{
            products,
            setProducts,
            productsAddedByUser,
            setProductsAddedByUser,
            newProductId,
            setNewProductId,
            summary,
            summaryDispatch,
            isLoginFormActive,
            setIsLoginFormActive
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;