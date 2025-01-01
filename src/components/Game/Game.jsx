import React, { useEffect } from 'react';
import { TombalaCard } from '../TombalaCard/TombalaCard';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket';
import { clearCard, resetSlots, updateSlot } from '../../store/tombalaSlice';
import { updateLogin } from '../../store/loginSlice';

export const Game = () => {
  const { slots, color } = useSelector((state) => state.tombala);
  const dispatch = useDispatch();

  const startListener = () => {
    dispatch(resetSlots());
  };

  const takeNumberListener = ({ lucky }) => {
    dispatch(updateSlot(lucky));
  };

  const disconnectListener = () => {
    dispatch(updateLogin({ type: 'lobby' }));
    dispatch(clearCard());
  };

  useEffect(() => {
    socket.on('manager_disconnected', disconnectListener);
    socket.on('take_number', takeNumberListener);
    socket.on('start_game', startListener);

    return () => {
      socket.off('manager_disconnected', disconnectListener);
      socket.off('take_number', takeNumberListener);
      socket.off('start_game', startListener);
    };
  }, []);

  return <TombalaCard color={color} slots={slots} />;
};
