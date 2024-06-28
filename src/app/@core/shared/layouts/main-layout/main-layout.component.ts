import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  isComponentVisible = false;
  scrollPosition = 0;
  mouseYPosition = 0;

  private updateBottomValue() {
    const footerWrapper = this.elRef.nativeElement.querySelector('#footer-wrapper');
    const footerHeight = footerWrapper.offsetHeight;
    
    // Set the bottom value based on the footer height
    if (footerHeight > 0) {
      this.renderer.setStyle(footerWrapper, 'bottom', `-${footerHeight}px`);
    }
  }

  ngOnInit() {
    this.updateBottomValue();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    // Update the bottom value when the window is resized
    this.updateBottomValue();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollPosition = window.scrollY;
    this.checkVisibility();
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseYPosition = event.clientY;
    this.checkVisibility();
  }

  private checkVisibility() {
    if (this.scrollPosition > 1 || this.mouseYPosition >= window.innerHeight - 20) {
      this.isComponentVisible = true;
    } else {
      this.isComponentVisible = false;
    }
  }
}