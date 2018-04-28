<template>
    <div class="container">

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
                                            <b-button variant="outline-success" @click="showModal('Nuevo', '$event')">
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
                                                    Flujo
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
                                        <b-table :items="changed" :fields="fields" caption-top :filter="filter"
                                                 outlined>

                                            <template slot="first_name" slot-scope="data">
                                                <a :href="`#${data.value}`">
                                                    {{data.value}}
                                                </a>
                                            </template>

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
                                  v-model="form.email"
                                  required
                                  placeholder="Ingresa Requerimiento">
                    </b-form-input>
                </b-form-group>

                <b-form-group label="Prioridad:"
                              label-for="prioridad">
                    <b-form-select id="prioridad"
                                   :options="priority"
                                   required
                                   v-model="form.nivel">
                    </b-form-select>
                </b-form-group>

                <b-form-group label="Tipo:"
                              label-for="tipo">
                    <b-form-select id="tipo"
                                   :options="types"
                                   required
                                   v-model="form.tipo">
                    </b-form-select>
                </b-form-group>

                <b-form-group label="¿Que va hacer el sistema?"
                              label-for="whatis">
                    <b-form-textarea id="whatis"
                                     v-model="form.text"
                                     placeholder="Describa lo que va hacer el sistema"
                                     :rows="3"
                                     :max-rows="6">
                    </b-form-textarea>
                </b-form-group>


                <b-form-group label="¿Cuanta documentación?:"
                              label-for="tipo">
                    <b-form-select id="tipo"
                                   :options="doctype"
                                   required
                                   v-model="form.food2">
                    </b-form-select>
                </b-form-group>

                <b-form-group label="Debe Estar">
                    <b-form-checkbox-group v-model="selected" name="flavour1" :options="options">
                    </b-form-checkbox-group>
                </b-form-group>

                <div class="row">
                    <div class="col">
                        <b-form-group label="Recursos:"
                                      breakpoint="md"
                                      label-for="tipo">
                            <b-form-select id="tipo"
                                           :options="recursos"
                                           required
                                           v-model="form.recursos">
                            </b-form-select>
                        </b-form-group>
                    </div>
                    <div class="col">
                        <b-form-group label="Nivel Recursos:"
                                      breakpoint="md"
                                      label-for="tipo">
                            <b-form-select id="tipo"
                                           :options="nivelRecursos"
                                           required
                                           v-model="form.nivelRecursos">
                            </b-form-select>
                        </b-form-group>
                    </div>
                </div>

                <div class="row">
                    <div class="col col-5">
                        <b-form-group label="Recursos:"
                                      breakpoint="md"
                                      label-for="tipo">
                            <b-form-input type="number" placeholder="Cantidad"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col col-4">
                        <b-form-group label="Semanas:"
                                      breakpoint="md"
                                      label-for="tipo">
                            <b-form-input type="number" placeholder="Cantidad"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col col-3">
                        <b-form-group label=":"
                                      label-for="tipo">
                            <b-button variant="outline-success">
                                Agregar
                            </b-button>
                        </b-form-group>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <b-table :items="items" responsive :fields="fields" caption-top :filter="filter" outlined>
                            <template slot="first_name" slot-scope="data">
                                <a :href="`#${data.value}`">
                                    {{data.value}}
                                </a>
                            </template>

                            <template slot="opcion" slot-scope="data">
                                <a :href="`javascript:void(0)`" @click="showModal('waldo', '$event')">
                                    Eliminar
                                </a>
                            </template>

                        </b-table>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </div>
                    <div class="col text-center">
                        <b-button type="button" variant="danger">Cancelar</b-button>
                    </div>
                    <div class="col text-center">
                        <b-button type="close" variant="outline-success" @click="hideModal">Close</b-button>
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
            return {

                selected: 'first',
                options: [
                    { text: 'En Linea', value: '1' },
                    { text: 'En Papel', value: '2' }
                ],

                form: {
                    email: '',
                    name: '',
                    tipo: '',
                    nivel: '',
                    checked: [],
                    text: '',
                    recursos: '',
                    nivelRecurso : ''
                },
                priority: [
                    {
                        text: 'Prioridad', value: null
                    },
                    'Alta', 'Media', 'Baja'
                ],
                doctype: [
                    {
                        text: 'Nivel Documentación', value: null
                    },
                    'Nivel I', 'Nivel II', 'Nivel III', 'Nivel IV'
                ],
                recursos : [
                    {
                        text: 'Buscar Recurso', value: '', selected : ''
                    },
                    'Front-End', 'Backend', 'Analista', 'DBA', 'QA', 'UX Design'
                ],
                nivelRecursos : [
                    {
                        text: 'Buscar Nivel', value: '', selected : ''
                    },
                    'Senior', 'Medium', 'Basic'
                ],
                types: [
                    { text: 'Tipo', value: '', selected : '' },
                    'Funcional', 'No Funcional'
                ],

                fields: [,
                    {
                        key: 'opcion',
                        formatter: ( value, key, item ) => {
                            return 'flujo'
                        }
                    }],
                items: [
                    { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                    { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                    { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
                ],
                changed: [],
                filter: null,
                modalShow: true,
                // GPP_Proyecto_pro_Codigo
                // acci
                // est_Estado
                // lir_Codigo
                // lir_Fecha
                // lir_NivelDoc
                // lir_Nombre
                // lir_Presupuesto
                // lir_Resumen
                // lir_TipoPublicacion
                // lir_semanaMax


                project: {
                    fields: [{
                        key : 'lir_Codigo',
                        label : 'Código',
                        formatter(value, key, item ){
                            return `REQ0${item.lir_Codigo}`
                        }
                    }, {
                        key : 'lir_Nombre',
                        label : 'Nombre'
                    }, {
                        key: 'lir_Prioridad',
                        label: 'Prioridad'
                    }, {
                        key : 'est_Estado',
                        label : 'Estado'
                    },
                        {
                            key: 'lir_Fecha',
                            label : 'Fecha',
                            formatter: ( value, key, item ) => {
                                return new Date( item.lir_Fecha ).toLocaleDateString()
                            }
                        },
                        {
                            key: 'opcion',
                            label: 'Opción',
                            formatter: ( value, key, item ) => {
                                return 'flujo'
                            }
                        }],
                    rfc_Descripcion: '..',
                    per_Nombre: '..',
                    per_Email: '..',
                    por_Nombre: '..',
                    pro_Nombre: '..',
                    LST_REQU: []
                }
            }
        },
        methods: {
            showModal( name ) {
                this.$refs.myModalRef.show()
            },
            hideModal() {
                this.$refs.myModalRef.hide()
            },
            onSubmit( evt ) {
                evt.preventDefault();
                alert( JSON.stringify( this.form ) );
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
            }
        },
        created() {
            this.http( 'C0001G0002', 'POST', { rfc_Codigo: this.$route.params.id }, ( response ) => {

                Object.assign( this.project, response );
                console.log( this.project.LST_REQU )
            } );
        }

    }
</script>

<style scoped>

</style>