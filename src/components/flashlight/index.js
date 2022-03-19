import * as Three from "three";
import {ref, toRaw} from "vue";
import {TexturesStore} from "@/store/textures";
import {createEdge} from "@/components/edge";

export const createFlashlight = () => {
    const flashLight = ref(null);
    flashLight.value = new Three.Group();
    const lamp = toRaw(TexturesStore.get('glass'));
    const metal = toRaw(TexturesStore.get('metal'))
    const mesh1 = new Three.Mesh(
        new Three.CylinderGeometry(0.15, 0.3, 7.5, 20),
        new Three.MeshStandardMaterial({color: '#ffffff',
            map: metal.color,
            aoMap: metal.ambient,
            normalMap: metal.normal,
            roughnessMap: metal.rough,
            metalnessMap: metal.metal,
            roughness: 1,
            metalness: 0.6,})
        );
    mesh1.geometry.setAttribute('uv2', new Three.Float32BufferAttribute(mesh1.geometry.attributes.uv.array, 2))
    mesh1.position.set(0, 3, 0)
    mesh1.castShadow = true;
    mesh1.receiveShadow = true;
    flashLight.value.add(mesh1);

    const mesh2 = new Three.Mesh(
        new Three.SphereGeometry(0.5, 12, 12),
        new Three.MeshStandardMaterial({color: '#c4c4bc',
            map: lamp.color,
            aoMap: lamp.ambient,
            normalMap: lamp.normal,
            roughnessMap: lamp.rough,
            roughness: 1,
            metalness: 0,
            transparent: true,
            opacity: 0.9,
            side: Three.DoubleSide})
        );
    mesh2.geometry.setAttribute('uv2', new Three.Float32BufferAttribute(mesh2.geometry.attributes.uv.array, 2))
    mesh2.position.set(0, 7.1, 0);
    mesh2.castShadow = true;
    mesh2.receiveShadow = true;
    flashLight.value.add(mesh2);


    let x = -1, z = -1;
    for (let i = 1; i <= 4; i++) {
        let width, depth;
        width = i <= 2 ? 1.3 : 0.3;
        depth = i >= 3 ? 1.9 : 0.3;
        switch (i) {
            case 1: z = -0.8; x = 0; break;
            case 2: z = 0.8; x = 0; break;
            case 3: z = 0; x = -0.8; break;
            case 4: z = 0; x = 0.8; break;
        }
        const cube = createEdge(width, depth, x, z);
        flashLight.value.add(cube);
    }

    flashLight.value.castShadow = true;
    flashLight.value.receiveShadow = true;
    return {
        flashLight
    }
}