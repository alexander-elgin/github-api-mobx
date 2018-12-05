import Issues from './issues';
import Pagination from './pagination';
import Repository from './repository';

export default {
  issues: new Issues(),
  pagination: new Pagination(),
  repository: new Repository(),
};
