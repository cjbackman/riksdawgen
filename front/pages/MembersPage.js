import React from 'react';
import { MembersTable } from '../components/members/MembersTable';
import { MembersBargraph } from '../components/members/MembersBargraph';

export const MembersPage = () => (
  <div className="content-wrapper">
    <div className="half">
      <MembersTable />
    </div>
    <div className="half">
      <MembersBargraph />
    </div>
    <div className="whole">
      GRAPH #2
    </div>
  </div>
);