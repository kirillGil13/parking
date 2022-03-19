import * as Three from "three";
import {computed, getCurrentInstance} from "vue";

export const createCamera = (camera, container, vmInstance) => {
    camera.value = new Three.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.value.position.x = 17.4
    camera.value.position.y = 16.44
    camera.value.position.z = 15.44
}