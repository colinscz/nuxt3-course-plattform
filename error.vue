<template>
  <NuxtLayout>
    <div class="flex flex-col">
      <div v-if="error.statusCode === '404'" class="prose">
        <h1>404</h1>
        <p>I guess that page doesn't exist.</p>
        <p>
          <strong>{{ error.message }}</strong>
        </p>
      </div>
      <div v-else class="prose">
        <h1>Dang</h1>
        <p>It looks like something broke.</p>
        <p>Sorry about that.</p>
        <p>
          <strong>{{ error.message }}</strong>
        </p>
      </div>
      <div class="mt-5 prose">
        <p>
          Go to the
          <thead>
            <a class="hover:cursor-pointer" @click="handleError">
              first lesson.
            </a>
          </thead>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const error = useError()
const handleError = () => {
  clearError({
    redirect:
      '/course/chapter/1-chapter-1/lesson/1-to-typescript-with-vue-js-3',
  })
}
</script>
