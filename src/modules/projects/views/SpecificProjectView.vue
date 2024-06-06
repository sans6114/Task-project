<template>
  <div class="w-full">
    <section class="m-2">
      <breadCrumbs :name="project?.name ?? 'No name'" />
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completada</th>
              <th>Tarea</th>
              <th>Completada en</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="task in project?.tasks" :key="task.id" class="hover">
              <th>
                <label>
                  <input
                    type="checkbox"
                    :checked="!!task.completedAt"
                    class="checkbox"
                    @change="projectStore.toggleTasks(project!.id, task.id)"
                  />
                </label>
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <!-- row 2 -->
            <tr class="hover">
              <th>New Task</th>
              <td></td>
              <td class="flex justify-around gap-2">
                <input
                  type="text"
                  class="input input-secondary w-full transition-all hover:opacity-100 hover:cursor-pointer text-center"
                  placeholder="Nueva tarea"
                  v-model="inputRefValue"
                  @keyup.enter="handleInputSubmit"
                />
                <button @click="handleInputSubmit" type="submit" class="btn w-15 bg-slate-600">
                  enviar
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { useRouter } from 'vue-router'

import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue'

import type { Project } from '../interfaces/projectInterface'
import { useProjectStore } from '../store/projects.store'

interface Props {
  id: String
}

const router = useRouter()
const props = defineProps<Props>()
const projectStore = useProjectStore()
const project = ref<Project | undefined>()
const inputRefValue = ref('')

const handleInputSubmit = () => {
  if (inputRefValue.value) {
    projectStore.addTaskToProject(project.value?.id, inputRefValue.value)
    inputRefValue.value = ''
  }
}
watch(
  () => props.id,
  () => {
    project.value = projectStore.projectList.find((project) => project.id === props.id)
    if (!project.value) {
      router.replace('/')
    }
  },
  {
    immediate: true
  }
)
</script>
