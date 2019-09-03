require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

const Contact = require('../lib/models/Contact');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('gets all contacts', async() => {
    const contact = await Contact.create({ name: 'Lili', phoneNumber: 1234567890 });
    return request(app)
      .get('/api/v1/contacts')
      .then(res => {
        const contactJSON = JSON.parse(JSON.stringify(contact));
        expect(res.body).toEqual([contactJSON]);
      });
  });

  it('gets contact by id', async() => {
    const contact = await Contact.create({ name: 'Max', phoneNumber: 1234567890 });
    return request(app)
      .get(`/api/v1/contacts/${contact._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          name: 'Max',
          phoneNumber: 1234567890
        });
      });
  });

  it('creates contact', () => {
    return request(app)
      .post('/api/v1/contacts')
      .send({
        name: 'Max the kitty',
        phoneNumber: 6666666666
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Max the kitty',
          phoneNumber: 6666666666
        });
      });
  });
});
