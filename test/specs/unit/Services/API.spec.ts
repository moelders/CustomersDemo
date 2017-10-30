import * as angular from 'angular'
import { ICustomer } from '../../../../src/Models/ICustomer'
import { API } from '../../../../src/Services/API'

describe.skip('Service: API', () => {
  let api: API

  beforeEach(angular.mock.module('customers-demo'))

  beforeEach(inject((_API_) => {
    api = _API_
  }))

  describe('getCustomers()', () => {
    it('should retrieve all customers successfully', () => {
      let response: Array<ICustomer>

      api.getCustomers()
      .then((customers: Array<ICustomer>) => {
        response = customers
      })

      expect(response).to.have.length(10)
    })
  })

  describe('getCustomerWithId()', () => {
    it('should retrieve all customers successfully', () => {
      let response: ICustomer

      api.getCustomerWithId(1)
      .then((customer: ICustomer) => {
        response = customer
      })

      expect(response).to.deep.equal(null)
    })
  })

  describe('removeCustomerWithId()', () => {
    it('should retrieve all customers successfully', () => {
      let response: Object

      api.removeCustomerWithId(1)
      .then(() => {})

      expect(response).to.be.empty
    })
  })
})
