import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import Pokemon from '../class/Pokemon';

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        
        pokemons: [],
        
        pokemon: new Pokemon(),
                
        pagination: {
            total: 0, 
            per_page: 2,
            from: 1,
            to: 0,
            current_page: 1
        },
        
        errors:{}

    },
    
    mutations: {

        GET_POKEMONS(state) {

            const URL = `pokemons?page=${state.pagination.current_page}`;

            axios
            .get(URL)
            .then(response => {
                state.pokemons = response.data.data.data;
                state.pagination = response.data.pagination;
            })
            .catch(e => console.log(e));
        },

        ADD_POKEMON(state, pokemon) {
            
            if(state.pokemon.id != '') {
                
                const URL = `pokemons/${state.pokemon.id}`;
                
                axios
                .put(URL, state.pokemon)
                .then(response => alert('success'))
                .catch(e => state.errors = e.response.data.errors);
            
            } else {

                const URL = 'pokemons';
                
                axios
                .post(URL, pokemon)
                .then(response => alert('success'))
                .catch(e => state.errors = e.response.data.errors);

            }

            state.pokemon = new Pokemon();
        },

        REMOVE_POKEMON(state, pokemon) {
            
            const URL = `pokemons/${pokemon.id}`
            
            axios
            .delete(URL)
            .then(response => alert('success'))
            .catch(e => console.log(e));

            state.pokemon = new Pokemon();

        },

        EDIT_POKEMON: (state, pokemon)  => state.pokemon = pokemon,

        CHANGE_PAGE: (state, page) => state.pagination.current_page = page,

        SEARCH_POKEMONS: (state, pokemons) => state.pokemons = pokemons
    },

    actions: {

        getPokemons: ({commit}) => commit('GET_POKEMONS'),

        removePokemon: ({commit}, pokemon) => commit('REMOVE_POKEMON', pokemon),

        addPokemon: ({commit}, pokemon) => commit('ADD_POKEMON', pokemon),

        editPokemon: ({commit}, pokemon) => commit('EDIT_POKEMON', pokemon),

        changePage: ({commit}, page) => commit('CHANGE_PAGE', page),

        searchPokemons: ({commit}, pokemons) => commit('SEARCH_POKEMONS', pokemons)
    
    },

    getters: {

        pokemons: state => state.pokemons,

        pokemon: state => state.pokemon,
        
        pagination: state => state.pagination,
        
        errors: state => state.errors
    
    }

});

export default store;