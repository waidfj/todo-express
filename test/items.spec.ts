import app from '../src/app';
import request from 'supertest';

describe('/items', () => {
  let req: any, id: string;

  beforeEach(async () => {
    req = { name: 'brush teeth', description: 'bla blabla' };

    const res = await request(app).post('/items').send(req);
    id = res.body.id;
  });

  describe('POST /items', () => {
    it('should return a response with 201', async () => {
      const response = await request(app).post('/items').send(req);
      const now = new Date();

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        ...req,
        id: expect.any(Number),
        created_at: expect.any(String),
      });
      expect(response.body.created_at.slice(0, 19)).toEqual(now.toISOString().slice(0, 19));
    });

    it('should fail in validating the name and return a status of 400', async () => {
      req.name = null;
      const response = await request(app).post('/items').send(req);

      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors).toEqual(
        expect.arrayContaining(['name must be a string', 'name should not be empty']),
      );
    });

    it('should fail in validating the description and return a status of 400', async () => {
      req.description = null;
      const response = await request(app).post('/items').send(req);

      expect(response.status).toBe(400);
      expect(response.body.errors).toEqual(
        expect.arrayContaining(['description must be a string', 'description should not be empty']),
      );
    });
  });

  describe('GET /items', () => {
    it('should return a response with 200', async () => {
      const response = await request(app).get('/items');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /items/:id', () => {
    it('should return a response with 200', async () => {
      const response = await request(app).get(`/items/${id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...req, id, created_at: expect.any(String) });
    });

    it('should fail validating the id and return a status of 400', async () => {
      const response = await request(app).get('/items/id');

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors).toEqual(
        expect.arrayContaining(['id must not be less than 1', 'id must be an integer number']),
      );
    });

    it('should fail validating the value of the id and return a status of 400', async () => {
      const response = await request(app).get('/items/0');

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors).toEqual(expect.arrayContaining(['id must not be less than 1']));
    });

    it('should fail to find the item and return a status of 401', async () => {
      const response = await request(app).get('/items/999999999');

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /items/:id', () => {
    it('should return a response with 200', async () => {
      const req = { name: 'walk the dog', description: 'take spike to the new park' };
      const response = await request(app).put(`/items/${id}`).send(req);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ ...req, id, created_at: expect.any(String) });

      const storedItem = await request(app).get(`/items/${id}`);
      expect(storedItem.status).toBe(200);
      expect(storedItem.body).toEqual({ ...req, id, created_at: expect.any(String) });
    });

    it('should fail in validating the name and return a status of 400', async () => {
      const response = await request(app)
        .put(`/items/${id}`)
        .send({ description: 'take spike to the new park' });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors).toEqual(
        expect.arrayContaining(['name must be a string', 'name should not be empty']),
      );
    });

    it('should fail in validating the descripion and return a status of 400', async () => {
      const response = await request(app).put(`/items/${id}`).send({ name: 'walk the dog' });

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors).toEqual(
        expect.arrayContaining(['description must be a string', 'description should not be empty']),
      );
    });

    it('should fail validating the id and return a status of 400', async () => {
      const response = await request(app).put(`/items/id`).send(req);

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors).toEqual(
        expect.arrayContaining(['id must not be less than 1', 'id must be an integer number']),
      );
    });

    it('should fail validating the value of the id and return a status of 400', async () => {
      const response = await request(app).put('/items/0').send(req);

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors).toEqual(expect.arrayContaining(['id must not be less than 1']));
    });

    it('should fail to find the item and return a status of 401', async () => {
      const response = await request(app).put('/items/999999999').send(req);

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /items/:id', () => {
    it('should return a response with 204', async () => {
      const response = await request(app).delete(`/items/${id}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it('should fail validating the id and return a status of 400', async () => {
      const response = await request(app).delete(`/items/id`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors).toEqual(
        expect.arrayContaining(['id must not be less than 1', 'id must be an integer number']),
      );
    });

    it('should fail validating the value of the id and return a status of 400', async () => {
      const response = await request(app).delete(`/items/0`);

      expect(response.status).toBe(400);
      expect(response.body.errors).toHaveLength(1);
      expect(response.body.errors).toEqual(expect.arrayContaining(['id must not be less than 1']));
    });

    it('should fail to find the item and return a status of 401', async () => {
      const response = await request(app).delete('/items/999999999');

      expect(response.status).toBe(404);
    });
  });
});
