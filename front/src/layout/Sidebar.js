import React from 'react';
import PropTypes from 'prop-types';
import FaBank from 'react-icons/lib/fa/bank';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAlien from 'react-icons/lib/fa/reddit-alien';
import { SidebarMembers } from './SidebarMembers.js';
import { SidebarParties } from './SidebarParties.js';

export class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      partiesOpened: false,
      membersOpened: false,
      showParties: false,
      showMembers: false
    };
    this.toggleMembers = this.toggleMembers.bind(this);
    this.toggleParties = this.toggleParties.bind(this);
  }

  componentDidMount () {
    this.updateSidebar();
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.updateSidebar();
    }
  }

  updateSidebar() {
    const { show, path } = this.props;
    const showSidebar = show && path !== '/home';
    const showParties = path === '/members';
    const showMembers = path === '/votes';
    this.setState({ showSidebar, showParties, showMembers });
  }

  toggleMembers() {
    this.setState({ membersOpened: !this.state.membersOpened });
  }

  toggleParties() {
    this.setState({ partiesOpened: !this.state.partiesOpened });
  }

  render() {
    return (
      this.state.showSidebar ?
        <div className="sidebar">
          <div className="box">
            <ul className="sidebar-list">
              <li className="sidebar-header">
                INSTÄLLNINGAR
              </li>

              { this.state.showParties ?
              <li>
                <div className="sidebar-item">
                  <FaBank />
                  <span>Parti</span>
                  <FaAngleDown onClick={this.toggleParties} />
                </div>
                <SidebarParties show={this.state.partiesOpened} />
              </li> : null }

              { this.state.showMembers ?
              <li>
                <div className="sidebar-item">
                  <FaAlien />
                  <span>Ledamot</span>
                  <FaAngleDown onClick={this.toggleMembers} />
                </div>
                <SidebarMembers show={this.state.membersOpened} />
              </li> : null }

            </ul>
          </div>
        </div>
        : null
    );
  }
}

Sidebar.propTypes = {
  path: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
}
