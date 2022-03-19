import * as Three from "three";
import utils from "@/utils/utils";
import {toRaw} from "vue";
import {TexturesStore} from "@/store/textures";

export const createCar = () => {
    const rubber = toRaw(TexturesStore.get('rubber'));
    const carText = toRaw(TexturesStore.get('car'))
    function createWheels() {
        const geometry = new Three.CylinderBufferGeometry(0.6, 0.6, 0.3, 15);
        const material = new Three.MeshStandardMaterial({ color: 0xffffff,map: rubber.color,
            aoMap: rubber.ambient,
            normalMap: rubber.normal,
            roughnessMap: rubber.rough, });
        const wheel = new Three.Mesh(geometry, material);
        wheel.castShadow = true;
        wheel.receiveShadow = true;
        wheel.rotation.x = -Math.PI * 0.5
        return wheel;
    }
    function getCarFrontTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 32;
        const context = canvas.getContext("2d");

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 64, 32);

        context.fillStyle = "#666666";
        context.fillRect(8, 8, 48, 24);

        return new Three.CanvasTexture(canvas);
    }
    function getCarSideTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 32;
        const context = canvas.getContext("2d");

        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, 128, 32);

        context.fillStyle = "#666666";
        context.fillRect(10, 8, 38, 24);
        context.fillRect(58, 8, 60, 24);

        return new Three.CanvasTexture(canvas);
    }
    const car = new Three.Group();

    const backWheels = [], frontWheels = [];
    for (let i = 0; i < 4; i++) {
        if (i < 2) {
            backWheels.push(createWheels());
        } else frontWheels.push(createWheels());
    }
    let z = 1.1;
    backWheels.forEach((backWheel) => {
        backWheel.position.set(-1.2, 11.5, z);
        car.add(backWheel);
        z *= -1
    })

    frontWheels.forEach((frontWheel) => {
        frontWheel.position.set(1.2, 11.5, z);
        car.add(frontWheel);
        z *= -1
    })

    const main = new Three.Mesh(
        new Three.BoxBufferGeometry(4, 1, 2),
        new Three.MeshStandardMaterial({ color: utils.getRandomColor(), map: carText.color,
            aoMap: carText.ambient,
            normalMap: carText.normal,
            roughnessMap: carText.rough,
            metalnessMap: carText.metal,
            roughness: 1,
            metalness: 0.6 })
    );
    main.castShadow = true;
    main.receiveShadow = true;
    main.position.y = 12;
    car.add(main);

    const carFrontTexture = getCarFrontTexture();

    const carBackTexture = getCarFrontTexture();

    const carRightSideTexture = getCarSideTexture();

    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.center = new Three.Vector2(0.5, 0.5);
    carLeftSideTexture.rotation = Math.PI;
    carLeftSideTexture.flipY = false;

    const cabin = new Three.Mesh(new Three.BoxBufferGeometry(2.2, 0.8, 1.6), [
        new Three.MeshLambertMaterial({ map: carFrontTexture }),
        new Three.MeshLambertMaterial({ map: carBackTexture }),
        new Three.MeshLambertMaterial({ color: utils.getRandomColor() }), // top
        new Three.MeshLambertMaterial({ color: utils.getRandomColor() }), // bottom
        new Three.MeshLambertMaterial({ map: carRightSideTexture }),
        new Three.MeshLambertMaterial({ map: carLeftSideTexture })
    ]);
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    cabin.position.x = -0.4;
    cabin.position.y = 12.8;
    car.add(cabin);

    return car;
}