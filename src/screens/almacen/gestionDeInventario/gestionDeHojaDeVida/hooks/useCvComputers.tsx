
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal, { SweetAlertIcon } from "sweetalert2";
//components
import clienteAxios from "../../../../../config/clienteAxios";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
//Actions
import { createCvComputersService, getCvComputersService, getCvMaintenanceService } from "../../../../../services/cv/CvComputers";
//Interfaces
import { IcvComputersForm, IList } from "../../../../../Interfaces/CV";


const useCvComputers = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvComputers } = useAppSelector((state) => state.cv);

    //Local State
    const initialOptions: IList[] = [{
        label: "",
        value: 0,
    }]
    const [articuloEncontrado, setArticuloEncontrado] = useState<boolean>(false);
    const [otrasAplicaciones, setOtrasAplicaciones] = useState<boolean>(false);
    const [otrasPerisfericos, setOtrasPerisfericos] = useState<boolean>(false);
    const [busquedaArticuloModalOpen, setBusquedaArticuloModalOpen] = useState<boolean>(false);
    const [ListMark, setListMark] = useState<IList[]>(initialOptions);
    const [file, setFile] = useState(null);

    //Estado Inicial de Hojas de Vida de Computadores
    const initialState: IcvComputersForm = {
        sistema_operativo: '',
        suite_ofimatica: '',
        antivirus: '',
        color: '',
        tipo_de_equipo: '',
        tipo_almacenamiento: '',
        capacidad_almacenamiento: '',
        procesador: '',
        memoria_ram: '',
        observaciones_adicionales: '',
        otras_aplicaciones: '',
        ruta_imagen_foto: '',
        id_articulo: 0,

        codigo_bien: '',
        cod_tipo_bien: '',
        nombre: '',
        doc_identificador_nro: '',
        marca: { label: '', value: 0 },
        estado: '',
        id_bien: 0,
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
        formState: { errors: errors },

    } = useForm<IcvComputersForm>({ defaultValues: initialState });
    const dataCvComputers = watch();

    //Función para las alertas
    const notificationSuccess = (message = 'Proceso Exitoso', state: SweetAlertIcon) => Swal.mixin({
        position: 'center',
        icon: state,
        title: message,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
    }).fire();

    //useEffect para consultar  options
    useEffect(() => {
        const getSelectsOptions = async () => {
            try {
                const { data: listMarkData } = await clienteAxios.get("/almacen/marcas/get-list/");

                setListMark(listMarkData.map((item) => ({ label: item.nombre, value: item.id_marca })));
            } catch (err) {
                console.log(err);
            }
        };
        getSelectsOptions();
    }, []);

    //useEffect para consultar Mantenimiento
    useEffect(() => {
        if (cvComputers && !cvComputers.tiene_hoja_vida) dispatch(getCvMaintenanceService(cvComputers.id_bien));
    }, [cvComputers]);

    // ueeEffect para obtener el organigrama a editar
    useEffect(() => {
        if (cvComputers && !cvComputers.tiene_hoja_vida) {
            let data = {
                ...cvComputers,
                marca: { label: cvComputers.marca, value: cvComputers.id_marca },
                nombre: cvComputers.nombre,
                cod_tipo_bien: cvComputers.cod_tipo_bien,
                codigo_bien: cvComputers.codigo_bien,
                doc_identificador_nro: cvComputers.doc_identificador_nro,
                estado: cvComputers.estado,
                id_articulo: cvComputers.id_bien,
            };
            reset(data);
        } else if (cvComputers) {
            notificationSuccess('El bien ya tiene una hoja de vida', 'warning');
            reset(initialState);
            setFile(null);
        }
    }, [cvComputers]);

    //ueeEffect para cambiar el estado de articuloEncontrado
    useEffect(() => {
        if (cvComputers && !cvComputers.tiene_hoja_vida) {
            setArticuloEncontrado(true);
        } else {
            setArticuloEncontrado(false);
        }
    }, [cvComputers]);

    //submit Hojas de Vida de Computadores
    const onSubmit: SubmitHandler<IcvComputersForm> = () => {
        createCv();
    };

    console.log(dataCvComputers, "dataCvComputers");
    //Funcion para crear hoja de vida de computadores
    const createCv = () => {
        const formdata = new FormData()
        formdata.append('sistema_operativo', dataCvComputers.sistema_operativo);
        formdata.append('suite_ofimatica', dataCvComputers.suite_ofimatica);
        formdata.append('antivirus', dataCvComputers.antivirus);
        formdata.append('color', dataCvComputers.color);
        formdata.append('tipo_de_equipo', dataCvComputers.tipo_de_equipo);
        formdata.append('tipo_almacenamiento', dataCvComputers.tipo_almacenamiento);
        formdata.append('capacidad_almacenamiento', dataCvComputers.capacidad_almacenamiento);
        formdata.append('procesador', dataCvComputers.procesador);
        formdata.append('memoria_ram', dataCvComputers.memoria_ram);
        formdata.append('observaciones_adicionales', dataCvComputers.observaciones_adicionales);
        formdata.append('otras_aplicaciones', dataCvComputers.otras_aplicaciones);
        formdata.append('id_articulo', dataCvComputers.id_bien.toString());
        formdata.append('ruta_imagen_foto', file === null ? '' : file);
        dispatch(createCvComputersService(formdata))
    };
    //Funcion para actualizar hoja de vida de computadores
    const updateCv = () => {

    };

    //Cargue de archivos de imagen
    const handleUpload = ({ target }) => {
        if (target.files.length > 0) setFile(target.files[0])
    };

    //Funcion para navegar a la pantalla de historico de articulos
    const ScreenHistoricoArticulo = () => {
        navigate("/dashboard/almacen/reportes/reporte-historico-activo");
    };

    //Funcion para navegar a la pantalla de programar mantenimiento
    const ScreenProgramarMantnimiento = () => {
        navigate(
            "/dashboard/almacen/gestion-de-inventario/programacion-mantenimiento"
        );
    };

    //Funcion para Buscar Articulo
    const handledSearch = () => {
        dispatch(getCvComputersService(dataCvComputers.doc_identificador_nro));
    };

    const onGridReady = (params) => {
        console.log(params, 'params');
    };
    //Columnas de la tabla de Mantenimientos
    const columnDefsMaintenance = [
        { headerName: "Estado", field: "estado", minWidth: 150 },
        { headerName: "Fecha", field: "fecha", minWidth: 150 },
        { headerName: "Responsable", field: "responsable", minWidth: 150 },
        { headerName: "Tipo", field: "tipo", minWidth: 150 },
        { headerName: "Descripción", field: "tipo_descripcion", minWidth: 150 },
    ];
    //Columnas de la tabla de Asignaciones
    const columnDefs2 = [
        { headerName: "Número", field: "NU", minWidth: 150 },
        { headerName: "Responsable", field: "RE", minWidth: 150 },
        { headerName: "Grupo", field: "GR", minWidth: 150 },
        { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
        { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
        { headerName: "Tipo", field: "TI", minWidth: 150 },
    ];

    //Columnas de la tabla de articulos
    const columnDefsArticles = [
        { headerName: "Nombre", field: "nombre", minWidth: 180 },
        { headerName: "Serial", field: "doc_identificador_nro", minWidth: 150 },
        { headerName: "Tipo Activo", field: "cod_tipo_activo", minWidth: 120 },
        { headerName: "Estado", field: "estado", minWidth: 120 },
        { headerName: "Codigo", field: "codigo_bien", minWidth: 150 },
        {
            headerName: "Acción",
            field: "editar",
            minWidth: 100,
            maxWidth: 100,
            cellRendererFramework: ({ data }) => (
                <div className="d-flex gap-1">
                    <button
                        type="button"
                        style={{ border: "none", background: "none" }}
                        onClick={() => {
                            dispatch(getCvComputersService(data.doc_identificador_nro));
                            setBusquedaArticuloModalOpen(false);
                        }}
                        title="Seleccionar"
                    >
                        <i className="fa-solid fa-circle-check fs-3"></i>
                    </button>
                </div>
            ),
        },
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
        columnDefsMaintenance,
        columnDefs2,
        columnDefsArticles,
        asignacionPrestamos,
        articuloEncontrado,
        otrasAplicaciones,
        busquedaArticuloModalOpen,
        ListMark,
        otrasPerisfericos,
        control,
        initialState,
        file,
        defaultColDef,
        errors,
        //Edita States
        setArticuloEncontrado,
        setOtrasAplicaciones,
        setOtrasPerisfericos,
        setBusquedaArticuloModalOpen,
        setFile,
        //Functions
        ScreenHistoricoArticulo,
        ScreenProgramarMantnimiento,
        handledSearch,
        onSubmit,
        register,
        handleSubmit,
        reset,
        handleUpload
    };
}

export default useCvComputers;