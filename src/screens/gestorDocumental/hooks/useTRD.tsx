
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//components
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
//Actions
//Interfaces
import { createCCDSService, getClassificationCCDSService, updateCCDSService } from '../../../services/CCD/CCDServices';
import { ICCDAsingForm, ICCDForm, IListOrganigrama } from "../../../Interfaces/CCD";
import { getCCDCurrent } from "../../../store/slices/CCD/indexCCD";
import { createAssignmentsService, getAssignmentsService } from "../../../services/assignments/AssignmentsServices";
import { getAssignmentsCCD, getAssignmentsCCDCurrent } from "../../../store/slices/assignments/indexAssignments";
import { ITDRForm } from "../../../Interfaces/TDR";
import { createTDRSService, getTRDService, updateTDRSService } from "../../../services/TDR/TDRServices";


const useTRD = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    // Redux State Extraction
    const { organigram, unityOrganigram } = useAppSelector((state) => state.organigram);
    const { CCDS } = useAppSelector((state) => state.CCD);
    const { TDRS, TDRSCurrent } = useAppSelector((state) => state.TDR);
    const { seriesCCD } = useAppSelector((state) => state.series);
    const { subSeriesCCD } = useAppSelector((state) => state.subSeries);
    const { assignmentsCCD, assignmentsCCDCurrent } = useAppSelector((state) => state.assignments);

    const [title, setTitle] = useState<string>('');
    const [titleButtonAsing, setTitleButtonAsing] = useState<string>('Guardar relación');
    const [saveTDR, setSaveTDR] = useState<boolean>(false);
    const [listCCDS, setListCCDS] = useState<IListOrganigrama[]>([{
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

    //Estado Inicial de Formulario de Crear TDR
    const initialState: ITDRForm = {
        ccds: null,
        nombre: "",
        version: ""
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

    //useForm Crear CCD
    const {
        register: registerCreateTDR,
        handleSubmit: handleSubmitCreateTDR,
        control: controlCreateTDR,
        reset: resetCreateTDR,
        watch: watchCreateTDR,
        formState: { errors: errorsCreateTDR },
    } = useForm<ITDRForm>({ defaultValues: initialState });

    const dataCreateTDR = watchCreateTDR();

    console.log(errorsCreateTDR, 'errorsCreateTDR')

    useEffect(() => {
        dispatch(getClassificationCCDSService());
        dispatch(getTRDService());
        dispatch(getAssignmentsCCD([]));
    }, []);

    // UseEffect para obtener organigramas
    useEffect(() => {
        if (TDRSCurrent !== null) {
            const resultName = CCDS.filter(item => item.id_ccd === TDRSCurrent.id_ccd);
            let obj: ITDRForm = {
                ccds: { label: resultName[0].nombre, value: resultName[0].id_ccd },
                nombre: TDRSCurrent.nombre,
                version: TDRSCurrent.version,
            }
            resetCreateTDR(obj);
            setSaveTDR(true);
        }
    }, [TDRSCurrent]);

    useEffect(() => {
        if (assignmentsCCDCurrent !== null) {
            let obj = {
                sries_asignacion: { label: assignmentsCCDCurrent.nombre_serie, value: assignmentsCCDCurrent.id_serie_doc },
                sries: '',
                subSerie_asignacion: assignmentsCCDCurrent.subseries!.map(
                    item => {
                        return {
                            label: item.label,
                            value: item.value,
                        }
                    }
                ),
                subSerie: '',
                unidades_asignacion: { label: assignmentsCCDCurrent.seccion, value: assignmentsCCDCurrent.id_unidad_organizacional },
            }
            reset(obj);
            setTitleButtonAsing('Editar relación');
        }
    }, [assignmentsCCDCurrent]);

    // // UseEffect para obtener organigramas
    // useEffect(() => {
    //     dispatch(getOrganigramsService())
    // }, [CCDCurrent]);
    // // UseEffect para obtener series
    // useEffect(() => {
    //     dispatch(getSeriesService())
    // }, [CCDCurrent]);
    // // UseEffect para obtener subSeries
    // useEffect(() => {
    //     dispatch(getSubSeriesService())
    // }, [CCDCurrent]);
    // // UseEffect para obtener asignaciones
    // useEffect(() => {
    //     dispatch(getAssignmentsService())
    // }, [CCDCurrent]);

    //useEffect para obtener el MoldOrganigram (jerarquia de niveles & unidades)
    // useEffect(() => {
    //     if (dataCreateCCD.organigrama.value !== 0) dispatch(getUnitysService(dataCreateCCD.organigrama.value));
    // }, [dataCreateCCD.organigrama.value])

    useEffect(() => {
        setListCCDS(CCDS.map(
            item => ({ label: item.nombre!, value: item.id_ccd! })
        ));
    }, [CCDS]);

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

    // UseEffect para Actualizar la tabla de asignaciones
    useEffect(() => {
        if (dataCreateTDR.ccds) getCurretCCD(dataCreateTDR.ccds.value);
    }, [dataCreateTDR.ccds]);

    const getCurretCCD = (id: number) => {
        const result = CCDS.filter(item => item.id_ccd === id);
        dispatch(getCCDCurrent(result[0]));
        dispatch(getAssignmentsService())
    }

    //submit Asignar CCD
    const onSubmit = () => {
        createAsing();
    };
    //submit Crear TDR
    const onSubmitCreateTDR = () => {
        if (TDRSCurrent !== null) {
            updateTDR();
        } else {
            createTDR();
        }
    };

    //Funcion para crear el CCD
    const createTDR = () => {
        let newTDR = {
            id_ccd: dataCreateTDR.ccds!.value,
            version: dataCreateTDR.version,
            nombre: dataCreateTDR.nombre
        }
        dispatch(createTDRSService(newTDR, setSaveTDR))
    };
    //Funcion para actualizar el CCD
    const updateTDR = () => {
        let newTDR = {
            version: dataCreateTDR.version,
            nombre: dataCreateTDR.nombre
        }
        dispatch(updateTDRSService(newTDR))
    };

    //Funcion para crear la asignacion
    const createAsing = () => {
        let newItem: any[] = [];
        const oldItems = assignmentsCCD.map(
            item => {
                return {
                    id_unidad_organizacional: item.id_unidad_organizacional,
                    id_serie_doc: item.id_serie_doc,
                    subseries: item.subseries!.map(item => item.value),
                }
            }
        );
        if (titleButtonAsing === 'Guardar relación') {
            newItem = [...oldItems, {
                id_unidad_organizacional: dataAsing.unidades_asignacion.value,
                id_serie_doc: dataAsing.sries_asignacion.value,
                subseries: dataAsing.subSerie_asignacion.map(item => item.value),
            }]
        } else {
            newItem = assignmentsCCD.map(
                item => {
                    return item.id === assignmentsCCDCurrent!.id ?
                        {
                            id_unidad_organizacional: dataAsing.unidades_asignacion.value,
                            id_serie_doc: dataAsing.sries_asignacion.value,
                            subseries: dataAsing.subSerie_asignacion.map(item => item.value),
                        }
                        : {
                            id_unidad_organizacional: item.id_unidad_organizacional,
                            id_serie_doc: item.id_serie_doc,
                            subseries: item.subseries!.map(item => item.value),
                        }
                }
            );
        }
        dispatch(createAssignmentsService(newItem, cleanAsing));
    };


    //Funcion para limpiar el formulario de Crear CCD
    const cleanTDR = () => {
        resetCreateTDR(initialState);
        setSaveTDR(false);
        dispatch(getCCDCurrent(null));
        cleanAsing();
        dispatch(getAssignmentsCCD([]));
    }
    //Funcion para limpiar el formulario de asignar CCD
    const cleanAsing = () => {
        reset(initialStateAsig);
        setTitleButtonAsing('Guardar relación');
        dispatch(getAssignmentsCCDCurrent(null));
    }

    //Funcion para eliminar Asignaciones
    const deleteAsing = (id) => {
        const newItems = assignmentsCCD.filter(item => item.id !== id);
        const itemFinal = newItems.map(
            item => {
                return {
                    id_unidad_organizacional: item!.id_unidad_organizacional,
                    id_serie_doc: item!.codigo_serie,
                    subseries: item!.subseries!.map(item => item.value),
                }
            }
        );
        dispatch(createAssignmentsService(itemFinal, cleanAsing));
    }

    const getRowClass = (params) => {
        if (params.data.price >= 50000) {
            return 'high-price';
        }
        return '';
    };

    const columnAsigancion = [
        {
            headerName: "Sección",
            field: "seccion",
            minWidth: 150,
            maxWidth: 200,
        },
        {
            headerName: "Subsección",
            field: "subseccion",
            minWidth: 150,
            maxWidth: 200,
        },
        {
            headerName: "serie",
            field: "nombre_serie",
            minWidth: 150,
            maxWidth: 200,
        },
        {
            headerName: "subserie",
            field: "subseries_nombres",
            minWidth: 150,
            cellStyle: {
                'white-space': 'pre-wrap'
            }
        },
    ];

    console.log(TDRS, 'TDRS')

    return {
        //States
        listCCDS,
        title,
        controlCreateTDR,
        defaultColDef,
        errorsCreateTDR,
        saveTDR,
        columnAsigancion,
        //Edita States
        setTitle,
        //Functions
        onSubmitCreateTDR,
        registerCreateTDR,
        handleSubmitCreateTDR,
        cleanTDR,
        getRowClass,
    };
}

export default useTRD;