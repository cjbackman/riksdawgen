import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class _PartyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div className="content-wrapper">
        <div className="one-third">
          {this.props.party}
        </div>
      </div>
    )
  }
}

_PartyPage.propTypes = {
  party: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  party: ownProps.match.params.id,
})

export const PartyPage =  connect(mapStateToProps)(_PartyPage)