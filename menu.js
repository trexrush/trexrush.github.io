import * as THREE from "https://threejs.org/build/three.module.js";

import { TrackballControls } from 'https://threejs.org/examples/jsm/controls/TrackballControls.js';
//import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

import { CSS3DRenderer, CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js';
//import { TWEEN } from 'https://threejs.org/examples/jsm/libs/tween.module.min.js';
//import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js';
//import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js';

//import { OBJLoader } from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js';
//import { EffectComposer } from 'https://threejs.org/examples/jsm/postprocessing/EffectComposer.js';
//import { RenderPass } from 'https://threejs.org/examples/jsm/postprocessing/RenderPass.js';
//import { ShaderPass } from 'https://threejs.org/examples/jsm/postprocessing/ShaderPass.js';
//import { OutlinePass } from 'https://threejs.org/examples/jsm/postprocessing/OutlinePass.js';
//import { FXAAShader } from 'https://threejs.org/examples/jsm/shaders/FXAAShader.js';

// for page transitions use window.history

let scene,
    sceneCSS, 
    camera,
    rendererWEBGL,
    rendererCSS3D,
    controls;
const cssScale = 50 // scaling factor for html/css elements


init();
// OBJECTS //

    // webgl //
const geometry = new THREE.BoxGeometry(2, 2, 2); // CONTROL CUBE
const material = new THREE.MeshBasicMaterial( { color: 0xbfc908 } ); //4d4d4d grey //bfc908 yellow
const cube = new THREE.Mesh( geometry, material );
//cube.position.y = 0;
scene.add(cube);

    // css3d //
    // wrap all of these in a createLabel class or smth 
let labelF = document.createElement('a') // content same, name is labelS
labelF.classList.add('html', 'label') // content same, name is labelS
labelF.innerHTML = 'PROJECTS' // content varies, name is labelS
labelF.href = 'projects.html'
const f = new CSS3DObject( labelF ) // name is s, content uses variable of name labelS
sceneCSS.add(f); // content uses variable of name s

let labelR = document.createElement('a')
labelR.classList.add('html', 'label')
labelR.innerHTML = 'Github'
labelR.href = 'https://github.com/trexrush'
const r = new CSS3DObject( labelR )
sceneCSS.add(r);

let labelU = document.createElement('a')
labelU.classList.add('html', 'label')
labelU.innerHTML = 'ABOUT ME'
labelU.href = 'about.html'
const u = new CSS3DObject( labelU )
sceneCSS.add(u);

let labelB = document.createElement('a')
labelB.classList.add('html', 'label')
labelB.innerHTML = 'LinkedIn'
labelB.href = 'https://www.linkedin.com/in/edmazuera/'
const b = new CSS3DObject( labelB )
sceneCSS.add(b);

let labelL = document.createElement('a')
labelL.classList.add('html', 'label')
labelL.innerHTML = 'Other Links'
const l = new CSS3DObject( labelL )
sceneCSS.add(l);

let labelD = document.createElement('a')
labelD.classList.add('html', 'label')
labelD.innerHTML = 'filler page'
const d = new CSS3DObject( labelD )
sceneCSS.add(d);

let name = document.createElement('div')
name.classList.add('html', 'title')
name.innerHTML = "Eduardo<br>Mazuera"
const nameobj = new CSS3DObject( name )
sceneCSS.add(nameobj)

// EVENTS //
let target = new THREE.Vector3();
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', function(e) {
    mouseX = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouseY = - ( e.clientY / window.innerHeight ) * 2 + 1;
});

window.addEventListener( 'resize', function(e) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    rendererWEBGL.setSize(window.innerWidth, window.innerHeight);
    rendererCSS3D.setSize(window.innerWidth, window.innerHeight);
});

animate();

// INIT and ANIMATION LOOP //

function init() {
    // core THREE.js //
    scene = new THREE.Scene();
    sceneCSS = new THREE.Scene();
    sceneCSS.scale.set(1/cssScale, 1/cssScale, 1/cssScale);
    scene.fog = new THREE.Fog( new THREE.Color( 0x1a1a1a), 0, 10)

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //camera.position.y = 5;
    camera.position.z = 6;

    rendererWEBGL = new THREE.WebGLRenderer( { alpha: true } );
    rendererWEBGL.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('webgl').appendChild( rendererWEBGL.domElement );

    rendererCSS3D = new CSS3DRenderer();
    rendererCSS3D.setSize( window.innerWidth, window.innerHeight );
    rendererCSS3D.domElement.style.position = 'absolute';
    document.getElementById('css3d').appendChild( rendererCSS3D.domElement );    
    
    controls = new TrackballControls( camera, rendererCSS3D.domElement );
    controls.noZoom = true;
    controls.panSpeed = 5;
    controls.rotateSpeed = 5;
    controls.dynamicDampingFactor = 0.1; // MAKE IT SO ONMOUSEDOWN THIS IS MORE, LIKE .1 or .15
    //controls.target.set( 0, 2, 0 );
}

function animate() { // animate loop
    requestAnimationFrame( animate );
    update();
    render();
};
animate();

function update() {
    affixlabeltext(f, cube, 'f')
    affixlabeltext(r, cube, 'r')
    affixlabeltext(u, cube, 'u')
    affixlabeltext(b, cube, 'b')
    affixlabeltext(l, cube, 'l')
    affixlabeltext(d, cube, 'd')
    
    nameobj.lookAt(camera.position)
    nameobj.quaternion.copy(camera.quaternion)

    controls.update()
}

function render() {
    rendererWEBGL.render( scene, camera )
    rendererCSS3D.render( sceneCSS, camera )
}

// FUNCTIONS //

function resetView() {
    camera.up = new THREE.Vector3(0,0,1)
    camera.lookAt(new THREE.Vector3(0,0,0))
}

function affixlabeltext(labelObj, blockObj, side, offsetunits) { // THIS IMPLIES NO CONTROLS CUZ IT SCREWS IT UP
    // get midpoint of front face
    let transformMatrix = blockObj.matrix;
    let z = blockObj.geometry.parameters.depth * 1.25;
    let y = blockObj.geometry.parameters.width * 1.25;
    let x = blockObj.geometry.parameters.height * 1.25;
    //let scaledBlockPos = new THREE.Vector3(blockObj.position.divideScalar(cssScale))
    
    switch(side) {
        case 'f':
            labelObj.position.set(0,0,(z) * cssScale)
            break;
        case 'b':
            labelObj.position.set(0,0,(z) * -cssScale)
            break;
        case 'u':
            labelObj.position.set(0,(y) * cssScale,0)
            break;
        case 'd':
            labelObj.position.set(0,(y) * -cssScale,0)
            break;
        case 'l':
            labelObj.position.set((x) * -cssScale,0,0)
            break;
        case 'r':
            labelObj.position.set((x) * cssScale,0,0)
            break;
    }
    //labelObj.position.addVectors(scaledBlockPos, labelObj.position)
    labelObj.lookAt(camera.position)

    labelObj.position.applyMatrix4(transformMatrix)
    labelObj.quaternion.copy(camera.quaternion)
}

function followMouse () {
    target.x += ( mouseX - target.x ) * .004; // FOLLOW MOUSE
    target.y += ( mouseY - target.y ) * .004;
    //target.z = camera.position.z / 10; // assuming the camera is located at ( 0, 0, z );
    camera.lookAt(target);
}