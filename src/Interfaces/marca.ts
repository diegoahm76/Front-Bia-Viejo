export interface IMarca {
    marcas: IMarcaModel[];
    marcaSeleccionada: IMarcaModel;
}

export interface IMarcaModel {
    id_marca: number,
    nombre: string;
    activo: boolean,
    item_ya_usado: boolean
}