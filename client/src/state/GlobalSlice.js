import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,  // Initially, no user is logged in
    mode: "light" // Theme mode
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setUser: (state, action) => {
            state.user = action.payload;  // Set the user data received
        }
    }
});

// Export actions
export const { setMode, setUser } = globalSlice.actions;

// Export reducer
export default globalSlice.reducer;