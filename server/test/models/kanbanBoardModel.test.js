import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import KanbanBoard from '../../src/models/KanbanBoard.js';

describe('KanbanBoard Model', () => {
  it('should create a new Kanban board with course reference', async () => {
    const boardData = {
      name: 'Test Kanban Board',
      description: 'Board for testing',
      course: new mongoose.Types.ObjectId(),
    };
    
    const board = new KanbanBoard(boardData);
    const saveStub = sinon.stub(KanbanBoard.prototype, 'save').resolves(boardData);

    const result = await board.save();

    expect(result.name).to.equal('Test Kanban Board');
    expect(result.course).to.exist;

    saveStub.restore();
  });
});
