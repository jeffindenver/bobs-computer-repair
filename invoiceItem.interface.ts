/**
 * Title: invoiceItem.interface.ts
 * Author: Jeff Shepherd
 * Modified by:
 * Date: 9/1/2020
 * Description: invoiceItem interface
 */

import { Input } from '@angular/core';

 export interface IInvoiceItem {
   name: string,
   price: number,
   isChecked: boolean,
 }
