//# spec/config-complex-spec.js
var Config = require('../config');

describe('Complex test suite', function() {
    it('should return complex object', function() {
        var complex = {
            'id': 0,
            'guid': 'ae98f907-f406-45d9-aea9-1f18e7ee4159',
            'isActive': true,
            'balance': '$2,377.00',
            'picture': 'http://placehold.it/32x32',
            'profile': {
                'age': 33,
                'name': 'Mindy Stein',
                'gender': 'female',
                'company': 'Billmed',
                'email': 'mindystein@billmed.com',
                'phone': '+1 (852) 501-2580',
                'address': '416 Emerson Place, Floriston, Indiana, 3816',
                'about': 'Ullamco officia ullamco amet qui incididunt exercitation elit. Ea amet in velit cillum. Nulla pariatur ad proident eiusmod amet deserunt aliqua elit occaecat commodo est amet nisi qui. Eiusmod incididunt sint in Lorem. Nisi dolor ullamco et amet quis et velit laboris voluptate mollit esse culpa nulla nostrud. Esse labore aliquip aute occaecat.\r\n',
            },
            'registered': '1998-03-24T05:20:25 -01:00',
            'latitude': 10.723086,
            'longitude': -130.570174,
            'tags': [
                'ad',
                'ex',
                'elit',
                'dolore',
                'veniam',
                'sunt',
                'nulla'
            ],
            'friends': [
                {
                    'id': 0,
                    'name': 'Sullivan Lopez'
                },
                {
                    'id': 1,
                    'name': 'Bradshaw Martin'
                },
                {
                    'id': 2,
                    'name': 'Bettye Whitehead'
                }
            ],
            'randomArrayItem': 'cherry'
        };
        var config = new Config({}, {complex: complex});
        expect(config.get('complex')).toEqual(complex);
    });
});