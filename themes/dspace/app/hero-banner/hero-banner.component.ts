import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ds-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeroBannerComponent implements OnInit, OnDestroy {

  currentSlide = 0;
  autoSlideInterval: any;
  autoSlideDelay = 7000; // 7 seconds
  currentLang = 'en';
  deviceType: 'desktop' | 'tablet' | 'mobile' = 'desktop';
  private destroy$ = new Subject<void>();

  // Image collections for different devices and languages
  private imageCollections = {
    desktop: {
      en: [
        'assets/images/hero-banners/desktop/en/hero-desktop-en-1.jpg',
        'assets/images/hero-banners/desktop/en/hero-desktop-en-2.jpg',
        'assets/images/hero-banners/desktop/en/hero-desktop-en-3.jpg',
        'assets/images/hero-banners/desktop/en/hero-desktop-en-4.jpg',
        'assets/images/hero-banners/desktop/en/hero-desktop-en-5.jpg'
      ],
      ta: [
        'assets/images/hero-banners/desktop/ta/hero-desktop-ta-1.jpg',
        'assets/images/hero-banners/desktop/ta/hero-desktop-ta-2.jpg',
        'assets/images/hero-banners/desktop/ta/hero-desktop-ta-3.jpg',
        'assets/images/hero-banners/desktop/ta/hero-desktop-ta-4.jpg',
        'assets/images/hero-banners/desktop/ta/hero-desktop-ta-5.jpg'
      ]
    },
    tablet: {
      en: [
        'assets/images/hero-banners/tablet/en/hero-tablet-en-1.jpg',
        'assets/images/hero-banners/tablet/en/hero-tablet-en-2.jpg',
        'assets/images/hero-banners/tablet/en/hero-tablet-en-3.jpg',
        'assets/images/hero-banners/tablet/en/hero-tablet-en-4.jpg',
        'assets/images/hero-banners/tablet/en/hero-tablet-en-5.jpg'
      ],
      ta: [
        'assets/images/hero-banners/tablet/ta/hero-tablet-ta-1.jpg',
        'assets/images/hero-banners/tablet/ta/hero-tablet-ta-2.jpg',
        'assets/images/hero-banners/tablet/ta/hero-tablet-ta-3.jpg',
        'assets/images/hero-banners/tablet/ta/hero-tablet-ta-4.jpg',
        'assets/images/hero-banners/tablet/ta/hero-tablet-ta-5.jpg'
      ]
    },
    mobile: {
      en: [
        'assets/images/hero-banners/mobile/en/hero-mobile-en-1.jpg',
        'assets/images/hero-banners/mobile/en/hero-mobile-en-2.jpg',
        'assets/images/hero-banners/mobile/en/hero-mobile-en-3.jpg',
        'assets/images/hero-banners/mobile/en/hero-mobile-en-4.jpg',
        'assets/images/hero-banners/mobile/en/hero-mobile-en-5.jpg'
      ],
      ta: [
        'assets/images/hero-banners/mobile/ta/hero-mobile-ta-1.jpg',
        'assets/images/hero-banners/mobile/ta/hero-mobile-ta-2.jpg',
        'assets/images/hero-banners/mobile/ta/hero-mobile-ta-3.jpg',
        'assets/images/hero-banners/mobile/ta/hero-mobile-ta-4.jpg',
        'assets/images/hero-banners/mobile/ta/hero-mobile-ta-5.jpg'
      ]
    }
  };

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    // Set initial language
    this.currentLang = this.translateService.currentLang || this.translateService.getDefaultLang() || 'en';

    // Subscribe to language changes
    this.translateService.onLangChange.pipe(
      takeUntil(this.destroy$)
    ).subscribe((event) => {
      this.currentLang = event.lang;
      this.currentSlide = 0; // Reset to first slide when language changes
    });

    this.checkScreenSize();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Start automatic sliding
   */
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoSlideDelay);
  }

  /**
   * Stop automatic sliding
   */
  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  /**
   * Get current hero images based on device type and language
   */
  get heroImages(): string[] {
    const langKey = this.currentLang === 'ta' ? 'ta' : 'en';
    return this.imageCollections[this.deviceType][langKey] || this.imageCollections.desktop.en;
  }

  /**
   * Check screen size and set device type
   */
  @HostListener('window:resize', ['$event'])
  checkScreenSize(): void {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      const previousDeviceType = this.deviceType;

      if (width <= 768) {
        this.deviceType = 'mobile';
      } else if (width <= 1200) {
        this.deviceType = 'tablet';
      } else {
        this.deviceType = 'desktop';
      }

      // Reset current slide when switching between device types
      if (previousDeviceType !== this.deviceType) {
        this.currentSlide = 0;
      }
    }
  }

  /**
   * Go to next slide
   */
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.heroImages.length;
  }

  /**
   * Go to previous slide
   */
  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.heroImages.length - 1 : this.currentSlide - 1;
  }

  /**
   * Go to specific slide
   */
  goToSlide(index: number): void {
    this.currentSlide = index;
    // Restart auto-slide timer when manually navigating
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  /**
   * Pause auto-slide on hover
   */
  onMouseEnter(): void {
    this.stopAutoSlide();
  }

  /**
   * Resume auto-slide when mouse leaves
   */
  onMouseLeave(): void {
    this.startAutoSlide();
  }
}