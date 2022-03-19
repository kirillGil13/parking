import * as Three from "three";
import {TexturesStore} from "@/store/textures";
import {toRaw} from "vue";

export const floor = (add) => {
    const {color, rough, normal, ambient} = toRaw(TexturesStore.get('road'));
    color.repeat.set(20,20)
    ambient.repeat.set(20,20)
    normal.repeat.set(20,20)
    rough.repeat.set(20,20)

    color.wrapS = Three.RepeatWrapping
    ambient.wrapS = Three.RepeatWrapping
    normal.wrapS = Three.RepeatWrapping
    rough.wrapS = Three.RepeatWrapping

    color.wrapT = Three.RepeatWrapping
    ambient.wrapT = Three.RepeatWrapping
    normal.wrapT = Three.RepeatWrapping
    rough.wrapT = Three.RepeatWrapping;
    const floor = new Three.Mesh(
        new Three.PlaneGeometry(40, 40),
        new Three.MeshStandardMaterial({
            map: color,
            aoMap: ambient,
            normalMap: normal,
            roughnessMap: rough
        })
    )
    floor.rotation.x = -Math.PI * 0.5
    floor.position.y = 0
    floor.receiveShadow = true
    add(1, 1, 0, floor, 0);
}