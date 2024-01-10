<script setup>
const { result } = await $fetch('/api/getData', {
  method: 'GET',
  query: {
    startDate: '2024-01-01',
    endDate: '2024-01-10',
  },
});
const data = ref(result);

const insertData = async () => {
  const { msg } = await $fetch('/api/getData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: 'test',
      content: 'test',
      writer: 1,
    }),
  });
  console.log(msg);
  return 'ho';
};
</script>
<template>
  <div class="w-full h-20 border flex justify-center items-center">
    <p class="text-3xl">Welcome</p>
    <UButton
      color="fuchsia"
      variant="soft"
      icon="i-heroicons-pencil-square"
      @click="insertData"
      >Button</UButton
    >
  </div>
  <div class="bg-indigo-300 p-0 m-0">
    <div class="grid grid-cols-8 gap-4 p-4">
      <UCard v-for="item in data">
        <template #header>
          <p v-if="item.title.length > 20">
            {{ item.title.substring(0, 20) + '...' }}
          </p>
          <p v-else>{{ item.title }}</p>
        </template>

        <div>{{ item.content.substring(0, 50) }}</div>
      </UCard>
    </div>
  </div>
</template>
