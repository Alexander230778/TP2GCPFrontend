<template>

    <div class="container">

        <b-alert
                :show="true"
                dismissible
                ref="messageAlert"
                :class="{'warning-alert': true, 'animate': fetchError}"
                variant="danger">
            <p style="text-align: center">Hubo un Error con el Servicio</p>
        </b-alert>

        <u-nav-bar-change/>

        <div class="row">
            <div class="col col-12">
                <div class="row">
                    <div class="col col-lg-4">
                        <dl class="row">
                            <dt class="col-sm-5">Portafolio:</dt>
                            <dd class="col-sm-7">{{this.project.por_Nombre}}</dd>
                            <dt class="col-sm-5">Proyecto:</dt>
                            <dd class="col-sm-7">{{this.project.pro_Nombre}}</dd>
                        </dl>
                    </div>
                    <div class="col col-lg-4">
                        <dl class="row">
                            <dt class="col-sm-5">Solicitante:</dt>
                            <dd class="col-sm-7">{{this.project.per_Nombre}}</dd>
                            <dt class="col-sm-5">Email:</dt>
                            <dd class="col-sm-7">{{this.project.per_Email}}</dd>
                        </dl>
                    </div>
                    <div class="col col-lg-4">
                        {{this.project.rfc_Descripcion}}
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <b-card no-body>
                    <b-tabs card>
                        <b-tab no-body title="Evalución Técnica">
                            ...
                            <b-card-footer>Picture 1 footer</b-card-footer>
                        </b-tab>
                        <b-tab no-body title="Evaluación Riesgo">
                            ...
                            <b-card-footer>Evaluación Riesgo</b-card-footer>
                        </b-tab>
                        <b-tab no-body title="Evaluación en Comite">
                            ...
                            <b-card-footer>Evaluación en Comite</b-card-footer>
                        </b-tab>
                        <b-tab no-body title="Planificación" active>
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <b-form-group label="."
                                                      label-for="nameRequest">
                                            <b-button variant="outline-success" @click="showModal('NUEVO', '$event')">
                                                Nuevo
                                            </b-button>
                                        </b-form-group>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col col-12">
                                        <b-table :items="project.LST_REQU" responsive :fields="project.fields"
                                                 caption-top :filter="filter" outlined>
                                            <template slot="first_name" slot-scope="data">
                                                <a :href="`#${data.value}`">
                                                    {{data.value}}
                                                </a>
                                            </template>

                                            <template slot="opcion" slot-scope="data">
                                                <a :href="`javascript:void(0)`" @click="showModal('waldo', '$event')">
                                                    Editar
                                                </a>
                                            </template>

                                            <template slot="table-caption">
                                                <b-form-group horizontal label="Filtrar" class="mb-0">
                                                    <b-form-input v-model="filter" placeholder="Escribe para filtrar"/>
                                                </b-form-group>
                                            </template>
                                        </b-table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col col-12">
                                        <b-table responsive :items="project.LST_REQURFC" :fields="project.fieldsRFC" caption-top
                                                 :filter="filter"
                                                 outlined>

                                            <template slot="opcion" slot-scope="data">
                                                <a :href="`#/${data.value}`">
                                                    Flujo2
                                                </a>
                                            </template>
                                        </b-table>
                                    </div>
                                </div>
                            </div>
                            <b-card-footer>Evaluación en Comite</b-card-footer>
                        </b-tab>
                        <b-tab no-body title="Informe Final">
                            <b-card-footer>Evaluación en Comite</b-card-footer>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </div>


        <b-modal ref="myModalRef" hide-footer title="Requerimientos">

            <b-form @submit="onSubmit" @reset="onReset">
                <b-form-group label="Nombre de Requerimiento:"
                              label-for="nameRequest">
                    <b-form-input id="nameRequest"
                                  type="text"
                                  v-model="model.lir_Nombre"
                                  required
                                  placeholder="Ingresa Requerimiento">
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Prioridad:"
                              label-for="prioridad">
                    <b-form-select id="prioridad"
                                   :options="lists.LST_PRIO"
                                   required
                                   v-model="model.lir_Prioridad">
                        <template slot="first">
                            <option :value="null" disabled>-- Seleccione prioridad --</option>
                        </template>
                    </b-form-select>
                </b-form-group>

                <b-form-group label="Tipo:"
                              label-for="tipo">
                    <b-form-select id="tipo"
                                   :options="lists.LST_TIPO"
                                   required
                                   v-model="model.lir_TipoPublicacion">

                        <template slot="first">
                            <option :value="null" disabled>-- Seleccione Tipo --</option>
                        </template>
                    </b-form-select>
                </b-form-group>

                <b-form-group label="¿Que va hacer el sistema?"
                              label-for="whatis">
                    <b-form-textarea id="whatis"
                                     v-model="model.lir_Resumen"
                                     placeholder="Describa lo que va hacer el sistema"
                                     :rows="3"
                                     :max-rows="6">
                    </b-form-textarea>
                </b-form-group>


                <b-form-group label="¿Cuanta documentación?:"
                              label-for="tipo">
                    <b-form-select id="tipo"
                                   :options="lists.LST_NIVE"
                                   required
                                   v-model="model.lir_NivelDoc">
                        <template slot="first">
                            <option :value="null" disabled>-- Seleccione Documentación --</option>
                        </template>
                    </b-form-select>
                </b-form-group>

                <fieldset class="field-custom">
                    <legend>Recursos:</legend>
                    <form @submit="onSubmitResource">
                        <div class="row">
                            <div class="col">
                                <b-form-group
                                        breakpoint="md"
                                        label-for="tipo">
                                    <b-form-select id="tipo"
                                                   :options="lists.resources"
                                                   required
                                                   v-model="model.resource.id">
                                        <template slot="first">
                                            <option :value="null" disabled>-- Seleccione un Recurso --</option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col col-5">
                                <b-form-group label="Recursos:"
                                              breakpoint="md"
                                              label-for="tipo">
                                    <b-form-input type="number" :min="1" v-model="model.resource.rec_Cantidad"
                                                  placeholder="Cantidad"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col col-4">
                                <b-form-group label="Semanas:"
                                              breakpoint="md"
                                              label-for="tipo">
                                    <b-form-input type="number" :min="1" v-model="model.resource.rec_Semanas"
                                                  placeholder="Cantidad"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col col-3">
                                <b-form-group label=":"
                                              label-for="tipo">
                                    <b-button type="submit" variant="outline-success">
                                        Agregar
                                    </b-button>
                                </b-form-group>
                            </div>
                        </div>
                    </form>
                    <div class="row">
                        <div class="col">
                            <b-table :items="model.LST_RECU" responsive :fields="fields" caption-top :filter="filter"
                                     outlined>
                                <template slot="first_name" slot-scope="data">
                                    <a :href="`#${data.value}`">
                                        {{data.value}}
                                    </a>
                                </template>

                                <template slot="opcion" slot-scope="data">
                                    <a :href="`javascript:void(0)`" @click="deleteResources(data)">
                                        Eliminar
                                    </a>
                                </template>
                                <template slot="table-caption">
                                    <strong>Presupuesto Aprox : </strong> {{this.aprox}}
                                </template>
                            </b-table>
                        </div>
                    </div>
                </fieldset>

                <div class="row">
                    <div class="col col-6">
                        <b-form-group label="Monto máximo :"
                                      breakpoint="md"
                                      label-for="tipo">
                            <b-form-input type="number" :min="1" v-model="model.lir_Presupuesto"
                                          placeholder="Cantidad"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col col-6">
                        <b-form-group label="Semanas máximas :"
                                      breakpoint="md"
                                      label-for="tipo">
                            <b-form-input type="number" :min="1" v-model="model.lir_semanaMax"
                                          placeholder="Cantidad"></b-form-input>
                        </b-form-group>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <b-button type="submit" variant="primary">Guardar</b-button>
                    </div>
                    <div class="col text-center" v-if="!isNew">
                        <b-button type="button" variant="danger">Cancelar</b-button>
                    </div>
                    <div class="col text-center">
                        <b-button type="close" variant="primary" @click="hideModal">Close</b-button>
                    </div>
                </div>
            </b-form>
        </b-modal>

    </div>
