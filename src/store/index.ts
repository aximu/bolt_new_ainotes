import { configureStore } from '@reduxjs/toolkit';
import recordingReducer from './recordingSlice';
import transcriptReducer from './transcriptSlice';

export const store = configureStore({
  reducer: {
    recording: recordingReducer,
    transcript: transcriptReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;