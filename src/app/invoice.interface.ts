/**
 * Title: invoice.interface.ts
 * Author: Professor Krasso
 * Modified by: Jeff Shepherd
 * Date: 9/5/2020
 * Description: invoice interface
 */

 import {IRepairService} from './repairService.interface';

 export interface Invoice {
   lineItems: Array<IRepairService>;
   partsCost: number;
   laborCost: number;
   orderDate: Date;
 }
