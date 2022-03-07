import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiData: null,
    historyData: [],
    apiDataLoaded: false,
    addedUsers: [],
    filteredData: null
  },
  mutations: {
    FILL_DATA (state, payload) {
      state.apiData = payload
      state.filteredData = payload
    },
    ADD_TO_HISTORY (state, payload) {
      state.historyData.push(payload)
    },
    API_DATA_LOADED (state, payload) {
      state.apiDataLoaded = payload
    }
  },
  actions: {
    async apiCall (context) {
      fetch('https://mocki.io/v1/d0bcf6ec-17b4-4138-8b42-d6e41e513b8c')
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Something went wrong')
          }
        })
        .then(responseJson => {
          context.commit('FILL_DATA', responseJson)
          context.commit('API_DATA_LOADED', true)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addToHisthory (context, payload) {
      this.commit('ADD_TO_HISTORY', payload)
    }
  },
  getters: {
    getFilteredHistory: state => (status = '') => {
      return state.historyData.filter(item =>
        item.status.toLowerCase().includes(status.toLowerCase())
      )
    },
    getApiData (state) {
      if (state.apiDataLoaded) {
        return state.apiData
      }
    }
  },
  modules: {}
})
