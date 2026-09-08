const pointsMock = [
  {
    'id': 'ab20c40d-ce82-40d2-8aca-1f6221576384',
    'basePrice': 2207,
    'dateFrom': '2026-07-12T02:14:04.366Z',
    'dateTo': '2026-08-13T01:39:04.366Z',
    'destination': '116993e2-3c31-439b-a43b-3b028eb9dc0b',
    'isFavorite': false,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '7cf6b5be-3d6a-4385-9626-3793603c80f4',
    'basePrice': 4067,
    'dateFrom': '2026-10-14T21:37:04.366Z',
    'dateTo': '2026-10-15T13:45:04.366Z',
    'destination': '983c7b53-911b-4233-af84-ee0daa1552a7',
    'isFavorite': false,
    'offers': [
      'c299045c-eb8b-48db-9c49-add0a1af4a66'
    ],
    'type': 'bus'
  },
  {
    'id': '4e8ae572-ce38-4b73-a7ac-0fe375161cb9',
    'basePrice': 9611,
    'dateFrom': '2026-10-16T09:50:04.366Z',
    'dateTo': '2026-10-18T04:40:04.366Z',
    'destination': 'c539c201-fc76-4f2b-877a-ee44a78654a6',
    'isFavorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'a6f81174-2756-4dc8-8ac9-d3bef76f9cef',
    'basePrice': 7748,
    'dateFrom': '2026-10-18T23:09:04.366Z',
    'dateTo': '2026-10-19T23:48:04.366Z',
    'destination': '49ec3028-73ef-4d8e-87ef-f9a383fcf9f1',
    'isFavorite': true,
    'offers': [
      '005b602f-1a9b-4864-a669-63580b3534c9',
      '22ca6a1c-b2a9-48a6-82c8-644d8a8448f0',
      '89d24d75-3223-47b1-a43e-38e824c67102'
    ],
    'type': 'check-in'
  },
  {
    'id': 'e1e47956-cc48-44e4-ad77-dbfb0ea2e794',
    'basePrice': 606,
    'dateFrom': '2026-10-20T11:20:04.366Z',
    'dateTo': '2026-10-22T02:04:04.366Z',
    'destination': '49ec3028-73ef-4d8e-87ef-f9a383fcf9f1',
    'isFavorite': false,
    'offers': [
      'f94a46c3-8665-49d0-8264-eb3bbfe82728',
      '4cde12ea-099e-4df7-a31f-935c7b8563d1',
      '005b602f-1a9b-4864-a669-63580b3534c9',
      '22ca6a1c-b2a9-48a6-82c8-644d8a8448f0',
      '89d24d75-3223-47b1-a43e-38e824c67102'
    ],
    'type': 'check-in'
  },
  {
    'id': 'adb02ab2-7522-4566-b455-ff2f27eeab25',
    'basePrice': 6054,
    'dateFrom': '2026-10-22T16:18:04.366Z',
    'dateTo': '2026-10-22T23:13:04.366Z',
    'destination': '51324356-7298-4117-81fe-e03e5a5c659b',
    'isFavorite': true,
    'offers': [
      'bfd8b63d-507b-4521-8c4e-80bb719fbf06',
      '17ed62f7-e6ba-4446-8ee2-1f506e8c30bb',
      'e5ca0f5e-e231-4051-a71e-fb3835c0347f',
      '2983fc51-3dc0-4c88-9be4-242c1eb7e8b4',
      '3f424e54-2679-4ded-95e3-7206a64f15ea'
    ],
    'type': 'ship'
  },
  {
    'id': '3e35dc35-82b4-467e-bd21-d50ed6511a3e',
    'basePrice': 3889,
    'dateFrom': '2026-10-23T12:20:04.366Z',
    'dateTo': '2026-10-24T06:14:04.366Z',
    'destination': 'c539c201-fc76-4f2b-877a-ee44a78654a6',
    'isFavorite': false,
    'offers': [
      '28fa57d7-7e10-4245-8544-a109e1fd48af',
      'bf4829df-8c5e-463b-a728-0ffd55c0d5a4'
    ],
    'type': 'drive'
  },
  {
    'id': 'fdc5c127-3f00-48ea-9550-4b56cbe9cb39',
    'basePrice': 5519,
    'dateFrom': '2026-09-03T10:15:04.366Z',
    'dateTo': '2026-10-26T05:44:04.366Z',
    'destination': 'c539c201-fc76-4f2b-877a-ee44a78654a6',
    'isFavorite': false,
    'offers': [
      'c066be27-22ce-493b-9790-0e426f4812a4',
      '0e97c8a5-b430-41bc-ac76-f2fe3b0e2477'
    ],
    'type': 'restaurant'
  },
  {
    'id': '8be1fb29-5ba4-4a17-a4ce-31e4c30e218a',
    'basePrice': 9732,
    'dateFrom': '2026-10-27T03:29:04.366Z',
    'dateTo': '2026-10-28T08:48:04.366Z',
    'destination': '983c7b53-911b-4233-af84-ee0daa1552a7',
    'isFavorite': true,
    'offers': [
      'a4d234ae-4414-4c6f-b08b-4a88fc728841',
      'e7d6c05b-f571-4d67-94f2-2e56c9bf4073',
      'c299045c-eb8b-48db-9c49-add0a1af4a66'
    ],
    'type': 'bus'
  },
  {
    'id': '557f0b24-36e7-4b42-80b8-ee540adcb7ba',
    'basePrice': 3100,
    'dateFrom': '2026-10-29T08:02:04.366Z',
    'dateTo': '2026-10-30T14:41:04.366Z',
    'destination': 'c539c201-fc76-4f2b-877a-ee44a78654a6',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '5de9e3e6-9d02-457a-8927-e3e22cd1f791',
    'basePrice': 9065,
    'dateFrom': '2026-10-31T14:13:04.366Z',
    'dateTo': '2026-11-02T05:32:04.366Z',
    'destination': '51324356-7298-4117-81fe-e03e5a5c659b',
    'isFavorite': true,
    'offers': [
      '0e97c8a5-b430-41bc-ac76-f2fe3b0e2477'
    ],
    'type': 'restaurant'
  },
  {
    'id': '77220443-3741-49f1-9c5e-96ce0f1ed7a9',
    'basePrice': 1121,
    'dateFrom': '2026-11-04T00:21:04.366Z',
    'dateTo': '2026-11-06T00:26:04.366Z',
    'destination': 'cfd8d38c-7c15-482d-bf03-07e2434372db',
    'isFavorite': false,
    'offers': [
      'e7d6c05b-f571-4d67-94f2-2e56c9bf4073',
      'c299045c-eb8b-48db-9c49-add0a1af4a66'
    ],
    'type': 'bus'
  },
  {
    'id': 'eb7c3914-bf6e-42a7-af7e-eb32cf618fd7',
    'basePrice': 9242,
    'dateFrom': '2026-11-07T19:19:04.366Z',
    'dateTo': '2026-11-09T06:50:04.366Z',
    'destination': '51324356-7298-4117-81fe-e03e5a5c659b',
    'isFavorite': true,
    'offers': [
      'bf4829df-8c5e-463b-a728-0ffd55c0d5a4'
    ],
    'type': 'drive'
  },
  {
    'id': 'e0d30793-a49d-448d-9974-c9d1c9801d4b',
    'basePrice': 6875,
    'dateFrom': '2026-11-10T12:23:04.366Z',
    'dateTo': '2026-11-11T12:26:04.366Z',
    'destination': '8c34af02-7d68-4e18-9b44-10c7bf8c87e1',
    'isFavorite': true,
    'offers': [
      'bf4829df-8c5e-463b-a728-0ffd55c0d5a4'
    ],
    'type': 'drive'
  },
  {
    'id': 'd6585aaf-f1c5-4367-b5c4-f3872b94be42',
    'basePrice': 5828,
    'dateFrom': '2026-11-13T10:51:04.366Z',
    'dateTo': '2026-11-15T00:55:04.366Z',
    'destination': '983c7b53-911b-4233-af84-ee0daa1552a7',
    'isFavorite': true,
    'offers': [
      'be5cfe0e-1ed5-4a8d-b8cc-8d815532b41f',
      'bfd8b63d-507b-4521-8c4e-80bb719fbf06',
      '17ed62f7-e6ba-4446-8ee2-1f506e8c30bb',
      'e5ca0f5e-e231-4051-a71e-fb3835c0347f',
      '2983fc51-3dc0-4c88-9be4-242c1eb7e8b4',
      '3f424e54-2679-4ded-95e3-7206a64f15ea'
    ],
    'type': 'ship'
  },
  {
    'id': 'cd541a8d-f10a-4f8b-9078-75b2fb3b9c99',
    'basePrice': 3889,
    'dateFrom': '2026-11-15T12:41:04.366Z',
    'dateTo': '2026-11-15T23:53:04.366Z',
    'destination': '082e2021-c759-43c0-a83f-995d2477cabf',
    'isFavorite': true,
    'offers': [
      '3f424e54-2679-4ded-95e3-7206a64f15ea'
    ],
    'type': 'ship'
  },
  {
    'id': 'a0674c27-d587-42aa-97c3-24b83bdfee04',
    'basePrice': 4309,
    'dateFrom': '2026-11-18T00:08:04.366Z',
    'dateTo': '2026-11-18T19:51:04.366Z',
    'destination': 'ecdafbe5-9b21-41ae-b80a-bd63f4aaa24d',
    'isFavorite': true,
    'offers': [
      'bf4829df-8c5e-463b-a728-0ffd55c0d5a4'
    ],
    'type': 'drive'
  },
  {
    'id': 'd72aaab7-dc84-4150-886c-bb5b3e218ba8',
    'basePrice': 1708,
    'dateFrom': '2026-11-20T05:08:04.366Z',
    'dateTo': '2026-11-21T01:41:04.366Z',
    'destination': '51324356-7298-4117-81fe-e03e5a5c659b',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': 'e3b358da-a264-4319-ae26-031e0e4cb6ee',
    'basePrice': 613,
    'dateFrom': '2026-11-22T04:48:04.366Z',
    'dateTo': '2026-11-23T19:54:04.366Z',
    'destination': 'ecdafbe5-9b21-41ae-b80a-bd63f4aaa24d',
    'isFavorite': true,
    'offers': [
      'c066be27-22ce-493b-9790-0e426f4812a4',
      '0e97c8a5-b430-41bc-ac76-f2fe3b0e2477'
    ],
    'type': 'restaurant'
  },
  {
    'id': '2bcfa523-6abd-4566-909f-4820f27fadce',
    'basePrice': 1635,
    'dateFrom': '2026-11-24T23:25:04.366Z',
    'dateTo': '2026-11-26T21:07:04.366Z',
    'destination': '116993e2-3c31-439b-a43b-3b028eb9dc0b',
    'isFavorite': true,
    'offers': [
      '39f98a69-9c49-4d18-9f90-b4eb434538d5'
    ],
    'type': 'flight'
  },
  {
    'id': '5f6f4bed-4924-4a61-8661-c49e26c31c78',
    'basePrice': 8176,
    'dateFrom': '2026-11-28T03:58:04.366Z',
    'dateTo': '2026-11-28T13:33:04.366Z',
    'destination': '116993e2-3c31-439b-a43b-3b028eb9dc0b',
    'isFavorite': false,
    'offers': [
      'a4d234ae-4414-4c6f-b08b-4a88fc728841',
      'e7d6c05b-f571-4d67-94f2-2e56c9bf4073',
      'c299045c-eb8b-48db-9c49-add0a1af4a66'
    ],
    'type': 'bus'
  },
  {
    'id': '7831eace-fd3c-4082-967c-36c321d73518',
    'basePrice': 6491,
    'dateFrom': '2026-11-29T12:56:04.366Z',
    'dateTo': '2026-11-30T23:21:04.366Z',
    'destination': '983c7b53-911b-4233-af84-ee0daa1552a7',
    'isFavorite': false,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': '23284f52-7872-4ffa-a19d-0fa83fd2f969',
    'basePrice': 4702,
    'dateFrom': '2026-12-01T21:10:04.366Z',
    'dateTo': '2026-12-03T05:49:04.366Z',
    'destination': 'c539c201-fc76-4f2b-877a-ee44a78654a6',
    'isFavorite': false,
    'offers': [
      '8b36665d-b422-4e24-b194-4aca0c120bc1',
      '23ca5196-beb9-4648-93c3-cbf301e32ece',
      '92fccfc1-c05f-4c13-a635-98970cc71d11'
    ],
    'type': 'train'
  },
  {
    'id': '5eb56859-17dd-4167-a74a-79c9413a4eb2',
    'basePrice': 1125,
    'dateFrom': '2026-12-03T17:19:04.366Z',
    'dateTo': '2026-12-05T00:54:04.366Z',
    'destination': 'c539c201-fc76-4f2b-877a-ee44a78654a6',
    'isFavorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': '24decf93-338a-49b1-a990-a2c7a7ae6ec9',
    'basePrice': 2270,
    'dateFrom': '2026-12-06T12:42:04.366Z',
    'dateTo': '2026-12-08T06:29:04.366Z',
    'destination': 'c539c201-fc76-4f2b-877a-ee44a78654a6',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  }
];

export { pointsMock };
