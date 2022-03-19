import * as Three from "three";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry.js";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader.js";
import utils from "@/utils/utils";
import {gsap} from "gsap";


export const createTitle = async (addObject) => {
    const loader = new FontLoader();
    function loadFont(url) {
        return new Promise((resolve, reject) => {
            loader.load(url, resolve, undefined, reject);
        });
    }
    await (async function doit() {
        const font = await loadFont('fonts/helvetiker.json');  /* threejs.org: url */
        const geometry = new TextGeometry('Car parking', {
            font: font,
            size: 1,
            height: .3,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.1,
            bevelSize: .02,
            bevelSegments: 20,
        });
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();
        const mesh = new Three.Mesh(geometry, new Three.MeshNormalMaterial({
            flatShading: Three.FlatShading,
            transparent: true,
            opacity: 0.9
        }));
        mesh.rotation.y = 14.15;
        const tl = gsap.timeline({repeat: 10, repeatDelay: 1, yoyo: true});
        addObject(20, -5, 1, mesh, -1);
        tl.to(mesh.position, {z: 4, duration: 2});
        tl.to(mesh.position, {z: -7, duration: 2});
    })();
}