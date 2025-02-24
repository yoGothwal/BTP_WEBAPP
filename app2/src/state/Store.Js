import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserReducer";
import drawerReducer from "./DrawerReducer";

const Store = configureStore({
    reducer: {
        drawer: drawerReducer,
        user: userReducer,
    },
});

// Subscribe to store changes (for debugging)
Store.subscribe(() => {
    console.log("Redux State Updated:", Store.getState());
});

export default Store;
