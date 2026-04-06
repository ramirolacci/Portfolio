/// <reference types="vite/client" />

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "gsap" {
    const gsap: any;
    export default gsap;
}

declare module "gsap/ScrollTrigger" {
    export const ScrollTrigger: any;
}
