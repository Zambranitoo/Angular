import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../iproduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  @Input('data')
  public products: IProduct[] = [];
  imageWidth: number = 80;
  imageMargin: number = 20;
  showImage: boolean = false;

  constructor() {

  }

  ngOnInit() {

  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

}
