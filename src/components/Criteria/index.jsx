/* eslint prettier/prettier: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Select from 'react-select';

@inject('criteria')
@inject('issues')
@inject('pagination')
@inject('repository')
@observer
class Criteria extends React.Component {
  render() {
    const { criteria, issues, pagination, repository } = this.props;
    const { availableUsers, query, setQuery, setUsers, users } = criteria;
    const { update } = issues;
    const { itemsPerPage, setPage } = pagination;
    const { organization, project } = repository;

    const submitCriteria = (currentQuery, selectedUsers) => {
      if (this.timeoutHandler !== undefined) {
        clearTimeout(this.timeoutHandler);
      }

      const firstPage = 1;
      setPage(firstPage);

      this.timeoutHandler = setTimeout(
        () => update(organization, project, itemsPerPage, firstPage, currentQuery, selectedUsers),
        1500,
      );
    };

    const submitQuery = e => {
      const { value: currentQuery } = e.target;
      setQuery(currentQuery);
      submitCriteria(currentQuery, users);
    };

    const submitUsers = selectedUsers => {
      const selectedUserNames = selectedUsers.map(userData => userData.value);
      setUsers(selectedUserNames);
      submitCriteria(query, selectedUserNames);
    };

    return (
      <Grid>
        <Row>
          <Col xs={12} md={4}>
            <form>
              <FormGroup>
                <InputGroup>
                  <InputGroup.Addon>
                    <Glyphicon glyph="search" />
                  </InputGroup.Addon>
                  <FormControl type="text" onChange={submitQuery} value={query} style={{height: '38px'}} />
                </InputGroup>
              </FormGroup>
            </form>
          </Col>
          <Col xs={12} md={8}>
            <Select
              isMulti
              isSearchable
              isDisabled={availableUsers.length < 2}
              placeholder="Select contributors"
              onChange={submitUsers}
              options={availableUsers.sort().map(user => ({label: user, value: user}))} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

Criteria.propTypes = {
  criteria: PropTypes.shape({
    availableUsers: PropTypes.array,
    query: PropTypes.string,
    setQuery: PropTypes.func,
    setUsers: PropTypes.func,
    users: PropTypes.array,
  }),
  issues: PropTypes.shape({
    update: PropTypes.func,
  }),
  pagination: PropTypes.shape({
    itemsPerPage: PropTypes.number,
    setPage: PropTypes.func,
  }),
  repository: PropTypes.shape({
    organization: PropTypes.string,
    project: PropTypes.string,
  }),
};

export default Criteria;
