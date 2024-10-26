import { expect } from 'chai';
import sinon from 'sinon';
import kanbanServices from '../../src/services/kanbanServices.js';
import * as kanbanController from '../../src/controllers/kanbanController.js';

describe('Kanban Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: { name: 'Test Kanban Board', course: 'someCourseId' } };
    res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new Kanban board and return status 201', async () => {
    sinon.stub(kanbanServices, 'createBoard').resolves(req.body);
    await kanbanController.createBoard(req, res);

    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(req.body)).to.be.true;
  });

  it('should return all Kanban boards with status 200', async () => {
    const boards = [{ name: 'Test Kanban Board' }];

    sinon.stub(kanbanServices, 'getAllBoards').resolves(boards);

    await kanbanController.getAllBoards(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(boards)).to.be.true;
  });

  it('should get Kanban board by ID with status 200', async () => {
    req = { params: { id: 'someBoardId' } };
    const board = { name: 'Test Kanban Board', course: 'someCourseId' };

    sinon.stub(kanbanServices, 'getBoardById').resolves(board);

    await kanbanController.getBoardById(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(board)).to.be.true;
  });

  it('should get Kanban board by course ID with status 200', async () => {
    req = { params: { courseId: 'someCourseId' } };
    const board = { name: 'Test Kanban Board', course: 'someCourseId' };

    sinon.stub(kanbanServices, 'getBoardByCourseId').resolves(board);

    await kanbanController.getBoardByCourseId(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(board)).to.be.true;
  });

  it('should update a Kanban board and return status 200', async () => {
    req = { params: { id: 'someBoardId' }, body: { name: 'Updated Board Name' } };
    const updatedBoard = { name: 'Updated Board Name', course: 'someCourseId' };

    sinon.stub(kanbanServices, 'updateBoard').resolves(updatedBoard);

    await kanbanController.updateBoard(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith(updatedBoard)).to.be.true;
  });

  it('should delete a Kanban board and return status 200', async () => {
    req = { params: { id: 'someBoardId' } };
    sinon.stub(kanbanServices, 'deleteBoard').resolves();

    await kanbanController.deleteBoard(req, res);

    expect(res.status.calledWith(200)).to.be.true;
    expect(res.json.calledWith({ message: 'Kanban board deleted' })).to.be.true;
  });
});
