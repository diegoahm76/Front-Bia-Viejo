
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
//components
import { textChoiseAdapter } from '../../../../../adapters/textChoices.adapter';
import clienteAxios from '../../../../../config/clienteAxios';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks/hooks';
//Actions
import { getCvVehiclesService, createCvVehiclesService } from '../../../../../services/cv/CvVehicles';
import { getCvMaintenanceService } from '../../../../../services/cv/CvComputers';
import { getCvArticles } from '../../../../../store/slices/cv/indexCv';
//Interfaces
import { IcvVehiclesForm, IList } from '../../../../../Interfaces/CV';


const useCvVehicles = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvVehicles } = useAppSelector((state) => state.cv);

    const initialOptionsMark: IList[] = [{
        label: '',
        value: 0,
    }]
    const [busquedaArticuloModalOpen, setBusquedaArticuloModalOpen] = useState<boolean>(false);
    const [vehiculoEncontado, setVehiculoEncontado] = useState<boolean>(false);
    const [agendable, setAgendable] = useState<boolean | null>(null);
    const [enCirculacion, setEnCirculacion] = useState<boolean>(true);
    const [platon, setPlaton] = useState<boolean>(true);
    const [arriendo, setArriendo] = useState<boolean>(false);
    const [ListMark, setListMark] = useState<IList[]>(initialOptionsMark);
    const [listTypeVehicleData, setListTypeVehicleData] = useState<IList[]>([]);
    const [listTypeDocData, setListTypeDocData] = useState<IList[]>([]);
    const [listTypeGasData, setListTypeGasData] = useState<IList[]>([]);
    const [file, setFile] = useState(null);

    //Estado Inicial de Hojas de Vida de Vehículos
    const initialState: IcvVehiclesForm = {
        id_hoja_de_vida: 0,
        codigo_bien: '',
        nombre: '',
        doc_identificador_nro: '',
        marca: { label: '', value: 0 },
        cod_tipo_vehiculo: { label: '', value: '' },
        tiene_platon: null,
        capacidad_pasajeros: 0,
        color: '',
        linea: '',
        modelo: '',
        tipo_combustible: { label: '', value: '' },
        es_arrendado: null,
        ultimo_kilometraje: 0,
        fecha_ultimo_kilometraje: null,
        fecha_adquisicion: null,
        fecha_vigencia_garantia: null,
        numero_motor: '',
        numero_chasis: '',
        cilindraje: 0,
        transmision: '',
        dimesion_llantas: 0,
        capacidad_extintor: 0,
        tarjeta_operacion: '',
        observaciones_adicionales: '',
        es_agendable: null,
        en_circulacion: null,
        fecha_circulacion: null,
        ruta_imagen_foto: '',
        id_articulo: 0,
        id_vehiculo_arrendado: null,
        id_proveedor: null,
        estado: null,

        id_bien: 0,
        fecha_expedicion_op: null,
        fecha_expiracion_op: null,
        fecha_expedicion_soat: null,
        fecha_expiracion_soat: null,
        numero_soat: '',
        fecha_expedicion_tecnomecanica: null,
        fecha_expiracion_tecnomecanica: null,
        numero_tecnomecanica: '',
        fecha_expedicion_str: null,
        fecha_expiracion_str: null,
        numero_str: '',
        nombre_conductor: '',
        tipo_document: { label: '', value: '' },
        numero_document: '',
        celular: '',
        email: '',
        direccion: '',
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

    //useForm Hojas de Vida de Vehículos
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
    const notificationAlert = (message = 'Proceso Exitoso', state: SweetAlertIcon) => Swal.mixin({
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
                const { data: listMarkData } = await clienteAxios.get('/almacen/marcas/get-list/');
                const { data: listTypeGasData } = await clienteAxios.get('/almacen/choices/tipo-combustible/');
                const { data: listTypeDocData } = await clienteAxios.get('/choices/tipo-documento/');
                const { data: listTypeVehicleData } = await clienteAxios.get('/almacen/choices/tipo-vehiculo/');

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
            notificationAlert('El bien ya tiene una hoja de vida', 'warning');
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

    //ueeEffect para mostrar alerta de agendable
    useEffect(() => {
        if (agendable) {
            notificationAlert('Al desactivar este switch el vehículo ya no se podrá asignar', 'info');
        } else if (agendable === false) {
            notificationAlert('El vehículo podrá ser asignado a funcionarios a partir de ese momento.', 'info');
        }
    }, [agendable]);

    //ueeEffect para mostrar alerta de agendable
    useEffect(() => {
        if (arriendo) {
        setValue('ultimo_kilometraje', 0)
        setValue('modelo', '')
        setValue('linea', '')
        setValue('color', '')
        setValue('numero_motor', '')
        setValue('transmision', '')
        setValue('cilindraje', 0)
        setValue('fecha_vigencia_garantia', '')
        setValue('numero_chasis', '')
        setValue('dimesion_llantas', 0)
        setValue('capacidad_extintor', 0)
        setValue('tarjeta_operacion', '')
        }
    }, [arriendo]);

    //submit Hojas de Vida de Vehículos
    const onSubmit: SubmitHandler<IcvVehiclesForm> = () => {
        createCv();
        console.log('entre')
    };

    //Funcion para crear hoja de vida de Vehículos
    const createCv = () => {
        const formdata = new FormData()
        formdata.append('cod_tipo_vehiculo', dataCvVehicles.cod_tipo_vehiculo ? dataCvVehicles.cod_tipo_vehiculo.value!.toString() : '');
        formdata.append('tiene_platon', platon.toString());
        formdata.append('capacidad_pasajeros', dataCvVehicles.capacidad_pasajeros ? dataCvVehicles.capacidad_pasajeros.toString() : '');
        formdata.append('color', dataCvVehicles.color ? dataCvVehicles.color : '');
        formdata.append('linea', dataCvVehicles.linea ? dataCvVehicles.linea : '');
        formdata.append('tipo_combustible', dataCvVehicles.tipo_combustible ? dataCvVehicles.tipo_combustible.value!.toString() : '');
        formdata.append('es_arrendado', arriendo ? arriendo!.toString() : 'false');
        formdata.append('ultimo_kilometraje', dataCvVehicles.ultimo_kilometraje ? dataCvVehicles.ultimo_kilometraje.toString() : '');
        formdata.append('fecha_adquisicion', dataCvVehicles.fecha_adquisicion ? dataCvVehicles.fecha_adquisicion!.toString() : '');
        formdata.append('fecha_vigencia_garantia', dataCvVehicles.fecha_vigencia_garantia ? dataCvVehicles.fecha_vigencia_garantia!.toString() : '');
        formdata.append('numero_motor', dataCvVehicles.numero_motor ? dataCvVehicles.numero_motor : '');
        formdata.append('numero_chasis', dataCvVehicles.numero_chasis ? dataCvVehicles.numero_chasis : '');
        formdata.append('cilindraje', dataCvVehicles.cilindraje ? dataCvVehicles.cilindraje.toString() : '');
        formdata.append('transmision', dataCvVehicles.transmision ? dataCvVehicles.transmision : '');
        formdata.append('dimesion_llantas', dataCvVehicles.dimesion_llantas ? dataCvVehicles.dimesion_llantas.toString() : '');
        formdata.append('capacidad_extintor', dataCvVehicles.capacidad_extintor ? dataCvVehicles.capacidad_extintor.toString() : '');
        formdata.append('tarjeta_operacion', dataCvVehicles.tarjeta_operacion ? dataCvVehicles.tarjeta_operacion : '');
        formdata.append('observaciones_adicionales', dataCvVehicles.observaciones_adicionales ? dataCvVehicles.observaciones_adicionales : '');
        formdata.append('es_agendable', agendable ? agendable!.toString() : 'false');
        formdata.append('en_circulacion', enCirculacion ? enCirculacion!.toString() : 'false');
        formdata.append('fecha_circulacion', dataCvVehicles.fecha_circulacion ? dataCvVehicles.fecha_circulacion!.toString() : '');
        formdata.append('id_articulo', dataCvVehicles.id_bien ? dataCvVehicles.id_bien.toString() : '');
        formdata.append('id_vehiculo_arrendado', dataCvVehicles.id_vehiculo_arrendado ? dataCvVehicles.id_vehiculo_arrendado.toString() : '');
        formdata.append('id_proveedor', '');
        formdata.append('ruta_imagen_foto', file === null ? '' : file);
        dispatch(createCvVehiclesService(formdata))
    };

    //Cargue de archivos de imagen
    const handleUpload = ({ target }) => {
        if (target.files.length > 0) setFile(target.files[0])
    };

    const ScreenHistoricoConductores = () => {
        navigate('/dashboard/almacen/reportes/reporte-historico-activo');
    };

    const ScreenProgramarMantnimiento = () => {
        navigate(
            '/dashboard/almacen/gestion-de-inventario/programacion-mantenimiento'
        );
    };

    const handledSearch = () => {
        dispatch(getCvVehiclesService(dataCvVehicles.doc_identificador_nro));
    };

    //Columnas de la tabla de Mantenimientos
    const columnDefsMaintenance = [
        { headerName: 'Estado', field: 'estado', minWidth: 150 },
        { headerName: 'Fecha', field: 'fecha', minWidth: 150 },
        { headerName: 'Responsable', field: 'responsable', minWidth: 150 },
        { headerName: 'Tipo', field: 'tipo', minWidth: 150 },
        { headerName: 'Descripción', field: 'tipo_descripcion', minWidth: 150 },
    ];

    //Columnas de la tabla de articulos
    const columnDefsArticles = [
        { headerName: 'Nombre', field: 'nombre', minWidth: 180 },
        { headerName: 'Placa', field: 'doc_identificador_nro', minWidth: 150 },
        { headerName: 'Tipo Activo', field: 'cod_tipo_activo', minWidth: 120 },
        { headerName: 'Estado', field: 'estado', minWidth: 120 },
        { headerName: 'Codigo', field: 'codigo_bien', minWidth: 150 },
        {
            headerName: 'Acción',
            field: 'editar',
            minWidth: 100,
            maxWidth: 100,
            cellRendererFramework: ({ data }) => (
                <div className='d-flex gap-1'>
                    <button
                        type='button'
                        style={{ border: 'none', background: 'none' }}
                        onClick={() => {
                            dispatch(getCvVehiclesService(data.doc_identificador_nro));
                            dispatch(getCvArticles([]));
                            setBusquedaArticuloModalOpen(false);
                        }}
                        title='Seleccionar'
                    >
                        <i className='fa-solid fa-circle-check fs-3'></i>
                    </button>
                </div>
            ),
        },
    ];

    return {
        //States
        columnDefsMaintenance,
        busquedaArticuloModalOpen,
        initialState,
        vehiculoEncontado,
        arriendo,
        enCirculacion,
        agendable,
        platon,
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
        setAgendable,
        setPlaton,
        setFile,
        //Functions
        ScreenHistoricoConductores,
        ScreenProgramarMantnimiento,
        handledSearch,
        onSubmit,
        register,
        handleSubmit,
        reset,
        handleUpload
    };
}

export default useCvVehicles;