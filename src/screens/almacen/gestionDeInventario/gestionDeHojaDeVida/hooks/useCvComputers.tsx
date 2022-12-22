
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { textChoiseAdapter } from "../../../../../adapters/textChoices.adapter";
//components
import clienteAxios from "../../../../../config/clienteAxios";
import { IcvComputers } from "../../../../../Interfaces/CV";
import { IGeneric } from "../../../../../Interfaces/Generic";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks/hooks";
//Actions
import { getCvComputersService } from "../../../../../services/cv/CvComputers";
import { IMarcas } from "../../../../../Interfaces/Marca";
//Interfaces


const useCvComputers = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    //Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cvComputers } = useAppSelector((state) => state.cv);

    //Local State
    const initialOptions: IMarcas[] = [{
        id_marca: 0,
        nombre: "",
        activo: true,
        item_ya_usado: false
    }]
    const [articuloEncontrado, setArticuloEncontrado] = useState(false);
    const [otrasAplicaciones, setOtrasAplicaciones] = useState(false);
    const [ListMark, setListMark] = useState<IMarcas[]>(initialOptions);
    const [otrasPerisfericos, setOtrasPerisfericos] = useState(false);


    //Estado Inicial de Hojas de Vida de Computadores
    const initialState: IcvComputers = {
        id_hoja_de_vida: 0,
        sistema_operativo: "",
        suite_ofimatica: "",
        antivirus: "",
        color: "",
        tipo_de_equipo: "",
        tipo_almacenamiento: "",
        capacidad_almacenamiento: "",
        procesador: "",
        memoria_ram: 0,
        observaciones_adicionales: "",
        otras_aplicaciones: "",
        ruta_imagen_foto: "",
        id_articulo: 0,

        tipoDocumento: "",
        codigo: "",
        serial: "",
        marca: "",
        estado: "",
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

    } = useForm<IcvComputers>({ defaultValues: initialState });
    const dataCvComputers = watch();

    //useEffect para consultar  options
    useEffect(() => {
        const getSelectsOptions = async () => {
            try {
                const { data: listMarkData } = await clienteAxios.get("/almacen/marcas/get-list/");
                setListMark(listMarkData.map((item: IMarcas) => ({ ...item, label: item.nombre, value: item.nombre })));
            } catch (err) {
                console.log(err);
            }
        };
        getSelectsOptions();
    }, []);

    //ueeEffect para obtener el organigrama a editar
    useEffect(() => {
        if (cvComputers) {
            let data = { ...cvComputers, serial: dataCvComputers.serial, codigo: dataCvComputers.codigo, tipoDocumento: dataCvComputers.tipoDocumento };
            reset(data);
            setOtrasPerisfericos(true);
            setOtrasAplicaciones(true);
        }
    }, [cvComputers]);

    //ueeEffect para obtener el organigrama a editar
    useEffect(() => {
        if (Object.keys(cvComputers).length !== 0) {
            setArticuloEncontrado(true);
        } else {
            setArticuloEncontrado(false);
        }
    }, [cvComputers]);

    //submit Hojas de Vida de Computadores
    const onSubmit: SubmitHandler<IcvComputers> = (data) => {
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
        dispatch(getCvComputersService(dataCvComputers.serial));
    };
    console.log(dataCvComputers.serial, 'dataCvComputers.serial')
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