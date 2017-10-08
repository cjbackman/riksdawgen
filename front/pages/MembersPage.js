import React from 'react';
import { MembersTable } from '../components/MembersTable';

export const MembersPage = () => (
  <div className="content-wrapper">
    <div className="twoThirds">
      <MembersTable />
    </div>
    <div className="oneThird">
      ONE THIRD
    </div>
  </div>
);