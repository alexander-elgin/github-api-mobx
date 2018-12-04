import { observable } from 'mobx';

export default class Repository {
  @observable
  organization;

  @observable
  project;

  constructor() {
    this.organization = 'facebook';
    this.project = 'react';
  }
}
