const request = require('supertest');
const app = require('../server');

describe('GET /users', () => {
  it('should return paginated users', async () => {
    const res = await request(app).get('/users?page=1&size=2');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.length).toBe(2);
    expect(res.body.paging.totalResults).toBe(5);
  });

  it('should sort users by name', async () => {
    const res = await request(app).get('/users?sort=name');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data[0].name).toBe('Andrew');
  });
});