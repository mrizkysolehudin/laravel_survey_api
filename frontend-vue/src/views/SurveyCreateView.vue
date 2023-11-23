<template>
  <PageWrapperComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          Create a Survey
        </h1>

        <Notification />

        <div class="flex">
          <a v-if="model.slug" :href="`/view/survey/${model.slug}`" target="_blank"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Public link
          </a>
          <button v-if="route.params.id" @click="handleDeleteSurvey()" type="button"
            class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline-block" viewBox="0 0 20 20"
              fill="currentColor">
              <path fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd" />
            </svg>
            Delete Survey
          </button>
        </div>
      </div>
    </template>
    <div v-if="surveyDetailLoading" class="flex justify-center">Loading...</div>
    <form v-else @submit.prevent="handleSaveSurvey" class="animate-fade-in-down">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label class="block text-sm font-medium text-gray-700"> Image </label>
            <div class="mt-1 flex items-center">
              <img v-if="model.image_url" :src="model.image_url" class="w-64 h-48 object-cover" />

              <button type="button"
                class="relative w-32 h-10 overflow-hidden bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <input type="file" @change="onImageChoose"
                  class="absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer " />
                Upload
              </button>
            </div>
          </div>

          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border p-2 border-gray-300 rounded-md" />
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-gray-700"> Description </label>
            <div class="mt-1">
              <textarea id="description" name="description" v-model="model.description" rows="3"
                autocomplete="survey_description"
                class="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Describe your survey" />
            </div>
          </div>

          <div>
            <label for="expire_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
            <input type="date" name="expire_date" id="expire_date" v-model="model.expire_date"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input id="status" name="status" type="checkbox" v-model="model.status"
                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium text-gray-700">Active</label>
            </div>
          </div>
        </div>

        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">
            Questions

            <button @click="handleAddQuestion()" type="button"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd" />
              </svg>
              Add Question
            </button>
          </h3>
          <div v-if="!model.questions.length" class="text-center text-gray-600">
            You don't have any questions created
          </div>
          <div>
            <QuestionEditor />
          </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </div>
    </form>
  </PageWrapperComponent>
</template>

<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import { v4 as uuidv4 } from "uuid";
import PageWrapperComponent from '../components/PageWrapperComponent.vue';
import { useRoute, useRouter } from 'vue-router';
import store from '../store';
import Notification from '../components/Notification.vue';

const router = useRouter();
const route = useRoute();

const surveyDetailLoading = computed(() => store.state.surveyDetail.loading);

let model = ref({
  title: "",
  slug: "",
  status: false,
  description: null,
  image: null,
  image_url: null,
  expire_date: null,
  questions: [],
});


watch(() => store.state.surveyDetail.data, (newVal, oldVal) => {
  model.value = {
    ...JSON.parse(JSON.stringify(newVal)),
    status: !!newVal.status
  };
});

if (route.params.id) {
  store.dispatch('getSurveyDetail', route.params.id);
}

function onImageChoose(e) {
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    model.value.image = reader.result;

    // show image
    model.value.image_url = reader.result;
    e.target.value = '';
  };
  reader.readAsDataURL(file);
}

function handleAddQuestion(index) {
  const newQuestion = {

    id: uuidv4(),
    type: 'text',
    question: '',
    description: '',
    data: {}
  };

  model.value.questions.splice(index, 0, newQuestion);

}

function handleDeleteQuestion(item) {
  model.value.questions = model.value.questions.filter((question) !== item);
}

function onQuestionChange(item) {
  if (item.data.options) {
    item.data.options = [...item.data.options];
  }
  model.value.questions = model.value.questions.map((question) => {
    if (question.id === item.id) {
      return JSON.parse(JSON.stringify(item));
    }
    return question;
  });

}

function handleSaveSurvey() {
  store.dispatch('saveSurveyAction', { ...model.value }).then(() => {
    store.dispatch('showNotificationAction', {
      type: 'success',
      message: "Create survey success"
    });

    setTimeout(() => {
      router.push({ name: 'surveys' });
    }, 1000);
  });
}

function handleDeleteSurvey() {
  if (confirm('Are you sure you want to delete this survey?')) {
    store.dispatch('deleteSurveyAction', model.value.id).then(() => {
      router.push({ name: "surveys" });
    });
  }
}

onMounted(() => {
});
</script>

<style></style>
