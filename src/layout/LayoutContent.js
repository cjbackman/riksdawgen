import React from 'react';
import { Sidebar } from './Sidebar.js';
import { Content } from './Content.js';

export const LayoutContent = () => (
  <div style={{display: 'flex', marginTop: '4rem'}}>
    <Sidebar style={{flex: '1'}} />
    <Content style={{flex: '3'}} />
  </div>
);
