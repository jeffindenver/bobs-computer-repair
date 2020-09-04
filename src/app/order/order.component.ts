/*
 * Title: order.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/1/2020
 * Description: order component
 */

import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/Invoice.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import { InvoiceDialogComponent } from '../invoice-dialog/invoice-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  private total: number = 0.0;
  private partsLaborTotal: number = 0.0;
  orderForm: FormGroup;
  manualEntryForm: FormGroup;
  invoice: Invoice = new Invoice();

  data = this.invoice.itemList;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.orderForm = this.fb.group({
      checkArray: this.fb.array([])
    });
    let numberPattern = "[+-]?([0-9]*[.])?[0-9]+";
    this.manualEntryForm = this.fb.group({
      laborCost: new FormControl('', Validators.pattern(numberPattern)),
      partsCost: new FormControl('', Validators.pattern(numberPattern))
    });
   }

   addPartsLabor(e) {
    if (e) {
      this.invoice.setLaborCost(parseFloat(e.labor));
      this.invoice.setPartsCost(parseFloat(e.parts));
      this.partsLaborTotal = this.invoice.getPartsAndLaborCost();
    }
   }

   onCheckboxChange(e) {
    let lineItem = this.data.find(item => item.name === e.source.name);
    if (e.checked) {
      lineItem.isChecked = true;
      this.total = this.total + e.source.value;
    } else {
      lineItem.isChecked = false;
      this.total = this.total - e.source.value;
    }
  }

  getInvoice() {
    return this.invoice;
  }

  getPartsLaborTotal() {
    return this.partsLaborTotal;
  }

  getTotal() {
    return this.total + this.partsLaborTotal;
  }

  clearInvoice() {
    this.invoice = new Invoice();
  }

  get form() {
    return this.orderForm.controls;
  }

  showInvoice() {
    let l_items = [];
    this.data.forEach( item => {
      if(item.isChecked) {
        l_items.push(item);
      }
    });
    console.log(l_items);

    const dialogRef = this.dialog.open(InvoiceDialogComponent,
      {data: {invoiceId: this.invoice.getInvoiceId(),
              partsAndLabor: this.getPartsLaborTotal(),
              list: l_items,
              total: this.getTotal()},
        disableClose: true,
        width: "600px" });
    console.log("Parts and Labor:");
    console.log(this.getPartsLaborTotal());

    dialogRef.afterClosed().subscribe(result => {
      if (result === "confirm") {
        this.invoice = new Invoice();
      }
    });
  }

  ngOnInit(): void {
  }

}
