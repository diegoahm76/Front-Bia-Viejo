
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//components
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
//Actions
//Interfaces
import { createCCDSService, updateCCDSService } from '../../../services/CCD/CCDServices';
import { getOrganigramsService, getUnitysService } from "../../../services/organigram/OrganigramServices";
import { ICCDAsingForm, ICCDForm, IListOrganigrama } from "../../../Interfaces/CCD";
import { getCCDCurrent } from "../../../store/slices/CCD/indexCCD";
import { getSubSeriesService } from "../../../services/subseries/SubSeriesServices";
import { getSeriesService } from "../../../services/series/SeriesServices";
import { createAssignmentsService, getAssignmentsService } from "../../../services/assignments/AssignmentsServices";
import { getAssignmentsCCDCurrent } from "../../../store/slices/assignments/indexAssignments";


const useCCD = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    // Redux State Extraction
    const { organigram, unityOrganigram } = useAppSelector((state) => state.organigram);
    const { CCDCurrent } = useAppSelector((state) => state.CCD);
    const { seriesCCD } = useAppSelector((state) => state.series);
    const { subSeriesCCD } = useAppSelector((state) => state.subSeries);
    const { assignmentsCCD, assignmentsCCDCurrent } = useAppSelector((state) => state.assignments);

    const [title, setTitle] = useState<string>('');
    const [titleButtonAsing, setTitleButtonAsing] = useState<string>('Guardar relación');
    const [createIsactive, setCreateIsactive] = useState<boolean>(false);
    const [consultaCcdIsactive, setConsultaCcdIsactive] = useState<boolean>(false);
    const [saveCCD, setSaveCCD] = useState<boolean>(false);
    const [listUnitys, setListUnitys] = useState<IListOrganigrama[]>([{
        label: "",
        value: 0,
    }]);
    const [listOrganigrams, setListOrganigrams] = useState<IListOrganigrama[]>([{
        label: "",
        value: 0,
    }]);
    const [listSries, setListSries] = useState<IListOrganigrama[]>([{
        label: "",
        value: 0,
    }]);
    const [listSubSries, setListSubSries] = useState<any[]>([{
        label: "",
        value: 0,
    }]);
    const [file, setFile] = useState(null);

    //Estado Inicial de Formulario de Crear CCD
    const initialState: ICCDForm = {
        id_ccd: 0,
        nombreCcd: '',
        organigrama: { label: '', value: 0 },
        unidades_organigrama: { label: '', value: 0 },
        version: '',
        fecha_terminado: '',
    }
    //Estado Inicial de Formulario de Crear Asignación
    const initialStateAsig: ICCDAsingForm = {
        sries_asignacion: { label: '', value: 0 },
        sries: '',
        subSerie_asignacion: [],
        subSerie: '',
        unidades_asignacion: { label: '', value: 0 },
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
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors: errors },

    } = useForm({ defaultValues: initialStateAsig });
    const dataAsing = watch();
    // console.log(dataAsing, 'dataAsing')

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
            const resultName = organigram.filter(item => item.id_organigrama === CCDCurrent.id_organigrama);
            let obj: ICCDForm = {
                id_ccd: CCDCurrent.id_ccd,
                nombreCcd: CCDCurrent.nombre,
                organigrama: { label: resultName[0].nombre, value: CCDCurrent.id_organigrama },
                unidades_organigrama: { label: '', value: 0 },
                version: CCDCurrent.version,
                fecha_terminado: CCDCurrent.fecha_terminado,
            }
            resetCreateCCD(obj);
            setSaveCCD(true);
        }
    }, [CCDCurrent]);

    // UseEffect para obtener organigramas
    useEffect(() => {
        dispatch(getOrganigramsService())
    }, [CCDCurrent]);
    // UseEffect para obtener series
    useEffect(() => {
        dispatch(getSeriesService())
    }, [CCDCurrent]);
    // UseEffect para obtener subSeries
    useEffect(() => {
        dispatch(getSubSeriesService())
    }, [CCDCurrent]);
    // UseEffect para obtener asignaciones
    useEffect(() => {
        dispatch(getAssignmentsService())
    }, [CCDCurrent]);

    //useEffect para obtener el MoldOrganigram (jerarquia de niveles & unidades)
    useEffect(() => {
        if (dataCreateCCD.organigrama.value !== 0) dispatch(getUnitysService(dataCreateCCD.organigrama.value));
    }, [dataCreateCCD.organigrama.value])

    useEffect(() => {
        setListUnitys(unityOrganigram.map(
            item => ({ label: item.nombre!, value: item.id_unidad_organizacional! })
        ));
    }, [unityOrganigram]);

    useEffect(() => {
        setListOrganigrams(organigram.map(
            item => ({ label: item.nombre!, value: item.id_organigrama! })
        ));
    }, [organigram]);

    useEffect(() => {
        setListSries(seriesCCD.map(
            item => ({ label: item.nombre!, value: item.id_serie_doc! })
        ));
    }, [seriesCCD]);

    useEffect(() => {
        setListSubSries(subSeriesCCD.map(
            item => ({ label: item.nombre!, value: item.id_subserie_doc! })
        ));
    }, [subSeriesCCD]);

    //submit Asignar CCD
    const onSubmit = () => {
        createAsing();
    };
    //submit Crear CCD
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
        let newItem: any[] = [];
        if (titleButtonAsing === 'Guardar relación') {
            newItem = [...assignmentsCCD, {
                id_unidad_organizacional: dataAsing.unidades_asignacion.value,
                id_serie_doc: dataAsing.sries_asignacion.value,
                subseries: dataAsing.subSerie_asignacion.map(item => item.value),
            }]
        } else {
            // newItem = assignmentsCCD.map(
            //     item => { return item.id_serie_doc === data.id_serie_doc ? { ...item, nombre: data.nombre, codigo: Number(data.codigo) } : item }
            // );
        }
        console.log(newItem, 'newItem....')
        console.log(titleButtonAsing, 'titleButtonAsing....')
        dispatch(createAssignmentsService(newItem, cleanAsing));
    };


    //Funcion para limpiar el formulario de Crear CCD
    const cleanCCD = () => {
        resetCreateCCD(initialState);
        setSaveCCD(false);
        dispatch(getCCDCurrent(null));
    }
    //Funcion para limpiar el formulario de asignar CCD
    const cleanAsing = () => {
        reset(initialStateAsig);
        setTitleButtonAsing('Guardar relación');
        dispatch(getAssignmentsCCDCurrent(null));
    }

    //Funcion para eliminar Asignaciones
    const deleteAsing = (id_subserie_doc) => {
        // const newItems = assignmentsCCD.filter(item => item.id_subserie_doc !== id_subserie_doc);
        // dispatch(createAssignmentsService(newItems, cleanAsing));
    }

    const columnAsigancion = [
        {
            headerName: "Sección",
            field: "sección",
            minWidth: 150,
            maxWidth: 200,
        },
        {
            headerName: "Subseccón",
            field: "Subseccón",
            minWidth: 150,
            maxWidth: 200,
        },
        {
            headerName: "serie",
            field: "serie",
            minWidth: 150,
            maxWidth: 200,
        },
        {
            headerName: "subserie",
            field: "subserie",
            minWidth: 150,
            maxWidth: 200,
        },
        {
            headerName: "Acciones",
            field: "accion",
            cellRendererFramework: (params) => (
                <div>
                    <button className="btn text-capitalize " type="button" title="Editar"
                        onClick={() => { dispatch(getAssignmentsCCDCurrent(params.data)) }}>
                        <i className="fa-regular fa-pen-to-square fs-4"></i>
                    </button>
                    <button
                        className="btn text-capitalize "
                        type="button"
                        title="Eliminar"
                    // onClick={() => { deleteSeries(params.data.id_serie_doc)}}a
                    >
                        <i className="fa-regular fa-trash-can fs-4"></i>
                    </button>
                </div>
            ),
        },
    ];

    return {
        //States
        listUnitys,
        listOrganigrams,
        listSries,
        listSubSries,
        title,
        titleButtonAsing,
        createIsactive,
        consultaCcdIsactive,
        columnAsigancion,
        control,
        controlCreateCCD,
        defaultColDef,
        errors,
        errorsCreateCCD,
        saveCCD,
        //Edita States
        setTitle,
        setTitleButtonAsing,
        setCreateIsactive,
        setConsultaCcdIsactive,
        //Functions
        onSubmitCreateCCD,
        onSubmit,
        registerCreateCCD,
        handleSubmit,
        handleSubmitCreateCCD,
        cleanCCD,
    };
}

export default useCCD;