import React from 'react';
import { Sidebar } from './Sidebar.js';
import { Content } from './Content.js';

export const LayoutContent = () => (
  <div style={{display: 'flex' }}>
    <Sidebar style={{flex: '1'}} />
    <Content style={{flex: '4'}} />
  </div>
);
