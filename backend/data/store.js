// In-memory store (replace with database in production)
const store = {
  projects: new Map(),
  orders: new Map(),
};

module.exports = store;
