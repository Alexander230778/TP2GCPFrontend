<template>
    <div class="container">

        <u-nav-bar-change />

        <div class="row">
            <div class="col col-12">
                <b-table :items="items" :fields="fields" caption-top :filter="filter" outlined>

                    <template slot="opcion" slot-scope="data">
                        <a :href="`#/flujo/${data.item.rfc_Codigo}`">
                           Ir al flujo
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
    </div>

</template>

<script>
    import UNavBarChange from './components/uNavBarChange.vue'
    import http from './../service/http'
    export default {
        name: "cambios",
        components: { UNavBarChange },
        mixins: [http],
        data() {
            return {
                fields: [{
                    key : 'rfc_Codigo',
                    label : 'código',
                    formatter(value, key, item ){
                        return `RFC0${item.rfc_Codigo}`
                    }
                }, {
                    key : 'rfc_Asunto',
                    label : 'Asunto'
                }, {
                    key : 'pro_Nombre',
                    label : 'Proyecto'
                },
                    {
                        key: 'rfc_FechaSolicitud',
                        formatter: ( value, key, item ) => {
                            return new Date(value).toLocaleDateString('es-Es')
                        }
                    },
                    'rfc_FechaSolicitud', 'est_Estado',
                    {
                        key: 'opcion',
                        formatter: ( value, key, item ) => {
                            return item
                        }
                    }],
                items: [ ],
                filter: null
            }
        },
        methods : {
            fetching : () => {
                // GCP13_EncargadosRFC_per_Codigo
                // acci
                // est_Codigo
                // est_Estado
                // per_Codigo
                // pro_Codigo
                // rfc_Asunto
                // rfc_Codigo
                // rfc_Descripcion
                // rfc_FechaSolicitud
                // rfc_NivelImpacto
            }
        },
        created(){
            this.http('C0001G0001', 'GET', {}, (response) => {
                console.log(response)
                this.items = response;
            });
        }
    }
</script>

<style scoped>

</style>