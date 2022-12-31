import { IBienes } from "./Bienes";
export interface INodo {
    key:string;
    data:data;
    children?:INodo[]
  }

  interface data{
    nombre:string;
    codigo:string;
    acciones?:string;
    id_nodo:number;
    crear?:boolean;
    editar?:boolean;
    eliminar?:boolean;
    bien?:IBienes;
  }