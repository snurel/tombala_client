import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import '../../css/Alert.css';

export const useAlert = () => {
  const [alertTxt, setAlertTxt] = useState('');
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState('danger');

  useEffect(() => {
    if (alertTxt !== '') {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false); // 3 saniye sonra kayarak çıkacak
        setAlertTxt(''); // Hata mesajını sıfırla
      }, 3000); // 3 saniye sonra kayarak çıkacak

      return () => clearTimeout(timer); // Temizlik yap
    }
  }, [alertTxt]);

  const View = () => {
    if (!visible) return null;

    return (
      <CSSTransition
        in={visible}
        timeout={500}
        classNames='alert-box'
        unmountOnExit
      >
        <div className='alert-box'>
          <Alert key={variant} variant={variant}>
            {alertTxt}
          </Alert>
        </div>
      </CSSTransition>
    );
  };

  const showError = (err) => {
    setVariant('danger');
    setAlertTxt(err);
  };

  const showMessage = (err) => {
    setVariant('primary');
    setAlertTxt(err);
  };

  return {
    View,
    setAlertTxt,
    alertTxt,
    showError,
    showMessage,
  };
};
