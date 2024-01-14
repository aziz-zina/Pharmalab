import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-medicine',
  templateUrl: './purchase-medicine.component.html',
  styleUrls: ['./purchase-medicine.component.css'],
})
export class PurchaseMedicineComponent {
  constructor(private router: Router) {}
  sex() {
    this.router.navigate(['/sex2', { state: JSON.stringify('msg') }]);
  }
}
