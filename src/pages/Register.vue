<template>
    <div class="root">
        <div class="card">
            <h1>Cadastro</h1>
            <p>Registre-se para continuar</p>
            <form @submit.prevent="register">
                <input required v-model="user.email" type="email" class="input" placeholder="E-mail">
                <input required v-model="user.password" type="password" class="input" placeholder="Senha">
                <input required v-model="user.password_confirmation" type="password" class="input" placeholder="Confirmação de senha">
                <button class="btn">Cadastrar</button>
                <router-link to="/"><a class="text-center mt-2 mb-1" href="">Já tem uma conta ? faça login</a></router-link>
            </form>
        </div>
    </div>
</template>

<script>

    const axios = require('axios');
    import Config from '../../Config.js';

    export default {
        data: function() {
            return {
                user:{
                    email: '',
                    password: '',
                    password_confirmation: '',
                }
            }
        },
        methods: {
            register: function() {
                axios.post(Config.api_url+'api/user/register', this.user).then(response=>{
                    if(response.data.success) {
                        this.$toast.success('Conta criada com sucesso');
                        setTimeout(()=>{
                            this.$router.push('Login');
                        }, 1000);
                    } else if (response.data.errors) {
                        var errors = "";
                        response.data.errors.map(erro=>errors+=erro+"<br>");
                        this.$toast.error(errors);
                    }
                });
            }
        }
    }

</script>

<style scoped>
    .card {
        width: 500px;
    }
    .root {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .card .input {
        margin-bottom: 15px;
    }
    
</style>