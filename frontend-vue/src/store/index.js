import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: {
      data: {},
      token: localStorage.getItem('token')
    },
    home: {
      loading: false,
      data: {}
    },
    surveys: {
      loading: false,
      data: [],
      links: []
    },
    surveyDetails: {
      loading: false,
      data: {}
    },
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    notification: {
      show: false,
      type: 'success',
      message: ''
    }
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {}
})

export default store
