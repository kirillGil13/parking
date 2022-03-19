import * as Three from "three";
import {toRaw} from "vue";
import {TexturesStore} from "@/store/textures";

export const createTree = () => {
    let tree = new Three.Group();
    const treeTexture = toRaw(TexturesStore.get('tree'));
    const leavesTexture = toRaw(TexturesStore.get('leaves'));
    let trunk = new Three.Mesh(
        new Three.CylinderGeometry(0.5, 0.5, 5, 18),
        new Three.MeshStandardMaterial({
            map: treeTexture.color,
            aoMap: treeTexture.ambient,
            normalMap: treeTexture.normal,
            roughnessMap: treeTexture.rough
        })
    );
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    trunk.position.set(0,1.5, 0)
    let leaves = new Three.Mesh(
        new Three.DodecahedronGeometry(2, 2),
        new Three.MeshStandardMaterial({
                color: '#2e8717',
                flatShading: Three.FlatShading,
                map: leavesTexture.color,
                aoMap: leavesTexture.ambient,
                normalMap: leavesTexture.normal,
                roughnessMap: leavesTexture.rough,
                metalness: 0,
                roughness: 0,
            })
    )
    leaves.castShadow = true;
    leaves.receiveShadow = true;
    leaves.position.set(0, 5, 0)
    tree.add(trunk).add(leaves);
    return tree;
}