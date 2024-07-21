// import { configureStore, createSlice } from '@reduxjs/toolkit'

// const authSlice = createSlice({
//     name: 'auth',
//     initialState: {
//         email: '',
//         error: '',
//         password: '',
//     },
//     reducers: {
//         setEmail: (state, action) => {
//             state.email = action.payload
//         },
//         setPassword: (state, action) => {
//             state.password = action.payload
//         },
//         setError: (state, action) => {
//             state.error = action.payload
//         },
//         clearError: (state) => {
//             state.error = ''
//         },
//     },
// })

// export const { setEmail, setPassword, setError, clearError } = authSlice.actions

// // Define the initial state
// const initialState = {
//     isFirstOpen: true, // Assuming true by default for initial setup
// }

// // Create a slice for isFirstOpen state
// const isFirstOpenSlice = createSlice({
//     name: 'isFirstOpen',
//     initialState,
//     reducers: {
//         setIsFirstOpen: (state, action) => {
//             state.isFirstOpen = action.payload
//         },
//     },
// })

// // Export actions
// export const { setIsFirstOpen } = isFirstOpenSlice.actions

// // Create Redux store
// const store = configureStore({
//     reducer: {
//         auth: authSlice.reducer,
//         isFirstOpen: isFirstOpenSlice.reducer,
//     },
// })
// export default store
