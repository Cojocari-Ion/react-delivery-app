import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    products: null
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action) {
            state.products = action.payload.products;
        },
    }
})

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;