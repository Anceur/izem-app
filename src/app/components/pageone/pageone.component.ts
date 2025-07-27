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
  category: string;
  discount?: number;
  images: string[];
  description: string;
  backgroundColor: string;
  textColor?: string;
  indicatorColor?: string;
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
      category: 'Boissons Énergisantes',
      discount: 15,
      images: ['assets/izemthree.png'],
      description: 'Découvrez IZEM Energy Original de Ifri. la boisson énergisante gazeuse algérienne au format 50cl',
      backgroundColor: 'linear-gradient(135deg, #000000e0 0%, #000000ff 100%)',
      textColor: '#ffffff',
      indicatorColor: '#ffffff'
    },
    {
      id: 2,
      name: 'IZEM Energy Cerise',
      price: 120,
      currency: 'DA',
      category: 'Boissons Énergisantes',
      discount: 10,
      images: ['assets/izemtwo.png'],
      description: 'Découvrez IZEM Energy Cerise de Ifri, une boisson énergisante qui allie le goût intense de la cerise pour une expérience rafraîchissante.',
      backgroundColor: 'linear-gradient(135deg, #b52282 0%, #8b1a5c 100%)',
      textColor: '#ffffff',
      indicatorColor: '#ffffff'
    },
    {
      id: 3,
      name: 'IZEM Energy Coco',
      price: 110,
      currency: 'DA',
      category: 'Boissons Énergisantes',
      discount: 20,
      images: ['assets/izemone.png'],
      description: 'Découvrez IZEM Energy by Ifri, la boisson énergisante gazeuse algérienne au format 50cl',
      backgroundColor: 'linear-gradient(135deg, #b1adac 0%, #8a8584 100%)',
      textColor: '#ffffff',
      indicatorColor: '#ffffff'
    }
  ];

  currentProductIndex: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngAfterViewInit() {
    this.initSwiper();
  }

  initSwiper() {
    setTimeout(() => {
      if (this.productSwiper?.nativeElement) {
        const swiperEl = this.productSwiper.nativeElement;
        
        swiperEl.swiper.params.allowTouchMove = true;
        
        // Apply effects when slide change completes
        swiperEl.addEventListener('slidechangetransitionend', () => {
          this.currentProductIndex = swiperEl.swiper.realIndex;
          this.applySlideEffects();
          this.cdr.detectChanges();
        });
        
        // Prepare for transition
        swiperEl.addEventListener('slidechangetransitionstart', () => {
          const slides = swiperEl.swiper.slides;
          slides.forEach((slide: HTMLElement) => {
            slide.style.transition = 'all 0.5s ease';
          });
        });
      }
    }, 300);
  }

  applySlideEffects() {
    const swiperEl = this.productSwiper.nativeElement;
    const activeIndex = swiperEl.swiper.realIndex;
    
    // Update image effects
    const slides = swiperEl.swiper.slides;
    slides.forEach((slide: HTMLElement, index: number) => {
      const img = slide.querySelector('.product-image');
      if (img) {
        const imgEl = img as HTMLElement;
        if (index === activeIndex) {
          imgEl.style.transform = 'translateZ(20px) scale(1.05)';
          imgEl.style.opacity = '1';
        } else {
          imgEl.style.transform = 'translateZ(0) scale(0.95)';
          imgEl.style.opacity = '0.7';
        }
      }
    });
  }

  onSwiperInit(swiper: any) {
    console.log('Swiper initialized', swiper);
    this.initSwiper();
  }

  goToSlide(index: number) {
    if (this.productSwiper?.nativeElement?.swiper) {
      this.productSwiper.nativeElement.swiper.slideTo(index);
      this.currentProductIndex = index;
      this.applySlideEffects();
      this.cdr.detectChanges();
    }
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder-product.png';
  }

  get currentProduct(): Product {
    return this.products[this.currentProductIndex];
  }
}