import { Component } from '@angular/core';
import { allIcons } from 'ngx-bootstrap-icons';
import { IProduct } from './iproduct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'example1';

  products: IProduct [] = [
    {
      productId: 1,
      productName: 'Nike Air Max',
      productCode: 'NK-AM-001',
      releaseDate: '2025-01-15',
      price: 120,
      description: 'Comfortable running shoes with air cushioning.',
      starRating: 4.5,
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_961743-MLC75953008668_052024-O-zapatillas-nike-air-max-excee-hombre-negro.webp'
    },
    {
      productId: 2,
      productName: 'Adidas Ultraboost',
      productCode: 'AD-UB-002',
      releaseDate: '2025-02-10',
      price: 140,
      description: 'High-performance shoes for long-distance running.',
      starRating: 4.8,
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_803674-MLC81875655844_012025-O-zapatillas-adidas-running-response-super-mujer-negro-ji4640.webp'
    },
    {
      productId: 3,
      productName: 'Puma RS-X',
      productCode: 'PM-RSX-003',
      releaseDate: '2025-03-05',
      price: 110,
      description: 'Stylish sneakers for casual wear.',
      starRating: 4.2,
      imageUrl: 'https://http2.mlstatic.com/D_NQ_NP_689821-MLC81376142431_122024-O-puma-rs-trck-color-39157601.webp'
    },
    {
      productId: 4,
      productName: 'Reebok Nano X1',
      productCode: 'RB-NX1-004',
      releaseDate: '2025-04-20',
      price: 130,
      description: 'Versatile training shoes for gym and outdoor workouts.',
      starRating: 4.6,
      imageUrl: 'https://home.ripley.cl/store/Attachment/WOP/D317/2000383859583/2000383859583-1.jpg'
    },
    {
      productId: 5,
      productName: 'Asics Gel-Kayano Pink Woman',
      productCode: 'AS-GK-005',
      releaseDate: '2025-05-10',
      price: 150,
      description: 'Premium stability running shoes for overpronators.',
      starRating: 4.7,
      imageUrl: 'https://sparta.cl/media/catalog/product/1/0/1012b670.700_1.png?optimize=high&bg-color=255,255,255&fit=bounds&height=550&width=600&canvas=600:550'
    },
    {
      productId: 6,
      productName: 'New Balance 574',
      productCode: 'NB-574-006',
      releaseDate: '2025-06-01',
      price: 100,
      description: 'Classic sneakers with a retro design.',
      starRating: 4.3,
      imageUrl: 'https://sparta.cl/media/catalog/product/m/l/ml574evg_2.png?optimize=high&bg-color=255,255,255&fit=bounds&height=550&width=600&canvas=600:550'
    }
  ]

}
