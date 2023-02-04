
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal, { SweetAlertIcon } from "sweetalert2";
//components
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
//Actions
// import { createCvComputersService, getCvComputersService, getCvMaintenanceService } from "../../../../../services/cv/CvComputers";
//Interfaces
import clienteAxios from "../../../config/clienteAxios";
import { createCCDSService, updateCCDSService } from '../../../services/CCD/CCDServices';
import { getOrganigramsService, getUnitysService } from "../../../services/organigram/OrganigramServices";
import { ICCDForm, IListOrganigrama, IListUnity } from "../../../Interfaces/CCD";
import { getCCDCurrent } from "../../../store/slices/CCD/indexCCD";


const useCCD = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { organigram, unityOrganigram } = useAppSelector((state) => state.organigram);
    const { CCDCurrent } = useAppSelector((state) => state.CCD);

    const [title, setTitle] = useState<string>('');
    const [createIsactive, setCreateIsactive] = useState<boolean>(false);
    const [consultaCcdIsactive, setConsultaCcdIsactive] = useState<boolean>(false);
    const [saveCCD, setSaveCCD] = useState<boolean>(false);
    const [listUnitys, setListUnitys] = useState<IListUnity[]>([{
        label: "",
        value: '',
    }]);
    const [listOrganigrams, setListOrganigrams] = useState<IListOrganigrama[]>([{
        label: "",
        value: 0,
    }]);
    const [file, setFile] = useState(null);

    //Estado Inicial de Formulario de Crear CCD
    const initialState: ICCDForm = {
        id_ccd: 0,
        nombreCcd: '',
        organigrama: { label: '', value: 0 },
        unidades_organigrama: { label: '', value: '' },
        version: '',
        fecha_terminado: '',
    }
    //Estado Inicial de Formulario de Crear Asignación
    const initialStateAsig /* :IcvComputersForm */ = {
        sries_asignacion: '',
        sries: '',
        subSerie_asignacion: '',
        subSerie: '',
        unidades_asignacion: { label: '', value: '' },
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

    //useForm Asignar CCD
    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors: errors },

    } = useForm/* <IcvComputersForm> */({ defaultValues: initialStateAsig });
    const dataAsing = watch();

    //useForm Crear CCD
    const {
        register: registerCreateCCD,
        handleSubmit: handleSubmitCreateCCD,
        control: controlCreateCCD,
        reset: resetCreateCCD,
        watch: watchCreateCCD,
        formState: { errors: errorsCreateCCD },

    } = useForm<ICCDForm>({ defaultValues: initialState });
    const dataCreateCCD = watchCreateCCD();

    // UseEffect para obtener organigramas
    useEffect(() => {
        if (CCDCurrent !== null) {
            const resultName = organigram.filter(item => item.id_organigrama === CCDCurrent.id_organigrama_id);
            let obj: ICCDForm = {
                id_ccd: CCDCurrent.id_ccd,
                nombreCcd: CCDCurrent.nombre,
                organigrama: { label: resultName[0].nombre, value: CCDCurrent.id_organigrama_id },
                unidades_organigrama: { label: '', value: '' },
                version: CCDCurrent.version,
                fecha_terminado: CCDCurrent.fecha_terminado,
            }
            resetCreateCCD(obj);
            setSaveCCD(true);
        }
    }, [CCDCurrent]);
    console.log(dataCreateCCD, 'dataCreateCCD')

    // UseEffect para obtener organigramas
    useEffect(() => {
        dispatch(getOrganigramsService())
    }, []);

    //useEffect para obtener el MoldOrganigram (jerarquia de niveles & unidades)
    useEffect(() => {
        if (dataCreateCCD.organigrama.value !== 0) dispatch(getUnitysService(dataCreateCCD.organigrama.value));
    }, [dataCreateCCD.organigrama.value])

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
    const onSubmit = () => {
        createAsing();
    };
    //submit Hojas de Vida de Computadores
    const onSubmitCreateCCD = () => {
        if (CCDCurrent !== null) {
            updateCCD();
        } else {
            createCCD();
        }
    };

    //Funcion para crear el CCD
    const createCCD = () => {
        let newCCD = {
            id_organigrama: dataCreateCCD.organigrama.value,
            version: dataCreateCCD.version,
            nombre: dataCreateCCD.nombreCcd
        }
        dispatch(createCCDSService(newCCD, setSaveCCD))
    };
    //Funcion para actualizar el CCD
    const updateCCD = () => {
        let newCCD = {
            id_organigrama: dataCreateCCD.organigrama.value,
            version: dataCreateCCD.version,
            nombre: dataCreateCCD.nombreCcd
        }
        dispatch(updateCCDSService(newCCD))
    };
    //Funcion para crear el CCD
    const createAsing = () => {
        let newCCD = {
            id_organigrama: 1,
            version: "5.0",
            nombre: "CCD 5"
        }
        // dispatch(createCCDSService(newCCD))
    };


    //Funcion para limpiar el formulario de Crear CCD
    const cleanCCD = () => {
        resetCreateCCD(initialState);
        setSaveCCD(false);
        dispatch(getCCDCurrent(null));
    }

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
                            // setBusquedaArticuloModalOpen(false);
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
        control,
        controlCreateCCD,
        initialState,
        file,
        defaultColDef,
        errors,
        errorsCreateCCD,
        saveCCD,
        //Edita States
        setFile,
        setValue,
        setTitle,
        setCreateIsactive,
        setConsultaCcdIsactive,
        //Functions
        onSubmit,
        onSubmitCreateCCD,
        register,
        registerCreateCCD,
        handleSubmit,
        handleSubmitCreateCCD,
        reset,
        cleanCCD,
    };
}

export default useCCD;