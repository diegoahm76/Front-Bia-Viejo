
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actualizarNivelAction, obtenerNivelesAction, obtenerUnidadesAction } from "../actions/organigramaActions";
//Icons
import IconoEditar from "../assets/iconosEstaciones/edit-svgrepo-com.svg";
import IconoEliminar from "../assets/iconosEstaciones/rubbish-delete-svgrepo-com.svg";
//Actions

const useEdicionOrganigrama = () => {

    // Dispatch Instance
    const dispatch = useDispatch();

    // Redux State Extraction
    const { organigramaEditar, nivelesOrganigrama, unidadesOrganigrama } = useSelector((state) => state.organigrama);

    //Local State
    const [orden_nivel, setOrden_nivel] = useState(0);
    const [title_nivel, setTitle_nivel] = useState('Agregar');
    const [optionNivel, setOptionNivel] = useState([
        { label: "Nivel 1", value: "N1" },
        { label: "Nivel 2", value: "N2" },
        { label: "Nivel 3", value: "N3" },
    ]);

    //useForm Organigrama
    const {
        register: registerOrganigrama,
        handleSubmit: handleSubmitOrganigrama,
        control: controlOrganigrama,
        reset: resetOrganigrama,
        formState: { errors: errorsOrganigrama },
    } = useForm();

    //useForm Nivel
    const {
        register: registerNivel,
        handleSubmit: handleSubmitNivel,
        reset: resetNivel,
        watch: watchNivel,
        formState: { errors: errorsNivel },
    } = useForm();
    const datosNivel = watchNivel();

    //useForm Unidades
    const {
        register: registerUnidades,
        handleSubmit: handleSubmitUnidades,
        control: controlUnidades,
        reset: resetUnidades,
        watch: watchUnidades,
        formState: { errors: errorsUnidades },
    } = useForm();
    const datosUnidades = watchUnidades();
    console.log(datosUnidades, 'datosUnidades');

    useEffect(() => {
        resetOrganigrama(organigramaEditar);
    }, [organigramaEditar]);

    useEffect(() => {
        setOrden_nivel(nivelesOrganigrama.length + 1);
    }, [nivelesOrganigrama]);

    useEffect(() => {
        resetUnidades({
            tipoUnidad: {
                label: "De linea",
                value: "Li"
            },
            unidadRaiz: {
                label: "Si",
                value: "Si"
            },
        });
    }, [unidadesOrganigrama]);

    useEffect(() => {
        if (['Ap', 'So'].includes(datosUnidades.tipoUnidad.value)) {
            setOptionNivel([
                { label: "Nivel 1", value: "N1", isDisabled: true },
                { label: "Nivel 2", value: "N2" },
                { label: "Nivel 3", value: "N3" },
            ])
        } else {
            setOptionNivel([
                { label: "Nivel 1", value: "N1", isDisabled: false },
                { label: "Nivel 2", value: "N2" },
                { label: "Nivel 3", value: "N3" },
            ])
        }
    }, [datosUnidades.tipoUnidad]);

    useEffect(() => {
        if (organigramaEditar?.id_organigrama) dispatch(obtenerNivelesAction(organigramaEditar.id_organigrama));
        if (organigramaEditar?.id_organigrama) dispatch(obtenerUnidadesAction(organigramaEditar.id_organigrama));
    }, [organigramaEditar?.id_organigrama]);

    const submitNivel = ({ nombre, id_nivel_organigrama = '' }) => {
        let newNiveles = []
        if (title_nivel === 'Agregar') {
            newNiveles = [...nivelesOrganigrama, {
                id_organigrama: organigramaEditar.id_organigrama,
                orden_nivel: orden_nivel,
                nombre,
                id_nivel_organigrama: null
            }]
        } else {
            newNiveles = nivelesOrganigrama.map(nivel => {
                if (nivel.id_nivel_organigrama === id_nivel_organigrama) {
                    nivel.nombre = nombre;
                }
                return nivel;
            });
        }
        dispatch(actualizarNivelAction(organigramaEditar?.id_organigrama, newNiveles));
        resetNivel()
    };
    const submitUnidades = () => {
        console.log("submitUnidades")
    };

    const onGridReady = (params) => {
        console.log(params, 'params');
    };

    const deleteLevel = (levelRow) => {
        const newNiveles = nivelesOrganigrama.filter(nivel => nivel.orden_nivel !== levelRow);
        dispatch(actualizarNivelAction(organigramaEditar?.id_organigrama, newNiveles));
    }

    const onSubmitEditOrganigrama = async ({ nombre, id_organigrama }) => {
        console.log('hola', nombre, id_organigrama);
    };

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

    const optionRaiz = [
        { label: "Si", value: "Si" },
        { label: "No", value: "No" },
    ];

    const optionGrupo = [
        { label: "Sección", value: "SE" },
        { label: "Subsección", value: "SU" },
    ];

    const optionsTipoUnidad = [
        { label: "De linea", value: "Li" },
        { label: "De apoyo", value: "Ap" },
        { label: "De soporte", value: "So" },
    ];

    const columnsUnidades = [
        { headerName: "Código", field: "codigo", minWidth: 100, maxWidth: 100 },
        { headerName: "Nombre", field: "nombre" },
        { headerName: "Tipo unidad", field: "cod_tipo_unidad", minWidth: 130, maxWidth: 130 },
        { headerName: "Agrupacion Documental", field: "cod_agrupacion_documental", minWidth: 200, maxWidth: 200 },
        { headerName: "Unidad raíz", field: "unidad_raiz", minWidth: 130, maxWidth: 130 },
        {
            headerName: "Acciones",
            field: "editar",
            minWidth: 140,
            maxWidth: 140,
            cellRendererFramework: (params) => (
                <div className="d-flex gap-1">
                    <button
                        className="btn btn-sm btn-tablas btn-outline-warning "
                        type="button"
                        onClick={() => {
                            // dispatch(obtenerEstacionEditarAction(params.data));
                            // setIsModalEditarActivate(!isModalActive);
                        }}
                    >
                        <img src={IconoEditar} alt="editar" />
                    </button>
                    <button
                        className="btn btn-sm btn-tablas btn-outline-danger"
                        type="button"
                        onClick={() => {
                            // confirmarEliminarRol(params.data.id_rol);
                        }}
                    >
                        <img src={IconoEliminar} alt="eliminar" />
                    </button>
                </div>
            ),
        },
    ];

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
                        className="btn btn-sm btn-tablas btn-outline-warning "
                        type="button"
                        onClick={() => {
                            setTitle_nivel('Editar');
                            resetNivel(data)
                        }}
                    >
                        <img src={IconoEditar} alt="editar" />
                    </button>
                    <button
                        className={`btn btn-sm btn-tablas btn-outline-danger ${data.orden_nivel !== (orden_nivel - 1) && "d-none"}`}
                        type="button"
                        onClick={() => {
                            deleteLevel(data.orden_nivel)
                        }}
                    >
                        <img src={IconoEliminar} alt="eliminar" />
                    </button>
                </div>
            ),
        },
    ];

    return {
        //States
        columnsNivel,
        columnsUnidades,
        controlOrganigrama,
        controlUnidades,
        defaultColDefOrganigrama,
        errorsNivel,
        errorsOrganigrama,
        errorsUnidades,
        optionGrupo,
        optionNivel,
        optionRaiz,
        optionsTipoUnidad,
        orden_nivel,
        title_nivel,
        //Edita States

        //Functions
        handleSubmitOrganigrama,
        onSubmitEditOrganigrama,
        registerOrganigrama,
        resetOrganigrama,

        deleteLevel,
        handleSubmitNivel,
        registerNivel,
        resetNivel,
        submitNivel,

        handleSubmitUnidades,
        registerUnidades,
        resetUnidades,
        submitUnidades,
        watchUnidades,

        onGridReady
    };
}

export default useEdicionOrganigrama;