import {toRaw} from "vue";
import {TexturesStore} from "@/store/textures";
import {BoxGeometry, Group, Mesh, MeshStandardMaterial} from "three";
import * as Three from "three";
import {createEdge} from "@/components/edge";
import {createTree} from "@/components/tree";

export const createCenter = (add) => {
    const group = new Group();
    const grass = toRaw(TexturesStore.get('grass'));
    grass.color.repeat.set(20,2)
    grass.ambient.repeat.set(20,2)
    grass.normal.repeat.set(20,2)
    grass.rough.repeat.set(20,2)

    grass.color.wrapS = Three.RepeatWrapping
    grass.ambient.wrapS = Three.RepeatWrapping
    grass.normal.wrapS = Three.RepeatWrapping
    grass.rough.wrapS = Three.RepeatWrapping

    grass.color.wrapT = Three.RepeatWrapping
    grass.ambient.wrapT = Three.RepeatWrapping
    grass.normal.wrapT = Three.RepeatWrapping
    grass.rough.wrapT = Three.RepeatWrapping;
    const grassMesh = new Mesh(
        new BoxGeometry(40, 2.3, 0.2),
        new MeshStandardMaterial({
            map: grass.color,
            aoMap: grass.ambient,
            normalMap: grass.normal,
            roughnessMap: grass.rough
        })
    )
    let xEdge = -19, zEdge = 0;
    for (let i = 1; i <= 40; i++) {
        const edge = createEdge(1.98, 0.3, 0,0);
        edge.receiveShadow = true
        if (i > 20) {
            if (i === 21) {
                xEdge = -19
            }
            zEdge = -1.2;
            add(xEdge, 0.15, zEdge, edge, 1);
            xEdge += 2;
        } else {
            zEdge = 1.2;
            add(xEdge, 0.15, zEdge, edge, 1);
            xEdge += 2;
        }
    }
    let xtree = -11;
    for (let i = 0; i < 4; i++) {
        const tree = createTree();
        add(xtree,1,0,tree, 1)
        xtree += 8
    }
    grassMesh.rotation.x = -Math.PI * 0.5;
    grassMesh.receiveShadow = true
    group.add(grassMesh);
    add(0, 0.08, 0, grassMesh, 1);
}