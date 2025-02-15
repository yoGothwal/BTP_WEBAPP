import drawerReducer from "./DrawerReducer"
import { configureStore } from "@reduxjs/toolkit"
const Store = configureStore({
    reducer: {
        drawer: drawerReducer
    }
})
export default Store