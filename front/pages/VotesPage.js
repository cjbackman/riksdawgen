import React from 'react';
import { VotesTable } from '../components/VotesTable';

export const VotesPage = () => (
  <div className="content-wrapper">
    <div className="oneThird">
      <VotesTable />
    </div>
    <div className="twoThirds">
      TWO THIRDS
    </div>
    <div className="quarter">
      QUARTER
    </div>
  </div>
);