<template>
  <fieldset class="mb-4">
    <div>
      <legend class="text-base font-medium text-gray-900">1. ini pertanyaan</legend>
      <p class="text-gray-500 text-sm">ini description</p>
    </div>
    <div class="mt-3 grid gap-4">
      <div>
        <select
          class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Please Select</option>
          <option>option text</option>
        </select>
      </div>
      <div>
        <div class="flex items-center">
          <input
            type="radio"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label class="ml-3 block text-sm font-medium text-gray-700"> option text </label>
        </div>
      </div>
      <div>
        <div class="flex items-center">
          <input
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label class="ml-3 block text-sm font-medium text-gray-700"> option text </label>
        </div>
      </div>
      <div>
        <input
          type="text"
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div>
        <textarea
          class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></textarea>
      </div>
    </div>
  </fieldset>
  <hr class="mb-4" />
</template>

<script setup>
function shouldHaveOptions() {}

function onCheckboxChange() {}
</script>

<style></style>
