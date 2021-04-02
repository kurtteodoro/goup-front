<template>
    <div>
        <i @click="desfavoritar" v-if="favoritado" class="fas fa-star"></i>
        <i @click="favoritar" v-else class="far fa-star"></i>
    </div>
</template>

<script>

const axios = require('axios');
import Config from '../../Config.js';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export default {
    data: function(){
        return {
            carregando: false
        }
    },
    props: ['favoritado', 'perfil_id'],
    methods: {
        favoritar: function() {
            if(!this.carregando) {
                this.carregando = true;
                this.$emit('favoritar', this.perfil_id);
                axios.post(Config.api_url+'api/user/add/favorite', {
                    user_github_id: this.perfil_id
                })
                .then(response=>{
                    if(response.data.success){
                        this.$toast.success('Perfil favoritado com sucesso');
                        this.carregando = false;
                    } else {
                        this.$toast.error('Ops, houve algum erro ao tentar favoritar o perfil');
                        this.carregando = false;
                        this.$emit('desfavoritar', this.perfil_id);
                    }
                });
            }
        },
        desfavoritar: function() {
            if(!this.carregando) {
                this.carregando = true;
                this.$emit('desfavoritar', this.perfil_id);
                axios.post(Config.api_url+'api/user/remove/favorite', {
                    user_github_id: this.perfil_id
                })
                .then(response=>{
                    if(response.data.success){
                        this.$toast.success('Perfil desfavoritado com sucesso');
                        this.carregando = false;
                    } else {
                        this.$toast.error('Ops, houve algum erro ao tentar desfavoritar o perfil');
                        this.carregando = false;
                        this.$emit('favoritar', this.perfil_id);
                    }
                });
            }
        }
    }
}
</script>

<style scoped>
    .far:hover {
        color: rgb(255, 196, 0);
        cursor: pointer;
    }
    .fas {
        color: rgb(255, 196, 0);
    }
    .fas:hover {
        color: rgb(119, 119, 119);
        cursor: pointer;
    }
</style>