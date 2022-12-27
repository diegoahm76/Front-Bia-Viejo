
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { textChoiseAdapter } from "../../../../../adapters/textChoices.adapter";
//components
import clienteAxios from "../../../../../config/clienteAxios";
import { IcvComputers, IcvComputersForm, IListMarks } from "../../../../../Interfaces/CV";
import { IGeneric } from "../../../../../Interfaces/Generic";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
//Actions
import { getCvComputersService, getCvMaintenanceService } from "../../../../../services/cv/CvComputers";
//Interfaces


const useCvComputers = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvComputers } = useAppSelector((state) => state.cv);

    //Local State
    const initialOptions: IListMarks[] = [{
        label: "",
        value: 0,
    }]
    const [articuloEncontrado, setArticuloEncontrado] = useState(false);
    const [otrasAplicaciones, setOtrasAplicaciones] = useState(false);
    const [ListMark, setListMark] = useState<IListMarks[]>(initialOptions);
    const [otrasPerisfericos, setOtrasPerisfericos] = useState(false);


    //Estado Inicial de Hojas de Vida de Computadores
    const initialState: IcvComputersForm = {
        sistema_operativo: '',
        suite_ofimatica: '',
        antivirus: '',
        color: '',
        tipo_de_equipo: '',
        tipo_almacenamiento: '',
        capacidad_almacenamiento: '',
        procesador: '',
        memoria_ram: 0,
        observaciones_adicionales: '',
        otras_aplicaciones: '',
        ruta_imagen_foto: '',
        id_articulo: 0,

        codigo_bien: '',
        cod_tipo_bien: '',
        nombre: '',
        doc_identificador_nro: '',
        marca: { label: '', value: 0 },
        estado: '',
        id_bien: 0,
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

    } = useForm<IcvComputersForm>({ defaultValues: initialState });
    const dataCvComputers = watch();

    //useEffect para consultar  options
    useEffect(() => {
        const getSelectsOptions = async () => {
            try {
                const { data: listMarkData } = await clienteAxios.get("/almacen/marcas/get-list/");
                console.log(listMarkData, "listMarkData");
                setListMark(listMarkData.map((item) => ({ label: item.nombre, value: item.id_marca })));
            } catch (err) {
                console.log(err);
            }
        };
        getSelectsOptions();
    }, []);

    //useEffect para consultar  options
    useEffect(() => {
        if (cvComputers) dispatch(getCvMaintenanceService(cvComputers.id_bien));
    }, [cvComputers]);

    // ueeEffect para obtener el organigrama a editar
    useEffect(() => {
        if (cvComputers) {
            let data = {
                ...cvComputers,
                marca: { label: cvComputers.marca, value: cvComputers.id_marca },
                nombre: cvComputers.nombre,
                cod_tipo_bien: cvComputers.cod_tipo_bien,
                codigo_bien: cvComputers.codigo_bien,
                doc_identificador_nro: cvComputers.doc_identificador_nro,
                estado: cvComputers.estado,
                id_articulo: cvComputers.id_bien,
            };
            reset(data);
            setOtrasPerisfericos(true);
            setOtrasAplicaciones(true);
            console.log(cvComputers!.marca, "cvComputers");
        }
    }, [cvComputers]);

    //ueeEffect para obtener el organigrama a editar
    useEffect(() => {
        if (cvComputers) {
            setArticuloEncontrado(true);
        } else {
            setArticuloEncontrado(false);
        }
    }, [cvComputers]);

    //submit Hojas de Vida de Computadores
    const onSubmit: SubmitHandler<IcvComputersForm> = (data) => {
        console.log(data);
    };

    //Funcion para crear hoja de vida de computadores
    const getCv = () => {

    };
    //Funcion para crear hoja de vida de computadores
    const createCv = () => {

    };
    //Funcion para actualizar hoja de vida de computadores
    const updateCv = () => {

    };


    //Funcion para eliminar hoja de vida de computadores
    const deleteCv = (id) => {

    }

    const ScreenHistoricoArticulo = () => {
        navigate("/dashboard/almacen/reportes/reporte-historico-activo");
    };

    const ScreenProgramarMantnimiento = () => {
        navigate(
            "/dashboard/almacen/gestion-de-inventario/programacion-mantenimiento"
        );
    };

    const handledSearch = () => {
        dispatch(getCvComputersService(dataCvComputers.doc_identificador_nro));
    };
    console.log(dataCvComputers.doc_identificador_nro, 'dataCvComputers.doc_identificador_nro')
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
        ListMark,
        otrasPerisfericos,
        control,
        dataCvComputers,
        defaultColDef,
        errors,
        //Edita States
        setArticuloEncontrado,
        setOtrasAplicaciones,
        setOtrasPerisfericos,
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
        onGridReady
    };
}

export default useCvComputers;