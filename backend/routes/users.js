const express = require('express');
const router = express.Router();
const { paginateUsers } = require('../utils/pagination');

const users = [
  { name: 'Jorn', id: 0 },
  { name: 'Markus', id: 3 },
  { name: 'Andrew', id: 2 },
  { name: 'Ori', id: 4 },
  { name: 'Mike', id: 1 },
];

router.get('/', (req, res) => {
  try {
    const { page = 1, size = 2, sort } = req.query;

    console.log(`[GET /users] Page: ${page}, Size: ${size}, Sort: ${sort || 'none'}`);

    const { results, paging } = paginateUsers(users, page, size, sort, req.baseUrl);
    res.status(200).json({ data: results, paging });
  } catch (error) {
    console.error('Error in GET /users:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;