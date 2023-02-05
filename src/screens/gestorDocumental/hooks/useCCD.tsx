
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
//components
import { useAppDispatch, useAppSelector } from "../../../store/hooks/hooks";
//Actions
// import { createCvComputersService, getCvComputersService, getCvMaintenanceService } from "../../../../../services/cv/CvComputers";
//Interfaces
import { createCCDSService, updateCCDSService } from '../../../services/CCD/CCDServices';
import { getOrganigramsService, getUnitysService } from "../../../services/organigram/OrganigramServices";
import { ICCDForm, IListOrganigrama, IListUnity } from "../../../Interfaces/CCD";
import { getCCDCurrent } from "../../../store/slices/CCD/indexCCD";
import { getSubSeriesService } from "../../../services/subseries/SubSeriesServices";
import { getSeriesService } from "../../../services/series/SeriesServices";
import { getAssignmentsService } from "../../../services/assignments/AssignmentsServices";


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
        unidades_organigrama: { label: '', value: '' },
        version: '',
        fecha_terminado: '',
    }
    //Estado Inicial de Formulario de Crear Asignación
    const initialStateAsig = {
        sries_asignacion: { label: '', value: 0 },
        sries: '',
        subSerie_asignacion: [],
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
        handleSubmit,
        control,
        watch,
        formState: { errors: errors },

    } = useForm({ defaultValues: initialStateAsig });
    const dataAsing = watch();
    console.log(dataAsing, 'dataAsing')

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
                unidades_organigrama: { label: '', value: '' },
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
            item => ({ label: item.nombre!, value: item.codigo! })
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
        // let newItem: any[] = []
        // if (titleButton === 'Agregar') {
        //   newItem = [...seriesCCD, {
        //     id_serie_doc: data.id_serie_doc,
        //     nombre: data.nombre,
        //     codigo: data.codigo,
        //     id_ccd: CCDCurrent!.id_ccd
        //   }]
        // } else {
        //   newItem = seriesCCD.map(
        //     item => { return item.id_serie_doc === data.id_serie_doc ? { ...item, nombre: data.nombre, codigo: Number(data.codigo) } : item }
        //   );
        // }
        // dispatch(createSeriesService(newItem, clean));
    };


    //Funcion para limpiar el formulario de Crear CCD
    const cleanCCD = () => {
        resetCreateCCD(initialState);
        setSaveCCD(false);
        dispatch(getCCDCurrent(null));
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
                    <button className="btn text-capitalize " type="button" title="Editar">
                        <i className="fa-regular fa-pen-to-square fs-4"></i>
                    </button>
                    <button
                        className="btn text-capitalize "
                        type="button"
                        title="Eliminar"
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