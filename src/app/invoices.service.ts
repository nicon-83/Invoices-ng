import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Invoice} from './model/invoice';

@Injectable({
  providedIn: 'root'
})

export class InvoicesService {

  constructor(private http: HttpClient) {
  }

  getInvoices() {
    return this.http.get('https://nicon83-invoices-ng.herokuapp.com/invoices');
  }

  createInvoice(invoice: Invoice) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const inv = Object.assign({}, invoice);
    inv.date_created = (+new Date(invoice.date_created)).toString();
    inv.date_supply = (+new Date(invoice.date_supply)).toString();
    inv.date_due = (+new Date(invoice.date_due)).toString();
    return this.http.post('https://nicon83-invoices-ng.herokuapp.com/invoices', JSON.stringify(inv), {headers});
  }

  updateInvoice(invoice: Invoice) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`https://nicon83-invoices-ng.herokuapp.com/invoices/${invoice.id}`, JSON.stringify(invoice), {headers});
  }

  deleteInvoice(invoice: Invoice) {
    return this.http.delete(`https://nicon83-invoices-ng.herokuapp.com/invoices/${invoice.id}`);
  }
}
