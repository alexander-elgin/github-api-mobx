import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import Panel from 'react-bootstrap/lib/Panel';
import 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.scss';
import stores from './stores';

import ErrorsList from './components/ErrorsList';
import Criteria from './components/Criteria';
import Header from './components/Header';
import IssuesList from './components/IssuesList';
import LoadingMask from './components/LoadingMask';
import Pagination from './components/Pagination';

class App extends React.Component {
  componentDidMount() {
    const { fetchAvailableUsers, query } = stores.criteria;
    const { itemsPerPage, page } = stores.pagination;
    const { organization, project } = stores.repository;

    fetchAvailableUsers(organization, project);
    stores.issues.update(organization, project, itemsPerPage, page, query);
  }

  render() {
    return (
      <Provider {...stores}>
        <div>
          <LoadingMask />
          <Header />
          <Panel>
            <Panel.Heading>
              <Criteria />
            </Panel.Heading>
            <Panel.Body>
              <ErrorsList />
              <div className={styles.list}>
                <IssuesList />
              </div>
            </Panel.Body>
            <Panel.Footer>
              <Pagination />
            </Panel.Footer>
          </Panel>
        </div>
      </Provider>
    );
  }
}

export default hot(module)(App);
