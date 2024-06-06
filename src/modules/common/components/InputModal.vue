<template>
  <dialog id="my_modal_1" class="modal" :open="open">
    <div class="modal-box text-center">
      <h3 class="font-bold text-xl">{{ title }}</h3>
      <p v-if="subtitle" class="py-4">{{ subtitle }}</p>
      <div class="modal-action flex flex-col items-center w-full">
        <form method="dialog" @submit.prevent="submitValue">
          <input
            ref="inputRef"
            type="text"
            :placeholder="placeHolder"
            class="input input-bordered my-2 w-full text-center"
            v-model="inputValue"
          />
          <!-- if there is a button in form, it will close the modal -->
          <button @click="$emit('close')" class="btn w-full my-1">Close</button>
          <button type="submit" class="btn w-full my-1 bg-slate-600">Accept</button>
        </form>
      </div>
    </div>
  </dialog>

  <div
    v-if="open"
    class="modal-backdrop fixed top-0 left-0 z-10 bg-black opacity-60 w-screen h-screen"
  ></div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  open: boolean
  placeHolder?: string
  title: string
  subtitle?: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  close: [void]
  value: [text: string]
}>()

const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

watch(props, ({ open }) => {
  if (open) {
    inputRef.value?.focus()
  }
})

const submitValue = () => {
  //console.log({ value: inputValue.value })
  //si no tengo contenido dentreo de inputvalue entonces hago return
  if (!inputValue.value) {
    //foco en elemento
    inputRef.value?.focus()
    return
  }
  emits('value', inputValue.value.trim())
  emits('close')

  inputValue.value = ''
}
</script>
