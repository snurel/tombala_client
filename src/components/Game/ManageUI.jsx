import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removePlayer,
  resetPlayerSlots,
  updatePlayers,
  updatePlayerSlots,
} from '../../store/managerSlice';
import { socket } from '../../socket';
import { ManagerTombalaCard } from '../TombalaCard/ManagerTombalaCard';
import { managerStyles } from '../../styles';
import Button from 'react-bootstrap/Button';
// import { startGame } from '../redux/gameSlice'; // Redux action örneği

export const ManageUI = () => {
  const dispatch = useDispatch();
  const [started, setStarted] = useState(false);
  const { gameId, players } = useSelector((state) => state.manager);

  const newPlayerJoinedListener = (player) => {
    dispatch(updatePlayers(player));
  };

  const playerLeftListener = (playerId) => {
    dispatch(removePlayer(playerId));
  };

  const startGameListener = () => {
    setStarted(true);
    dispatch(resetPlayerSlots());
  };

  const gameOverListener = () => {
    setStarted(false);
  };

  const takeNumberListener = ({ lucky }) => {
    dispatch(updatePlayerSlots(lucky));
  };

  useEffect(() => {
    socket.on('new_player_joined', newPlayerJoinedListener);
    socket.on('player_left', playerLeftListener);
    socket.on('start_game', startGameListener);
    socket.on('game_over', gameOverListener);
    socket.on('take_number', takeNumberListener);

    return () => {
      socket.off('new_player_joined', newPlayerJoinedListener);
      socket.off('player_left', playerLeftListener);
      socket.off('start_game', startGameListener);
      socket.off('game_over', gameOverListener);
      socket.off('take_number', takeNumberListener);
    };
  }, []);

  const handleStartGame = () => {
    socket.emit('start_game');
  };

  const handleSelectNumber = () => {
    socket.emit('take_number');
  };

  return (
    <div style={managerStyles.container}>
      <h1 style={managerStyles.heading}>Yönetici Ekranı</h1>
      <div style={managerStyles.gameId}>
        Oyun Kodu: <span style={managerStyles.code}>{'' + gameId}</span>
      </div>
      <div style={managerStyles.players}>
        <h2>Oyuncular:</h2>
        {players.length > 0 ? (
          <ul style={managerStyles.playerList}>
            {players.map((player, index) => (
              <li key={index} style={managerStyles.playerItem}>
                <div>
                  {player.name}
                  <ManagerTombalaCard
                    slots={player.info.slots}
                    color={player.info.color}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Henüz oyuncu katılmadı.</p>
        )}
      </div>
      {!started && (
        <Button variant='success' onClick={handleStartGame}>
          Oyunu Başlat
        </Button>
      )}

      {started && (
        <Button variant='primary' onClick={handleSelectNumber}>
          Sayı Çek
        </Button>
      )}
    </div>
  );
};

export default ManageUI;
