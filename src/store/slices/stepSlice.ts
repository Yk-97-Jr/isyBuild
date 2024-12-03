// stepSlice.js
import type { PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

import type {SuiviAdministrativeStepRead} from "@/services/IsyBuildApi";

type StepState = {
  steps: SuiviAdministrativeStepRead[];
  loading: boolean;
  error: string | null;
}

const initialState: StepState = {
  steps: [],  // Empty array initially
  loading: false,
  error: null,
};

const stepSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setStep: (state, action: PayloadAction<SuiviAdministrativeStepRead>) => {
      state.steps = state.steps.map((step) =>
        step.id === action.payload.id ? { ...step, ...action.payload } : step
      );
    },
  },
});

export const {setSteps, setLoading, setError, setStep} = stepSlice.actions;

export default stepSlice.reducer;
