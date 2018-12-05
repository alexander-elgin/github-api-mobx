import Criteria from './criteria';
import Issues from './issues';
import Pagination from './pagination';
import Repository from './repository';

export default {
  criteria: new Criteria(),
  issues: new Issues(),
  pagination: new Pagination(),
  repository: new Repository(),
};
