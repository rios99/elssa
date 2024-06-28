import { Component, Inject, OnInit, HostListener } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: "app-cm-mensaje-frmdinamico",
  templateUrl: "./cm-mensaje-frmdinamico.component.html",
  styleUrls: ["./cm-mensaje-frmdinamico.component.scss"],
})
export class CmMensajeFrmdinamicoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CmMensajeFrmdinamicoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.checkScreenSize();
  }

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const isMobile = window.innerWidth <= 600;

    if (isMobile) {
      // Aplicar el cambio de tamaño solo en versiones móviles
      this.dialogRef.updateSize("auto", "auto");
    }
  }
  cerrar() {
    this.dialogRef.close();
  }
}
