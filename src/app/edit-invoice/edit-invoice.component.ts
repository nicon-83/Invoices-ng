import {Component, Inject, OnInit} from '@angular/core';
import {Invoice} from '../model/invoice';
import {InvoicesService} from '../invoices.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.css'],
  providers: [InvoicesService]
})

export class EditInvoiceComponent implements OnInit {

  invoice: Invoice;
  dateCreated: Date;
  dateSupply: Date;
  dateDue: Date;

  invoiceForm = new FormGroup({
    direction: new FormControl('', [Validators.required, Validators.minLength(10)]),
    number: new FormControl('', [Validators.required, Validators.minLength(5)]),
    date_created: new FormControl({value: ''}, [Validators.required]),
    date_due: new FormControl({value: ''}, [Validators.required]),
    date_supply: new FormControl({value: ''}, [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(25)]),
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.invoice = Object.assign({}, this.data.invoice);
    this.dateCreated = new Date(parseInt(this.invoice.date_created, 10));
    this.dateSupply = new Date(parseInt(this.invoice.date_supply, 10));
    this.dateDue = new Date(parseInt(this.invoice.date_due, 10));
  }

  updateInvoice() {
    this.invoice.date_created = (+this.dateCreated).toString();
    this.invoice.date_supply = (+this.dateSupply).toString();
    this.invoice.date_due = (+this.dateDue).toString();
  }
}
