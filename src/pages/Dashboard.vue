<template>
    <div class="root">
        <div class="card">
            
            <h1>Dashboard</h1>
            <p>Use o campo abaixo para pesquisar algum perfil do github</p>

            <form @submit.prevent="pesquisarPerfis">
                <input v-model="perfil" type="text" class="input" placeholder="Pesquise por algum perfil">
                <div class="btns-container">
                    <button :disabled="carregando" class="btn">
                        <img v-if="carregando" src="/images/loading.svg" alt="carregando">
                        <span v-if="!carregando">Pesquisar</span>
                    </button>
                    <router-link to="/favorites">
                        <div class="min">
                            <button type="button" class="btn btn-favorite">
                                <i class="fas fa-star"></i>
                            </button>
                        </div>
                    </router-link>
                    <div class="min">
                        <button type="button" @click="logout" class="btn btn-logout">
                            <i class="fas fa-power-off"></i>
                        </button>
                    </div>
                </div>
            </form>
            
            <hr v-if="start">

            <TablePerfis :perfis="perfis" :favoritos="favoritos" />

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
            perfil: '',
            perfis: [],
            carregando: false,
            start: false,
            favoritos: []
        }
    },
    methods: {
        pesquisarPerfis: function() {
            if(this.perfil) {
                this.carregando = true;
                axios.get(Config.api_url+'api/user/buscar/perfil/github?q='+this.perfil)
                .then(response=>{
                    this.perfis = response.data.perfis;
                    this.favoritos = response.data.favorites;
                    this.carregando = false;
                    this.start = true;
                });
            } else {
                this.$toast.error('Entrada mínima de 1 caractere')
            }
        },
        logout: function() {
            localStorage.removeItem('token');
            this.$router.push('login');
        }
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