import { action, observable } from 'mobx';

export default class Pagination {
  @observable
  itemsPerPage;

  @observable
  page;

  constructor() {
    this.itemsPerPage = 20;
    this.page = 1;
  }

  @action
  setItemsPerPage = itemsPerPage => {
    this.itemsPerPage = itemsPerPage;
  };

  @action
  setPage = page => {
    this.page = page;
  };
}
