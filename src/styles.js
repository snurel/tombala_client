export const styles = {
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  numBox: (num, small) => {
    return {
      width: small ? '60px' : '72px',
      height: small ? '30px' : '52px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: small ? '20px' : '30px',
      fontWeight: 'bold',
      color: '#333',
      backgroundColor: num ? '#f9f9f9' : 'unset',
      border: num ? '1px solid #ccc' : 'unset',
      margin: '5px 0px',
      transition: 'background-color 0.2s ease',
      borderRadius: '4px',
    };
  },
}; // CSS-in-JS stiller
export const managerStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  gameId: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  code: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  players: {
    width: '100%',
    textAlign: 'left',
    marginBottom: '20px',
  },
  playerList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px', // İki oyuncu arasındaki boşluk
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
  playerItem: {
    flex: '0 1 44%', // İki kolon oluşturacak şekilde her öğe genişliği
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '10px',
    margin: '10px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  startButton: {
    background: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
