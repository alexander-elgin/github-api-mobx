import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import Panel from 'react-bootstrap/lib/Panel';
import 'bootstrap/dist/css/bootstrap.css';

import styles from './styles.scss';
import stores from './stores';

import ErrorsList from './components/ErrorsList';
import Header from './components/Header';
import IssuesList from './components/IssuesList';
import LoadingMask from './components/LoadingMask';

class App extends React.Component {
  componentDidMount() {
    const { organization, project } = stores.repository;
    stores.issues.update(organization, project);
  }

  render() {
    return (
      <Provider {...stores}>
        <div>
          <LoadingMask />
          <Panel>
            <Panel.Heading>
              <Header />
            </Panel.Heading>
            <Panel.Body>
              <ErrorsList />
              <div className={styles.list}>
                <IssuesList />
              </div>
            </Panel.Body>
          </Panel>
        </div>
      </Provider>
    );
  }
}

export default hot(module)(App);
