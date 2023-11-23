import { createStore } from 'vuex';
import axiosClient from '../helpers/axiosClient';

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
    surveyDetail: {
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
  getters: {
    hasToken: (state) => {
      return state.user.token !== null;
    },
  },
  actions: {
    registerAction({ commit }, user) {
      return axiosClient.post('/users/signup', user).then(({ data }) => {
        commit('setUser', data.user);
        commit('setToken', data.token);
        return data;
      });
    },
    loginAction({ commit }, user) {
      return axiosClient.post('/users/login', user).then(({ data }) => {
        commit('setUser', data.user);
        commit('setToken', data.token);
        return data;
      });
    },
    logoutAction({ commit }) {
      return axiosClient.post('/users/logout').then((response) => {
        commit('setLogout');
        return response;
      });
    },
    getUserAction({ commit }) {
      return axiosClient.get('/users/me')
        .then(res => {
          commit("setUser", res.data);
        });
    },
    getHomeDataAction({ commit }) {
      commit('setHomeLoading', true);
      return axiosClient.get('/dashboard')
        .then((res) => {
          commit('setHomeLoading', false);
          commit('setHomeData', res.data);
          return res;
        }).catch((error) => {
          commit('setHomeLoading', false);
          return error;
        });
    },
    getSurveysAction({ commit }, { url = null } = {}) {
      commit('setSurveysLoading', true);
      url = url || '/survey';
      return axiosClient.get(url).then((res) => {
        commit('setSurveysLoading', false);
        commit('setSurveys', res.data);
        return res;
      });
    },
    deleteSurveyAction({ dispatch }, id) {
      return axiosClient.delete(`/survey/${id}`).then((res) => {
        dispatch('getSurveysAction');
        return res;
      });
    },
    getSurveyDetailAction({ commit }, id) {
      commit("setSurveyDetailLoading", true);
      return axiosClient.get(`/survey/${id}`)
        .then((res) => {
          commit("setSurveyDetail", res.data);
          commit("setSurveyDetailLoading", false);
          return res;
        }).catch((error) => {
          commit("setSurveyDetailLoading", false);
          return error;
        });
    },
    saveSurveyAction({ commit }, survey) {
      delete survey.image_url;

      let response;
      if (survey.id) {
        response = axiosClient.put(`/survey/${survey.id}`, survey).then((res) => {
          commit('setSurveyDetail', res.data);
          return res;
        });
      } else {
        response = axiosClient.post('/survey', survey).then((res) => {
          commit('setSurveyDetail', res.data);
          return res;
        });
      }
      return response;
    },
    showNotificationAction({ commit }, { type, message }) {
      commit('setNotify', { type, message });
    },
  },
  mutations: {
    setUser: (state, user) => {
      state.user.data = user;
    },
    setToken: (state, token) => {
      state.user.token = token;
      localStorage.setItem('token', token);
    },
    setLogout: (state) => {
      state.user.token = null;
      state.user.data = {};
      localStorage.removeItem('token');
    },
    setHomeLoading: (state, loading) => {
      state.home.loading = loading;
    },
    setHomeData: (state, data) => {
      state.home.data = data;
    },
    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
      state.surveys.links = surveys.meta.links;
    },
    setSurveyDetailLoading: (state, loading) => {
      state.surveyDetail.loading = loading;
    },
    setSurveyDetail: (state, survey) => {
      state.surveyDetail.data = survey.data;
    },
    setNotify: (state, { message, type }) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000);
    }
  },
  modules: {}
});

export default store;
