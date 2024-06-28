import { environment } from "src/environments/environment";

const webApi7 = environment.aplicativosWeb7;
const webApi8 = environment.aplicativosWeb8;

const controllerSunat: string = webApi7+'sunat';
const controllerComite: string = webApi8+'comite';


export const constantesApiWeb = {
  grupos: controllerComite + '/grupos',
  empleadores: controllerSunat + '/empleadores',
  iniciarOrientacion: controllerComite + '/iniciarOrientacion',
  obtenerPreguntaOpciones: controllerComite + '/obtenerPreguntaOpciones',
  obtenerFicha: controllerComite + '/ficha',
  retroceder: controllerComite + '/retroceder',

  listarPreguntas: controllerComite + '/preguntas',
  guardarPreguntas: controllerComite + '/preguntas',
  listarRespuesta: controllerComite + '/respuestas',
  guardarRespuesta: controllerComite + '/respuestas',
  listarPreguntasPorRespuesta: controllerComite + '/preguntas',
  guardarPreguntasPorRespuesta: controllerComite + '/preguntaXRespuesta',

  eliminar: controllerComite + '/eliminar',
  obtenerPreguntaFrecuentes: controllerComite + '/preguntasFrecuentes',
  enviarEmail: controllerComite + '/ficha/enviarCorreo',
};
