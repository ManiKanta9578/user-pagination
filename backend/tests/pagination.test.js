const { paginateUsers } = require('../utils/pagination.js');

const mockUsers = [
  { name: 'Jorn', id: 0 },
  { name: 'Markus', id: 3 },
  { name: 'Andrew', id: 2 },
  { name: 'Ori', id: 4 },
  { name: 'Mike', id: 1 },
];

describe('paginateUsers utility', () => {
  test('returns correct number of results per page', () => {
    const { results } = paginateUsers(mockUsers, 1, 2, null);
    expect(results.length).toBe(2);
  });

  test('sorts by name ascending', () => {
    const { results } = paginateUsers(mockUsers, 1, 5, 'name');
    expect(results[0].name).toBe('Andrew');
  });

  test('sorts by id descending', () => {
    const { results } = paginateUsers(mockUsers, 1, 5, '-id');
    expect(results[0].id).toBe(4);
  });

  test('includes correct paging metadata', () => {
    const { paging } = paginateUsers(mockUsers, 2, 2, 'id');
    expect(paging.totalResults).toBe(5);
    expect(paging.currentPage).toBe(2);
    expect(paging.previous).toContain('page=1');
    expect(paging.next).toContain('page=3');
  });
});
