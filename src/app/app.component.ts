import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { BackendService } from './services/backend.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-ccpdl';
  dataSource!: MatTableDataSource<any>;
  displayColumns: string[] = [
    'trackingNumber',
    'receiver',
    'pickupDate',
    'address',
    'paymentType',
    'price',
    'trackingStatus',
    'management'
  ];

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private backendService: BackendService) { }

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders() {
    this.backendService.getOrder()
      .subscribe({
        next: (response) => {
          this.dataSource = new MatTableDataSource(response)
          console.log(this.dataSource.data) //to check the fetched data
        },
        error: () => {
          alert('Error while getting orders')
        }
      })
  }

  openOrderDialog() {
    this.dialog.open(OrderDialogComponent, { width: '30%' }).afterClosed().subscribe(() => { this.getAllOrders() });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editOrder(row: any) {
    this.dialog.open(OrderDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(() => { this.getAllOrders() })
  }

  deleteOrder(id: any) {
    this.backendService.deleteOrder(id)
      .subscribe({
        next: () => {
          alert('Order deleted successfully')
          this.getAllOrders()
        },
        error: () => {
          alert('Error while deleting order')
        }
      })
  }

}
