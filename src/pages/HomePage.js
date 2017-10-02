import React from 'react';
import img from '../images/riksdawg.png';

export const HomePage = () => (
  <div>
    <img style={styles.img} src={img} />
  </div>
);

const styles = {
  img: {
    position: 'fixed',
    top: '30%',
    left: '50%',
    width: 500,
    height: 150,
    marginLeft: -250
  }
};

