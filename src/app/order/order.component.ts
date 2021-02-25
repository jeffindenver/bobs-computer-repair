/*
 * Title: order.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/1/2020
 * Description: order component
 */

import {Component, OnInit} from '@angular/core';
import {Invoice} from 'src/app/Invoice.service';
import {IRepairService} from '../repairService.interface';
import {InvoiceDialogComponent} from '../invoice-dialog/invoice-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {FormGroup,
        FormBuilder,
        Validators,
        FormArray,
        FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  total = 0.0;
  partsLaborTotal = 0.0;
  services: Array<IRepairService>;
  selectedServices: Array<IRepairService>;
  serviceRepairForm: FormGroup;
  manualEntryForm: FormGroup;
  serviceRepairOptions: FormArray;
  servicesFormArray: FormArray;
  invoice: Invoice = new Invoice();

  constructor(private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    const numberPattern = '[+-]?([0-9]*[.])?[0-9]+';

    this.serviceRepairForm = this.fb.group({
      serviceRepairOptions: new FormArray([]),
      laborCost: new FormControl('', Validators.pattern(numberPattern)),
      partsCost: new FormControl('', Validators.pattern(numberPattern)),
      partsAndLaborCost: new FormControl(''),
      totalCost: new FormControl('')
    });

    this.services = [
      {id: 0, name: 'Password Reset', price: 39.99, isChecked: false},
      {id: 1, name: 'Spyware Removal', price: 99.99, isChecked: false},
      {id: 2, name: 'RAM Upgrade', price: 129.99, isChecked: false},
      {id: 3, name: 'Software Installation', price: 49.99, isChecked: false},
      {id: 4, name: 'Tune-up', price: 89.99, isChecked: false},
      {id: 5, name: 'Keyboard Cleaning', price: 45.00, isChecked: false},
      {id: 6, name: 'Disk Cleanup', price: 149.99, isChecked: false}
    ];

    this.servicesFormArray = this.serviceRepairForm.controls.serviceRepairOptions as FormArray;
    this.addServiceRepairCheckboxes();
  }

  private addServiceRepairCheckboxes(): void {
    this.services.forEach(() => this.servicesFormArray.push(new FormControl(false)));
  }

  onCheckboxChange(e): void {
    console.log('source check box');
    console.log(e);
    if (e.checked) {
      this.total = this.total + e.source.value;
    } else {
      this.total = this.total - e.source.value;
    }
  }

  showInvoice(): void {
    this.selectedServices = this.serviceRepairForm.value.serviceRepairOptions
      .map((checked, index) => checked ? this.services[index] : null)
      .filter(v => v !== null);

    console.log(this.selectedServices);

    const dialogRef = this.dialog.open(InvoiceDialogComponent,
      {data: {invoiceId: this.invoice.getInvoiceId(),
              partsAndLabor: this.getPartsLaborTotal(),
              list: this.selectedServices,
              total: this.getTotal()},
        disableClose: true,
        width: '600px' });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.invoice = new Invoice();
      }
    });

    this.clearForm();
  }

  clearForm(): void {
    this.invoice.setLaborCost(0.0);
    this.invoice.setPartsCost(0.0);
    this.total = 0;
    this.servicesFormArray.controls.forEach(item => {
      item.setValue(false);
    });
    this.serviceRepairForm.controls.laborCost.setValue('');
    this.serviceRepairForm.controls.partsCost.setValue('');
    const e = {labor: 0.0, parts: 0.0};
    this.addPartsLabor(e);
  }

  addPartsLabor(e): void {
    if (e) {
      this.invoice.setLaborCost(parseFloat(e.labor));
      this.invoice.setPartsCost(parseFloat(e.parts));
      this.partsLaborTotal = this.invoice.getPartsAndLaborCost();
    }
  }

  getPartsCost(): number {
    return this.invoice.getPartsCost();
  }

  getLaborCost(): number {
    return this.invoice.getLaborCost();
  }

  getPartsLaborTotal(): number {
    return this.partsLaborTotal;
  }

  getTotal(): number {
    return this.total + this.partsLaborTotal;
  }

}
