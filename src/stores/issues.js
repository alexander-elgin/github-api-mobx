/* eslint prettier/prettier: 0 */

import { action, observable } from 'mobx';
import cachios from 'cachios';

const getGitHubQueryCriterion = criterion => criterion.length > 0 ? `${criterion}+` : '';
const getUsersQuery = users => getGitHubQueryCriterion(users.map(user => `involves:${user}`).join('+'));

export default class Issues {
  @observable
  error;

  @observable
  items;

  @observable
  loading;

  @observable
  totalNumber;

  constructor() {
    this.error = null;
    this.items = [];
    this.loading = false;
    this.totalNumber = 0;
  }

  @action
  setError = error => {
    this.error = error;
  };

  @action
  setItems(items) {
    this.items = items;
  }

  @action
  setLoading(loading) {
    this.loading = loading;
  }

  @action
  setTotalNumber(totalNumber) {
    this.totalNumber = totalNumber;
  }

  update = async (organization, project, itemsPerPage, page, query, users = []) => {
    this.setError(null);
    this.setLoading(true);
    this.setItems([]);
    this.setTotalNumber(0);

    try {
      const endpointBase =
        'https://api.github.com/search/issues?sort=created&order=asc';

      const { data } = await cachios.get(
        `${endpointBase}&q=${getGitHubQueryCriterion(query)}${getUsersQuery(users)}repo:${organization}/${project}&page=${page}&per_page=${itemsPerPage}`,
        {
          ttl: 300,
        },
      );

      this.setItems(data.items);
      this.setTotalNumber(data.total_count);
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  };
}
