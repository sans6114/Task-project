<template>
  <div class="overflow-x-auto w-screen">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Proyectos</th>
          <th>Tareas</th>
          <th>Desarrollo</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr
          v-for="(
            { id, name, taskCount, completion, fullCompleted }, index
          ) in projectStore.projectsWithCompleted"
          :key="id"
          class="hover hover:cursor-pointer"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ name }}</td>
          <td>{{ taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="completion"
              max="100"
            ></progress>
            <!--
<div class="card w-96 bg-base-100 shadow-xl image-full">
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                  alt="Shoes"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                  <button class="btn btn-primary">close</button>
                </div>
              </div>
            </div>
            -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <InputModal
    title="Nuevo proyecto"
    subtitle="Dale un identificador unico a tu proyecto"
    placeHolder="new project"
    @value="projectStore.addNewProject"
    :open="modalOpen"
    @close="modalOpen = false"
  />

  <CustomModal :open="customModalOpen">
    <template #header>
      <h1 class="text-3xl">titulo del modal</h1>
    </template>
    <template #body>
      <h1 class="text-3xl">titulo del body</h1>
    </template>
    <template #footer>
      <div class="flex flex-col w-full">
        <button @click="customModalOpen = false" class="btn w-full my-1">Close</button>
        <button class="btn w-full my-1 bg-slate-600">Accept</button>
      </div>
    </template>
  </CustomModal>
  <FabButton @click="modalOpen = true">
    <AddCircle />
  </FabButton>

  <FabButton @click="customModalOpen = true" position="bottom-left">
    <CustomIcon />
  </FabButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import CustomModal from '@/modules/common/components/CustomModal.vue'
import FabButton from '@/modules/common/components/FabButton.vue'
import InputModal from '@/modules/common/components/InputModal.vue'
import AddCircle from '@/modules/common/icons/AddCircle.vue'
import CustomIcon from '@/modules/common/icons/CustomIcon.vue'

import { useProjectStore } from '../store/projects.store'

const modalOpen = ref(false)
const customModalOpen = ref(false)

const projectStore = useProjectStore()
</script>
