import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    user: {},
    token: null
};

const store = new Vuex.Store({
    state,
    getters: {
        user: (state)=>{
            return state.user;
        }
    },
    actions: {
        setUser: (context, user) => {
            context.commit('user', user);
        },
        setToken: (context, token) => {
            context.commit('token', token);
        }
    },
    mutations: {
        user: (state, user) => {
            state.user = user;
        },
        token: (state, token) => {
            state.token = token;
        }
    }
});

export default store;