
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { textChoiseAdapter } from "../../../../../adapters/textChoices.adapter";
//components
import clienteAxios from "../../../../../config/clienteAxios";
import { IcvComputers } from "../../../../../Interfaces/CV";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
//Actions

//Interfaces


const useCvComputers = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    // Redux State Extraction
    const { cvComputers } = useAppSelector((state) => state.cv);

    //Local State
    const [orden_nivel, setOrden_nivel] = useState<number>(0);
    const [title_nivel, setTitle_nivel] = useState<string>('Agregar');
    const [title_unidades, setTitle_unidades] = useState<string>('Agregar Unidades');


    //Estado Inicial de Hojas de Vida de Computadores
    const initialState: IcvComputers = {
        id_hoja_de_vida: 1,
        sistema_operativo: "string 3",
        suite_ofimatica: "string 5",
        antivirus: "string 2",
        color: "string 2",
        tipo_de_equipo: "string 2",
        tipo_almacenamiento: "string 6",
        capacidad_almacenamiento: "string 3",
        procesador: "string 2",
        memoria_ram: 12345,
        observaciones_adicionales: "string 2",
        otras_aplicaciones: "string 2",
        ruta_imagen_foto: "/media/string",
        id_articulo: 9
    }
    //configuración de tabla por defecto
    const defaultColDef = {
        sortable: true,
        editable: false,
        flex: 1,
        filter: true,
        wrapHeaderText: true,
        resizable: true,
        initialWidth: 200,
        autoHeaderHeight: true,
        suppressMovable: true,
    };

    //useForm Hojas de Vida de Computadores
    const {
        register: register,
        handleSubmit: handleSubmit,
        control: control,
        reset: reset,
        watch: watch,
        setValue: setValue,
        formState: { errors: errors },

    } = useForm<IcvComputers>({ defaultValues: initialState });
    const dataCvComputers = watch();

    //columnas hojas de vida de computadoresf
    // const columns = [
    //     { headerName: "Nivel", field: "orden_nivel", minWidth: 100 },
    //     { headerName: "Nombre", field: "nombre", minWidth: 200 },
    //     {
    //         headerName: "Acciones",
    //         field: "editar",
    //         minWidth: 140,
    //         cellRendererFramework: ({ data }) => (
    //             <div className="d-flex justify-content-center gap-1">
    //                 <button
    //                     type="button"
    //                     title="Editar"
    //                     style={{ border: "none", background: "none" }}
    //                     onClick={() => {
    //                         setTitle_nivel('Editar');
    //                         setOrden_nivel(data.orden_nivel);
    //                         resetNivel(data)
    //                     }}
    //                 >
    //                     <i className="fa-regular fa-pen-to-square fs-3"></i>
    //                 </button>
    //                 <button
    //                     className={`${data.orden_nivel !== levelsOrganigram[levelsOrganigram.length - 1].orden_nivel && "d-none"}`}
    //                     style={{ border: "none", background: "none" }}
    //                     type="button"
    //                     title="Eliminar"
    //                     onClick={() => {
    //                         // deleteLevel(data.orden_nivel)
    //                     }}
    //                 >
    //                     <i className="fa-regular fa-trash-can fs-3"></i>
    //                 </button>
    //             </div>
    //         ),
    //     },
    // ];

    //useEffect para consultar  options
    useEffect(() => {
        const getSelectsOptions = async () => {
            try {
                const { data: agrupacionDocumentalNoFormat } = await clienteAxios.get("almacen/choices/agrupacion-documental/");
                const { data: tipoUnidadNoFormat } = await clienteAxios.get("almacen/choices/tipo-unidad/");

                const agrupacionDocumentalFormat = textChoiseAdapter(agrupacionDocumentalNoFormat);
                const tipoUnidadFormat = textChoiseAdapter(tipoUnidadNoFormat);

                // setOptionAgrupacionD(agrupacionDocumentalFormat.map(item => ({ ...item, isDisabled: false })));
                // setOptionTipoUnidad(tipoUnidadFormat.map(item => ({ ...item, isDisabled: false })));
            } catch (err) {
                console.log(err);
            }
        };
        getSelectsOptions();
    }, []);

    //submit Hojas de Vida de Computadores
    const submit: SubmitHandler<IcvComputers> = () => {

    };
    //Funcion para crear hoja de vida de computadores
    const getCv = () => {

    };
    //Funcion para crear hoja de vida de computadores
    const createCv = () => {

    };
    //Funcion para actualizar hoja de vida de computadores
    const updateCv = () => {

    };


    //Funcion para eliminar hoja de vida de computadores
    const deleteCv = (id) => {

    }

    const onGridReady = (params) => {
        console.log(params, 'params');
    };

    return {
        //States

        //Edita States

        //Functions

    };
}

export default useCvComputers;