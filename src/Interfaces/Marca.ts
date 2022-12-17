export interface IMarcaGet {
    marca: IMarcas[];
    marcaSeleccionada: IMarcas;
  }
  
  export interface IMarcas {
    id_marca:number,
    nombre:string,
    activo:boolean,
    item_ya_usado:boolean,
  }
  