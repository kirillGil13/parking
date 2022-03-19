import * as Three from "three";
import {toRaw} from "vue";
import {TexturesStore} from "@/store/textures";

export const createEdge = (width, depth, x, z) => {
    const edge = toRaw(TexturesStore.get('edge'));
    const material = new Three.MeshStandardMaterial({
        map: edge.color,
        aoMap: edge.ambient,
        normalMap: edge.normal,
        roughnessMap: edge.rough
    });
    const cube = new Three.Mesh(new Three.BoxGeometry(width, 0.3, depth), material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.set(x, -0.6, z);
    return cube;
}