</template>

<script>

    import UNavBarChange from './components/uNavBarChange.vue'
    import http from './../service/http'

    export default {
        name: "flujo",
        mixins: [http],
        components: {
            UNavBarChange
        },
        data() {

            let templateFieldRFC = [{
                key: 'lir_Codigo',
                label: 'Código',
                formatter( value, key, item ) {
                    return `REQ0${item.lir_Codigo}`
                }
            }, {
                key: 'lir_Nombre',
                label: 'Nombre'
            }, {
                key: 'lir_Prioridad',
                label: 'Prioridad'
            }, {
                key: 'est_Estado',
                label: 'Estado'
            },
                {
                    key: 'lir_Fecha',
                    label: 'Fecha',
                    formatter: ( value, key, item ) => {
                        return new Date( item.lir_Fecha ).toLocaleDateString()
                    }
                }];

            return {
                isNew : false,
                fetchError: false,
                selected: 'first',
                lists: {
                    resources: [],
                    LST_TIPO: [],
                    LST_PRIO: [],
                    LST_NIVE: []
                },
                model: {

                    lir_Codigo: null,
                    lir_Fecha: null,
                    lir_Nombre: null,
                    lir_Resumen: null,
                    lir_NivelDoc: null,
                    lir_TipoPublicacion: null,
                    lir_semanaMax: null,
                    lir_Presupuesto: null,
                    rfc_Codigo: this.$route.params.id,
                    lir_Prioridad: null,

                    LST_RECU: [],

                    resource: {
                        tip_Codigo: null,
                        rec_Cantidad: 0,
                        rec_Semanas: 0
                    }
                },
                form: {
                    email: '',
                    name: '',
                    tipo: null,
                    nivel: null,
                    checked: [],
                    text: '',
                    recursos: '',
                    nivelRecurso: '',
                    priority: null
                },

                fields:  [{
                    key: 'tip_Nombre',
                    label: 'Recurso'
                }, {
                    key: 'niv_Nivel',
                    label: 'Nivel'
                }, {
                    key: 'rec_Semanas', //week
                    label: 'Q'
                }, {
                    key: 'rec_Cantidad', //quantity
                    label: 'Sem'
                },{
                    key: 'opcion',
                    label: 'Opción',
                    formatter: ( value, key, item ) => {
                        return 'flujo'
                    }
                }],

                filter: null,
                modalShow: true,


                project: {
                    fieldsRFC: [...templateFieldRFC],
                    fields: [...templateFieldRFC, ...[{
                        key: 'opcion',
                        label: 'Opción',
                        formatter: ( value, key, item ) => {
                            return 'flujo'
                        }
                    }] ],
                    rfc_Descripcion: '..',
                    per_Nombre: '..',
                    per_Email: '..',
                    por_Nombre: '..',
                    pro_Nombre: '..',
                    LST_REQU: [],
                    LST_REQURFC: []
                }
            }
        },
        computed: {
            aprox() {
                return this.model.LST_RECU.reduce( ( previousValue, currentValue ) => {
                    return previousValue + (currentValue.tip_Costo * currentValue.rec_Cantidad * (currentValue.rec_Semanas / 4))
                }, 0 );
            }
        },
        methods: {
            showModal( name ) {
                this.isNew = false;
                if(name === "NUEVO"){
                    this.isNew = true;
                }
                this.$refs.myModalRef.show()
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            },
            onSubmit( evt ) {
                evt.preventDefault();

                this.http( 'C0002S0002', 'POST', this.model, ( response ) => {
                    if ( response === "OK" ) {
                        this.fetchRequeriments();
                        this.hideModal();
                    }
                } )
            },
            onSubmitResource( evt ) {
                evt.preventDefault();
                let { id: { niv_Nivel, tip_Nombre, tip_Costo, tip_Codigo }, rec_Semanas, rec_Cantidad } = this.model.resource;
                let item = {
                    niv_Nivel,
                    tip_Nombre,
                    rec_Semanas,
                    rec_Cantidad,
                    tip_Costo,
                    tip_Codigo
                };
                this.model.LST_RECU.push( item );
                this.model.resource = {
                    id: null,
                    rec_Cantidad: 0,
                    rec_Semanas: 0
                }
            },
            onReset( evt ) {
                evt.preventDefault();
                /* Reset our form values */
                this.form.email = '';
                this.form.name = '';
                this.form.food = null;
                this.form.checked = [];
                /* Trick to reset/clear native browser form validation state */
                this.show = false;
                this.$nextTick( () => {
                    this.show = true
                } );
            },
            fetchRequerimentsRFC() {
                this.fetchError = false;
                this.http( 'C0002G0004', 'POST', { rfc_Codigo: +this.$route.params.id }, ( response ) => {
                    this.project.LST_REQURFC = response;
                }, () => {
                    this.fetchError = true;
                } );
            },
            fetchRequeriments() {
                this.fetchError = false;
                this.http( 'C0001G0002', 'POST', { rfc_Codigo: +this.$route.params.id }, ( response ) => {
                    Object.assign( this.project, response );
                }, () => {
                    this.fetchError = true;
                } );
            },

            fetchModal() {
                this.http( 'C0008G0001', 'POST', {}, ( response ) => {
                    Object.assign( this.lists, response );
                } );
            },
            fetchResources() {
                this.fetchError = false;
                this.http( 'C0007G0001', 'POST', {}, ( responses ) => {
                    this.lists.resources = responses.map( ( _response ) => {
                        return Object.assign( {}, _response, {
                            value: _response,
                            tip_Codigo: _response.value
                        } );
                    } )
                }, () => {
                    this.fetchError = true;
                } );
            },
            deleteResources( item ) {
                this.model.LST_RECU.splice( item.index, 1 );
            }
        },
        created() {
            this.fetchRequeriments();
            this.fetchRequerimentsRFC();
            this.fetchResources();
            this.fetchModal();
        }

    }
</script>

<style scoped>
    .field-custom {
        padding: 10px;
        border: 1px solid #b3b3b3;
        margin-bottom: 10px;
    }

    .field-custom legend {
        width: auto;
        font-size: inherit;
    }

    .alert {
        opacity: 0;
    }

    .warning-alert {
        position: absolute;
        right: 50%;
        transform: translate3d(50%, 10%, 0);
        z-index: 2;
        width: 50%;
        transition: transform 1500ms ease-out, opacity 3500ms;
    }

    .warning-alert.animate {
        transform: translate3d(50%, 100%, 0);
        opacity: 1;
    }
</style>