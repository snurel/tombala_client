import React, { useEffect } from 'react';
import { TombalaCard } from '../TombalaCard/TombalaCard';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket';
import { clearCard, resetSlots, updateSlot } from '../../store/tombalaSlice';
import { updateLogin } from '../../store/loginSlice';
import Button from 'react-bootstrap/Button';

export const Game = () => {
  const { slots, color, playId } = useSelector((state) => state.tombala);
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

  const playerLeftHandler = (playerId) => {
    if (playId === playerId) {
      dispatch(updateLogin({ type: 'lobby' }));
      dispatch(clearCard());
    }
  };

  const quitGameHandler = () => {
    socket.emit('quit_game');
  };

  useEffect(() => {
    socket.on('manager_disconnected', disconnectListener);
    socket.on('take_number', takeNumberListener);
    socket.on('start_game', startListener);
    socket.on('player_left', playerLeftHandler);

    return () => {
      socket.off('manager_disconnected', disconnectListener);
      socket.off('take_number', takeNumberListener);
      socket.off('start_game', startListener);
      socket.off('player_left', playerLeftHandler);
    };
  }, []);

  return (
    <div>
      <TombalaCard color={color} slots={slots} />
      <Button
        variant='primary'
        style={{ margin: '10px' }}
        onClick={quitGameHandler}
      >
        Çıkış
      </Button>
    </div>
  );
};
