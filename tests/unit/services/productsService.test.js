const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services')

const allProducts  = require('../models/mocks/model.mock')

describe('Testando a camada service de products', function () {
  it('Testando retorno da função getAllProducts', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);

    const result = await productsService.getAllProducts();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allProducts);
  });

  describe('Testando retornos função getProductById', function () {
    it('Testando caso de erro, caso nenhum produto corresponda ao ID', async function () {

      const result = await productsService.getProductById(55);

      expect(result.type).to.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.equal('Product not found')

    });

    it('Testando se retorna um produto pelo id corretamente', async function () {
      sinon.stub(productsModel, 'getProductById').resolves(allProducts[0])
  
      const result = await productsService.getProductById(1);
  
      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(allProducts[0]);
    });
    
  })

  
  afterEach(function () {
    sinon.restore();
  });
})