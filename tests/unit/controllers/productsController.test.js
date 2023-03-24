const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services/')
const { productsController } = require('../../../src/controllers');
const allProducts  = require('../models/mocks/model.mock')

describe('Testando camada controllers para products', function () {
  describe('Listando todos os produtos', async function () {    
    it('Verificando retorno para todos os produtos', async function () {
      const req = {};
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
      .stub(productsService, 'getAllProducts')
      .resolves({ type: null, message: allProducts })
      
      
      await productsController.getAllProducts(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    
  });

  describe('Listando produtos por id', async function () {
    
    
    it('Retorno quando passa um ID válido', async function () {
      
      const res = {};
      const req = {
        params: { id: 1 },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'getProductById')
        .resolves({ type: null, message: allProducts[0] })
      
      
      await productsController.getProductById(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });
    
    it('Retorna um erro quando nenhum produto corresponde ao ID', async function () {
      const res = {};
      const req = {
        params: { id: 5 },
      };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
      .stub(productsService, 'getProductById')
      .resolves({ type: 404, message: 'Nenhum produto correspondente ao ID' });
      
      
      await productsController.getProductById(req, res);
      
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({message: 'Nenhum produto correspondente ao ID'});
    });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});