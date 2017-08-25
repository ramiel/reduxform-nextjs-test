
export default class ApiClient {
  users = {
    list: () => Promise.resolve([
      {
        updatedAt: '2017-08-24T10:06:21.371Z',
        createdAt: '2017-08-24T10:06:21.371Z',
        username: 'ciccio@mail.com',
        flags: [],
        lastSeen: '2017-08-24T10:06:21.354Z',
        image: null,
        defaultNickname: null,
        name: {
          last: 'Lure',
          first: 'Ciccio',
        },
        type: 'unregistered',
        id: '112233',
      },
    ]),
    get: () => Promise.resolve({
      updatedAt: '2017-08-24T10:06:21.371Z',
      createdAt: '2017-08-24T10:06:21.371Z',
      username: 'ciccio@mail.com',
      flags: [],
      lastSeen: '2017-08-24T10:06:21.354Z',
      image: null,
      defaultNickname: null,
      name: {
        last: 'Lure',
        first: 'Ciccio',
      },
      type: 'unregistered',
      id: '112233',
    }),
    create: () => Promise.reject(),
    update: () => Promise.reject(),
    upsert: () => Promise.reject(),
    search: () => Promise.reject(),
  }
}
