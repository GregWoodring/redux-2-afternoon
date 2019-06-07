import axios from 'axios';

let initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

export default function reducer(state = initialState, action){
    let { type, payload } = action
    switch(type){
        case REQUEST_BUDGET_DATA + '_PENDING':
            return {...state, loading: true}
        case REQUEST_BUDGET_DATA + '_FULFILLED':
            return {...state, loading: false, ...payload}
        case ADD_PURCHASE + '_PENDING':
            return {...state, loading: true}
        case ADD_PURCHASE + '_FULFILLED':
            return {...state, loading: false, ...payload}
        case REMOVE_PURCHASE + '_PENDING':
            return {...state, loading: true}
        case REMOVE_PURCHASE + '_FULFILLED':
            return {...state, loading: false, ...payload}
        default:
            return state;
    }
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';

export const requestBudgetData = () => {
    let data = axios.get('/api/budget-data').then(res => {
        return res.data
    }).catch(err => {
        console.log(err);
    });
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

const ADD_PURCHASE = 'ADD_PURCHASE';

export const addPurchase =  (price, description, category) => {
    let data = axios.post('/api/budget-data/purchase', {
        description,
        price,
        category
    }).then(res => res.data).catch(err => {
        console.log(err);
    })

    return{
        type: ADD_PURCHASE,
        payload: data
    }
}

const REMOVE_PURCHASE = 'REMOVE_PURCHASE';

export const removePurchase = id => {
    let data = axios.delete(`/api/budget-data/purchase/:id`).then(res => {
        return res.data
    }).catch(err => {
        console.log(err);
    });
    return{
        type: REMOVE_PURCHASE,
        payload: data
    }
}