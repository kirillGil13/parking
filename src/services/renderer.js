import * as Three from "three";

export const createRenderer = (renderer, container) => {
    renderer.value = new Three.WebGLRenderer({antialias: true})
    renderer.value.setSize(container.clientWidth, container.clientHeight);
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.value.shadowMap.enabled = true
    renderer.value.shadowMap.type = Three.PCFSoftShadowMap
}