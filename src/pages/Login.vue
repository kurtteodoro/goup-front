<template>
    <div class="root">
        <div class="card">
            <h1>Login</h1>
            <p>Para continuar, faça seu login</p>
            <form @submit.prevent="login">
                <input required v-model="user.email" type="email" class="input" placeholder="E-mail">
                <input required v-model="user.password" type="password" class="input" placeholder="Senha">
                <button class="btn">Login</button>
                <router-link to="/register"><a class="text-center mt-2 mb-1" href="">Não tem uma conta ? cadastre-se</a></router-link>
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
                    password: ''
                }
            }
        },
        methods: {
            login: function() {
                axios.post(Config.api_url+'api/user/login', this.user).then(response=>{
                    if(response.data.success) {
                        localStorage.setItem('token', response.data.token);
                        this.$toast.success('Login efetuado com sucesso');
                        setTimeout(()=>{
                            this.$router.go();
                        }, 2000);
                    } else if (response.data.error && response.data.message)
                          this.$toast.error(response.data.message);
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