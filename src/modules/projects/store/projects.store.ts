import { computed, ref } from 'vue'

import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import { useLocalStorage } from '@vueuse/core'

import type { Project } from '../interfaces/projectInterface'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref(useLocalStorage<Project[]>('projects', []))

  //nueva funcion para agregar tarea
  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) {
      return
    }
    const project = projects.value.find((p) => p.id === projectId)
    if (!project) return

    project.tasks.push({
      id: uuidv4(),
      name: taskName
    })
  }

  const addNewProject = (projectName: string) => {
    if (!projectName) {
      return
    }

    projects.value.push({
      id: uuidv4(),
      name: projectName,
      tasks: []
    })
  }

  const toggleTasks = (projectId: string, taskId: string) => {
    const project = projects.value.find((p) => p.id === projectId)
    if (!project) return

    const task = project.tasks.find((t) => t.id === taskId)
    if (!task) return

    task.completedAt = task.completedAt ? undefined : new Date()
  }

  return {
    //properties
    projects,

    //getters
    projectList: computed(() => [...projects.value]),
    noProjects: computed(() => projects.value.length === 0),
    projectsWithCompleted: computed(() => {
      return projects.value.map((p) => {
        const total = p.tasks.length
        const completed = p.tasks.filter((task) => task.completedAt).length
        const completion = total === 0 ? 0 : (completed / total) * 100
        const allcompletion = total === completed
        return {
          id: p.id,
          name: p.name,
          taskCount: total,
          completion: Math.round(completion),
          fullCompleted: allcompletion
        }
      })
    }),

    //actions
    addNewProject,
    addTaskToProject,
    toggleTasks
  }
})
