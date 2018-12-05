/* eslint prettier/prettier: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Grid, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';

@inject('criteria')
@inject('issues')
@inject('pagination')
@inject('repository')
@observer
class Pagination extends React.Component {
  render() {
    const { criteria, issues, pagination, repository } = this.props;
    const { query, users } = criteria;
    const { totalNumber, update } = issues;
    const { itemsPerPage, page, setItemsPerPage, setPage } = pagination;
    const { organization, project } = repository;

    const turnOverPage = increment => {
      const currentPage = page + increment;
      setPage(currentPage);
      update(organization, project, itemsPerPage, currentPage, query, users);
    };

    const changeItemsPerPage = itemsNumber => {
      const firstPage = 1;
      setPage(firstPage);
      setItemsPerPage(itemsNumber);
      update(organization, project, itemsNumber, firstPage, query, users);
    };

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={6}>
            <ButtonGroup>
              <Button disabled={page <= 1} onClick={() => turnOverPage(-1)}>
                &larr; Previous
              </Button>
              <Button disabled bsStyle="link">
                {(page - 1) * itemsPerPage + 1} -{' '}
                {Math.min(page * itemsPerPage, totalNumber)} of {totalNumber}
              </Button>
              <Button disabled={page * itemsPerPage >= totalNumber} onClick={() => turnOverPage(1)}>
                Next &rarr;
              </Button>
            </ButtonGroup>
          </Col>
          <Col xs={12} md={6}>
            <div className="pull-right">
              <DropdownButton dropup id="itemsPerPage" title="Items per Page">
                {[10, 20, 50].map(itemsNumber => (
                  <MenuItem
                    active={itemsPerPage === itemsNumber}
                    eventKey={itemsNumber}
                    key={itemsNumber}
                    onSelect={changeItemsPerPage}>
                    {itemsNumber}
                  </MenuItem>
                ))}
              </DropdownButton>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Pagination.propTypes = {
  criteria: PropTypes.shape({
    query: PropTypes.string,
    users: PropTypes.array,
  }),
  issues: PropTypes.shape({
    totalNumber: PropTypes.number,
    update: PropTypes.func,
  }),
  pagination: PropTypes.shape({
    itemsPerPage: PropTypes.number,
    page: PropTypes.number,
    setItemsPerPage: PropTypes.func,
    setPage: PropTypes.func,
  }),
  repository: PropTypes.shape({
    organization: PropTypes.string,
    project: PropTypes.string,
  }),
};

export default Pagination;
