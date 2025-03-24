import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null, // Stores user data
    token: null, // Stores authentication token
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Updates user data in Redux store
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token"); // Clears stored token
        },
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;