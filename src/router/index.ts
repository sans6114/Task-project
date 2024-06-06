import { createRouter, createWebHistory } from 'vue-router'

import ProjectLayout from '@/modules/projects/layouts/ProjectLayout.vue'
import ProjectsView from '@/modules/projects/views/ProjectsView.vue'
import SpecificProjectView from '@/modules/projects/views/SpecificProjectView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'projects' },
      component: ProjectLayout,
      children: [
        {
          path: 'Projects',
          name: 'projects',
          component: ProjectsView
        },
        {
          path: '/project/:id',
          name: 'project',
          props: true,
          component: SpecificProjectView
        }
      ]
    }
  ]
})

export default router
