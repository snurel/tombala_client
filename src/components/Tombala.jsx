import React, { useEffect } from 'react';
import { Game } from './Game/Game';
import ManageUI from './Game/ManageUI';
import { SelectModeUI } from './Game/SelectModeUI';
import { socket } from '../socket';
import { useSelector } from 'react-redux';
import { useAlert } from './hooks/useAlert';

export function Tombala() {
  const loginType = useSelector((state) => state.login.type);
  const alertbox = useAlert();

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);
      socket.emit('login', auth);
    }
  }, []);

  const gameOverListener = ({ winnerPlayers }) => {
    console.log('Game Over...');

    let winner = '';
    winnerPlayers.forEach((w) => {
      winner = winner + ' ' + w;
    });
    alertbox.showMessage('Kazanan: ' + winner);
  };

  const startGameListener = () => {
    console.log('Game Started...');
    alertbox.showMessage('Oyun Başladı...');
  };

  const takeNumberListener = ({ lucky }) => {
    console.log('New Number: ' + lucky);
    alertbox.showMessage(lucky);
  };

  const gameNotFoundListener = (message) => {
    alertbox.showError(message);
  };

  const alreadyStartedListener = (message) => {
    alertbox.showError(message);
  };

  useEffect(() => {
    socket.on('game_not_found', gameNotFoundListener);
    socket.on('start_game', startGameListener);
    socket.on('take_number', takeNumberListener);
    socket.on('game_over', gameOverListener);
    socket.on('already_started', alreadyStartedListener);

    return () => {
      socket.off('game_not_found', gameNotFoundListener);
      socket.off('start_game', startGameListener);
      socket.off('take_number', takeNumberListener);
      socket.off('game_over', gameOverListener);
      socket.off('already_started', alreadyStartedListener);
    };
  }, []);
  return (
    <div>
      {alertbox.View()}
      {loginType === 'player' && <Game />}
      {loginType === 'manager' && <ManageUI />}
      {loginType === 'lobby' && <SelectModeUI />}
    </div>
  );
}
