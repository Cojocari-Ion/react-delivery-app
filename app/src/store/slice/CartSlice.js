import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    cartProducts: [],
    itemIndex: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.cartProducts.push(action.payload);
        },

        clearCart(state, action) {
            state.cartProducts = []
        },

        removeFromCart(state, action) {
            state.cartProducts = state.cartProducts.filter(
                (cartItem) => (cartItem.cartProducts.doc.data.value.mapValue.fields.name.stringValue !== action.payload.cartItemName)
            )

            console.log(state.cartProducts)
        
        }
    }
})
{/*
    export const getTotalPrice = state => {
        return state.cart.cartProducts.reduce((total, cartItem) => {
            return cartItem.totalPrice + total;
        }, 0)
    }
*/}

export const { addToCart, clearCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;