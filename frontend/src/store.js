import { configureStore } from '@reduxjs/toolkit';
import authreducer from './slice/authslice';
import { apiSlice } from './slice/apislice';

const store = configureStore({
    reducer: {
        auth: authreducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export default store