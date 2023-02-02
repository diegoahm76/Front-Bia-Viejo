
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal, { SweetAlertIcon } from "sweetalert2";
//components
// import clienteAxios from "../../../../../config/clienteAxios";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
//Actions
// import { createCvComputersService, getCvComputersService, getCvMaintenanceService } from "../../../../../services/cv/CvComputers";
//Interfaces
import clienteAxios from "../../../config/clienteAxios";
import { createCCDSService } from '../../../services/CCD/CCDServices';
import { getOrganigramsService, getUnitysService } from "../../../services/organigram/OrganigramServices";
import { IListOrganigrama, IListUnity } from "../../../Interfaces/CCD";


const useCCD = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { organigram, unityOrganigram } = useAppSelector((state) => state.organigram);

    const [title, setTitle] = useState<string>('');
    const [articuloEncontrado, setArticuloEncontrado] = useState<boolean>(false);
    const [createIsactive, setCreateIsactive] = useState<boolean>(false);
    const [consultaCcdIsactive, setConsultaCcdIsactive] = useState<boolean>(false);
    const [otrasAplicaciones, setOtrasAplicaciones] = useState<boolean>(false);
    const [otrasPerisfericos, setOtrasPerisfericos] = useState<boolean>(false);
    const [busquedaArticuloModalOpen, setBusquedaArticuloModalOpen] = useState<boolean>(false);
    const [listUnitys, setListUnitys] = useState<IListUnity[]>([{
        label: "",
        value: '',
    }]);
    const [listOrganigrams, setListOrganigrams] = useState<IListOrganigrama[]>([{
        label: "",
        value: 0,
    }]);
    const [file, setFile] = useState(null);

    //Estado Inicial de Hojas de Vida de Computadores
    const initialState /* :IcvComputersForm */ = {
        nombreCcd: '',
        organigrama: { label: '', value: 0 },
        sries_asignacion: '',
        sries: '',
        subSerie_asignacion: '',
        subSerie: '',
        unidades_asignacion: { label: '', value: '' },
        unidades_organigrama: { label: '', value: '' },
        version: '',
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

    } = useForm/* <IcvComputersForm> */({ defaultValues: initialState });
    const dataCCD = watch();

    // UseEffect para obtener organigramas
    useEffect(() => {
        dispatch(getOrganigramsService())
    }, []);

    //useEffect para obtener el MoldOrganigram (jerarquia de niveles & unidades)
    useEffect(() => {
        if (dataCCD.organigrama.value !== 0) dispatch(getUnitysService(dataCCD.organigrama.value));
    }, [dataCCD.organigrama.value])
    console.log(listUnitys, 'listUnitys')
    console.log(dataCCD, 'dataCCD')

    useEffect(() => {
        setListUnitys(unityOrganigram.map(
            item => ({ label: item.nombre!, value: item.codigo! })
        ));
    }, [unityOrganigram]);

    useEffect(() => {
        setListOrganigrams(organigram.map(
            item => ({ label: item.nombre!, value: item.id_organigrama! })
        ));
    }, [organigram]);




    //submit Hojas de Vida de Computadores
    const onSubmit /* :SubmitHandler<IcvComputersForm> */ = () => {
        createCv();
    };

    //Funcion para crear hoja de vida de computadores
    const createCv = () => {
        let newCCD = {
            id_organigrama: 1,
            version: "5.0",
            nombre: "CCD 5"
        }
        dispatch(createCCDSService(newCCD))
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
                            // dispatch(getCvComputersService(data.doc_identificador_nro));
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
        listUnitys,
        listOrganigrams,
        title,
        createIsactive,
        consultaCcdIsactive,
        columnDefsMaintenance,
        columnDefs2,
        columnDefsArticles,
        asignacionPrestamos,
        articuloEncontrado,
        otrasAplicaciones,
        busquedaArticuloModalOpen,
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
        setValue,
        setTitle,
        setCreateIsactive,
        setConsultaCcdIsactive,
        //Functions
        // handledSearch,
        onSubmit,
        register,
        handleSubmit,
        reset,
    };
}

export default useCCD;