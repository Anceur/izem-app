import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  images: string[];
  description: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-pageone',
  standalone: true,
  imports: [CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './pageone.component.html',
  styleUrls: ['./pageone.component.scss']
})
export class PageoneComponent implements AfterViewInit {
  @ViewChild('productSwiper', { static: false }) productSwiper: any;
  
  products: Product[] = [
    {
      id: 1,
      name: 'Energy Original',
      price: 100,
      currency: 'DA',
      images: ['assets/izemthree.png'],
      description: 'Mocha sauce, coffee, and Frappuccino chips.',
      backgroundColor: 'linear-gradient(135deg, #76c60de0 0%, #68ae0c 100%)'
    },
    {
      id: 2,
      name: 'Energy Cerise',
      price: 120,
      currency: 'DA',
      images: ['assets/izemtwo.png'],
      description: 'Refreshing cherry flavor.',
      backgroundColor: 'linear-gradient(135deg, #b52282 0%, #8b1a5c 100%)'
    },
    {
      id: 3,
      name: 'Coco Myrtille',
      price: 110,
      currency: 'DA',
      images: ['assets/izemone.png'],
      description: 'Coconut and blueberry combo.',
      backgroundColor: 'linear-gradient(135deg, #b1adac 0%, #8a8584 100%)'
    }
  ];

  currentProductIndex: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.initSwiper();
    // Set initial background
    this.updateBackground();
  }

  initSwiper() {
    setTimeout(() => {
      if (this.productSwiper?.nativeElement) {
        const swiperEl = this.productSwiper.nativeElement;
        
        swiperEl.swiper.params.allowTouchMove = true;
        
        swiperEl.addEventListener('slidechange', () => {
          this.currentProductIndex = swiperEl.swiper.activeIndex;
          this.updateBackground();
          this.cdr.detectChanges();
        });
      }
    }, 300);
  }

  onSwiperInit(swiper: any) {
    console.log('Swiper initialized', swiper);
    this.initSwiper();
  }

  goToSlide(index: number) {
    if (this.productSwiper?.nativeElement?.swiper) {
      this.productSwiper.nativeElement.swiper.slideTo(index);
      this.currentProductIndex = index;
      this.updateBackground();
      this.cdr.detectChanges();
    }
  }

  // دالة جديدة لتحديث الخلفية
  updateBackground() {
    const productPage = this.elementRef.nativeElement.querySelector('.product-page');
    if (productPage && this.products[this.currentProductIndex]) {
      const currentBg = this.products[this.currentProductIndex].backgroundColor;
      productPage.style.background = currentBg;
      productPage.style.transition = 'background 0.5s ease-in-out';
    }
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-product.png';
  }

  get currentProduct(): Product {
    return this.products[this.currentProductIndex];
  }
}