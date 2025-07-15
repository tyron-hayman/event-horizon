<script lang="ts" setup>
import { shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { type Mesh, type ShaderMaterial, Vector2, Color } from 'three'

const plane = shallowRef<Mesh | null>(null)
const sphere = shallowRef<Mesh | null>(null)

const uniforms = {
  uTime: { value: 0 },
  uAmplitude: { value: new Vector2(0.4, 0.4) },
  uFrequency: { value: new Vector2(20, 5) },
  uTopColour: { value: new Color(0x000000) }, // Example: blue
  uBottomColour: { value: new Color(0x4338ca) },
}

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    vec4 position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = position;
}
`

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;

#define COL_BASE vec3(0.059,0.09,0.165)
#define COL_CONT vec3(0.40, 0.08, 0.08)
#define COL_FREQ vec3(0.80, 0.20, 0.15)
#define COL_PHAS vec3(0.30, 0.10, 0.05)

#define ROT_SPEED 0.1
#define WARP_INIT 1.5
#define WARP_ITER 3.0
#define WARP_AMPL 3.0

vec3 palette(float t) {
   return COL_BASE + COL_CONT * cos(radians(360.0) * (t * COL_FREQ + COL_PHAS));
}

vec2 rotate(vec2 uv, float time) {
   float angle = time * ROT_SPEED;
   float s = sin(angle);
   float c = cos(angle);
   return mat2(c, -s, s, c) * uv;
}

vec2 warp(vec2 uv, float time) {
   for(float i = WARP_INIT; i < WARP_ITER; i++) {
      float oscillationX = sin(i * 0.5 + time * 0.25) * cos(time + uv.y * 1.5);
      float oscillationY = cos(i * 0.7 + time * 0.35) * sin(time + uv.x * 1.2);
      uv.x += WARP_AMPL / i * (oscillationX + 0.2 * sin(time * 0.6 + uv.y * 3.0));
      uv.y += WARP_AMPL / i * (oscillationY + 0.3 * cos(time * 0.8 + uv.x * 2.5));
   }
   return uv;
}

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    // Map vUv (0..1) to fragCoord (-1..1)
    vec2 uv = (2.0 * vUv - 1.0);
    float aspect = 10.0 / 6.0; // match plane geometry aspect ratio
    uv.x *= aspect;
    float time = uTime * 0.2;
    uv = rotate(uv, time);
    uv = warp(uv, time);
    float t = abs(sin(time - uv.y - uv.x));
    vec3 color = palette(t);
    
    gl_FragColor = vec4(color, 1.0);
}
`

const { onLoop } = useRenderLoop()

onLoop(({ delta, elapsed }) => {
  if (plane.value) {
    ;(plane.value.material as ShaderMaterial).uniforms.uTime.value = elapsed
  }
  if (sphere.value) {
    sphere.value.rotation.y += delta
  }
})
</script>

<template>
  <TresGroup>
    <TresMesh receive-shadow ref="plane" :position="[0, 0, 0]" :rotation="[0, 0, 0]">
      <TresPlaneGeometry :args="[10, 6, 128, 128]" />
      <TresShaderMaterial
        :vertexShader="vertexShader"
        :fragmentShader="fragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh>
  </TresGroup>
</template>
