
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { textChoiseAdapter } from "../../../../../adapters/textChoices.adapter";
//components
import clienteAxios from "../../../../../config/clienteAxios";
import { IcvComputers } from "../../../../../Interfaces/CV";
import { IGeneric } from "../../../../../Interfaces/Generic";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
//Actions
import { getCvComputersService } from "../../../../../services/cv/CvComputers";
//Interfaces


const useCvComputers = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvComputers } = useAppSelector((state) => state.cv);

    //Local State
    const initialOptions: IGeneric[] = [{
        label: "",
        value: ""
    }]
    const [articuloEncontrado, setArticuloEncontrado] = useState(false);
    const [otrasAplicaciones, setOtrasAplicaciones] = useState(false);
    const [estadoDeActio, setEstadoDeActivo] = useState([initialOptions]);
    const [otrasPerisfericos, setOtrasPerisfericos] = useState(false);


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
        id_articulo: 9,

        tipoDocumento: "",
        codigo: "",
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
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
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

    useEffect(() => {
        const getSelectsOptions = async () => {
            try {
                const { data: estadoDeActivoData } = await clienteAxios.get(
                    "/almacen/choices/estados-articulo/"
                );
                const documentosFormat = textChoiseAdapter(estadoDeActivoData);
                // setEstadoDeActivo(documentosFormat);
            } catch (err) {
                console.log(err);
            }
        };
        getSelectsOptions();
    }, []);

    //submit Hojas de Vida de Computadores
    const onSubmit: SubmitHandler<IcvComputers> = (data) => {
        console.log(data);
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

    const ScreenHistoricoArticulo = () => {
        navigate("/dashboard/almacen/reportes/reporte-historico-activo");
    };

    const ScreenProgramarMantnimiento = () => {
        navigate(
            "/dashboard/almacen/gestion-de-inventario/programacion-mantenimiento"
        );
    };

    const handledSearch = () => {
        dispatch(getCvComputersService(dataCvComputers.codigo));
        setArticuloEncontrado(!articuloEncontrado);
    };
    console.log(dataCvComputers.codigo, 'dataCvComputers.codigo')
    const onGridReady = (params) => {
        console.log(params, 'params');
    };

    const columnDefs = [
        { headerName: "Número", field: "NU", minWidth: 150 },
        { headerName: "Tipo", field: "TI", minWidth: 150 },
        { headerName: "Fecha", field: "FE", minWidth: 150 },
        { headerName: "Estado", field: "ES", minWidth: 150 },
        { headerName: "Responsable", field: "RE", minWidth: 150 },
    ];
    const columnDefs2 = [
        { headerName: "Número", field: "NU", minWidth: 150 },
        { headerName: "Responsable", field: "RE", minWidth: 150 },
        { headerName: "Grupo", field: "GR", minWidth: 150 },
        { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
        { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
        { headerName: "Tipo", field: "TI", minWidth: 150 },
    ];
    const rowData = [
        {
            NU: "01",
            TI: "Correctivo",
            FE: "19/05/2020",
            ES: "Completado",
            RE: "Compuarreglo",
        },
        {
            NU: "02",
            TI: "Correctivo",
            FE: "19/05/2020",
            ES: "Completado",
            RE: "Compuarreglo",
        },
        {
            NU: "03",
            TI: "Correctivo",
            FE: "19/05/2020",
            ES: "Completado",
            RE: "Compuarreglo",
        },
        {
            NU: "04",
            TI: "Correctivo",
            FE: "19/05/2020",
            ES: "Completado",
            RE: "Compuarreglo",
        },
    ];
    const asignacionPrestamos = [
        {
            NU: "01",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
        {
            NU: "02",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
        {
            NU: "03",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
        {
            NU: "04",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
        {
            NU: "05",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
    ];

    return {
        //States
        columnDefs,
        columnDefs2,
        rowData,
        asignacionPrestamos,
        articuloEncontrado,
        otrasAplicaciones,
        estadoDeActio,
        otrasPerisfericos,
        control,
        dataCvComputers,
        defaultColDef,
        errors,
        //Edita States
        setArticuloEncontrado,
        setOtrasAplicaciones,
        setOtrasPerisfericos,
        //Functions
        ScreenHistoricoArticulo,
        ScreenProgramarMantnimiento,
        handledSearch,
        onSubmit,
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        onGridReady
    };
}

export default useCvComputers;