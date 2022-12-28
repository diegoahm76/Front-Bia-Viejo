
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { textChoiseAdapter } from "../../../../../adapters/textChoices.adapter";
//components
import clienteAxios from "../../../../../config/clienteAxios";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
//Actions
import { getCvVehiclesService, createCvVehiclesService } from "../../../../../services/cv/CvVehicles";
//Interfaces
import { IcvVehiclesForm, IListMarks } from "../../../../../Interfaces/CV";


const useCvVehicles = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvVehicles } = useAppSelector((state) => state.cv);

    //Local State
    const initialOptions: IListMarks[] = [{
        label: "",
        value: 0,
    }]
    const [articuloEncontrado, setArticuloEncontrado] = useState<boolean>(false);
    const [otrasAplicaciones, setOtrasAplicaciones] = useState<boolean>(false);
    const [otrasPerisfericos, setOtrasPerisfericos] = useState<boolean>(false);
    const [busquedaArticuloModalOpen, setBusquedaArticuloModalOpen] = useState<boolean>(false);
    const [ListMark, setListMark] = useState<IListMarks[]>(initialOptions);
    const [file, setFile] = useState(null);


    //Estado Inicial de Hojas de Vida de Computadores
    const initialState: IcvVehiclesForm = {
        id_hoja_de_vida: 1,
        codigo_bien: "1002",
        nombre: "Nivel 3 3",
        doc_identificador_nro: null,
        id_marca: 2,
        marca: "Marca prueba 2",
        cod_tipo_vehiculo: "C",
        tiene_platon: true,
        capacidad_pasajeros: 123,
        color: "verde",
        linea: "linea 2",
        tipo_combustible: "GAS",
        es_arrendado: true,
        ultimo_kilometraje: 123,
        fecha_ultimo_kilometraje: "2022-11-30",
        fecha_adquisicion: "2022-11-30",
        fecha_vigencia_garantia: "2022-11-30",
        numero_motor: "uno",
        numero_chasis: "uno",
        cilindraje: 123,
        transmision: "test",
        dimesion_llantas: 321,
        capacidad_extintor: 321,
        tarjeta_operacion: "test",
        observaciones_adicionales: "test",
        es_agendable: true,
        en_circulacion: true,
        fecha_circulacion: "2022-11-30",
        ruta_imagen_foto: "/media/string",
        id_articulo: 8,
        id_vehiculo_arrendado: null,
        id_proveedor: null,
        estado: null
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

    } = useForm<IcvVehiclesForm>({ defaultValues: initialState });
    const dataCvVehicles = watch();

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

    //useEffect para consultar  options
    // useEffect(() => {
    //     if (cvVehicles && !cvVehicles.tiene_hoja_vida) dispatch(getCvMaintenanceService(cvVehicles.id_bien));
    // }, [cvVehicles]);

    // ueeEffect para obtener el organigrama a editar
    // useEffect(() => {
    //     if (cvVehicles && !cvVehicles.tiene_hoja_vida) {
    //         let data = {
    //             ...cvVehicles,
    //             marca: { label: cvVehicles.marca, value: cvVehicles.id_marca },
    //             nombre: cvVehicles.nombre,
    //             cod_tipo_bien: cvVehicles.cod_tipo_bien,
    //             codigo_bien: cvVehicles.codigo_bien,
    //             doc_identificador_nro: cvVehicles.doc_identificador_nro,
    //             estado: cvVehicles.estado,
    //             id_articulo: cvVehicles.id_bien,
    //         };
    //         reset(data);
    //         // setOtrasPerisfericos(true);
    //         // setOtrasAplicaciones(true);
    //     } else {
    //         notificationSuccess('El bien ya tiene una hoja de vida', 'warning');
    //         reset(initialState);
    //         setFile(null);
    //     }
    // }, [cvVehicles]);

    //ueeEffect para obtener el organigrama a editar
    // useEffect(() => {
    //     if (cvVehicles && !cvVehicles.tiene_hoja_vida) {
    //         setArticuloEncontrado(true);
    //     } else {
    //         setArticuloEncontrado(false);
    //     }
    // }, [cvVehicles]);

    //submit Hojas de Vida de Computadores
    const onSubmit: SubmitHandler<IcvVehiclesForm> = () => {
        createCv();
    };

    //Funcion para crear hoja de vida de computadores
    const createCv = () => {
        const formdata = new FormData()
        // formdata.append('cod_tipo_vehiculo', id);
        // formdata.append('tiene_platon', id);
        // formdata.append('capacidad_pasajeros', id);
        // formdata.append('color', id);
        // formdata.append('linea', id);
        // formdata.append('tipo_combustible', id);
        // formdata.append('es_arrendado', id);
        // formdata.append('ultimo_kilometraje', id);
        // formdata.append('fecha_adquisicion', id);
        // formdata.append('fecha_vigencia_garantia', id);
        // formdata.append('numero_motor', id);
        // formdata.append('numero_chasis', id);
        // formdata.append('cilindraje', id);
        // formdata.append('transmision', id);
        // formdata.append('dimesion_llantas', id);
        // formdata.append('capacidad_extintor', id);
        // formdata.append('tarjeta_operacion', id);
        // formdata.append('observaciones_adicionales', id);
        // formdata.append('es_agendable', id);
        // formdata.append('en_circulacion', id);
        // formdata.append('fecha_circulacion', id);
        // formdata.append('ruta_imagen_foto', file!);
        dispatch(createCvVehiclesService(formdata))
    };
    //Funcion para actualizar hoja de vida de computadores
    const updateCv = () => {

    };


    //Funcion para eliminar hoja de vida de computadores
    const deleteCv = (id) => {

    }

    //Cargue de archivos de imagen
    const handleUpload = ({ target }) => {
        if (target.files.length > 0) setFile(target.files[0])
    };

    const ScreenHistoricoArticulo = () => {
        navigate("/dashboard/almacen/reportes/reporte-historico-activo");
    };

    const ScreenProgramarMantnimiento = () => {
        navigate(
            "/dashboard/almacen/gestion-de-inventario/programacion-mantenimiento"
        );
    };

    const handledSearch = () => {
        // dispatch(getCvVehiclesService(dataCvVehicles.doc_identificador_nro));
    };

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
        busquedaArticuloModalOpen,
        ListMark,
        otrasPerisfericos,
        control,
        dataCvVehicles,
        file,
        defaultColDef,
        errors,
        //Edita States
        setArticuloEncontrado,
        setOtrasAplicaciones,
        setOtrasPerisfericos,
        setBusquedaArticuloModalOpen,
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
        onGridReady,
        handleUpload
    };
}

export default useCvVehicles;