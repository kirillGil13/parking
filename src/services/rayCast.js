import * as Three from "three";
import {ref} from "vue";

export const createRayCast = (camera, scene, renderer, container) => {
    const raycaster = ref(null);
    raycaster.value = new Three.Raycaster();
    const mouse = { x : 0, y : 0 };
    function raycast ( e ) {
        mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        raycaster.value.setFromCamera( mouse, camera.value );
        let intersects = raycaster.value.intersectObjects( scene.value.children );
        for ( let i = 0; i < intersects.length; i++ ) {
            console.log( intersects[ i ] );
        }
    }

    window.addEventListener('click', raycast, false)
    return {
        raycaster
    }
}