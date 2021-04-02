<template>
    <div class="root">
        <router-link to="/dashboard">
            <button class="btn-voltar"><i class="fas fa-chevron-left"></i></button>
        </router-link>
        <div class="card">
            
            <h1>Perfis favoritados</h1>
            <p>Confira abaixo a lista de perfis que você favoritou</p>

            <TablePerfis v-if="!carregando" :onlyfavorites="true" :perfis="perfis" :favoritos="favoritos" />
            <p v-else>Carregando...</p>

        </div>
    </div>
</template>

<script>

const axios = require('axios');
import Config from '../../Config.js';
import TablePerfis from './../components/TablePerfis';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default {
    data: function() {
        return {
            perfis: [],
            favoritos: [],
            start: false,
            carregando: true,
        }
    },
    mounted: function() {
        axios.get(Config.api_url+'api/user/search/favorite')
        .then(response=>{
            this.perfis = response.data.perfis;
            this.favoritos = response.data.favorites;
            this.carregando = false;
        });
    },
    components: {
        TablePerfis
    }
}
</script>

<style scoped>
    .card {
        width: 800px;
        margin: 100px;
    }
    .root {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }
    .card .input {
        margin-bottom: 15px;
    }
    .min {
        width: 50px;
    }
    .btn-favorite {
        background-color: rgb(0, 96, 151);
    }
    .btn-favorite i {
        color: gold;
    }
    .btn-logout {
        background-color: rgb(255, 47, 92);
    }
    .btn-logout i {
        color: white;
    }
    .btns-container {
        display: flex;
    }
</style>