import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import clienteAxios from "../../../../config/clienteAxios";
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { IGeneric } from '../../../../Interfaces/Generic';
import { IViveroCreate } from '../../../../Interfaces/AdministradorViveros';
import { textChoiseAdapter } from '../../../../adapters/textChoices.adapter';
import { SweetAlertIcon } from "sweetalert2";
import Swal from 'sweetalert2';
import { createThunkAdministracionVivero, getThunkAdministracionVivero, editThunkAdministracionVivero } from '../../../../services/administradorVivero/thunkAdministracionVivero';
import { formatISO } from 'date-fns';
import { formatMs } from "@material-ui/core";
import BusquedaAvanzadaModal from '../../../../components/BusquedaAvanzadaModal';
import moment from "moment";

export const useAdministracionVivero = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const {} = useAppSelector((state) => state.viveroSlice);

    const busquedaAvanzadaModel = {
        tipoDocumento: { value: "", label: "" },
        cedula: "",
        nombreCompleto: "",
        idResponsable: 0,
    };

    const infoViveroModel = {
        id_vivero:0,
        nombre: "",
        municipio: { value: "", label: "" },
        direccion: "",
        area_mt2: 0,
        area_propagacion_mt2: 0,
        tiene_area_produccion: false,
        tiene_areas_pep_sustrato: false,
        tiene_area_embolsado: false,
        tipo_vivero: { value: "", label: "" },
        fecha_inicio_viverista_actual: "",
        origen_recursos_vivero: { value: "", label: "" },
        fecha_inicio_cuarentena: "",
        id_viverista_actual: 0,
        id_persona_crea: 0,
        ruta_archivo_creacion: "",
        fecha_creacion:"",
        en_funcionamiento:false,
        fecha_ultima_apertura:"",
        justificacion_apertura:"",
        fecha_cierre_actual:"",
        justificacion_cierre:"",
        justificacion_cuarentena:"",
        activo:false,
        item_ya_usado:false,
        id_persona_abre:0,
        id_persona_cierra:0,
        id_persona_cuarentea:0,
        vivero_en_cuarentena:false,
    };

    const initialOptions: IGeneric[] = [
        {
        label: "",
        value: "",
        },
    ];

    const [createModel, setCreateModel] = useState(infoViveroModel);
    const [municipiosOptions, setMunicipiosOptions] = useState(initialOptions);
    const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState(initialOptions);
    const [tipoVivero, setTipoVivero] = useState(initialOptions);
    const [origenRecurso, setOrigenRecurso] = useState(initialOptions);
    const [busquedaModel, setBusquedaModel] = useState(busquedaAvanzadaModel);
    const [file, setFile] = useState(null);


    const {
        register,
        handleSubmit,
        control,
        reset,
        watch,
        setValue,
        formState: { errors: errors },
    } = useForm();

    const dataViveroAdministracion = watch();

    //Función para las alertas
    const notificationAlert = (message = 'Proceso Exitoso', state: SweetAlertIcon) => Swal.mixin({
        position: 'center',
        icon: state,
        title: message,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
    }).fire();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreateModel({ ...createModel, [name]: value });
    };

    const changeSelectTipoVivero = (e) => {
        let tipoVivero = { ...createModel };
        tipoVivero.tipo_vivero = {
            value: e.value,
            label: e.label,
        };
        setValue("tipo_vivero", tipoVivero.tipo_vivero);
        setCreateModel(tipoVivero);
    };

    const changeSelectOrigenRecurso = (e) => {
        let origenRecurso = { ...createModel };
        origenRecurso.origen_recursos_vivero = {
            value: e.value,
            label: e.value,
        };
        setValue("origen_recursos_vivero", origenRecurso.origen_recursos_vivero);
        setCreateModel(origenRecurso);
    };

    const changeSelectMuni = (e) => {
        let municipio = { ...createModel };
        municipio.municipio = {
            value: e.value,
            label: e.label,
        };
        setValue("cod_municipio", municipio.municipio);
        setCreateModel(municipio);
    };


    const onSubmit = () => {
        createStartViveroForm();
        setCreateModel(infoViveroModel)
        console.log('Entre');
    }

    // useEffect(() => {
        // onSubmit();
    // }, [])


    const AdministradorVivero = () => {
        navigate("/dashboard/conservcacion/gestorvivero/administrarvivero");
    };

    useEffect(() => {
        const getSelectsOptions = async () => {
            try {
                const { data: tipoDocumentosNoFormat } = await clienteAxios.get("choices/tipo-documento/");
                const { data: municipiosNoFormat } = await clienteAxios.get("choices/municipios/");
                const { data: tipoViveroNoFormat } = await clienteAxios.get("conservacion/choices/tipo-vivero/");
                const { data: origenRecursoNoFormat } = await clienteAxios.get("conservacion/choices/origen-recursos-vivero/");
                const documentosFormat = textChoiseAdapter(tipoDocumentosNoFormat);
                const municipiosFormat = textChoiseAdapter(municipiosNoFormat);
                const tipoViveroFormat = textChoiseAdapter(tipoViveroNoFormat);
                const origenRecursosFormat = textChoiseAdapter(origenRecursoNoFormat);
                setOrigenRecurso(origenRecursosFormat);
                setTipoVivero(tipoViveroFormat);
                setTipoDocumentoOptions(documentosFormat);
                const meta: IGeneric[] = [];
                municipiosFormat.map(({ label, value }) => {
                    const num = Number(value);

                    if (num >= 50000 && num <= 51000) {
                        meta.push({ label, value } as IGeneric);
                    }

                    return setMunicipiosOptions(meta);
                });
            } catch (err) {
                console.log(err);
            }
        };
        getSelectsOptions();
    }, []);


    const [cuarentena, setCuarentena] = useState<boolean>(false);
    const [modal, setModal] = useState<boolean>(false);

    useEffect(() => {
        if( dataViveroAdministracion.vivero_en_cuarentena) setCuarentena(false)
    },      [dataViveroAdministracion.vivero_en_cuarentena])
    



    const handleOpenModalAvanzadaModal = () => {
        setModalPersonal(true);
    };

    const onSubmitGet = () => {
        // dispatch(getThunkAdministracionVivero());
        setModal(true);
        setCreateModel(infoViveroModel)
    }


    
    const [selectedDate, setSelectedDate] = useState(null);
    const formattedDate = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '';
  
    const handleDateChange = date => {
      setSelectedDate(date);
    };
    //const fecha= dataViveroAdministracion.fecha_inicio_viverista_actual;
