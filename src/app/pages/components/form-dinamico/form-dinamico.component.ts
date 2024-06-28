import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/localStorage.service';
import { constantesLocalStorage } from '../../@models/constantes';
import { PagesService } from '../../services/pages.service';
import { I_archivosDescarga, I_empleador, I_grupos, I_inicioOperacion, I_opciones, } from '../../@models/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { SolicitaEmailComponent } from '../../solicita-email/solicita-email.component';
import { FinalizaOrientacionComponent } from '../../finaliza-orientacion/finaliza-orientacion.component';
import Swal from 'sweetalert2';
import { data } from 'autoprefixer';

@Component({
  selector: "app-form-dinamico",
  templateUrl: "./form-dinamico.component.html",
  styleUrls: ["./form-dinamico.component.scss"],
})
export class FormDinamicoComponent implements OnInit, OnDestroy {
  $listSubcription: Subscription[] = [];
  frmData!: FormGroup;
  pasoUno: boolean = true;
  pasoDos: boolean = false;
  pasoTres: boolean = false;
  usuarioStorage: string = "";
  listaGrupos: I_grupos[] = [];
  visibleBtnSgt: boolean = true;
  mensajeDinamico: string = "";
  listaBtnDinamicos: I_opciones[] = [];
  listaArchivosDescarga: I_archivosDescarga[] = [];
  visibleBtnFinalizar: boolean = false;
  visibleBtnRetroceder: boolean = false;
  visibleCabecera: Boolean = true;
  //visibleBtnQuestion: Boolean = true;
  visibleBtnInicio: Boolean = true;
  finalizaMostrarDiagnostico: boolean = false;

