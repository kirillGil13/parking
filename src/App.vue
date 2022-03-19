<template>
    <div id="container" ref="container"></div>
</template>

<script>
import * as Three from 'three'
import {DragControls} from 'three/examples/jsm/controls/DragControls'
import {computed, getCurrentInstance, onMounted, ref, toRaw, reactive} from "vue";
import {map} from "@/services/map";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import appInit from "@/utils/appInit";
import {createTitle} from "@/components/title";
import {floor} from "@/components/floor";
import {lights} from "@/services/light";
import {createFlashlight} from "@/components/flashlight";
import {createMarkup} from "@/components/markup";
import {createCamera} from "@/services/camera";
import {createRenderer} from "@/services/renderer";
import {TexturesStore} from "@/store/textures";
import {createCenter} from "@/components/center";
import {createCar} from "@/components/car";
import utils from "@/utils/utils";
import {gsap} from "gsap";
import {DimensionGUIHelper} from "@/services/dimensionGui";
import {MinMaxGUIHelper} from "@/services/minMaxGui";
import {createRayCast} from "@/services/rayCast";
import {parkCars} from "@/services/parkCars";

export default {
  name: 'App',
  components: {
  },
  setup() {
    const {scene, camera, controlsValue, renderer, addObject, objects} = appInit();
    const vm = getCurrentInstance();
    const vmInstance = computed(() => vm.appContext.config.globalProperties);
    const cars = reactive({
      length: 0,
      items: []
    });
    const animatedCars = ref([])
    const animatedCars1 = ref([])
    const positions = reactive({
      x: [],
      z: []
    });
    let zcar = 14.8, xcar = -17.4;
    for (let i = 0; i < 2; i++) {
      positions.z.push(zcar)
      zcar *= -1;
    }
    for (let j = 0; j < 6; j++) {
      positions.x.push(xcar);
      xcar += 7
    }

    async function initialize() {
      await TexturesStore.loadTextures();
      let container = document.getElementById('container');
      const {textureCube} = map();
      scene.value = new Three.Scene();
      scene.value.background = textureCube.value;
      scene.value.environment = textureCube.value;

      const {ambientLight, directLight} = lights(scene, vmInstance);

      await floor(addObject);

      await createTitle(addObject);

      createCenter(addObject);

      //FlashLights
      let x = -21, y = 0.75, z = 0;
      for (let i = 1; i <= 10; i++) {
        const {flashLight} = createFlashlight(textureCube);
        if (i > 5) {
          if (i === 6) {
            x = -21
          }
          x+=7
          z = -10;
          addObject(x,0.75,z,toRaw(flashLight.value), 1);
        } else {
          x+=7
          z = 10;
          addObject(x,0.75,z,toRaw(flashLight.value), 1);
        }
      }

      //Cars
      parkCars(positions, cars, vmInstance, addObject, scene);

      let animCar = 0, zAnimCar = [7.5, 4];
      setInterval(() => {
        const c = createCar();
        c.name = `animCar${animCar}`;
        animCar++;
        animatedCars.value.push(c);
        addObject(-17,-10.9,zAnimCar[utils.getRandomInt(zAnimCar.length)],c, 1);
        gsap.to(c.position, {x: 17, duration: 6, ease: "none", onComplete: () => {
            const car = animatedCars.value.shift();
            scene.value.remove(scene.value.getObjectByName(`${car.name}`))
          }})
      }, 2000)

      let animCar1 = 0, zAnimCar1 = [-7.5, -4];
      setInterval(() => {
        const c1 = createCar();
        c1.name = `animCar1${animCar}`;
        c1.rotation.y = Math.PI;
        animCar1++;
        animatedCars1.value.push(c1);
        addObject(17,-10.9,zAnimCar1[utils.getRandomInt(zAnimCar1.length)],c1, 1);
        gsap.to(c1.position, {x: -17, duration: 6, ease: "none", onComplete: () => {
            const car = animatedCars1.value.shift();
            scene.value.remove(scene.value.getObjectByName(`${car.name}`))
          }})
      }, 2000)

      createMarkup(addObject);

      createCamera(camera, container, vmInstance);

      createRayCast(camera, scene, renderer, container)

      controlsValue.value = new OrbitControls(camera.value, container)
      controlsValue.value.enableDamping = true;

      function openFullscreen() {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        } else if (container.mozRequestFullScreen) { /* Firefox */
          container.mozRequestFullScreen();
        } else if (container.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { /* IE/Edge */
          container.msRequestFullscreen();
        }
      }

      container.addEventListener('dblclick', openFullscreen, false);
      container.addEventListener('fullscreenchange', (e) => {console.log('Full Screen')})

      createRenderer(renderer, container);
      container.appendChild(renderer.value.domElement)
    }
    function render() {
      requestAnimationFrame(render);
      controlsValue.value.update();
      renderer.value.render(toRaw(scene.value), camera.value);
    }
    onMounted(async () => {
      await initialize();
      requestAnimationFrame(render);
    })
    return {
       renderer, scene, controlsValue, camera
    }
  }
}
</script>

<style lang="scss">
#app {
  #container {
    width: 100%;
    height: 100%;
  }
}
</style>
