import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
@Component({
  selector: 'app-customer-returns',
  templateUrl: './customer-returns.page.html',
  styleUrls: ['./customer-returns.page.scss'],
})
export class CustomerReturnsPage implements OnInit {
  num: any;
  constructor(
      private barcodeScanner: BarcodeScanner
  ) {}

  showSwalTest(){
    Swal.fire('Testing', 'Test', 'success'); //this works
  }
  scan() {
    this.num = null;
    this.barcodeScanner.scan().then(data => {
      // this is called when a barcode is found
      this.num = data.text
    });
  }



ngOnInit() {
    
  }

}
