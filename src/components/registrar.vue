<template>

</template>

<script>
    export default {
        name: "registrar",
        data(){
            return {
                shown : this.show
            }
        },
        created(){

        },
        methods: {
            close(){
                console.log(this)
                this.shown = false
            },
            open(){
                this.shown = true;
            }
        },
        props : {
            show: {
                default: true
            }
        }
    }
</script>

<style scoped>

</style>