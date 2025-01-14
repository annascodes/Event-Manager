import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    currentUser : null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        signedIn:(state, action)=>{
            state.currentUser = action.payload;
        },
        logout:(state)=>{
            state.currentUser = null;
        }
    }
})

export const {signedIn, logout} = userSlice.actions;
export default userSlice.reducer;