  /*VARIABLES PARA VALIDAR SI EXISTE DATA EN LOCALSTORAGE*/
  visExisteDataStorage: boolean = false;
  promesaDecisiónUsuario!: Promise<boolean>;
  //private resolverDecisionUsuario!: (decision: boolean) => void;
  /*VARIABLES PARA VALIDAR SI EXISTE DATA EN LOCALSTORAGE*/

  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private servicePages: PagesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    //this.localStorage.limpiar();
    this.createFrm();
    this.vDataStorage();
    // this.enviarDiagnostico();
  }

  ngOnDestroy() {
    if (this.$listSubcription != undefined) {
      this.$listSubcription.forEach((sub) => sub.unsubscribe());
    }
  }

  createFrm() {
    this.frmData = this.fb.group({
      nombreUsuario: [
        {
          value: null,
          disabled: false,
        },
        [Validators.required],
      ],
      rucEmpresa: [
        {
          value: null,
          disabled: false,
        },
        [Validators.required],
      ],
    });
  }

  vDataStorage() {
    const tieneDatos = this.validaDataStorage();
    this.getDecisionUsuario(tieneDatos);
    console.log("tieneDatos : ", tieneDatos);
    
    if (tieneDatos) {
      return
    }
  }

  validarNumero(event: any) {
    const valorInput = event.target.value;
    event.target.value = valorInput.replace(/[^0-9]/g, "").substring(0, 15);
  }
  validarTexto(event: any) {
    const valorInput = event.target.value;
    event.target.value = valorInput.replace(/[^a-zA-Z\s]/g, "");
  }

  getSiguiente() {
    
    if((this.frmData.get("nombreUsuario")?.value == null && this.pasoUno == true)){
      this.getMessage("Por favor, debe ingresar su nombre.");
      return;
    }
    if(this.pasoUno == true && this.frmData.get("nombreUsuario")?.value.length < 3){
      this.getMessage("El nombre debe tener mínimo 3 dígitos.");
      return;
    }
    if (this.pasoUno && this.frmData.get("nombreUsuario")?.value.length >= 3) {
      this.dataStorage(true, "nombreUsuario");
      this.pasoUno = false;
      this.pasoDos = true;
      this.pasoTres = false;
    } else if (this.pasoDos) {
      const $empleadores = this.servicePages
        .empleadores(this.frmData.get("rucEmpresa")?.value)
        .subscribe({
          next: (rpta: I_empleador) => {
            const object = {
              empleador: rpta.razonSocial,
              numeroRUC: rpta.ruc,
            };
            this.dataStorage(false, object);
            this.pasoUno = false;
            this.pasoDos = false;
            this.pasoTres = true;
            this.getListaGrupos(rpta.razonSocial, rpta.ruc);
          },
          error: (err: any) => {
            //this.getMessage(err.error.mensaje)
            if (this.frmData.get("rucEmpresa")?.value == null || this.frmData.get("rucEmpresa")?.value.length < 11) {
              this.getMessage("El número de RUC debe tener 11 dígitos");
              return;
            }
            this.getMessage(
              err.status == 404
                ? "Ingrese un número de RUC válido"
                : "Lo sentimos ocurrió un error"
            );
            this.visibleBtnSgt = true;
          },
          complete: () => { },
        });
      this.$listSubcription.push($empleadores);
    }
  }

  getListaGrupos(nombre: string, ruc: string) {
    const $listarGrupos = this.servicePages
      .listarGrupos(nombre, ruc)
      .subscribe({
        next: (rpta: any) => {
          //this.listaGrupos = rpta;
          this.listaGrupos = [];
          rpta.forEach((item: any) => {
            this.listaGrupos.push({
              codigo: item.codigo,
              descripcion: item.descripcion,
              flagGrupoCompleto: item.flagGrupoCompleto > 0 ? true : false,
            });
          });
          this.pasoUno = false;
          this.pasoDos = false;
          this.pasoTres = true;
          this.visibleBtnSgt = false;
          this.visibleBtnRetroceder = true;
          this.visibleCabecera = false;
        },
        error: (err: any) => {
          this.visibleBtnSgt = true;
        },
        complete: () => { },
      });
    this.$listSubcription.push($listarGrupos);
  }

  getOpcionGrupo(codigo: number) {
    const object = {
      codigoBtnGrupo: codigo,
      codigoGrupo: codigo,
    };
    this.dataStorage(false, object);
    this.visibleBtnSgt = true;
    this.pasoUno = false;
    this.pasoDos = false;
    this.pasoTres = false;
    this.getIniciarOrientacion();
  }

  getIniciarOrientacion() {
    this.listaArchivosDescarga = [];
    const data = {
      nombreCompleto: constantesLocalStorage.usuario,
      rucEmpleador: constantesLocalStorage.numeroRUC,
      codigoGrupo: constantesLocalStorage.codigoGrupo,
    };

    const $iniciarOrientacion = this.servicePages
      .iniciarOrientacion(data)
      .subscribe({
        next: (rpta: I_inicioOperacion) => {
          this.visibleBtnSgt = false;
          const nuevosValores = {
            nombreCompletoEmpleado: this.toUpperCaseAll(
              constantesLocalStorage.usuario
            ),
            razonSocialEmpleador: this.toUpperCaseAll(
              constantesLocalStorage.empleador
            ), //empleador.razonSocial),
          };
          this.mensajeDinamico = this.reemplazarValores(
            rpta.descripcionPregunta,
            nuevosValores
          );
          this.listaBtnDinamicos = rpta.opciones;
          this.getArchivosDinamicos(rpta);
          const object = {
            numeroRUC: constantesLocalStorage.numeroRUC, //empleador.ruc,
            empleador: this.toTitleCaseAll(constantesLocalStorage.empleador), //empleador.razonSocial),
            codigoOrientacion: rpta.codigoOrientacion,
            codigoPregunta: rpta.codigoPregunta,
            codigoGrupo:
              rpta.opciones.length > 0 ? rpta.opciones[0].codigo : undefined,
          };
          this.dataStorage(false, object);
        },
        error: (err: any) => { },
        complete: () => { },
      });
    this.$listSubcription.push($iniciarOrientacion);
  }

  getDataDinamica(codigoRespuesta: number) {
    this.listaArchivosDescarga = [];
    console.log("codigoRespuesta : ", codigoRespuesta);
    console.log("constantesLocalStorage : ", constantesLocalStorage);
    /*constantesLocalStorage.codigoPreguntaAnterior = constantesLocalStorage.codigoPregunta
    constantesLocalStorage.codigoRespuestaAnterior = codigoRespuesta*/
    const data = {
      codigoOrientacion: constantesLocalStorage.codigoOrientacion,
      codigoPregunta: constantesLocalStorage.codigoPregunta,
      codigoGrupo: constantesLocalStorage.codigoGrupo,
      codigoRespuesta: codigoRespuesta,
    };
    const $obtenerPreguntaOpciones = this.servicePages
      .obtenerPreguntaOpciones(data)
      .subscribe({
        next: (rpta: any) => {
          //debugger;
          /*this.visibleBtnFinalizar = rpta.finalizaOrientacion == "S" ? true : false;
          this.visibleBtnRetroceder = rpta.finalizaOrientacion == "S" ? false : true;*/
          this.visibleBtnFinalizar =
            rpta.flagMostrarDiagnostico == "S" ? true : false;
          this.visibleBtnRetroceder =
            rpta.flagMostrarDiagnostico == "S" ||
              rpta.finalizaOrientacion == "S"
              ? false
              : true;
          this.finalizaMostrarDiagnostico =
            rpta.finalizaOrientacion == "S" ? true : false;
          this.mensajeDinamico = "";
          this.listaBtnDinamicos = [];
          const nuevosValores = {
            nombreCompletoEmpleado: this.toUpperCaseAll(
              constantesLocalStorage.usuario
            ),
            razonSocialEmpleador: this.toUpperCaseAll(
              constantesLocalStorage.empleador
            ),
          };
          this.mensajeDinamico = this.reemplazarValores(
            rpta.descripcionPregunta,
            nuevosValores
          );
          this.listaBtnDinamicos = rpta.opciones;
          this.getArchivosDinamicos(rpta);
          const object = {
            codigoPregunta: rpta.codigoPregunta,
            codigoPreguntaAnterior: constantesLocalStorage.codigoPregunta,
            codigoRespuesta: codigoRespuesta,
            codigoRespuestaAnterior: codigoRespuesta,
          };
          this.dataStorage(false, object);
        },
        error: (err: any) => { },
        complete: () => { },
      });
    this.$listSubcription.push($obtenerPreguntaOpciones);
  }

  getArchivosDinamicos(data: any) {
    for (const key of Object.keys(data)) {
      if (key.startsWith("flagUrlDescarga") && data[key] === "S") {
        const index = key.replace("flagUrlDescarga", "");
        const urlKey = `urlDescarga${index}`;
        const descripcionKey = `descripcionUrlDescarga1${index}`;
        const tipoDocumentoApoyoURL = `tipoDocumentoApoyoURL${index}`;

        if (data[urlKey] !== null) {
          this.listaArchivosDescarga.push({
            flagUrlDescarga: data[key],
            urlDescarga: data[urlKey],
            descripcion: data[descripcionKey],
            tipoDocumentoApoyoURL: data[tipoDocumentoApoyoURL],
          });
        }
      }
    }
  }

  getFinalizar() {
    const $obtenerFicha = this.servicePages
      .obtenerFicha(constantesLocalStorage.codigoOrientacion)
      .subscribe({
        next: (rpta: any) => {
          const mediaType = "application/pdf";
          const blob = new Blob([rpta.body], { type: mediaType });
          const filename = constantesLocalStorage.codigoOrientacion
            .toString()
            .concat(".pdf");

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.target = "_blank";
          a.click();

          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);
        },
        error: (err: any) => { },
        complete: () => { },
      });
    this.$listSubcription.push($obtenerFicha);
  }

  getDownloadDinamica(urlDescarga: string) {
    window.open(urlDescarga, "_blank");
  }

  retroceder() {
    this.visibleBtnSgt = false;
    this.listaArchivosDescarga = [];
    if (constantesLocalStorage.codigoOrientacion == undefined) {
      this.visibleCabecera = true;
      this.pasoUno = true;
      this.pasoDos = false;
      this.pasoTres = false;
      this.visibleBtnSgt = true;
      this.visibleBtnRetroceder = false;
      this.frmData.get("nombreUsuario")?.setValue(null);
      this.frmData.get("rucEmpresa")?.setValue(null);
      return;
    }
    const $retroceder = this.servicePages
      .retroceder(constantesLocalStorage.codigoOrientacion)
      .subscribe({
        next: (rpta: any) => {
          if (!this.validarCamposRetroceder(rpta)) {
            this.eliminarConsulta();
            return;
          }
          //this.visibleBtnFinalizar = rpta.finalizaOrientacion == "S" ? true : false;
          this.visibleBtnFinalizar =
            rpta.flagMostrarDiagnostico == "S" ? true : false;
          this.mensajeDinamico = "";
          this.listaBtnDinamicos = [];
          const nuevosValores = {
            nombreCompletoEmpleado: this.toUpperCaseAll(
              constantesLocalStorage.usuario
            ),
            razonSocialEmpleador: this.toUpperCaseAll(
              constantesLocalStorage.empleador
            ),
          };
          this.mensajeDinamico = this.reemplazarValores(
            rpta.descripcionPregunta,
            nuevosValores
          );
          this.listaBtnDinamicos = rpta.opciones;
          this.getArchivosDinamicos(rpta);
          const object = {
            codigoPregunta: rpta.codigoPregunta,
            codigoRespuesta: rpta.codigoRespuesta,
          };
          this.dataStorage(false, object);
        },
        error: (err: any) => { },
        complete: () => { },
      });
    this.$listSubcription.push($retroceder);
  }

  reemplazarValores(texto: string, valores: Record<string, string>): string {
    const regex = /\[([^\]]+)\]/g;
    const resultado = texto.replace(regex, (_, match) => {
      if (valores.hasOwnProperty(match)) {
        return valores[match];
      } else {
        return _;
      }
    });
    return resultado;
  }

  toUpperCaseAll(input: string): string {
    return input.toUpperCase();
  }

  toTitleCaseAll(input: string): string {
    return input.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
  }

  toTitleCaseFirstWord(input: string): string {
    const words = input.toLowerCase().split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
  }

  dataStorage(procesoHome: boolean, objeto?: any) {
    let data = {};
    if (procesoHome) {
      data = {
        nombreUsuario: this.toTitleCaseAll(
          this.frmData.get("nombreUsuario")?.value
        ),
      };
    } else {
      const localStorageKey = "SUNAFIL_ORIENTACIONCOMITE";
      const objetoExistenteStr = localStorage.getItem(localStorageKey);

      let objetoExistente: Record<string, any> = {};
      if (objetoExistenteStr) {
        try {
          objetoExistente = JSON.parse(objetoExistenteStr);
        } catch (error) { }
      }

      if (objeto && typeof objeto === "object") {
        Object.keys(objeto).forEach((key) => {
          objetoExistente[key] = objeto[key];
        });
      }

      try {
        data = objetoExistente;
      } catch (error) { }
    }

    this.localStorage.setearData(data);
    constantesLocalStorage.usuario =
      this.localStorage.obtenerDataGeneral().nombreUsuario;
    constantesLocalStorage.numeroRUC =
      this.localStorage.obtenerDataGeneral().numeroRUC;
    constantesLocalStorage.empleador =
      this.localStorage.obtenerDataGeneral().empleador;
    constantesLocalStorage.codigoBtnGrupo =
      this.localStorage.obtenerDataGeneral().codigoBtnGrupo;
    constantesLocalStorage.codigoOrientacion =
      this.localStorage.obtenerDataGeneral().codigoOrientacion;
    constantesLocalStorage.codigoGrupo =
      this.localStorage.obtenerDataGeneral().codigoGrupo;
    constantesLocalStorage.codigoPregunta =
      this.localStorage.obtenerDataGeneral().codigoPregunta;
    constantesLocalStorage.codigoPreguntaAnterior =
      this.localStorage.obtenerDataGeneral().codigoPreguntaAnterior;
    constantesLocalStorage.codigoRespuesta =
      this.localStorage.obtenerDataGeneral().codigoRespuesta;
    constantesLocalStorage.codigoRespuestaAnterior =
      this.localStorage.obtenerDataGeneral().codigoRespuestaAnterior;

    this.usuarioStorage = constantesLocalStorage.usuario;
  }

  validarCamposRetroceder(data: any): boolean {
    let valid: boolean = true;

    if (data.codigoOrientacion == null) {
      valid = false;
    }

    return valid;
  }

  conformidad(tipo: string) {
    const $getConformidad = this.servicePages
      .getConformidad(constantesLocalStorage.codigoOrientacion, tipo)
      .subscribe({
        next: (rpta: any) => {
          const mediaType = "application/pdf";
          const blob = new Blob([rpta.body], { type: mediaType });
          const filename = constantesLocalStorage.codigoOrientacion
            .toString()
            .concat(".pdf");

          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.target = "_blank";
          a.click();

          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 100);
        },
        error: (err: any) => { },
        complete: () => { },
      });
    this.$listSubcription.push($getConformidad);
  }

  eliminarConsulta() {
    const $backHome = this.servicePages
      .eliminar(constantesLocalStorage.codigoOrientacion)
      .subscribe({
        next: (rpta: any) => {
          this.visibleBtnFinalizar = false;
          this.mensajeDinamico = "";
          this.listaBtnDinamicos = [];
          constantesLocalStorage.usuario = "";
          constantesLocalStorage.numeroRUC = "";
          constantesLocalStorage.empleador = "";
          constantesLocalStorage.codigoBtnGrupo = 0;
          constantesLocalStorage.codigoOrientacion = 0;
          constantesLocalStorage.codigoGrupo = 0;
          constantesLocalStorage.codigoPregunta = 0;
          constantesLocalStorage.codigoRespuesta = 0;
          this.usuarioStorage = constantesLocalStorage.usuario;

          this.localStorage.limpiar();
          this.pasoUno = true;
          this.pasoDos = false;
          this.pasoTres = false;
          this.visibleBtnSgt = true;
          this.visibleBtnRetroceder = false;
          this.frmData.get("nombreUsuario")?.setValue(null);
          this.frmData.get("rucEmpresa")?.setValue(null);
        },
        error: (err: any) => { },
        complete: () => { },
      });
    this.$listSubcription.push($backHome);
  }

  enviarDiagnostico() {
    const dialogRef = this.dialog.open(SolicitaEmailComponent, {
      width: "30%",
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }

  getOpcionesInicial() {
    this.listaArchivosDescarga = [];
    const data = {
      codigoOrientacion: constantesLocalStorage.codigoOrientacion,
      codigoGrupo: constantesLocalStorage.codigoGrupo,
      codigoPregunta: 71,
      codigoRespuesta: 1,
    };
    const $obtenerPreguntaOpciones = this.servicePages
      .obtenerPreguntaOpciones(data)
      .subscribe({
        next: (rpta: any) => {
          //this.visibleBtnFinalizar = rpta.finalizaOrientacion == "S" ? true : false;
          this.visibleBtnFinalizar =
            rpta.flagMostrarDiagnostico == "S" ? true : false;
          this.mensajeDinamico = "";
          this.listaBtnDinamicos = [];
          const nuevosValores = {
            nombreCompletoEmpleado: this.toUpperCaseAll(
              constantesLocalStorage.usuario
            ),
            razonSocialEmpleador: this.toUpperCaseAll(
              constantesLocalStorage.empleador
            ),
          };
          this.mensajeDinamico = this.reemplazarValores(
            rpta.descripcionPregunta,
            nuevosValores
          );
          this.listaBtnDinamicos = rpta.opciones;
          this.getArchivosDinamicos(rpta);
          const object = {
            codigoPregunta: rpta.codigoPregunta,
            codigoRespuesta: 71,
          };
          this.dataStorage(false, object);
        },
        error: (err: any) => { },
        complete: () => { },
      });
    this.$listSubcription.push($obtenerPreguntaOpciones);
  }

  finalizarMDiagnostico() {
    const dialogRef = this.dialog.open(FinalizaOrientacionComponent, {
      height: "150px",
      width: "600px",
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }

  getMessage(mensaje: string) {
    Swal.fire(mensaje);
  }

  /*LOGICA PARA VALIDAR SI EXISTE DATA EN LOCALSTORAGE Y SI DESEA CONTINUAR O NO CON EL REGISTRO*/
  validaDataStorage() {
    const dataStorage = this.localStorage.obtenerDataGeneral();
    if (dataStorage === null) { return false }
    return Object.keys(dataStorage).length !== 0;
  }

  setDataContinuaRegistro() {
    const dataStorage = this.localStorage.obtenerDataGeneral();
    if (dataStorage && Object.keys(dataStorage).length !== 0) {
      console.log("validaDataStorage 01 : ", dataStorage);
      if (dataStorage.codigoRespuesta) {
        this.visibleCabecera = false;
        this.visibleBtnSgt = false;
        this.pasoUno = false;
        this.pasoDos = false;
        this.pasoTres = false;

        constantesLocalStorage.usuario = dataStorage.nombreUsuario
        constantesLocalStorage.empleador = dataStorage.empleador
        constantesLocalStorage.codigoOrientacion = dataStorage.codigoOrientacion
        constantesLocalStorage.codigoGrupo = dataStorage.codigoGrupo
        constantesLocalStorage.codigoPregunta = dataStorage.codigoPreguntaAnterior
        constantesLocalStorage.codigoRespuesta = dataStorage.codigoRespuestaAnterior
        this.getDataDinamica(dataStorage.codigoRespuesta)
      } else if (dataStorage.codigoPregunta) {
        this.visibleCabecera = false;
        this.visibleBtnSgt = false;
        this.pasoUno = false;
        this.pasoDos = false;
        this.pasoTres = false;

        constantesLocalStorage.usuario = dataStorage.nombreUsuario
        constantesLocalStorage.numeroRUC = dataStorage.numeroRUC
        constantesLocalStorage.codigoGrupo = dataStorage.codigoGrupo
        this.getIniciarOrientacion()
      } else if (dataStorage.numeroRUC) {
        this.pasoUno = false;
        this.pasoDos = false;
        this.pasoTres = true;
        this.usuarioStorage = dataStorage.nombreUsuario;
        this.getListaGrupos(dataStorage.empleador, dataStorage.numeroRUC);
      } else if (dataStorage.nombreUsuario) {
        this.pasoUno = false;
        this.pasoDos = true;
        this.pasoTres = false;
        this.usuarioStorage = dataStorage.nombreUsuario;
      }
    }
  }

  getDecisionUsuario(tieneDatos: boolean) {
    if (!tieneDatos) return;

    Swal.fire({
      title: "Estimado usuario, tiene una solicitud por completar. ",
      text: "¿Desea continuar con su registro?",
      icon: "warning",
      backdrop: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        this.setDataContinuaRegistro();
      } else if (result.isDismissed) {
        this.localStorage.limpiar();
      }
    });

  }

  /*LOGICA PARA VALIDAR SI EXISTE DATA EN LOCALSTORAGE Y SI DESEA CONTINUAR O NO CON EL REGISTRO*/

}