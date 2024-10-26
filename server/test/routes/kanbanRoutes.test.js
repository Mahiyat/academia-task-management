import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';

describe('Kanban Routes', () => {
  it('should create a new Kanban board', (done) => {
    request(app)
      .post('/api/kanban/add')
      .send({ name: 'Test Kanban Board', course: '6721df49ae60c25923f10a95' })
      .expect(201)
      .expect((res) => {
        expect(res.body.name).to.equal('Test Kanban Board');
        expect(res.body.course).to.equal('6721df49ae60c25923f10a95');
      })
      .end(done);
  });

  it('should return all Kanban boards', (done) => {
    request(app)
      .get('/api/kanban/')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.an('array');
      })
      .end(done);
  });

  it('should get a Kanban board by ID', (done) => {
    request(app)
      .get('/api/kanban/6724f57c79cd1dfd50948b71')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('name');
      })
      .end(done);
  });

  it('should get a Kanban board by course ID', (done) => {
    request(app)
      .get('/api/kanban/course/6721de39267deadc474fec29')
      .expect(200)
      .expect((res) => {
        expect(res.body.course).to.have.property('_id').equal('6721de39267deadc474fec29');
      })
      .end(done);
  });

  it('should update a Kanban board', (done) => {
    request(app)
      .put('/api/kanban/update/6724fa22320dd8d29940db44')
      .send({ name: 'Updated Board Name' })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).to.equal('Updated Board Name');
      })
      .end(done);
  });

  it('should delete a Kanban board', (done) => {
    request(app)
      .delete('/api/kanban/delete/6724fa22320dd8d29940db44')
      .expect(200)
      .expect((res) => {
        expect(res.body.message).to.equal('Kanban board deleted');
      })
      .end(done);
  });
});
