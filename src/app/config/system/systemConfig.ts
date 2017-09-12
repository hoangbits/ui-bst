export const SYSTEM_CONFIG = Object.freeze({
  USER_TYPE: [
    {id: 0, typeName: 'AD User'},
    {id: 1, typeName: 'Non-AD User'},
  ],
  ROLE_TYPE: [
    {id: 0, typeName: 'Nomally'},
    {id: 1, typeName: 'System'},
    {id: 2, typeName: 'User'}
  ],
  USER: {
    PASSWORD_DEFAULT: '123456',
  },
});
