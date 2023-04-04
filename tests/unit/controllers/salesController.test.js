const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services')
const { serviceReturn, reqBody, reqWrongId } = require('./mocks/controller.mocks');
const { newSale, getAllSales } = require('../../../src/controllers/salesController');


describe('Testando a camada controller de sales', function () {
  it('testando se busca todas as vendas', async function () {       
    const res = {}
    const req = {}    
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'getAllSales').resolves(
          { type: null, message: serviceReturn });
      // act
      await getAllSales(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(serviceReturn); 
  });

  it('Testando caso de sucesso ao adicionar nova venda', async function () {
      const res = {}
      const req = {
        body: reqBody
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'addNewSale').resolves(
          { type: null, message: serviceReturn });
      // act
      await newSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(serviceReturn);

  });
  it('Testando caso de tentar adicionar venda com produto inexistente', async function () {
      const res = {}
      const req = {
        body: reqWrongId
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesService, 'addNewSale').resolves(
          { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      // act
      await newSale(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: 'Product not found'}); 
  })
  afterEach(function () {
    sinon.restore();
  });
})