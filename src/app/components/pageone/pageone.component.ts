import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  images: string[];
  inStock: boolean;
  backgroundColor: string;
  gradientColors: string[];
  description: string;
  rating: number;
  originalPrice?: number;
}

@Component({
  selector: 'app-pageone',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pageone.component.html',
  styleUrls: ['./pageone.component.scss'],
})
export class PageoneComponent implements OnInit {
  
   
  currentProductIndex = 0;
  cartCount = 0;
  favoriteProducts: number[] = [];

  products: Product[] = [
    {
      id: 1,
      name: 'Energy Original',
      price: 7.60,
      originalPrice: 9.50,
      currency: '£',
      images: [
        'assets/izemthree.png',
        'assets/images/coffee-bottle-2.png',
        'assets/images/coffee-bottle-3.png'
      ],
    
      description: 'مشروب طاقة مميز مصنوع من أجود أنواع البن المختار بعناية، يمنحك الطاقة والحيوية التي تحتاجها لبداية يوم مثالي.',
      inStock: true,
      backgroundColor: '#2c1810',
      gradientColors: ['#d4e8e0', '#a8d0c0'],
      rating: 4.5
    },
    {
      id: 2,
      name: 'Energy Cerise',
      price: 12.50,
      originalPrice: 15.00,
      currency: '£',
      images: [
        'assets/izemtwo.png',
        'assets/images/espresso-2.png',
        'assets/images/espresso-3.png'
      ],
     
      description: 'إسبريسو إيطالي أصيل بنكهة الكرز الطبيعي، محضر بأساليب تقليدية لإعطائك تجربة قهوة لا تُنسى.',
      inStock: true,
      backgroundColor: '#4a3528',
      gradientColors: ['#e8d4c0', '#d0a890'],
      rating: 4.8
    },
    {
      id: 3,
      name: 'Coco Myrtille',
      price: 9.25,
      currency: '£',
      images: [
        'assets/izemone.png',
      ],
    
      description: 'مزيج رائع من جوز الهند والتوت الأزرق، يقدم لك طعماً منعشاً ومميزاً مع كل رشفة.',
      inStock: false,
      backgroundColor: '#6a4a32',
      gradientColors: ['#f4e6d0', '#e8c4a0'],
      rating: 4.2
    }
  ];

  constructor() {}

  ngOnInit() {}

  getCurrentProduct(): Product {
    return this.products[this.currentProductIndex];
  }

  nextProduct() {
    this.currentProductIndex = (this.currentProductIndex + 1) % this.products.length;
  }

  previousProduct() {
    this.currentProductIndex = (this.currentProductIndex - 1 + this.products.length) % this.products.length;
  }

  selectProduct(index: number) {
    this.currentProductIndex = index;
  }

  addToCart(product: Product) {
    if (product.inStock) {
      this.cartCount++;
      console.log('Adding to cart:', product);
      // إضافة منطق إضافة المنتج إلى السلة
    }
  }

  toggleFavorite(product: Product) {
    const index = this.favoriteProducts.indexOf(product.id);
    if (index > -1) {
      this.favoriteProducts.splice(index, 1);
    } else {
      this.favoriteProducts.push(product.id);
    }
  }

  isFavorite(product: Product): boolean {
    return this.favoriteProducts.includes(product.id);
  }

  getStarsArray(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  getDiscountPercentage(): number {
    const current = this.getCurrentProduct();
    if (current.originalPrice) {
      return Math.round(((current.originalPrice - current.price) / current.originalPrice) * 100);
    }
    return 0;
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-product.png';
  }

  goBack() {
    console.log('Going back');
  }

  openCart() {
    console.log('Opening cart');
  }

  buyNow() {
    console.log('Buy now clicked');
  }

  shareProduct() {
    console.log('Sharing product');
  }

  addToCompare() {
    console.log('Adding to compare');
  }
}