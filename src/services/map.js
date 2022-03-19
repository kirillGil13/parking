import * as Three from "three";
import {ref} from "vue";

export const map = () => {
    const textureCube = ref(null);
    const path = "./map/";
    const format = ".png";
    const order = ["px", "nx", "py", "ny", "pz", "nz"];
    const urls = [];
    order.forEach(side => {
        urls.push(`${path}${side}${format}`);
    });
    textureCube.value = new Three.CubeTextureLoader().load(urls);
    textureCube.value.format = Three.RGBAFormat;
    return {
        textureCube
    }
}