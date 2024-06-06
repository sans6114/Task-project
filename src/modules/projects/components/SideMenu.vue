<template>
  <aside class="bg-base-200 w-72 min-h-screen">
    <h2 class="text-lg font-bold mx-4">Proyectos</h2>
    <p v-if="projecStore.noProjects" class="text-sm text-gray-500 mx-4">No hay proyectos</p>

    <!-- menu daisy-->
    <ul v-else class="menu bg-base-200 w-56 rounded-box">
      <li v-for="project in projecStore.projectList" :key="project.id">
        <template v-if="project.tasks.length > 0">
          <details open>
            <summary>
              <router-link :to="`/project/${project.id}`">{{ project.name }}</router-link>
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <router-link :to="`/project/${project.id}`">{{ task.name }}</router-link>
              </li>
            </ul>
          </details>
        </template>

        <template v-else>
          <router-link :to="`/project/${project.id}`">{{ project.name }}</router-link>
        </template>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'

import { useProjectStore } from '../store/projects.store'

const projecStore = useProjectStore()
</script>
