const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { allSales } = require('./mocks/salesService.mock');
const { getAllSales, addNewSale } = require('../../../src/services/salesService');
const { reqBody, serviceReturn } = require('../controllers/mocks/controller.mocks');
const insertId = 13


describe('Testando a camada service de sales', function () {
  it('Testando o retorno pegando todas as vendas', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSales);

    const result = await getAllSales();

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(allSales);
    
  });
  it('testando addNewSale', async function () {
    sinon.stub(salesModel, 'addNewSale').resolves(insertId);
    sinon.stub(salesModel, 'addNewSaleId').resolves(insertId);

    const result = await addNewSale(reqBody);

    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal({
      "id": insertId,
      "itemsSold": [
        {
          "productId": 2,
          "quantity": 1,
        },
        {
          "productId": 1,
          "quantity": 1,
        }
      ]
    });
  })
  afterEach(function () {
    sinon.restore();
  });
})