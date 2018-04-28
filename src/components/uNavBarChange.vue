<template>
    <div class="row">
        <div class="col-12">
            <b-navbar toggleable="md" type="light" variant="light">

                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

                <b-navbar-brand href="#">Indra</b-navbar-brand>

                <b-collapse is-nav id="nav_collapse">

                    <b-navbar-nav>
                        <b-button size="sm" variant="outline-success" class="" type="submit">Nuevo</b-button>
                    </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">

                        <b-nav-form>
                            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Buscar"/>
                            <b-button size="sm" class="my-2 my-sm-0" variant="outline-primary" type="submit">
                                Buscar
                            </b-button>
                        </b-nav-form>

                        <b-nav-item-dropdown right>
                            <!-- Using button-content slot -->
                            <template slot="button-content">
                                <em>User</em>
                            </template>
                            <b-dropdown-item href="#">Profile</b-dropdown-item>
                            <b-dropdown-item href="#">Signout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>

                </b-collapse>
            </b-navbar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "u-nav-bar-change"
    }
</script>

<style scoped>

</style>