console.log(formattedDate);

    const [modalPersonal, setModalPersonal] = useState(false);
dataViveroAdministracion.fecha_inicio_viverista_actual=formattedDate;
    const createStartViveroForm = () => {
    //    let idPersona=parseInt(busquedaAvanzadaModel?.idResponsable)
        const formData = new FormData();

        formData.append('nombre', dataViveroAdministracion.nombre);
        formData.append('cod_municipio', dataViveroAdministracion.cod_municipio.value);
        formData.append('direccion', dataViveroAdministracion.direccion);
        formData.append('area_mt2', dataViveroAdministracion.area_mt2);
        formData.append('area_propagacion_mt2', dataViveroAdministracion.area_propagacion_mt2);
        formData.append('tiene_area_produccion', dataViveroAdministracion.tiene_area_produccion);
        formData.append('tiene_areas_pep_sustrato', dataViveroAdministracion.tiene_area_pep_sustrato);
        formData.append('tiene_area_embolsado', dataViveroAdministracion.tiene_area_embolsado);
        formData.append('cod_tipo_vivero', dataViveroAdministracion.tipo_vivero.value);
        formData.append('cod_origen_recursos_vivero', dataViveroAdministracion.origen_recursos_vivero.value);
        formData.append('ruta_archivo_creacion', file === null ? '' : file);
        formData.append('vivero_en_cuarentena',dataViveroAdministracion.vivero_en_cuarentena);
        formData.append('fecha_creacion',dataViveroAdministracion.fecha_creacion);
        formData.append('en_funcionamiento',dataViveroAdministracion.en_funcionamiento);
        formData.append('fecha_ultima_apertura',dataViveroAdministracion.fecha_ultima_apertura);
        formData.append('justificacion_apertura',dataViveroAdministracion.justificacion_apertura);
        formData.append('fecha_cierre_actual',dataViveroAdministracion.fecha_cierre_actual);
        formData.append('justificacion_cierre',dataViveroAdministracion.justificacion_cierre);
        formData.append('justificacion_cuarentena',dataViveroAdministracion.justificacion_cuarentena);
        formData.append('activo',dataViveroAdministracion.activo);
        formData.append('item_ya_usado',dataViveroAdministracion.item_ya_usado);
        formData.append('id_viverista_actual',dataViveroAdministracion.id_viverista_actual)
        formData.append('id_persona_abre',dataViveroAdministracion.id_persona_abre);
        formData.append('id_persona_cierra',dataViveroAdministracion.id_persona_cierra);
        formData.append('id_persona_cuarentena',dataViveroAdministracion.id_persona_cuarentena);
        formData.append('fecha_inicio_viverista_actual',dataViveroAdministracion.fecha_inicio_viverista_actual);
        dispatch(createThunkAdministracionVivero(formData));
        console.log(dataViveroAdministracion);
        // console.log(dataViveroAdministracion.cod_tipo_vivero);
    }

    const handleEditVivero = (id) => {
        const formdata = new FormData();
        formdata.append('area_mt2', dataViveroAdministracion.area_mt2 );
        formdata.append('area_propagacion_mt2', dataViveroAdministracion.area_propagacion_mt2 );
        formdata.append('tiene_area_produccion', dataViveroAdministracion.tiene_area_produccion );
        formdata.append('tiene_areas_pep_sustrato', dataViveroAdministracion.tiene_area_pep_sustrato );
        formdata.append('tiene_area_embolsado', dataViveroAdministracion.tiene_area_embolsado );
        formdata.append('cod_tipo_vivero', dataViveroAdministracion.tipo_vivero.value );
        formdata.append('cod_origen_recursos_vivero', dataViveroAdministracion.origen_recursos_vivero.value=formattedDate );
        console.log(formdata);
        dispatch(editThunkAdministracionVivero(id, formdata))
    }

    //Cargue de archivos de imagen
    const handleUpload = ({ target }) => {
        if (target.files.length > 0) setFile(target.files[0])
    };





    return {
        handleEditVivero,
        handleSubmit,
        handleUpload,
        onSubmit,
        changeSelectTipoVivero,
        changeSelectMuni,
        changeSelectOrigenRecurso,
        handleChange,
        municipiosOptions,
        setMunicipiosOptions,
        tipoVivero,
        setTipoVivero,
        origenRecurso,
        register,
        control,
        errors,
        setValue,
        infoViveroModel,
        createModel,
        setCreateModel,
        busquedaAvanzadaModel,
        setModalPersonal,
        handleOpenModalAvanzadaModal,
        onSubmitGet,
        modal,
        setModal,
        modalPersonal,
        setBusquedaModel,
        busquedaModel,
        handleDateChange
    };
};
