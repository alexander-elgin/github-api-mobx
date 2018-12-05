import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Table } from 'react-bootstrap';

@inject('issues')
@observer
class List extends React.Component {
  render() {
    const { issues } = this.props;
    const { items } = issues;

    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>Issue</th>
            <th>State</th>
            <th>Reporter</th>
          </tr>
        </thead>
        <tbody>
          {items.map(issue => (
            <tr key={issue.id}>
              <td>
                <a href={issue.html_url}>{issue.title}</a>
              </td>
              <td>{issue.state}</td>
              <td>
                <a href={issue.user.html_url}>{issue.user.login}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

List.propTypes = {
  issues: PropTypes.shape({
    items: PropTypes.array,
  }),
};

export default List;
