<template>
    <div class="container cambios">

        <u-nav-bar-change/>
        <div class="row">
            <div class="col col-12">
                <b-form-group label=" "
                              label-for="nameRequest">
                    <b-button size="sm" variant="outline-dark" @click="showModal('Nuevo', '$event')">
                        Nuevo
                    </b-button>
                </b-form-group>
            </div>
        </div>
        <div class="row">
            <div class="col col-12">
                <b-table responsive :items="items" :fields="fields" caption-top :filter="filter" outlined>

                    <template slot="opcion" slot-scope="data">
                        <a :href="`#/flujo/${data.item.rfc_Codigo}`">
                            Ir al flujo
                        </a>
                        |
                        <a :href="`javascript:void(0)`" @click="showModal(data.item.rfc_Codigo, '$event')">
                            Editar
                        </a>
                    </template>

                    <template slot="table-caption">
                        <div class="row">
                            <div class="col">
                                <b-form-group horizontal label="Filtrar" class="mb-0">
                                    <b-form-input v-model="filter" placeholder="Escribe para filtrar"/>
                                </b-form-group>
                            </div>
                        </div>
                    </template>

                </b-table>
            </div>
        </div>


        <b-modal ref="myModalRef" hide-footer title="Formulario de RFC">

            <b-form @submit="submitRFC" disabled="true">
                <fieldset :disabled="disabledForm">
                    <input type="hidden" v-model="form.rfc_Codigo" v-if="!isNew">
                    <b-form-group>
                        <b-form-select @change="changePortafolio"
                                       :options="lists.portfolios"
                                       required
                                       :disabled="!isNew"
                                       v-model="form.NumPortafolio">
                            <template slot="first">
                                <!-- this slot appears above the options from 'options' prop -->
                                <option :value="null" disabled>{{form.por_Nombre || '-- Seleccione un portafolio --'}}
                                </option>
                            </template>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group
                            label-for="tipo">
                        <b-form-select id="tipo"
                                       :options="lists.projects"
                                       required
                                       :disabled="!isNew"
                                       v-model="form.pro_Codigo">
                            <template slot="first">
                                <option :value="null" disabled>{{form.pro_Nombre ||'-- Seleccione un proyecto --'}}
                                </option>
                            </template>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group>
                        <b-form-select id="tipo"
                                       :options="lists.applicants"
                                       required
                                       placeholder="Hola"
                                       v-model="form.per_Codigo">

                            <template slot="first">
                                <option :value="null" disabled>-- Seleccione un solicitante --</option>
                            </template>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group>
                        <b-form-select id="tipo"
                                       :options="lists.responsables"
                                       required
                                       placeholder="Hola"
                                       v-model="form.GCP13_EncargadosRFC_per_Codigo">
                            <template slot="first">
                                <option :value="null" disabled>-- Seleccione un responsable --</option>
                            </template>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="Seleccione Fecha:"
                                  breakpoint="md">
                        <b-form-input type="date" v-model="form.rfc_FechaSolicitud"></b-form-input>
                    </b-form-group>

                    <b-form-group label="Asunto">
                        <b-form-textarea v-model="form.rfc_Asunto"
                                         placeholder="Describa el cambio principal a realizarse"
                                         :rows="3"
                                         :max-rows="6">
                        </b-form-textarea>
                    </b-form-group>

                    <b-form-group label="Beneficios">
                        <b-form-checkbox-group v-model="form.bene_codigos" stacked name="flavour1"
                                               :options="lists.benefits">
                        </b-form-checkbox-group>
                    </b-form-group>
                    <div class="row">
                        <div class="col text-center">
                            <b-button type="submit" variant="primary">Guardar</b-button>
                        </div>
                        <div class="col text-center">
                            <b-button type="button" variant="primary" @click="hideModal">Cerrar</b-button>
                        </div>
                    </div>
                </fieldset>
            </b-form>
        </b-modal>

    </div>

</template>

<script>
  import UNavBarChange from './components/uNavBarChange.vue';
  import http from './../service/http';
  import dayjs from 'dayjs';

  export default {
    name: 'cambios',
    components: {UNavBarChange},
    mixins: [http],
    data() {
      return {
        disabledForm: false,
        isNew: true,
        form: {
          NumPortafolio: null,
          pro_Codigo: null,
          per_Codigo: null,
          GCP13_EncargadosRFC_per_Codigo: null,
          bene_codigos: [],
          rfc_FechaSolicitud: null,
          rfc_Asunto: null,
        },
        lists: {
          portfolios: [],
          projects: [
            {text: 'Seleccione Proyecto', value: ''},
          ],
          applicants: [
            {text: 'Seleccione Solicitante', value: ''},
          ],
          responsables: [],
          benefits: [],
        },
        fields: [
          {
            key: 'rfc_Codigo',
            label: 'código',
            formatter(value, key, item) {
              return `RFC0${item.rfc_Codigo}`;
            },
          }, {
            key: 'rfc_Asunto',
            label: 'Asunto',
          }, {
            key: 'pro_Nombre',
            label: 'Proyecto',
          },
          {
            key: 'rfc_FechaSolicitud',
            label: 'Solicitud',
            formatter: (value, key, item) => {
              return new Date(value).toLocaleDateString('es-Es');
            },
          },
          {
            key: 'est_Estado',
            label: 'Estado',
          },
          {
            key: 'opcion',
            label: 'Opción',
            formatter: (value, key, item) => {
              return item;
            },
          }],
        items: [],
        filter: null,
      };
    },
    methods: {
      showModal(id) {
        this.isNew = true;
        if (id !== 'Nuevo') {
          this.isNew = false;
          this.disabledForm = true;
          this.fetchFindRFC(id, (response) => {
            response.rfc_FechaSolicitud = dayjs(response.rfc_FechaSolicitud).format('YYYY-MM-DD');
            this.form = response;
            this.disabledForm = false;
          });
        }

        this.$refs.myModalRef.show();

      },
      hideModal() {
        this.$refs.myModalRef.hide();
      },
      fetchProject(params) {
        this.http('C0004G0001', 'POST', params, (response) => {
          this.lists.projects = response;
        });
      },
      fetchPortafolio() {
        this.http('C0003G0001', 'GET', {}, (response) => {
          this.lists.portfolios = response;
        });
      },
      fetchApplicant() {
        this.http('C0005G0001', 'GET', {}, (response) => {
          this.lists.applicants = response;
        });
      },
      fetchFindRFC(codigo, callback) {
        this.http('C0001G0005', 'POST', {rfc_Codigo: codigo}, (response) => {
          callback(response);
        });
      },
      fetchResponsable() {
        this.http('C0005G0002', 'GET', {}, (response) => {
          this.lists.responsables = response;
        });
      },
      fetchBenefits() {
        this.http('C0006G0001', 'GET', {}, (response) => {
          this.lists.benefits = response;
        });
      },
      changePortafolio(value) {
        this.fetchProject({NumPortafolio: value});
      },
      submitRFC(e) {
        e.preventDefault();

        let pathName = this.isNew ? 'C0001S0003' : 'C0001S0004';

        this.http(pathName, 'POST', this.form, (response) => {
          if (response === 'OK') {
            this.fetchList();
            this.hideModal();
          }
        });
      },
      fetchList() {
        this.http('C0001G0001', 'GET', {}, (response) => {
          this.items = response;
        });
      },

    },
    created() {
      this.fetchPortafolio();
      this.fetchApplicant();
      this.fetchResponsable();
      this.fetchBenefits();
      this.fetchList();
    },
  };
</script>

<style scoped>

</style>