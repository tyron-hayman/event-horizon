<script lang="ts" setup>
import { shallowRef, onMounted, onBeforeUnmount } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { Mesh, type ShaderMaterial, MeshStandardMaterial, type DirectionalLight } from 'three'
import { useGLTF } from '@tresjs/cientos'
import { useScroll } from 'motion-v'

const plane = shallowRef<Mesh | null>(null)
const shape = shallowRef<Mesh | null>(null)
const shapeGroup = shallowRef<Mesh | null>(null)
const accentLight = shallowRef<DirectionalLight | null>(null)
const uniforms = {
  uTime: { value: 0 },
  uSpeed: { value: 0.5 },
}
const { scene } = await useGLTF('/models/shape.glb', { draco: true })
const modelRotation = shallowRef<[number, number, number]>([0.7, 0, 0.5])
const { scrollYProgress } = useScroll()
const { onLoop } = useRenderLoop()

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    vec4 position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = position;
}`;

  const fragmentShader = `
uniform float uTime;
uniform float uSpeed; // Master speed control
varying vec2 vUv;

// --- Color Parameters ---
#define COL_BASE vec3(0., 0., 0.)
#define COL_CONT vec3(0.5, 0.1, 0.0)
#define COL_FREQ vec3(1.0, 1.0, 1.0)
#define COL_PHAS vec3(1., 0., 0.)

// --- Motion / Warp Parameters ---
#define ROT_SPEED 0.1
#define WARP_LAYERS 1.0
#define WARP_AMPL 0.5
#define FLOW_SCALE 2.1

// Smooth color palette
vec3 palette(float t) {
    return COL_BASE + COL_CONT * cos(6.2831 * (t * COL_FREQ + COL_PHAS));
}

// Rotation helper
vec2 rotate(vec2 uv, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c) * uv;
}

// Curl-like flow
vec2 curl(vec2 p, float t) {
    float n1 = sin(p.y * 1.3 + t * 0.7) + cos(p.x * 0.7 - t * 0.4);
    float n2 = cos(p.x * 1.1 + t * 0.5) - sin(p.y * 1.7 - t * 0.6);
    return vec2(n1, n2) * 0.15;
}

// Layered warp for swirl + waves interaction
vec2 warp(vec2 uv, float t) {
    vec2 result = uv;
    for (float i = 1.0; i <= WARP_LAYERS; i++) {
        float freq = i * 1.1;
        float amp = WARP_AMPL / i;
        float phase = t * (0.3 + 0.2 * i);
        result += amp * vec2(
            sin(freq * result.y + phase),
            cos(freq * result.x - phase)
        );
        result += curl(result * (0.6 + 0.15 * i), t);
    }
    return result;
}

// Simple hash-based grain
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Halftone dot pattern
float halftone(vec2 uv, float intensity, float dotSize) {
    // Rotate the halftone grid slightly for a print-like angle
    float angle = radians(15.0);
    vec2 rotUV = rotate(uv * 0.5, angle) * 1000.0;

    // Make repeating grid
    vec2 gv = fract(rotUV) - 0.5;

    // Circular dot distance
    float dist = length(gv);

    // Dots scale inversely with brightness (darker = bigger dots)
    float radius = (1.0 - intensity) * dotSize;
    return smoothstep(radius, radius - 0.15 * dotSize, dist);
}

void main() {
    float time = uTime * uSpeed;
    vec2 uv = 2.0 * vUv - 1.0;
    uv.x *= 10.0 / 6.0; // aspect correction

    // Gentle rotation for global drift
    uv = rotate(uv, time * ROT_SPEED * 0.5);

    // Layered warp for swirling waves
    vec2 warped = warp(uv * FLOW_SCALE, time);

    // Dynamic interference between layers
    float waveA = sin(warped.x * 1.8 + time * 0.6);
    float waveB = cos(warped.y * 2.2 - time * 0.8);
    float swirl = sin(warped.x * 1.3 + warped.y * 1.7 + time * 0.9);

    float t = 0.5 + 0.5 * (waveA * 0.4 + waveB * 0.4 + swirl * 0.2);

    // Get base color and modulate by motion
    vec3 color = palette(t);
    float brightness = 0.8 + 0.3 * sin(time + warped.x * 2.0) * cos(warped.y * 1.5 - time * 0.8);
    color *= brightness;

    // Soft dynamic highlights (like glints on water)
    float highlight = smoothstep(0.7, 1.0, t) * 0.2;
    color += highlight * vec3(0.2, 0.4, 0.6);

    // Gentle grain for organic texture
    float grain = random(vUv * time * 3.0) - 0.5;
    color += grain * 0.4;

    // --- Halftone overlay ---
    float lum = dot(color, vec3(0.299, 0.587, 0.114)); // luminance
    float dots = halftone(vUv, lum, 0.7);              // halftone grid
    color *= dots;                                     // modulate color

    gl_FragColor = vec4(color, 1.0);
}`;

const onMouseMove = (e: MouseEvent) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1
  const y = -(e.clientY / window.innerHeight) * 2 + 1

  // Map to rotation angles (tweak scaling factors to taste)
  const rotX = y / 50 // tilt up/down
  const rotY = x / 50 // turn left/right

  modelRotation.value = [0.7 - rotX, 0 - rotY, 0.5]
}

onLoop(({ elapsed }) => {
  if (plane.value) {
    ;(plane.value.material as ShaderMaterial).uniforms.uTime.value = elapsed
  }
  if (shape.value) {
    shape.value.rotation.y = elapsed * 0.1 + scrollYProgress.get() * 2
    shape.value.rotation.z = elapsed * 0.1 + scrollYProgress.get() * 2
    shape.value.position.y = -0.5 + scrollYProgress.get() * 20

    shape.value.scale.x = 1 - scrollYProgress.get() * 3
    shape.value.scale.y = 1 - scrollYProgress.get() * 3
    shape.value.scale.z = 1 - scrollYProgress.get() * 3
  }
  if( shapeGroup.value && modelRotation.value ) {
    shapeGroup.value.position.y = modelRotation.value[0]
    shapeGroup.value.position.x = modelRotation.value[1]
  }
})

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.material = new MeshStandardMaterial({
        color: 0x222222,
        roughness: 0.6,
        metalness: 0.1,
      })
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <TresDirectionalLight ref="accentLight" cast-shadow :position="[2, 1, 0]" :intensity="1" color="#e11d48" />
  <TresDirectionalLight cast-shadow :position="[-3, 0, 0]" :intensity="1" color="#ffffff" />
  <TresGroup>
    <TresMesh ref="plane" :position="[0, 0, 0]">
      <TresPlaneGeometry :args="[10, 6, 128, 128]" />
      <TresShaderMaterial
        :vertexShader="vertexShader"
        :fragmentShader="fragmentShader"
        :uniforms="uniforms"
      />
    </TresMesh>
  </TresGroup>
  <TresGroup ref="shapeGroup" :position="[0.7, 0, 0.5]">
    <TresMesh ref="shape" :position="[1,-0.5,0.5]">
      <primitive :object="scene" />
    </TresMesh>
  </TresGroup>
</template>
