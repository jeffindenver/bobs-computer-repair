/**
 * Title: Invoice.service.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/1/2020
 * Description: Invoice class
 */

//this class should either be refactored out or used to take functionality from
//the order component

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class Invoice {
  //the class ID is a way to get unique IDs during a single run of the program.
  //It should be replaced with some other means, perhaps with the database
  private static ID: number = 1000;

  private invoiceId: number;
  private laborCost: number;
  private partsCost: number;
  private total: number;

  constructor () {
    this.invoiceId = Invoice.ID;
    Invoice.ID++;
  }

  setInvoiceId(id) {
    this.invoiceId = id;
  }

  setPartsCost(amount) {
    if (!amount) {
      this.partsCost = 0.0;
    } else {
      this.partsCost = amount;
    }
  }

  setLaborCost(amount) {
    if (!amount) {
      this.laborCost = 0.0;
    } else {
      this.laborCost = amount;
    }
  }

  getPartsAndLaborCost(){
    return this.partsCost + this.laborCost;
  }

  getInvoiceId() {
    return this.invoiceId;
  }

  getLaborCost() {
    return this.laborCost;
  }

  getPartsCost() {
    return this.partsCost;
  }

}
