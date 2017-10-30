import * as angular from 'angular'
import { CustomersView } from '../../../../src/Views/Customers'
import { ICustomer } from '../../../../src/Models/ICustomer'

describe('View: Customers', () => {
  let $rootScope: ng.IRootScopeService
  let $controller: ng.IControllerService
  let $q: ng.IQService
  let $state: ng.ui.IStateService
  let sandbox: sinon.SinonSandbox
  let customersMock: Array<ICustomer>
  let customerMock: ICustomer
  let API
  let form

  function getController(): CustomersView {
    return $controller($state.get('customers').controller as Function) as CustomersView
  }

  beforeEach(angular.mock.module('customers-demo'))

  beforeEach(() => {
    sandbox = sinon.sandbox.create()

    customersMock = []
    customerMock = {} as ICustomer

    API = {
      getCustomers() {
        return $q.resolve(customersMock)
      },

      addCustomer(customer: ICustomer) {
        return $q.resolve()
      },

      removeCustomerWithId(id: number) {
        return $q.resolve()
      }
    }

    form = {
      $valid: false,
      $setPristine: sandbox.spy(),
      $setUntouched: sandbox.spy(),
      $error: {}
    }

    angular.mock.module(($provide) => {
      $provide.service('API', () => API)
    })
  })

  beforeEach(inject((_$rootScope_, _$controller_, _$state_, _$q_) => {
    $rootScope = _$rootScope_
    $controller = _$controller_
    $q = _$q_
    $state = _$state_
  }))

  afterEach(() => {
    sandbox.restore()
  })

  describe('Init', () => {
    it('should populate with customers data', () => {
      const $ctrl: CustomersView = getController()

      customersMock = [customerMock, customerMock]

      $ctrl.$onInit()
      $rootScope.$apply()

      expect($ctrl.customers).to.deep.equal(customersMock)
    })
  })

  describe('Remove customer', () => {
    it('should trigger removal of customer', () => {
      const $ctrl: CustomersView = getController()

      sandbox.spy(API, 'removeCustomerWithId')

      $ctrl.onRemove(1)
      $rootScope.$apply()

      expect(API.removeCustomerWithId).to.have.been.calledWith(1)
    })
  })

  describe('Navigate to customer details', () => {
    it('should trigger navigation to customer details', () => {
      const $ctrl: CustomersView = getController()

      sandbox.stub($state, 'go')

      $ctrl.onNavigate(1)

      expect($state.go).to.have.been.calledWith('customer-orders', {
        id: 1
      })
    })
  })
})
