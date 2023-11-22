<template>
  <div class="py-5 px-80 bg-[#a5f3fc] min-h-screen">
    <div v-if="loading" class="flex justify-center">Loading...</div>
    <form v-else class="container mx-auto">
      <div class="grid grid-cols-6 items-center">
        <div class="mr-4">
          <img src="survey.image_url" alt="" />
        </div>
        <div class="col-span-5">
          <h1 class="text-3xl mb-3">ini judul</h1>
          <p class="text-gray-500 text-sm"></p>
        </div>
      </div>

      <div v-if="surveyFinished" class="py-8 px-6 bg-emerald-400 text-white w-[600px] mx-auto">
        <div class="text-xl mb-3 font-semibold">Thank you for participating in this survey.</div>
        <button
          type="button"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit another response
        </button>
      </div>
      <div v-else>
        <hr class="my-3" />
        <div class="">
          <QuestionViewer />
        </div>

        <button
          type="submit"
          class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import QuestionViewer from '../components/QuestionViewer.vue'

const loading = false
const surveyFinished = false

function submitSurvey() {}

function submitAnotherResponse() {}
</script>

<style></style>
