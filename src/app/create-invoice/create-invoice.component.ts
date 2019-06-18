import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Invoice} from '../model/invoice';
import {InvoicesService} from '../invoices.service';
import {MatSnackBar} from '@angular/material';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})

export class CreateInvoiceComponent implements OnInit {

  constructor(private invoiceService: InvoicesService, private router: Router, private snackBar: MatSnackBar) {
  }

  loading = false;
  minDate = new Date(1970, 0, 1);
  maxDate = new Date(2030, 0, 1);
  invoiceForm = new FormGroup({
    direction: new FormControl('', [Validators.required, Validators.minLength(10)]),
    number: new FormControl('', [Validators.required, Validators.minLength(5)]),
    date_created: new FormControl('', [Validators.required]),
    date_due: new FormControl('', [Validators.required]),
    date_supply: new FormControl('', [Validators.required]),
    comment: new FormControl('', [Validators.required, Validators.minLength(25)]),
  });

  goToMain() {
    this.router.navigate(['/main']);
  }

  saveInvoice() {
    this.loading = true;
    const invoice: Invoice = new Invoice();
    invoice.number = this.invoiceForm.controls.number.value;
    invoice.direction = this.invoiceForm.controls.direction.value;
    invoice.date_created = this.invoiceForm.controls.date_created.value;
    invoice.date_supply = this.invoiceForm.controls.date_supply.value;
    invoice.date_due = this.invoiceForm.controls.date_due.value;
    invoice.comment = this.invoiceForm.controls.comment.value;

    this.invoiceService.createInvoice(invoice).subscribe((response: any) => {
      this.goToMain();
    }, error => {
      console.error(error);
      this.showSnackBar('Произошла ошибка при создании invoice!');
      return;
    }, () => this.loading = false);

  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

  ngOnInit() {
  }

}

// function dateValidator(control: AbstractControl): { [key: string]: any | null } {
//   const value: string = control.value;
//   if (value && typeof value === 'string') {
//     const match = value.match(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/);
//     if (!match) {
//       return {dateInvalid: true};
//     }
//     const date = new Date(`${match[3]}-${match[1]}-${match[2]}`);
//     if (isNaN(date.getTime())) {
//       return {dateInvalid: true};
//     }
//   }
//   return null;
// }

// export class DateValidator {
//
//   // validate MM/DD/YYYY
//   static date(c: AbstractControl): { [key: string]: boolean } {
//     const value = c.value;
//     if (value && typeof value === 'string') {
//       const match = value.match(/^([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{4})$/);
//       if (!match) {
//         return {'dateInvalid': true};
//       }
//       const date = new Date(`${match[3]}-${match[1]}-${match[2]}`);
//       if (isNaN(date.getTime())) {
//         return {'dateInvalid': true};
//       }
//     }
//     return null;
//   }
//
// }

