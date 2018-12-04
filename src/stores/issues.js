import { action, observable } from 'mobx';
import axios from 'axios';

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

  async update(organization, project) {
    this.setError(null);
    this.setLoading(true);
    this.setItems([]);
    this.setTotalNumber(0);

    try {
      const { data } = await axios.get(
        `https://api.github.com/search/issues?q=repo:${organization}/${project}&sort=created&order=asc`,
      );

      this.setItems(data.items);
      this.setTotalNumber(data.total_count);
    } catch (e) {
      this.setError(e);
    } finally {
      this.setLoading(false);
    }
  }
}
