import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./Reducers/loginReducer"
import AddEmployeeReducer from './Reducers/AddEmployeeReducer';

const store = configureStore({
    reducer: {
        login: loginReducer,
        Employee: AddEmployeeReducer,
    }
})

export default store;