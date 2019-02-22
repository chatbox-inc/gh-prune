// Base dependencies
import Vue from 'vue'
import Vuex from 'vuex'
import octokit from './service/octokit'
import createPersistedState from 'vuex-persistedstate'

// Enable the ionic-vue router plugin
Vue.use(Vuex)

let loading = null

const startLoading = () => {
    if(loading){
        loading.present()
    }
}

const endLoading = () => {
    if(loading){
        loading.dismiss()
    }
}

export default new Vuex.Store({
    state: {
        token: 0,
        user: null,
        repos: null
    },
    plugins: [createPersistedState({
        paths: ['token']
    })],
    mutations: {
        LOGIN (state, {token, user, repos}) {
            state.token = token
            state.user = user
            state.repos = repos
        },
        LOGOUT (state) {
            state.token = null
            state.user = null
            state.repos = null
        },
        REMOVE_REPO(state, {full_name}){
            state.repos = state.repos.filter((value)=>{
                return value.full_name !== full_name
            })
        }
    },
    actions: {
        async setLoader(ctx, _loading){
            loading = _loading
        },
        async login({commit}, token){
            const api = octokit(token)
            startLoading()
            const [user,repos] = await Promise.all([
                api.profile(),
                api.listRepos()
            ])
            endLoading()
            commit('LOGIN',{token, user, repos})
        },
        async reLogin({state,dispatch}){
            if(state.token){
                await dispatch('login',state.token)
            }
            endLoading()
        },
        async logout({commit}){
            commit('LOGOUT')
        },
        async deleteRepo({state, commit},{full_name}){
            const [owner,repo] = full_name.split("/")
            startLoading()
            await octokit(state.token).deleteRepo({owner,repo})
            endLoading()
            commit('REMOVE_REPO',{full_name})
        }
    }
})
