import { Component, Inject, OnInit, HostListener  } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cm-mensaje-home',
  templateUrl: './cm-mensaje-home.component.html',
  styleUrls: ['./cm-mensaje-home.component.scss']
})
export class CmMensajeHomeComponent implements OnInit {
  videoUrl: SafeResourceUrl;
  
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<CmMensajeHomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/d6d4aoRIK_U');
    const youtubeVideoId = '0-GchtzYOYU';
    const autoplayParam = 'si=r5vllYgNi22cHThc';
    const fullUrl = `https://www.youtube.com/embed/${youtubeVideoId}?${autoplayParam}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl); 
  }

  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const isMobile = window.innerWidth <= 600;

    if (isMobile) {
      // Aplicar el cambio de tamaño solo en versiones móviles
      this.dialogRef.updateSize('auto', 'auto');
    }
  }

  cerrar(){
    this.dialogRef.close();
  }
}
