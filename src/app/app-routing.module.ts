import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateInvoiceComponent} from './create-invoice/create-invoice.component';
import {InvoiceTableComponent} from './invoice-table/invoice-table.component';

const routes: Routes = [
  { path: 'create', component: CreateInvoiceComponent},
  { path: 'main', component: InvoiceTableComponent},
  { path: '**', redirectTo: '/main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
