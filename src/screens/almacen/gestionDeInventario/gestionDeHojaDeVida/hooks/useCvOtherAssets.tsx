
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal, { SweetAlertIcon } from "sweetalert2";
//components
import clienteAxios from "../../../../../config/clienteAxios";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
//Actions
import { createCvOtherAssetsService, getCvOtherAssetsService } from "../../../../../services/cv/CvOtherAssets";
//Interfaces
import { IcvComputersForm, IcvOthersForm, IList } from "../../../../../Interfaces/CV";
import { getCvMaintenanceService } from "../../../../../services/cv/CvComputers";


const useCvOtherAssets = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvOtherAssets } = useAppSelector((state) => state.cv);

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

    //Estado Inicial de Hojas de Vida de Otros Activos
    const initialState: IcvOthersForm = {
        especificaciones_tecnicas: '',
        caracteristicas_fisicas: '',
        doc_identificador_nro: '',
        observaciones_adicionales: '',

        estado: null,
        cod_tipo_bien: '',
        codigo_bien: '',
        id_bien: 0,
        marca: { label: '', value: 0 },
        modelo: '',
        nombre: '',
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

    //useForm Hojas de Vida de Otros Activos
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors: errors },

    } = useForm<IcvOthersForm>({ defaultValues: initialState });
    const dataCvOtherAssets = watch();

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
        if (cvOtherAssets && !cvOtherAssets.tiene_hoja_vida) dispatch(getCvMaintenanceService(cvOtherAssets.id_bien));
    }, [cvOtherAssets]);

    // ueeEffect para obtener el articulo
    useEffect(() => {
        if (cvOtherAssets && !cvOtherAssets.tiene_hoja_vida) {
            let data = {
                ...cvOtherAssets,
                marca: { label: cvOtherAssets.marca, value: cvOtherAssets.id_marca },
                nombre: cvOtherAssets.nombre,
                cod_tipo_bien: cvOtherAssets.cod_tipo_bien,
                codigo_bien: cvOtherAssets.codigo_bien,
                doc_identificador_nro: cvOtherAssets.doc_identificador_nro,
                estado: cvOtherAssets.estado,
                id_articulo: cvOtherAssets.id_bien,
            };
            reset(data);
        } else if (cvOtherAssets) {
            notificationSuccess('El bien ya tiene una hoja de vida', 'warning');
            reset(initialState);
            setFile(null);
        }
    }, [cvOtherAssets]);

    //ueeEffect para cambiar el estado de articuloEncontrado
    useEffect(() => {
        if (cvOtherAssets && !cvOtherAssets.tiene_hoja_vida) {
            setArticuloEncontrado(true);
        } else {
            setArticuloEncontrado(false);
        }
    }, [cvOtherAssets]);

    //submit Hojas de Vida de Otros Activos
    const onSubmit: SubmitHandler<IcvOthersForm> = () => {
        createCv();
    };

    //Funcion para crear hoja de vida de Otros Activos
    const createCv = () => {
        const formdata = new FormData()
        formdata.append('caracteristicas_fisicas', dataCvOtherAssets.caracteristicas_fisicas);
        formdata.append('especificaciones_tecnicas', dataCvOtherAssets.especificaciones_tecnicas);
        formdata.append('observaciones_adicionales', dataCvOtherAssets.observaciones_adicionales);
        formdata.append('id_articulo', dataCvOtherAssets.id_bien.toString());
        formdata.append('ruta_imagen_foto', file === null ? '' : file);
        dispatch(createCvOtherAssetsService(formdata))
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
        dispatch(getCvOtherAssetsService(dataCvOtherAssets.doc_identificador_nro));
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
                            dispatch(getCvOtherAssetsService(data.doc_identificador_nro));
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

    //Datos de la tabla de asignaciones
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

export default useCvOtherAssets;