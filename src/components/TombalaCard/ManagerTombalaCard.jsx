import React from 'react';
import { NumberBox } from '../NumberCard/NumberBox';
import { styles } from '../../styles';

export const ManagerTombalaCard = ({ slots, color }) => {
  const chunkList = (list, chunkSize) => {
    const result = [];
    for (let i = 0; i < list.length; i += chunkSize) {
      result.push(list.slice(i, i + chunkSize));
    }
    return result;
  };

  const nums = chunkList(slots, 3);

  return (
    <div style={styles.cardContainer}>
      <div
        style={{
          backgroundColor: color,
          padding: '1rem 2rem',
          minWidth: '60%',
        }}
      >
        {nums.map((row, rowIndex) => (
          <div
            className='row'
            style={{ justifyContent: 'center' }}
            key={rowIndex}
          >
            {row.map((num, colIndex) => (
              <React.Fragment key={`num_${colIndex}`}>
                {rowIndex % 2 === 1 && <NumberBox small={true} />}
                <NumberBox num={num} small={true} />
                {rowIndex % 2 === 0 && <NumberBox small={true} />}
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
