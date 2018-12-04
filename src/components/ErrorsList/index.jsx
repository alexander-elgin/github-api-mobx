import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Alert from 'react-bootstrap/lib/Alert';

@inject('issues')
@observer
class ErrorsList extends React.Component {
  render() {
    const { issues } = this.props;
    const { error, setError } = issues;

    if (error === null) {
      return null;
    }

    return (
      <Alert bsStyle="danger" onDismiss={() => setError(null)}>
        <strong>Unable to load the data.</strong> Please, try again later.
      </Alert>
    );
  }
}

ErrorsList.propTypes = {
  issues: PropTypes.shape({
    error: PropTypes.any,
  }),
};

export default ErrorsList;
