import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    visible: false
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {

        setError(state) {
            state.visible = true;
        },

        setOutError(state) {
            state.visible = false;
        },
    }
})

export const { setError, setOutError } = errorSlice.actions;

export default errorSlice.reducer;