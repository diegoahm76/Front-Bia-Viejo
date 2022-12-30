
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
import { IcvVehiclesForm, IList } from "../../../../../Interfaces/CV";
import { getCvMaintenanceService } from "../../../../../services/cv/CvComputers";
import { GroupBase } from "react-select";
import { IGeneric } from "../../../../../Interfaces/Generic";


const useCvVehicles = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvVehicles } = useAppSelector((state) => state.cv);

    const initialOptionsMark: IList[] = [{
        label: "",
        value: 0,
    }]
    const [busquedaArticuloModalOpen, setBusquedaArticuloModalOpen] = useState<boolean>(false);
    const [vehiculoEncontado, setVehiculoEncontado] = useState<boolean>(false);
    const [enCirculacion, setEnCirculacion] = useState<boolean>(true);
    const [arriendo, setArriendo] = useState<boolean>(false);
    const [ListMark, setListMark] = useState<IList[]>(initialOptionsMark);
    const [listTypeVehicleData, setListTypeVehicleData] = useState<IList[]>([]);
    const [listTypeDocData, setListTypeDocData] = useState<IList[]>([]);
    const [listTypeGasData, setListTypeGasData] = useState<IList[]>([]);
    const [file, setFile] = useState(null);

    console.log(listTypeVehicleData, "listTypeVehicleData");
    //Estado Inicial de Hojas de Vida de Computadores
    const initialState: IcvVehiclesForm = {
        id_hoja_de_vida: 0,
        codigo_bien: "",
        nombre: "",
        doc_identificador_nro: '',
        marca: { label: '', value: 0 },
        cod_tipo_vehiculo: { label: '', value: '' },
        tiene_platon: null,
        capacidad_pasajeros: 0,
        color: "",
        linea: "",
        tipo_combustible: { label: '', value: '' },
        es_arrendado: null,
        ultimo_kilometraje: 0,
        fecha_ultimo_kilometraje: null,
        fecha_adquisicion: null,
        fecha_vigencia_garantia: null,
        numero_motor: "",
        numero_chasis: "",
        cilindraje: 0,
        transmision: "",
        dimesion_llantas: 0,
        capacidad_extintor: 0,
        tarjeta_operacion: "",
        observaciones_adicionales: "",
        es_agendable: null,
        en_circulacion: null,
        fecha_circulacion: null,
        ruta_imagen_foto: "",
        id_articulo: 0,
        id_vehiculo_arrendado: null,
        id_proveedor: null,
        estado: null,

        id_bien: 0,
        fecha_expedicion_op: null,
        fecha_expiracion_op: null,
        fecha_expedicion_soat: null,
        fecha_expiracion_soat: null,
        numero_soat: "",
        fecha_expedicion_tecnomecanica: null,
        fecha_expiracion_tecnomecanica: null,
        numero_tecnomecanica: "",
        fecha_expedicion_str: null,
        fecha_expiracion_str: null,
        numero_str: "",
        nombre_conductor: "",
        tipo_document: { label: '', value: '' },
        numero_document: "",
        celular: "",
        email: "",
        direccion: "",
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
    console.log(dataCvVehicles, "dataCvVehicles");

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

    // ueeEffect para obtener el vehiculo
    useEffect(() => {
        if (cvVehicles && !cvVehicles.tiene_hoja_vida) {
            let data = {
                codigo_bien: cvVehicles.codigo_bien,
                nombre: cvVehicles.nombre,
                doc_identificador_nro: cvVehicles.doc_identificador_nro,
                marca: { label: cvVehicles.marca, value: cvVehicles.id_marca },
                tiene_platon: null,
                estado: cvVehicles.estado,
                id_bien: cvVehicles.id_bien,
            };
            reset(data);
        } else if (cvVehicles) {
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
        formdata.append('cod_tipo_vehiculo', dataCvVehicles.cod_tipo_vehiculo.value!.toString());
        // formdata.append('tiene_platon', dataCvVehicles.tiene_platon!.toString());
        formdata.append('tiene_platon', 'false');
        formdata.append('capacidad_pasajeros', dataCvVehicles.capacidad_pasajeros.toString());
        formdata.append('color', dataCvVehicles.color);
        formdata.append('linea', dataCvVehicles.linea);
        formdata.append('tipo_combustible', dataCvVehicles.tipo_combustible.value!.toString());
        formdata.append('es_arrendado', arriendo!.toString());
        formdata.append('ultimo_kilometraje', dataCvVehicles.ultimo_kilometraje.toString());
        formdata.append('fecha_adquisicion', dataCvVehicles.fecha_adquisicion!.toString());
        formdata.append('fecha_vigencia_garantia', dataCvVehicles.fecha_vigencia_garantia!.toString());
        formdata.append('numero_motor', dataCvVehicles.numero_motor);
        formdata.append('numero_chasis', dataCvVehicles.numero_chasis);
        formdata.append('cilindraje', dataCvVehicles.cilindraje.toString());
        formdata.append('transmision', dataCvVehicles.transmision);
        formdata.append('dimesion_llantas', dataCvVehicles.dimesion_llantas.toString());
        formdata.append('capacidad_extintor', dataCvVehicles.capacidad_extintor.toString());
        formdata.append('tarjeta_operacion', dataCvVehicles.tarjeta_operacion);
        formdata.append('observaciones_adicionales', '');
        // formdata.append('es_agendable', dataCvVehicles.es_agendable!.toString());
        formdata.append('es_agendable', 'false');
        formdata.append('en_circulacion', enCirculacion!.toString());
        formdata.append('fecha_circulacion', dataCvVehicles.fecha_circulacion!.toString());
        formdata.append('id_articulo', dataCvVehicles.id_bien.toString());
        formdata.append('id_vehiculo_arrendado', '');
        formdata.append('id_proveedor', '');
        formdata.append('ruta_imagen_foto', file === null ? '' : file);
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
                            dispatch(getCvVehiclesService(data.doc_identificador_nro));
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

    console.log(listTypeGasData, 'listTypeGasData');
    console.log(ListMark, 'ListMark');
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
        columnDefsArticles,
        errors,
        //Edita States
        setBusquedaArticuloModalOpen,
        setVehiculoEncontado,
        setArriendo,
        setEnCirculacion,
        setFile,
        //Functions
        ScreenHistoricoArticulo,
        ScreenProgramarMantnimiento,
        handledSearch,
        onSubmit,
        register,
        handleSubmit,
        reset,
        setValue,
        onGridReady,
        handleUpload
    };
}

export default useCvVehicles;