<template>
    <div>
        <table cellspacing=0>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Usuario</th>
                    <th>Nome</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="5" v-if="perfis.length == 0">
                        <p class="text-center">Nenhum perfil encontrado</p>
                    </td>
                </tr>
                <tr v-for="(perfil, key) in perfis" :key="key" class="item">
                    <td>{{ perfil.id }}</td>
                    <td>
                        <img :src="perfil.avatar_url" alt="Avatar">
                    </td>
                    <td>
                        <p>{{ perfil.login }}</p>
                    </td>
                    <td>
                        <p>{{ perfil.name ? perfil.name : '----' }}</p>
                    </td>
                    <td>
                        <BotaoFavorito @favoritar="favoritar" @desfavoritar="desfavoritar" :perfil_id="perfil.id" :favoritado="favoritos.includes(perfil.id)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import BotaoFavorito from './BotaoFavorito';

export default {
    props: ['perfis', 'favoritos', 'onlyfavorites'],
    components: {
        BotaoFavorito,
    },
    methods: {
        favoritar: function(perfil_id) {
            this.favoritos.push(perfil_id);
        },
        desfavoritar: function(perfil_id) {
            this.favoritos.forEach((el, key)=>{
                if(el == perfil_id){
                    this.favoritos.splice(key, 1);
                    if(this.onlyfavorites) {
                        this.perfis.forEach((el, key)=>{
                            if(el.id == perfil_id){
                                this.perfis.splice(key, 1);
                            }
                        });
                    }
                }
            });
        }
    }
}
</script>

<style scoped>

table {
        width: 100%;
        margin-top: 25px;
    }
    hr {
        border-color: rgb(255, 255, 255);
    }
    tr img {
        width: 40px;
        height: 40px;
        border-radius: 100px;
    }
    tr td {
        text-align: center;
    }
    table tbody .item:hover {
        background-color: rgb(241, 241, 241);
    }
</style>