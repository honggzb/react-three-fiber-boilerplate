## React + ThreeJS + react-three-fiber + @react-three/drei

### how to use

1. `npm install`
2. `npm run start`
3. Open http://localhost:3000 to view it in the browser

### pages

|page| effect|other libs|
|---|---|---|
|Home|rotating stars|`Points` in `@react-three/drei`|
|Basic|classical demo in official react-three-fiber||
|RenderTexture|texture animation<br>classical demo in official react-three-fiber|`suspend-react`<br>`@pmndrs/assets`|
|Shoe|change shoe's color by using colorPicker|`react-colorful`<br>`valtio`|
|Watch|bounce animation + label| `PresentationControls` in `@react-three/drei`|
|Iphone|change iphone size manually + label|`react-dat-gui`|
|SkyboxDemo|skybox with relection|`cubeCamera` in `three`|
|Airplane Guide|`lamina` <br>`ScrollControls`<br>`cameraGroup`|<- environment effect<br><- following curve line on scroll events<br><- following animation|
|Room|change scene by click text link||

### libraries

- [react-three-fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction): React-three-fiber is a React renderer for three.js
  - [html label](https://onion2k.github.io/r3f-by-example/examples/other/html-labels/)
- [@react-three/drei](https://github.com/pmndrs/drei): A growing collection of useful helpers and fully functional, ready-made abstractions for @react-three/fiber
- https://docs.pmnd.rs/
- [react-colorful](https://omgovich.github.io/react-colorful/): --> A tiny color picker component for React and Preact apps
  - Angular version [angular-colorful](https://github.com/ngx-eco/angular-colorful)
- [valtio](https://valtio.pmnd.rs/):  --> Proxy state made simple
- [react-dat-gui](https://classic.yarnpkg.com/en/package/react-dat-gui): updating and interacting with objects in real time
- Convert GLTF to React Three Fiber  -->  https://gltf.pmnd.rs/

