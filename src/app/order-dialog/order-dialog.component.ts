import { Component } from '@angular/core';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent {
  trackingStatus = [
    'Picked up',
    'On delivery',
    'Recevied',
    'Payment Success'
  ]
}
