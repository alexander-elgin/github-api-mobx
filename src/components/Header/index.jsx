import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

@inject('repository')
@observer
class Header extends React.Component {
  render() {
    const { repository } = this.props;
    const { organization, project } = repository;

    return (
      <h1>
        {organization} / {project} Issues
      </h1>
    );
  }
}

Header.propTypes = {
  repository: PropTypes.shape({
    organization: PropTypes.string,
    project: PropTypes.string,
  }),
};

export default Header;
