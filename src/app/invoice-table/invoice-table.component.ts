import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {InvoicesService} from '../invoices.service';
import {Invoice} from '../model/invoice';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialogRef, MatPaginator} from '@angular/material';
import {MatSort} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {EditInvoiceComponent} from '../edit-invoice/edit-invoice.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css'],
  providers: [InvoicesService]
})

export class InvoiceTableComponent implements OnInit {
  title = 'Invoices';
  displayedColumns: string[] = ['number', 'date_created', 'date_supply', 'date_due', 'direction', 'comment', 'actions'];
  invoices: Invoice[] = [];
  dataSource;
  dialogRef: MatDialogRef<EditInvoiceComponent, any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  loading = false;
  dataFilter = '';

  constructor(private invoiceService: InvoicesService, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  calcTableHeight() {
    const pageHeight = document.documentElement.clientHeight;
    const topToolbarHeight = document.getElementById('topToolbar').clientHeight;
    const headerCardHeight = document.getElementById('headerCard').clientHeight + 60;
    const progressBarHeight = document.getElementById('progressBar').clientHeight;
    const tableToolbarHeight = document.getElementById('table-toolbar').clientHeight;
    const tableHeight = pageHeight - topToolbarHeight - headerCardHeight - progressBarHeight - tableToolbarHeight - 50;
    return `${tableHeight}px`;
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

  applyFilter(filterValue: string) {
    this.loading = true;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.loading = false;
  }

  clearDataFilter() {
    this.dataFilter = '';
    this.applyFilter('');
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
    });
  }

  openDialog(invoice: Invoice) {
    this.dialogRef = this.dialog.open(EditInvoiceComponent, {
      width: '700px',
      disableClose: true,
      data: {
        invoice
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateInvoice(result);
      }
    });
  }

  deleteInvoice(invoice: Invoice) {
    this.loading = true;
    this.invoiceService.deleteInvoice(invoice).subscribe((response: any) => {
        // обновляем список с сервера
        this.invoiceService.getInvoices().subscribe(
          (data: Invoice[]) => {
            this.initDataSourceData(data);
            this.applyFilter(this.dataFilter);
          });
      }, error => {
        console.error(error);
        this.showSnackBar('Произошла ошибка при удалении invoice!');
      }, () => this.loading = false
    );
  }

  updateInvoice(invoice: Invoice) {
    this.loading = true;
    this.invoiceService.updateInvoice(invoice).subscribe((response: any) => {
        this.invoiceService.getInvoices().subscribe((data: Invoice[]) => {
          this.initDataSourceData(data);
          this.applyFilter(this.dataFilter);
        });
      }, error => {
        console.error(error);
        this.showSnackBar('Произошла ошибка при изменении invoice!');
      },
      () => this.loading = false);
  }

  parseDate(dateStringInMilliseconds) {
    return new Date(parseInt(dateStringInMilliseconds, 10)).toLocaleDateString();
  }

  initDataSourceData(data) {
    this.invoices = data;
    this.invoices.forEach(invoice => {
      invoice.date_created_str = new Date(parseInt(invoice.date_created, 10)).toLocaleDateString();
      invoice.date_supply_str = new Date(parseInt(invoice.date_supply, 10)).toLocaleDateString();
      invoice.date_due_str = new Date(parseInt(invoice.date_due, 10)).toLocaleDateString();
    });
    this.dataSource = new MatTableDataSource<Invoice>(this.invoices);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loading = true;
    this.invoiceService.getInvoices().subscribe((data: Invoice[]) => {
      this.initDataSourceData(data);
    }, error => console.error(error), () => this.loading = false);
  }

}
