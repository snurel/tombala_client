import React from 'react';
import '../../css/NumberCard.css';
import { styles } from '../../styles';

export const NumberBox = ({ num, small }) => {
  const boxStyle = styles.numBox(num, small);

  if (!num) {
    return <div style={boxStyle} />;
  }

  const { value, found } = num;

  if (found) {
    return (
      <div style={boxStyle}>
        <div
          className={'coin'}
          style={{
            width: small ? '47px' : '50px',
            height: small ? '36px' : '50px',
          }}
        >
          <span style={{ fontSize: small ? '20px' : '30px' }}>{value}</span>
        </div>
      </div>
    );
  }

  return <div style={boxStyle}>{value}</div>;
};
