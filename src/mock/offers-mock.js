const offersMock = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '28672781-c2bb-468e-9690-449ca93c5f39',
        'title': 'Upgrade to a business class',
        'price': 43
      },
      {
        'id': '31d9408e-721f-42de-a547-fe6c983cd838',
        'title': 'Choose the radio station',
        'price': 82
      },
      {
        'id': 'e508fc13-8de7-4148-84d5-8a75ac66063d',
        'title': 'Choose temperature',
        'price': 169
      },
      {
        'id': '09925a3d-466f-451c-9dcb-fcbd39c2c9d8',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 172
      },
      {
        'id': '53a4f53b-8b82-4919-be4d-0b46b112c5c9',
        'title': 'Drive slowly',
        'price': 125
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': 'a4d234ae-4414-4c6f-b08b-4a88fc728841',
        'title': 'Infotainment system',
        'price': 106
      },
      {
        'id': 'e7d6c05b-f571-4d67-94f2-2e56c9bf4073',
        'title': 'Order meal',
        'price': 166
      },
      {
        'id': 'c299045c-eb8b-48db-9c49-add0a1af4a66',
        'title': 'Choose seats',
        'price': 98
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': '8b36665d-b422-4e24-b194-4aca0c120bc1',
        'title': 'Book a taxi at the arrival point',
        'price': 46
      },
      {
        'id': '23ca5196-beb9-4648-93c3-cbf301e32ece',
        'title': 'Order a breakfast',
        'price': 180
      },
      {
        'id': '92fccfc1-c05f-4c13-a635-98970cc71d11',
        'title': 'Wake up at a certain time',
        'price': 184
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': 'f52a8d9c-700f-4ed7-ab31-f84ab2380e01',
        'title': 'Choose meal',
        'price': 114
      },
      {
        'id': 'da177bff-959b-4c8b-93e1-dfe2e68e34a8',
        'title': 'Choose seats',
        'price': 79
      },
      {
        'id': 'a8aa6796-d1a6-4a56-a559-72efa9bba46c',
        'title': 'Upgrade to comfort class',
        'price': 177
      },
      {
        'id': '1a09e291-c7c9-4d74-ae1f-bb339aca0fe6',
        'title': 'Upgrade to business class',
        'price': 192
      },
      {
        'id': 'f257fbe0-a4d7-4308-a609-0c221bdcfd5f',
        'title': 'Add luggage',
        'price': 169
      },
      {
        'id': '39f98a69-9c49-4d18-9f90-b4eb434538d5',
        'title': 'Business lounge',
        'price': 101
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': 'f94a46c3-8665-49d0-8264-eb3bbfe82728',
        'title': 'Choose the time of check-in',
        'price': 133
      },
      {
        'id': '4cde12ea-099e-4df7-a31f-935c7b8563d1',
        'title': 'Choose the time of check-out',
        'price': 117
      },
      {
        'id': '005b602f-1a9b-4864-a669-63580b3534c9',
        'title': 'Add breakfast',
        'price': 179
      },
      {
        'id': '22ca6a1c-b2a9-48a6-82c8-644d8a8448f0',
        'title': 'Laundry',
        'price': 82
      },
      {
        'id': '89d24d75-3223-47b1-a43e-38e824c67102',
        'title': 'Order a meal from the restaurant',
        'price': 187
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 'be5cfe0e-1ed5-4a8d-b8cc-8d815532b41f',
        'title': 'Choose meal',
        'price': 41
      },
      {
        'id': 'bfd8b63d-507b-4521-8c4e-80bb719fbf06',
        'title': 'Choose seats',
        'price': 60
      },
      {
        'id': '17ed62f7-e6ba-4446-8ee2-1f506e8c30bb',
        'title': 'Upgrade to comfort class',
        'price': 171
      },
      {
        'id': 'e5ca0f5e-e231-4051-a71e-fb3835c0347f',
        'title': 'Upgrade to business class',
        'price': 85
      },
      {
        'id': '2983fc51-3dc0-4c88-9be4-242c1eb7e8b4',
        'title': 'Add luggage',
        'price': 127
      },
      {
        'id': '3f424e54-2679-4ded-95e3-7206a64f15ea',
        'title': 'Business lounge',
        'price': 44
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': '28fa57d7-7e10-4245-8544-a109e1fd48af',
        'title': 'With automatic transmission',
        'price': 57
      },
      {
        'id': 'bf4829df-8c5e-463b-a728-0ffd55c0d5a4',
        'title': 'With air conditioning',
        'price': 60
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 'c066be27-22ce-493b-9790-0e426f4812a4',
        'title': 'Choose live music',
        'price': 142
      },
      {
        'id': '0e97c8a5-b430-41bc-ac76-f2fe3b0e2477',
        'title': 'Choose VIP area',
        'price': 65
      }
    ]
  }
];

export { offersMock };
