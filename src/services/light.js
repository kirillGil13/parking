import * as Three from "three";
import {computed, getCurrentInstance, ref, toRaw} from "vue";
import {ColorGUIHelper} from "@/services/colorGuiHelper";

export const lights = (scene, vmInstance) => {
    const ambientLight = ref(null);
    const directLight = ref(null);

    //AmbLight
    const color = 0xFFFFFF;
    const intensity = 0.53;
    ambientLight.value = new Three.AmbientLight(color, intensity);
    scene.value.add(toRaw(ambientLight.value));
    const amb = vmInstance.value.gui.addFolder('Ambient');
    amb.open();
    amb.addColor(new ColorGUIHelper(ambientLight.value, 'color'), 'value').name('color');
    amb.add(ambientLight.value, 'intensity', 0, 2, 0.01).name('ambient intensity');

    //DirLight
    const color1 = 0xFFFFFF;
    const intensity1 = 1.12;
    directLight.value = new Three.DirectionalLight(color1, intensity1);
    directLight.value.position.set(-10, 24.25, 20);
    directLight.value.target.position.set(5.18, -10, -7.12);
    directLight.value.castShadow = true;
    directLight.value.shadow.mapSize.width = 512; // default
    directLight.value.shadow.mapSize.height = 512; // default
    directLight.value.shadow.camera.near = 0.5; // default
    directLight.value.shadow.camera.far = 500;
    directLight.value.shadow.camera.zoom = 0.23;
    const dir = vmInstance.value.gui.addFolder('Directional');
    dir.open();
    dir.addColor(new ColorGUIHelper(directLight.value, 'color'), 'value').name('color');
    dir.add(directLight.value, 'intensity', 0, 2, 0.01).name('intensity');
    dir.add(directLight.value.position, 'x', -10, 40).name('x');
    dir.add(directLight.value.position, 'y', -10, 40).name('y');
    dir.add(directLight.value.position, 'z', 0, 40).name('z');
    scene.value.add(directLight.value);
    scene.value.add(directLight.value.target);
    return {
        ambientLight,
        directLight
    }
}