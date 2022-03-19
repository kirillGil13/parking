import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from "vuex-module-decorators";
import store from "@/store/index";
import * as Three from "three";

@Module({
    namespaced: true,
    name: 'textures',
    store,
    dynamic: true
})
class TexturesModule extends VuexModule {
    textures = null;

    get get() {
     return (str) => {
         const obj = this.textures[str];
         return obj;
     }
    }

    @MutationAction({ mutate: ['textures'] })
    async loadTextures() {
        const textureLoader = new Three.TextureLoader();
        const roadTexture = {
            color: textureLoader.load('/textures/floor/color.jpg'),
            ambient: textureLoader.load('/textures/floor/ambient.jpg'),
            normal: textureLoader.load('/textures/floor/normal.jpg'),
            rough: textureLoader.load('/textures/floor/rough.jpg')
        }
        const edge = {
            color: textureLoader.load('/textures/edge/color.jpg'),
            ambient: textureLoader.load('/textures/edge/ambient.jpg'),
            normal: textureLoader.load('/textures/edge/normal.jpg'),
            rough: textureLoader.load('/textures/edge/rough.jpg')
        }
        const grass = {
            color: textureLoader.load('/textures/grass/color.jpg'),
            ambient: textureLoader.load('/textures/grass/ambient.jpg'),
            normal: textureLoader.load('/textures/grass/normal.jpg'),
            rough: textureLoader.load('/textures/grass/rough.jpg')
        }
        const glass = {
            color: textureLoader.load('/textures/glass/color.jpg'),
            ambient: textureLoader.load('/textures/glass/ambient.jpg'),
            normal: textureLoader.load('/textures/glass/normal.jpg'),
            rough: textureLoader.load('/textures/glass/rough.jpg')
        }
        const leaves = {
            color: textureLoader.load('/textures/leaves/color.jpg'),
            ambient: textureLoader.load('/textures/leaves/ambient.jpg'),
            normal: textureLoader.load('/textures/leaves/normal.jpg'),
            rough: textureLoader.load('/textures/leaves/rough.jpg')
        }
        const metal = {
            color: textureLoader.load('/textures/metal/color.jpg'),
            ambient: textureLoader.load('/textures/metal/ambient.jpg'),
            normal: textureLoader.load('/textures/metal/normal.jpg'),
            rough: textureLoader.load('/textures/metal/rough.jpg'),
            metal: textureLoader.load('/textures/metal/metallic.jpg'),
        }
        const tree = {
            color: textureLoader.load('/textures/tree/color.jpg'),
            ambient: textureLoader.load('/textures/tree/ambient.jpg'),
            normal: textureLoader.load('/textures/tree/normal.jpg'),
            rough: textureLoader.load('/textures/tree/rough.jpg')
        }
        const rubber = {
            color: textureLoader.load('/textures/rubber/color.jpg'),
            ambient: textureLoader.load('/textures/rubber/ambient.jpg'),
            normal: textureLoader.load('/textures/rubber/normal.jpg'),
            rough: textureLoader.load('/textures/rubber/rough.jpg')
        }
        const car = {
            color: textureLoader.load('/textures/car/color.jpg'),
            ambient: textureLoader.load('/textures/car/ambient.jpg'),
            normal: textureLoader.load('/textures/car/normal.jpg'),
            rough: textureLoader.load('/textures/car/rough.jpg'),
            metal: textureLoader.load('/textures/car/metal.jpg'),
        }
        const textures = {
            road: roadTexture,
            edge: edge,
            grass: grass,
            glass: glass,
            leaves: leaves,
            metal: metal,
            tree: tree,
            rubber: rubber,
            car: car
        }
        return {textures}
    }

}

export const TexturesStore = getModule(TexturesModule);