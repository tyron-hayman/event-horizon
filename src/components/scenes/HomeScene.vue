<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { EffectComposer, Halftone } from '@tresjs/post-processing'
import StatueMain from './StatueMain.vue'
</script>

<template>
  <div class="w-full h-screen absolute z-[0] inset-0">
    <TresCanvas window-size shadows clear-color="#000000">
      <TresPerspectiveCamera :position="[0, 0, 5]" :fov="35" :near="0.1" :far="100" />
      <Suspense>
        <StatueMain />
      </Suspense>
      <EffectComposer>
        <Halftone
          :shape="1"
          :radius="1"
          :rotateR="Math.PI / 12"
          :rotateG="Math.PI / 3"
          :rotateB="Math.PI / 6"
          :scatter="0"
          :blending="2.5"
          :greyscale="true"
        />
      </EffectComposer>
    </TresCanvas>
  </div>
</template>
