import { createSlice } from "@reduxjs/toolkit";

const Drawer = createSlice({
    name: "drawer",
    initialState: {
        isOpen: true
    },
    reducers: {
        toggleDrawer: (state) => {
            state.isOpen = !state.isOpen
        }
    }
})
export const { toggleDrawer } = Drawer.actions
export default Drawer.reducer