import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./Reducers/loginReducer"


const store = configureStore({
    reducer:{
        login:loginReducer,
    }
})

export default store;