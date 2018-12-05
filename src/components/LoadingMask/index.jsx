import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { ScaleLoader } from 'react-spinners';

import styles from './styles.scss';

@inject('criteria')
@inject('issues')
@observer
class LoadingMask extends React.Component {
  render() {
    const { criteria, issues } = this.props;
    const { loading: criteriaLoading } = criteria;
    const { loading: issuesLoading } = issues;

    if (!criteriaLoading && !issuesLoading) {
      return null;
    }

    return (
      <div className={styles.mask}>
        <div className={styles['spinner-block']}>
          <ScaleLoader className={styles.spinner} color="#337ab7" />
        </div>
      </div>
    );
  }
}

LoadingMask.propTypes = {
  criteria: PropTypes.shape({
    loading: PropTypes.bool,
  }),
  issues: PropTypes.shape({
    loading: PropTypes.bool,
  }),
};

export default LoadingMask;
