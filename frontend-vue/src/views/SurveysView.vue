<template>
  <PageWrapperComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-gray-900">
          Surveys
        </h1>
        <router-link :to="{ name: 'surveyCreate' }"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add new Survey
        </router-link>
      </div>
    </template>
    <div v-if="surveys.loading" class="flex justify-center">Loading...</div>
    <div v-else-if="surveys.data.length" class="">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <SurveyListItem v-for="(survey, index) in surveys.data" :key="index" :survey="survey"
          @delete="deleteSurvey(survey)" class=" animate-fade-in-down" :style="{ animationDelay: `${ind * 0.1}s` }" />
      </div>
      <div class="flex justify-center mt-5">
        <nav class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <a v-for="(link, index) in surveys.links" :key="index" href="#" @click="getForPage($event, link)"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap" :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md bg-gray-100 text-gray-700' : '',
              i === surveys.links.length - 1 ? 'rounded-r-md' : '',
            ]" v-html="link.label"></a>

        </nav>
      </div>
    </div>
    <div v-else class="text-gray-600 text-center py-40 mb-24 ">Your don't have surveys yet</div>
  </PageWrapperComponent>
</template>

<script setup>
import { computed } from 'vue';
import PageWrapperComponent from '../components/PageWrapperComponent.vue';
import SurveyListItem from '../components/SurveyListItem.vue';
import store from '../store';

const surveys = computed(() => store.state.surveys);
store.dispatch('getSurveysAction');


function deleteSurvey(survey) {
  if (confirm(`Are you sure you want to delete this survey?`)) {
    store.dispatch('deleteSurveyAction', survey.id).then(() => {
      store.dispatch('getSurveysAction');
    });
  }
}

function getForPage(e, link) {
  e.preventDefault();
  if (!link.url || link.active) {
    return;
  }

  store.dispatch('getSurveysAction', { url: link.url });
}
</script>
