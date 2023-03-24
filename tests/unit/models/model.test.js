const { expect } = require('chai');
const sinon = require('sinon');

const allProducts = require('./mocks/model.mock');
const connection = require('../../../src/models/connection');
const {productsModel} = require('../../../src/models/index')

describe('Testes de unidade das requisições de Produtos', function () {
  it('Testa se retorna todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.getAllProducts();

    expect(result).to.be.deep.equal(allProducts)

  });

  it('Teste se retorna um produto pelo ID', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const result = await productsModel.getProductById(1);

    expect(result).to.be.deep.equal(allProducts[0])
  })
  
  afterEach(function () {
    sinon.restore();
  });

})