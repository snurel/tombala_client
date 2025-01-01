import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameId: -1,
  players: [],
};

const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    updatePlayers: (state, action) => {
      state.players = [...state.players, action.payload];
    },
    removePlayer: (state, action) => {
      const players = [...state.players];
      state.players = players.filter((p) => p.id !== action.payload);
    },
    updatePlayerSlots: (state, action) => {
      const players = [...state.players];
      players.forEach((pl) => {
        const slots = [...pl.info.slots];

        slots.forEach((sl) => {
          if (sl.value === action.payload) {
            sl.found = true;
          }
        });

        pl.info.slots = slots;
      });
      state.players = players;
    },
    resetPlayerSlots: (state, action) => {
      const players = [...state.players];
      players.forEach((pl) => {
        const slots = [...pl.info.slots];

        slots.forEach((sl) => {
          sl.found = false;
        });

        pl.info.slots = slots;
      });
      state.players = players;
    },
  },
});

export const {
  setGameId,
  updatePlayers,
  removePlayer,
  updatePlayerSlots,
  resetPlayerSlots,
} = managerSlice.actions;
export default managerSlice.reducer;
