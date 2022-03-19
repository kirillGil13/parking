import * as Three from "three";

export const createMarkup = (addObject) => {
    const mesh = new Three.Mesh(
        new Three.PlaneGeometry(40, 0.3),
        new Three.MeshPhongMaterial({color: '#ffffff'})
    );
    mesh.rotation.x = -Math.PI * 0.5;
    mesh.receiveShadow = true
    addObject(0, 0.01, -2, mesh, 1);
    const mesh3 = new Three.Mesh(
        new Three.PlaneGeometry(40, 0.3),
        new Three.MeshPhongMaterial({color: '#ffffff'})
    );
    mesh3.rotation.x = -Math.PI * 0.5;
    mesh3.receiveShadow = true
    addObject(0, 0.01, 2, mesh3, 1);
    let zmesh = 0, xmesh = -23;
    for (let i = 1; i <= 16; i++) {
        const mesh1 = new Three.Mesh(
            new Three.PlaneGeometry(1, 0.3),
            new Three.MeshPhongMaterial({color: '#ffffff'})
        );
        mesh1.rotation.x = -Math.PI * 0.5;
        mesh1.receiveShadow = true
        if (i > 8) {
            if (i === 9) {
                xmesh = -23
            }
            zmesh = -6;
            xmesh += 5;
            addObject(xmesh, 0.01, zmesh, mesh1, 1);
        } else {
            zmesh = 6;
            xmesh += 5;
            addObject(xmesh, 0.01, zmesh, mesh1, 1);
        }
    }
    let zmesh1 = 0, xmesh1 = -21;
    for (let i = 1; i <= 10; i++) {
        const mesh2 = new Three.Mesh(
            new Three.PlaneGeometry(0.3, 7),
            new Three.MeshPhongMaterial({color: '#ffffff'})
        );
        mesh2.rotation.x = -Math.PI * 0.5;
        mesh2.receiveShadow = true
        if (i > 5) {
            if (i === 6) {
                xmesh1 = -21
            }
            zmesh1 = -15;
            xmesh1 += 7;
            addObject(xmesh1, 0.01, zmesh1, mesh2, 1);
        } else {
            zmesh1 = 15;
            xmesh1 += 7;
            addObject(xmesh1, 0.01, zmesh1, mesh2, 1);
        }
    }
}