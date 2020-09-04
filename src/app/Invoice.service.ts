/**
 * Title: Invoice.service.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/1/2020
 * Description: Invoice class
 */

import { IInvoiceItem } from './invoiceItem.interface';
import { Injectable, Input } from '@angular/core';

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

  @Input() itemList: Array<IInvoiceItem> = [
    {name: "Password Reset", price: 39.99, isChecked: false},
    {name: "Spyware Removal", price: 99.99, isChecked: false},
    {name: "RAM Upgrade", price: 129.99, isChecked: false},
    {name: "Software Installation", price: 49.99, isChecked: false},
    {name: "Tune-up", price: 89.99, isChecked: false},
    {name: "Keyboard Cleaning", price: 45.00, isChecked: false},
    {name: "Disk Cleanup", price: 149.99, isChecked: false}
  ];

  constructor () {
    this.invoiceId = Invoice.ID;
    Invoice.ID++;
  }

  private calculateTotal() {
    let total = 0.0;

    let orderedItems = this.itemList.filter(item => {
      item.isChecked === true;
    });

    orderedItems.forEach(item => {
      total = total + item.price;
    })
    return total;
  }

  getTotal() {
    this.calculateTotal();
    return this.total;
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
