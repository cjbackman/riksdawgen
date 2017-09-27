import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

const styles = {
  div: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    backgroundColor: 'pink',
    color:'green',
    fontSize: 80,
    margin: '0 auto',
    textAlign: 'center'
  },
  p: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    marginLeft: '-111px'
  }
};

ReactDOM.render(
  <BrowserRouter>
    <div style={styles.div}>
      <p style={styles.p}>WOFF</p>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);