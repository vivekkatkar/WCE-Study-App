import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    if(user === undefined || user === null ) return;
    try {
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Error parsing user from localStorage", error);
        return null;
    }
};

const initialState = {
    user: getUserFromLocalStorage(),
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;
