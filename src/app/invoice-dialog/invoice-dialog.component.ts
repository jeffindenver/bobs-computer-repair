/*
 * Title: invoice-dialog.component.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/1/2020
 * Description: invoice dialog
 */
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})

export class InvoiceDialogComponent implements OnInit {

  invoiceId;
  list;
  total;
  partsAndLabor;

  constructor(private dialogRef: MatDialogRef<InvoiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.invoiceId = data.invoiceId;
      this.list = data.list;
      this.total = data.total;
      this.partsAndLabor = data.partsAndLabor;
    }

  ngOnInit(): void {
  }
}
