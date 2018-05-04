<template>
    <div id="app" class="app container">
        <div class="row">
            <div class="col-12">
                <u-nav-bar />
            </div>
        </div>

        <div class="row top">
            <b-card-group deck class="mb-3">
                <b-card v-for="component in components" v-bind:title="component.title"
                        v-bind:img-src="component.urlImage"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2">

                    <p class="card-text">
                        {{component.rfc_Asunto}}
                    </p>

                    <div slot="footer">
                        <router-link v-bind:to="component.link">
                            <b-button variant="primary">Entrar</b-button>
                        </router-link>
                    </div>


                </b-card>
            </b-card-group>
        </div>
    </div>
</template>

<script>
    import UNavBar from "./components/uNavBar.vue";

    export default {
        components: { UNavBar },
        name: 'app',
        data: () => {
            let url = 'https://lorempixel.com/600/300/';
            return {
                components: [
                    {
                        urlImage: url,
                        title: 'Gestión de Portafolio',
                        rfc_Asunto: 'Es el modulo qye permite la gestion eficaz del prortafolio de proyectos mediante monitoreo',
                        link : ''
                    },
                    {
                        urlImage: url,
                        title: 'Gestión de cambios en proyectos TI',
                        rfc_Asunto: 'Es el módulo que permite reducir el tiempo y riesgos tecnicos asi como economicos al momento de la realizacion de  los cambios en la empresa',
                        link : 'cambios'
                    }, {
                        urlImage: url,
                        title: 'Gestion de Requerimientos',
                        rfc_Asunto: 'Es el módulo  que permite realizar la planificación estrategica asi como implementar todas las actividades y funciones que involucra este proceso.',
                        link : ''
                    }, {
                        urlImage: url,
                        title: 'Services Desk',
                        rfc_Asunto: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
                        link : ''
                    }
                ]
            }
        }
    }
</script>

<style>
    .mb-2{
        text-align: center;
    }
    .app .card-text{
        text-align: justify;
    }
    .top {
        margin-top: 20px;
    }
</style>
