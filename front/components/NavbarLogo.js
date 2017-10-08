import React from 'react';
import img from '../images/riksdawg.png';

export const NavbarLogo = () => (
  <div style={styles.container}>
    <img style={styles.img} src={img} />
  </div>
);

const styles = {
  container: {
    textAlign: 'right',
    marginRight: '3rem'
  },
  img: {
    height: '2rem',
    width: '8rem'
  }
};
