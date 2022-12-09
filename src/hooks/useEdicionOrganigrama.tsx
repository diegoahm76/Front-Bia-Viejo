
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { textChoiseAdapter } from "../adapters/textChoices.adapter";
//components
import clienteAxios from "../config/clienteAxios";
import { useAppDispatch, useAppSelector } from "../store/hooks/hooks";
//Actions
import { editOrganigramsService, getLevelsService, getUnitysService, updateLevelsService, updateUnitysService } from "../services/organigram/OrganigramServices";
//Interfaces
import {
    IObjLevels as FormValuesLevels,
    FormValuesUnitys,
    IDocumentaryGroup,
    ILevelFather,
    ILevelUnity,
    IObjCreateOrganigram as FormValuesOrganigram,
    ITypeUnity,
} from "../Interfaces/Organigrama";
import { SingleValue } from "react-select";

const useEdicionOrganigrama = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();

    // Redux State Extraction
    const { organigramCurrent, levelsOrganigram, unityOrganigram } = useAppSelector((state) => state.organigram);

    //Local State
    const [orden_nivel, setOrden_nivel] = useState<number>(0);
    const [title_nivel, setTitle_nivel] = useState<string>('Agregar');
    const [title_unidades, setTitle_unidades] = useState<string>('Agregar Unidades');
    const [optionNivel, setOptionNivel] = useState<ILevelUnity[]>([{
        label: '',
        value: '',
        orden: ''
    }]);
    const [optionUnidadPadre, setOptionUnidadPadre] = useState<ILevelFather[]>([{
        label: '',
        value: '',
        id_nivel_organigrama: 0,
        isDisabled: false
    }]);
    const [optionsTipoUnidad, setOptionTipoUnidad] = useState<ITypeUnity[]>([{
        label: '',
        value: null,
        isDisabled: false
    }]);
    const [optionsAgrupacionD, setOptionAgrupacionD] = useState<IDocumentaryGroup[]>([]);
    const optionRaiz = [
        { label: "Si", value: true },
        { label: "No", value: false },
    ];
    const initialStateLevels: FormValuesLevels = {
        id_nivel_organigrama: '',
        id_organigrama: '',
        orden_nivel: 0,
        nombre: '',
    };
    //Estado Inicial de las unidades
    const initialStateUnitys: FormValuesUnitys = {
        "unidadRaiz": {
            "label": 'si',
            "value": true
        },
        "codigo": '',
        "nombre": '',
        "tipoUnidad": {
            "label": '',
            "value": null,
            "isDisabled": false
        },
        "nivelUnidad": {
            "label": '',
            "value": null,
            "orden": ''
        },
        "agrupacionDocumental": {
            "label": '',
            "value": null,
            "isDisabled": false
        },
        "nivelPadre": {
            "label": '',
            "value": null,
            "id_nivel_organigrama": 0,
            "isDisabled": false
        }
    }
    //configuración de tabla por defecto
    const defaultColDefOrganigrama = {
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

    //useForm Organigrama
    const {
        register: registerOrganigrama,
        handleSubmit: handleSubmitOrganigrama,
        reset: resetOrganigrama,
        formState: { errors: errorsOrganigrama },
    } = useForm<FormValuesOrganigram>();

    //useForm Nivel
    const {
        register: registerNivel,
        handleSubmit: handleSubmitNivel,
        reset: resetNivel,
        formState: { errors: errorsNivel },
    } = useForm<FormValuesLevels>({ defaultValues: initialStateLevels });

    //useForm Unidades
    const {
        register: registerUnidades,
        handleSubmit: handleSubmitUnidades,
        control: controlUnidades,
        reset: resetUnidades,
        watch: watchUnidades,
        setValue: setValueUnidades,
        formState: { errors: errorsUnidades },

    } = useForm<FormValuesUnitys>({ defaultValues: initialStateUnitys });
    const datosUnidades = watchUnidades();

    //columnas  unidaddes
    const columnsUnidades = [
        { headerName: "Código", field: "codigo", minWidth: 100, maxWidth: 100 },
        { headerName: "Nombre", field: "nombre" },
        { headerName: "Tipo unidad", field: "cod_tipo_unidad", minWidth: 130, maxWidth: 130 },
        { headerName: "Agrupacion Documental", field: "cod_agrupacion_documental", minWidth: 200, maxWidth: 200 },
        {
            headerName: "Unidad raíz",
            field: "unidad_raiz",
            wrapText: true,
            headerAlign: "center",
            minWidth: 130,
            maxWidth: 130,
            headerCheckboxSelection: false,
            checkboxSelection: false,
            showDisabledCheckboxes: false,
            cellRendererFramework: ({ data: { unidad_raiz } }) => (
                <i className={`${unidad_raiz === true ? "fa-solid fa-circle-check fs-3" : "fa-regular fa-xmark fs-3"}`}></i>
            ),
        },
        {
            headerName: "Acciones",
            field: "editar",
            minWidth: 140,
            maxWidth: 140,
            cellRendererFramework: ({ data }) => (
                <div className="d-flex gap-1">
                    <button
                        style={{ border: "none", background: "none" }}
                        data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top"
                        type="button"
                        onClick={() => {
                            resetUnidades({
                                "unidadRaiz": {
                                    "label": optionRaiz.filter((item) => item.value === data.unidad_raiz)[0].label,
                                    "value": data.unidad_raiz
                                },
                                "codigo": data.codigo,
                                "nombre": data.nombre,
                                "tipoUnidad": {
                                    "label": optionsTipoUnidad.filter((tipo) => tipo.value === data.cod_tipo_unidad)[0].label,
                                    "value": data.cod_tipo_unidad,
                                    "isDisabled": false
                                },
                                "nivelUnidad": {
                                    "label": optionNivel.filter((nivel) => nivel.value === data.id_nivel_organigrama)[0].label,
                                    "value": data.id_nivel_organigrama,
                                    "orden": optionNivel.filter((nivel) => nivel.value === data.id_nivel_organigrama)[0].orden
                                },
                                "agrupacionDocumental": {
                                    "label": data.cod_agrupacion_documental ? optionsAgrupacionD.filter((agrupacion) => agrupacion.value === data.cod_agrupacion_documental)[0].label : '',
                                    "value": data.cod_agrupacion_documental,
                                    "isDisabled": false
                                },
                                "nivelPadre": {
                                    "label": data.nombre,
                                    "value": data.codigo
                                }
                            })
                            setTitle_unidades('Editar Unidad');
                        }}
                    >
                        <i className="fa-regular fa-pen-to-square fs-3"></i>
                    </button>
                    <button
                        type="button"
                        style={{ border: "none", background: "none" }}
                        onClick={() => deleteUnidades(data.codigo)}
                    >
                        <i className="fa-light fa-trash-can fs-3"></i>
                    </button>
                </div>
            ),
        },
    ];
    //columnas nivel
    const columnsNivel = [
        { headerName: "Nivel", field: "orden_nivel", minWidth: 100 },
        { headerName: "Nombre", field: "nombre", minWidth: 200 },
        {
            headerName: "Acciones",
            field: "editar",
            minWidth: 140,
            cellRendererFramework: ({ data }) => (
                <div className="d-flex justify-content-center gap-1">
                    <button
                        type="button"
                        style={{ border: "none", background: "none" }}
                        onClick={() => {
                            setTitle_nivel('Editar');
                            resetNivel(data)
                        }}
                    >
                        <i className="fa-regular fa-pen-to-square fs-3"></i>
                    </button>
                    <button
                        className={`${data.orden_nivel !== (orden_nivel - 1) && "d-none"}`}
                        type="button"
                        onClick={() => {
                            deleteLevel(data.orden_nivel)
                        }}
                    >
                        {/* <i className={`fa-light fa-trash-can fs-3 ${data.orden_nivel !== (orden_nivel - 1) && "d-none"}`}></i> */}
                        <i className="fa-light fa-trash-can fs-3"></i>
                    </button>
                </div>
            ),
        },
    ];

    //ueeEffect para obtener el organigrama a editar
    useEffect(() => {
        resetOrganigrama(organigramCurrent);
    }, [organigramCurrent]);

    useEffect(() => {
        setOrden_nivel(levelsOrganigram.length + 1);
        setOptionNivel(levelsOrganigram.map((item) => ({ label: item.nombre, value: item.id_nivel_organigrama, orden: item.orden_nivel })));
    }, [levelsOrganigram]);

    useEffect(() => {
        resetUnidades({
            unidadRaiz: { label: "Si", value: true },
        });
        setOptionUnidadPadre(unityOrganigram.map((item) => ({ label: item.nombre, value: item.codigo, id_nivel_organigrama: item.id_nivel_organigrama, isDisabled: false })));
    }, [unityOrganigram]);

    //useEffect para desabilitar opciones de unidad padre
    useEffect(() => {
        if (datosUnidades.nivelUnidad) {
            setOptionUnidadPadre(unityOrganigram.map((item) => ((item.id_nivel_organigrama < datosUnidades!.nivelUnidad!.value!) ? { label: item.nombre, value: item.codigo, id_nivel_organigrama: item.id_nivel_organigrama, isDisabled: false } : { label: item.nombre, value: item.codigo, id_nivel_organigrama: item.id_nivel_organigrama, isDisabled: true })));
            setValueUnidades('nivelPadre', {
                "label": '',
                "value": null,
                "id_nivel_organigrama": 0,
                "isDisabled": false
            })
        }
    }, [datosUnidades.nivelUnidad]);

    //useEffect para deshabilitar el nivel 1 cuando el tipo de unidad es de apoyo o soporte
    useEffect(() => {
        if (['AP', 'AS'].includes(String(datosUnidades?.tipoUnidad?.value))) {
            setOptionNivel(prev => prev.map((item) => item.value === 'N1' ? { ...item, isDisabled: true } : item));
        } else {
            setOptionNivel(prev => prev.map((item) => item.value === 'N1' ? { ...item, isDisabled: false } : item));
        }
    }, [datosUnidades.tipoUnidad]);

    //useEffect para consultar los niveles y unidades
    useEffect(() => {
        if (organigramCurrent.id_organigrama) dispatch(getLevelsService(organigramCurrent.id_organigrama));
        if (organigramCurrent.id_organigrama) dispatch(getUnitysService(organigramCurrent.id_organigrama));
    }, [organigramCurrent]);

    //useEffect para consultar  options
    useEffect(() => {
        const getSelectsOptions = async () => {
            try {
                const { data: agrupacionDocumentalNoFormat } = await clienteAxios.get("almacen/choices/agrupacion-documental/");
                const { data: tipoUnidadNoFormat } = await clienteAxios.get("almacen/choices/tipo-unidad/");

                const agrupacionDocumentalFormat = textChoiseAdapter(agrupacionDocumentalNoFormat);
                const tipoUnidadFormat = textChoiseAdapter(tipoUnidadNoFormat);

                setOptionAgrupacionD(agrupacionDocumentalFormat.map((item) => ({ ...item, isDisabled: false })));
                setOptionTipoUnidad(tipoUnidadFormat.map((item) => ({ ...item, isDisabled: false })));
            } catch (err) {
                console.log(err);
            }
        };
        getSelectsOptions();
    }, []);

    //Funcion para actualizar un nivel
    const submitNivel: SubmitHandler<FormValuesLevels> = (data: FormValuesLevels) => {
        let newNiveles: FormValuesLevels[] = []
        if (title_nivel === 'Agregar') {
            newNiveles = [...levelsOrganigram, {
                id_organigrama: organigramCurrent.id_organigrama,
                orden_nivel: orden_nivel,
                nombre: data.nombre,
                id_nivel_organigrama: null
            }]
        } else {
            newNiveles = levelsOrganigram.map(nivel => {
                if (nivel.id_nivel_organigrama === data.id_nivel_organigrama) {
                    nivel.nombre = data.nombre;
                }
                return nivel;
            });
            setTitle_nivel('Agregar');
        }
        resetNivel({
            nombre: ''
        });
        dispatch(updateLevelsService(organigramCurrent.id_organigrama, newNiveles));
    };

    //Funcion para actualizar un unidades
    const submitUnidades: SubmitHandler<FormValuesUnitys> = ({ codigo, nombre, nivelPadre, tipoUnidad, agrupacionDocumental, unidadRaiz, nivelUnidad }: FormValuesUnitys) => {
        let newUnidades: FormValuesUnitys[] = []
        if (title_unidades === 'Agregar Unidades') {
            newUnidades = [...unityOrganigram, {
                id_nivel_organigrama: nivelUnidad!.value!,
                nombre,
                codigo,
                cod_tipo_unidad: tipoUnidad!.value,
                cod_agrupacion_documental: agrupacionDocumental!.value,
                unidad_raiz: unidadRaiz!.value,
                id_organigrama: organigramCurrent.id_organigrama,
                cod_unidad_org_padre: nivelPadre ? nivelPadre.value : null,
            }]
        } else {
            newUnidades = unityOrganigram.map(unidad => {
                if (unidad.codigo === codigo) {
                    return {
                        id_nivel_organigrama: nivelUnidad!.value,
                        nombre: nombre,
                        codigo: codigo,
                        cod_tipo_unidad: tipoUnidad!.value,
                        cod_agrupacion_documental: agrupacionDocumental!.value,
                        unidad_raiz: unidadRaiz!.value,
                        id_organigrama: organigramCurrent.id_organigrama,
                        cod_unidad_org_padre: nivelPadre ? nivelPadre.value : null,
                    }
                }
                return unidad;
            });
            setTitle_unidades('Agregar Unidades');
        }
        resetUnidades(initialStateUnitys);
        dispatch(updateUnitysService(organigramCurrent?.id_organigrama, newUnidades));
    };

    const onGridReady = (params) => {
        console.log(params, 'params');
    };

    //Funcion para eliminar un nivel
    const deleteLevel = (levelRow) => {
        const newNiveles = levelsOrganigram.filter(nivel => nivel.orden_nivel !== levelRow);
        dispatch(updateLevelsService(organigramCurrent?.id_organigrama, newNiveles));
    }

    //Funcion para eliminar una unidad
    const deleteUnidades = (codigoUnidad) => {
        const newUnidades = unityOrganigram.filter(unidad => unidad.codigo !== codigoUnidad);
        dispatch(updateUnitysService(organigramCurrent.id_organigrama, newUnidades));
    }

    const onSubmitEditOrganigrama = async ({ nombre, id_organigrama, version, descripcion }: any) => {
        let obj: FormValuesOrganigram = {
            nombre,
            descripcion,
            version
        }
        dispatch(editOrganigramsService(obj, id_organigrama));
    };

    return {
        //States
        columnsNivel,
        columnsUnidades,
        controlUnidades,
        defaultColDefOrganigrama,
        errorsNivel,
        errorsOrganigrama,
        errorsUnidades,
        optionNivel,
        optionRaiz,
        optionsAgrupacionD,
        optionsTipoUnidad,
        optionUnidadPadre,
        orden_nivel,
        title_nivel,
        title_unidades,
        //Edita States

        //Functions
        handleSubmitOrganigrama,
        onSubmitEditOrganigrama,
        registerOrganigrama,

        handleSubmitNivel,
        registerNivel,
        submitNivel,

        handleSubmitUnidades,
        registerUnidades,
        resetUnidades,
        setValueUnidades,
        submitUnidades,
        watchUnidades,

        onGridReady
    };
}

export default useEdicionOrganigrama;