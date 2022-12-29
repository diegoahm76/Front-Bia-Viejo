
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
import { IcvVehiclesForm, IList, IListMarks } from "../../../../../Interfaces/CV";
import { getCvMaintenanceService } from "../../../../../services/cv/CvComputers";


const useCvVehicles = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvVehicles } = useAppSelector((state) => state.cv);

    //Local State
    const initialOptions: IList[] = [{
        label: "",
        value: '',
    }]
    const initialOptionsMark: IListMarks[] = [{
        label: "",
        value: 0,
    }]
    const [busquedaArticuloModalOpen, setBusquedaArticuloModalOpen] = useState<boolean>(false);
    const [vehiculoEncontado, setVehiculoEncontado] = useState<boolean>(false);
    const [enCirculacion, setEnCirculacion] = useState<boolean>(true);
    const [arriendo, setArriendo] = useState<boolean>(false);
    const [ListMark, setListMark] = useState<IListMarks[]>(initialOptionsMark);
    const [listTypeVehicleData, setListTypeVehicleData] = useState<IList[]>(initialOptions);
    const [listTypeDocData, setListTypeDocData] = useState<IList[]>(initialOptions);
    const [listTypeGasData, setListTypeGasData] = useState<IList[]>(initialOptions);
    const [file, setFile] = useState(null);


    //Estado Inicial de Hojas de Vida de Computadores
    const initialState: IcvVehiclesForm = {
        id_hoja_de_vida: 1,
        codigo_bien: "1002",
        nombre: "Nivel 3 3",
        doc_identificador_nro: '',
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
        estado: null,

        // modelo: "Modelo 2",
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

    // useEffect para consultar  options
    useEffect(() => {
        const getSelectsOptions = async () => {
            try {
                const { data: listMarkData } = await clienteAxios.get("/almacen/marcas/get-list/");
                const { data: listTypeGasData } = await clienteAxios.get("/almacen/choices/tipo-combustible/");
                const { data: listTypeDocData } = await clienteAxios.get("/almacen/choices/tipo-documento/");
                const { data: listTypeVehicleData } = await clienteAxios.get("/almacen/choices/tipo-vehiculo/");

                const tipoCombustibleFormat = textChoiseAdapter(listTypeGasData);
                const tipoDocumentoFormat = textChoiseAdapter(listTypeDocData);
                const tipoVehiculoFormat = textChoiseAdapter(listTypeVehicleData);

                setListMark(listMarkData.map((item) => ({ label: item.nombre, value: item.id_marca })));
                setListTypeGasData(tipoCombustibleFormat);
                setListTypeDocData(tipoDocumentoFormat);
                setListTypeVehicleData(tipoVehiculoFormat);
            } catch (err) {
                console.log(err);
            }
        };
        getSelectsOptions();
    }, []);

    //useEffect para consultar Mantenimiento
    useEffect(() => {
        if (cvVehicles && !cvVehicles.tiene_hoja_vida) dispatch(getCvMaintenanceService(cvVehicles.id_bien));
    }, [cvVehicles]);

    // ueeEffect para obtener el organigrama a editar
    useEffect(() => {
        if (cvVehicles && !cvVehicles.tiene_hoja_vida) {
            // let data = {
            //     ...cvVehicles,
            //     marca: { label: cvVehicles.marca, value: cvVehicles.id_marca },
            //     nombre: cvVehicles.nombre,
            //     cod_tipo_bien: cvVehicles.cod_tipo_bien,
            //     codigo_bien: cvVehicles.codigo_bien,
            //     doc_identificador_nro: cvVehicles.doc_identificador_nro,
            //     estado: cvVehicles.estado,
            //     id_articulo: cvVehicles.id_bien,
            // };
            // reset(data);
        } else {
            notificationSuccess('El bien ya tiene una hoja de vida', 'warning');
            reset(initialState);
            setFile(null);
        }
    }, [cvVehicles]);

    //ueeEffect para cambiar el estado de articuloEncontrado
    useEffect(() => {
        if (cvVehicles && !cvVehicles.tiene_hoja_vida) {
            setVehiculoEncontado(true);
        } else {
            setVehiculoEncontado(false);
        }
    }, [cvVehicles]);

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
        dispatch(getCvVehiclesService(dataCvVehicles.doc_identificador_nro));
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
        { headerName: "Número", field: "num", minWidth: 150 },
        { headerName: "Tipo", field: "tip", minWidth: 150 },
        { headerName: "Fecha", field: "fec", minWidth: 150 },
        { headerName: "Estado", field: "est", minWidth: 150 },
        { headerName: "Responsable", field: "res", minWidth: 150 },
    ];
    const rowData = [
        {
            nmb: "Oliver Amaya",
            des: "12/08/2011",
            has: "19/05/2020",
            cel: "320876354",
            acc: "",
        },
        {
            nmb: "Oliver Amaya",
            des: "12/08/2011",
            has: "19/05/2020",
            cel: "320876354",
            acc: "",
        },
        {
            nmb: "Oliver Amaya",
            des: "12/08/2011",
            has: "19/05/2020",
            cel: "320876354",
            acc: "",
        },
        {
            nmb: "Oliver Amaya",
            des: "12/08/2011",
            has: "19/05/2020",
            cel: "320876354",
            acc: "",
        },
        {
            nmb: "Oliver Amaya",
            des: "12/08/2011",
            has: "19/05/2020",
            cel: "320876354",
            acc: "",
        },
    ];
    const rowData2 = [
        {
            num: "01",
            tip: "Correctivo",
            fec: "19/05/2020",
            est: "Completado",
            res: "Compuarreglo",
        },
        {
            num: "02",
            tip: "Correctivo",
            fec: "19/05/2020",
            est: "Completado",
            res: "Compuarreglo",
        },
        {
            num: "03",
            tip: "Correctivo",
            fec: "19/05/2020",
            est: "Completado",
            res: "Compuarreglo",
        },
        {
            num: "04",
            tip: "Correctivo",
            fec: "19/05/2020",
            est: "Completado",
            res: "Compuarreglo",
        },
        {
            num: "05",
            tip: "Correctivo",
            fec: "19/05/2020",
            est: "Completado",
            res: "Compuarreglo",
        },
    ];

    return {
        //States
        columnDefsMaintenance,
        columnDefs2,
        rowData,
        rowData2,
        busquedaArticuloModalOpen,
        initialState,
        vehiculoEncontado,
        arriendo,
        enCirculacion,
        control,
        dataCvVehicles,
        ListMark,
        listTypeVehicleData,
        listTypeDocData,
        listTypeGasData,
        file,
        defaultColDef,
        errors,
        //Edita States
        setBusquedaArticuloModalOpen,
        setVehiculoEncontado,
        setArriendo,
        setEnCirculacion,
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