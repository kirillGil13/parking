import * as Three from "three";
import {colors} from "@/resources";

const utils = {
    createMaterial(color) {
        const meshMaterial = new Three.MeshBasicMaterial({color: 0x11ff00});
        return meshMaterial;
    },
    getRandomColor() {
        const colour = new Three.Color();
        colour.setHex(`0x${colors[Math.floor(Math.random() * colors.length)]}`);
        if (colour < 500) {
            colour.setHex(500);
        }
        return colour
    },
    componentToHex(c) {
        let hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    },
    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    },
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
export default utils;