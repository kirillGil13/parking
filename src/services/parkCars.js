import {createCar} from "@/components/car";
import utils from "@/utils/utils";

export const parkCars = (positions, cars, vmInstance, addObject, scene) => {
    const car = createCar();
    const xcar = positions.x[utils.getRandomInt(positions.x.length)]
    const zcar = positions.z[utils.getRandomInt(positions.z.length)]
    car.rotation.y = Math.sign(zcar) === 1 ? 3 * Math.PI * 0.5 : Math.PI * 0.5;
    cars.items.push({car: car, x: xcar, z: zcar});
    cars.length += 1;
    let iCar = 0;
    const gui = vmInstance.value.gui.addFolder('Park cars');
    gui.open()
    gui.add(cars, 'length', 1, 12, 1).name('cars').onChange(value => {
        if (value > cars.items.length) {
            let notFound = true;
            while(notFound) {
                const xcar = positions.x[utils.getRandomInt(positions.x.length)];
                const zcar = positions.z[utils.getRandomInt(positions.z.length)];
                if (value === cars.items.length) break;
                if (!cars.items.some((el) => el.x === xcar && el.z === zcar)) {
                    const car = createCar();
                    car.name = `car${iCar}`;
                    iCar++;
                    car.rotation.y = Math.sign(zcar) === 1 ? 3 * Math.PI * 0.5 : Math.PI * 0.5;
                    cars.items.push({car: car, x: xcar, z: zcar});
                    addObject(xcar,-10.9,zcar,car, 1);
                    break;
                }
            }
        } else if (value < cars.items.length) {
            const item = cars.items.pop();
            scene.value.remove(scene.value.getObjectByName(`${item.car.name}`))
        }
    });
    addObject(xcar,-10.9,zcar,car, 1);
}