import {ref} from "vue";
import * as Three from "three";

const appInit = () => {
    const objects = ref([]);
    const scene = ref(null);
    const renderer = ref(null);
    const controlsValue = ref(null);
    const camera = ref(null);

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
        camera.value.aspect = sizes.width / sizes.height
        camera.value.updateProjectionMatrix()
        renderer.value.setSize(sizes.width, sizes.height)
        renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    const addObject = (x, y, z, obj, spread) => {
        obj.position.x = x * spread;
        obj.position.y = y * spread;
        obj.position.z = z * spread;
        scene.value.add(obj);
        objects.value.push(obj);
    }
    return {
        scene,
        objects,
        renderer,
        controlsValue,
        camera,
        addObject,
    }
}

export default appInit;