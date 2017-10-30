import { find, remove } from 'lodash'
import { Inject } from '../Decorators/Inject'
import { ICustomer } from '../Models/ICustomer'

@Inject('$q')
export class API {
  private customers: Array<ICustomer>

  public constructor(
    private $q: ng.IQService
  ) {
    this.customers = require('../Assets/customer.json')
  }

  /**
   * Retrieve all customers.
   *
   * @return promise handler.
   */
  public getCustomers(): ng.IPromise<Array<ICustomer>> {
    return this.$q((resolve) => {
      resolve(this.customers)
    })
  }

  /**
   * Retrieve a customer with given id.
   *
   * @param id - customer unique id.
   * @return promise handler.
   */
  public getCustomerWithId(id: number): ng.IPromise<ICustomer> {
    return this.$q((resolve) => {
      resolve(find(this.customers, {id}))
    })
  }

  /**
   * Remove a customer with given id.
   *
   * @param id - customer unique id.
   * @returns promise handler.
   */
  public removeCustomerWithId(id: number): ng.IPromise<{}> {
    return this.$q((resolve) => {
      remove(this.customers, {id})
      resolve()
    })
  }
}
