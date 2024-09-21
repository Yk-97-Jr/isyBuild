// Define access rules directly in the TypeScript file
const accessRules = {
  routes: [
    {
      path: '/admin',
      roles: ['admin'],
    },
    {
      path: '/dashboard',
      roles: ['admin', 'user'],
    },
    {
      path: '/users/list',
      roles: ['admin'],
    },
  ],
};
