import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  slots: [],
  color: '',
  gameId: -1,
};

const tombalaSlice = createSlice({
  name: 'tombala',
  initialState,
  reducers: {
    setCard: (state, action) => {
      state.slots = action.payload.slots;
      state.color = action.payload.color;
      state.gameId = action.payload.gameId;
    },
    clearCard: (state, action) => {
      state = initialState;
    },
    updateSlot: (state, action) => {
      const slots = [...state.slots];
      slots.forEach((sl) => {
        if (sl.value === action.payload) {
          sl.found = true;
        }
      });
      state.slots = slots;
    },
    resetSlots: (state, action) => {
      const slots = [...state.slots];
      slots.forEach((sl) => {
        sl.found = false;
      });
      state.slots = slots;
    },
  },
});

export const { setCard, clearCard, updateSlot, resetSlots } =
  tombalaSlice.actions;
export default tombalaSlice.reducer;
