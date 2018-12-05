/* eslint prettier/prettier: 0 */

import { action, observable } from 'mobx';
import cachios from 'cachios';

export default class Criteria {
  @observable
  availableUsers;

  @observable
  loading;

  @observable
  query;

  @observable
  users;

  constructor() {
    this.availableUsers = [];
    this.loading = false;
    this.query = '';
    this.users = [];
    this.usersPerPage = 100;
  }

  @action
  setAvailableUsers = users => {
    this.availableUsers = users;
  };

  @action
  setLoading = loading => {
    this.loading = loading;
  };

  @action
  setQuery = query => {
    this.query = query;
  };

  @action
  setUsers = users => {
    this.users = users;
  };

  fetchAvailableUsers = (organization, project) => {
    this.page = 1;
    this.setLoading(true);
    this.fetchAvailableUsersPortion(organization, project);
  };

  async fetchAvailableUsersPortion(organization, project) {
    try {
      const { data } = await cachios.get(
        `https://api.github.com/repos/${organization}/${project}/contributors?anon=1&page=${this.page}&per_page=${this.usersPerPage}`,
      );

      this.setAvailableUsers(this.availableUsers.concat(data.map(user => user.login).filter(username => username !== undefined)));

      if(data.length < this.usersPerPage) {
        this.setLoading(false);
      } else {
        this.page += 1;
        this.fetchAvailableUsersPortion(organization, project);
      }
    } catch (e) {
      this.setLoading(false);
    }
  }
}
