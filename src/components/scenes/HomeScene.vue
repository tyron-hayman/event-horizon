<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import StatueMain from './StatueMain.vue'
</script>

<template>
  <div class="w-full h-screen absolute z-[0] inset-0">
    <TresCanvas window-size shadows clear-color="#000000" :dpr="1.5" :antialias="false">
      <TresPerspectiveCamera :position="[0, 0, 5]" :fov="35" :near="0.1" :far="100" />
      <Suspense>
        <StatueMain />
      </Suspense>
    </TresCanvas>
  </div>
</template>
