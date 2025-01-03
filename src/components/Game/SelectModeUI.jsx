import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { socket } from '../../socket';
import { useAlert } from '../hooks/useAlert';
import { useDispatch, useSelector } from 'react-redux';
import { setGameId } from '../../store/managerSlice';
import { updateLogin, updateUserName } from '../../store/loginSlice';
import { setCard } from '../../store/tombalaSlice';

export const SelectModeUI = () => {
  const name = useSelector((state) => state.login.username);
  const [username, setUsername] = useState('');
  const [secret, setSecret] = useState('');
  const [step, setStep] = useState(name === '' ? 1 : 2);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const managerListener = ({ gameId }) => {
    localStorage.removeItem('auth');
    dispatch(updateLogin({ type: 'manager' }));
    dispatch(setGameId(gameId));
  };

  const joinedToGameListener = (info) => {
    dispatch(setCard(info));
    dispatch(updateLogin({ type: 'player' }));
  };

  const nameInitializedListener = (auth) => {
    dispatch(updateUserName(auth));
    localStorage.setItem('auth', JSON.stringify(auth));
    setStep(2);
  };

  const reconnectListener = (info) => {
    dispatch(setCard(info));
    dispatch(updateLogin({ type: 'player' }));
  };

  useEffect(() => {
    socket.on('manager', managerListener);
    socket.on('joined_to_game', joinedToGameListener);
    socket.on('name_initialized', nameInitializedListener);
    socket.on('reconnect', reconnectListener);

    return () => {
      socket.off('joined_to_game', joinedToGameListener);
      socket.off('name_initialized', nameInitializedListener);
      socket.off('reconnect', reconnectListener);
      socket.off('manager', managerListener);
    };
  }, []);

  // Kullanıcı adı değişimini handle et
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // 4 haneli kod değişimini handle et
  const handleCodeChange = (e) => {
    const inputCode = e.target.value;
    if (inputCode.length <= 4) {
      setCode(inputCode);
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '') {
      return; // alertbox.showError('Kullanıcı adı gereklidir!');
    }

    if (secret.trim() === '') {
      return; // alertbox.showError('Kullanıcı adı gereklidir!');
    }
    // alertbox.setAlertTxt('');
    socket.emit('login', { name: username, secret });
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code.length !== 4) {
      return; // alertbox.showError('Geçersiz kod! Lütfen 4 haneli bir kod girin.');
    }
    //alertbox.setAlertTxt('');

    socket.emit('join_game', { code });
  };

  const onStartAsManager = () => {
    socket.emit('manager');
  };

  return (
    <Container
      fluid
      className='vh-100 d-flex justify-content-center align-items-center'
    >
      <Row className='text-center'>
        <Col>
          <div
            className='mb-4'
            style={{ fontSize: '2rem', fontWeight: 'bold' }}
          >
            TOMBALA!
          </div>

          {step === 1 && (
            <>
              <Button
                variant='primary'
                className='w-100 mb-3'
                onClick={onStartAsManager}
              >
                Yönetici olarak başla
              </Button>

              {/* Kullanıcı adı formu */}
              <Form
                onSubmit={handleUsernameSubmit}
                className='border p-4 rounded shadow-sm'
              >
                <Form.Group controlId='formUsername' className='mb-3'>
                  <Form.Label>Kullanıcı Adı</Form.Label>
                  <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Kullanıcı adı girin'
                    autoFocus
                    className='border-dark'
                  />
                  <Form.Label>Parola Seç</Form.Label>
                  <Form.Control
                    type='text'
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder='Parola Seç'
                    autoFocus
                    className='border-dark'
                  />
                </Form.Group>
                <Button variant='success' type='submit' className='w-100 mt-3'>
                  Devam Et
                </Button>
              </Form>
            </>
          )}

          {step === 2 && (
            <Form
              onSubmit={handleCodeSubmit}
              className='border p-4 rounded shadow-sm'
            >
              <Form.Group controlId='formCode' className='mb-3'>
                <Form.Label>4 Haneli Kod</Form.Label>
                <Form.Control
                  type='text'
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={4}
                  placeholder='####'
                  autoFocus
                  className='border-dark'
                />
              </Form.Group>
              <Button variant='success' type='submit' className='w-100 mt-3'>
                Oyuna Katıl
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};
