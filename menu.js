import * as THREE from "https://threejs.org/build/three.module.js"

import { TrackballControls } from 'https://threejs.org/examples/jsm/controls/TrackballControls.js'
//import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js'

import { CSS3DRenderer, CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js'
//import { TWEEN } from 'https://threejs.org/examples/jsm/libs/tween.module.min.js'
//import Stats from 'https://threejs.org/examples/jsm/libs/stats.module.js'
//import { GUI } from 'https://threejs.org/examples/jsm/libs/dat.gui.module.js'

//import { OBJLoader } from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js'
//import { EffectComposer } from 'https://threejs.org/examples/jsm/postprocessing/EffectComposer.js'
//import { RenderPass } from 'https://threejs.org/examples/jsm/postprocessing/RenderPass.js'
//import { ShaderPass } from 'https://threejs.org/examples/jsm/postprocessing/ShaderPass.js'
//import { OutlinePass } from 'https://threejs.org/examples/jsm/postprocessing/OutlinePass.js'
//import { FXAAShader } from 'https://threejs.org/examples/jsm/shaders/FXAAShader.js'

// for page transitions use window.history

let scene, sceneCSS, camera, rendererWEBGL, rendererCSS3D

let slowingFactor = .25

let target = new THREE.Vector3()
let mouseX = 0
let mouseY = 0
let mouseXinit = -2
let mouseYinit = -2
let rotX = 0
let rotY = 0
let rotXinit = 0
let rotYinit = 0
    // controls
const cssScale = 50 // scaling factor for html/css elements

init()

// OBJECTS //

    // webgl //
const geometry = new THREE.BoxGeometry(2, 2, 2) // CONTROL CUBE
const material = new THREE.MeshBasicMaterial( { color: 0xbfc908 } ) //4d4d4d grey //bfc908 yellow
const cube = new THREE.Mesh( geometry, material )
cube.rotation.y = Math.PI/4
cube.rotation.x = Math.PI/4.5
scene.add(cube)

    // css3d //
    // wrap all of these in a createLabel class or smth 
let labelF = document.createElement('a') // content same, name is labelS
labelF.classList.add('html', 'label') // content same, name is labelS
labelF.innerHTML = 'PROJECTS' // content varies, name is labelS
labelF.href = 'projects.html'
const f = new CSS3DObject( labelF ) // name is s, content uses variable of name labelS
//sceneCSS.add(f) // content uses variable of name s

let labelR = document.createElement('a')
labelR.classList.add('html', 'label')
labelR.innerHTML = 'Github'
labelR.href = 'https://github.com/trexrush'
const r = new CSS3DObject( labelR )

let labelU = document.createElement('a')
labelU.classList.add('html', 'label')
labelU.innerHTML = 'ABOUT ME'
labelU.href = 'about.html'
const u = new CSS3DObject( labelU )

let labelB = document.createElement('a')
labelB.classList.add('html', 'label')
labelB.innerHTML = 'LinkedIn'
labelB.href = 'https://www.linkedin.com/in/edmazuera/'
const b = new CSS3DObject( labelB )

let labelL = document.createElement('a')
labelL.classList.add('html', 'label')
labelL.innerHTML = 'Other Links'
const l = new CSS3DObject( labelL )

let labelD = document.createElement('a')
labelD.classList.add('html', 'label')
labelD.innerHTML = 'for debug rn'
const d = new CSS3DObject( labelD )

let name = document.createElement('div')
name.classList.add('html', 'title')
name.innerHTML = "Eduardo<br>Mazuera"
const nameobj = new CSS3DObject( name )
sceneCSS.add(nameobj)

// GROUPS //
let labels = new THREE.Group()
labels.add( f )
labels.add( r )
labels.add( u )
labels.add( b )
labels.add( l )
labels.add( d )
sceneCSS.add(labels)

// let menu = new THREE.Group()
// menu.add( labels )
// menu.add( cube );

animate()

// INIT and ANIMATION LOOP //

function init() {
    // core THREE.js //
    scene = new THREE.Scene()
    sceneCSS = new THREE.Scene()
    sceneCSS.scale.set(1/cssScale, 1/cssScale, 1/cssScale)
    scene.fog = new THREE.Fog( new THREE.Color( 0x1a1a1a), 0, 10)

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    // camera.position.y = 5
    camera.position.z = 6

    rendererWEBGL = new THREE.WebGLRenderer( { alpha: true } )
    rendererWEBGL.setSize( window.innerWidth, window.innerHeight )
    document.getElementById('webgl').appendChild( rendererWEBGL.domElement )

    rendererCSS3D = new CSS3DRenderer()
    rendererCSS3D.setSize( window.innerWidth, window.innerHeight )
    rendererCSS3D.domElement.style.position = 'absolute'
    document.getElementById('css3d').appendChild( rendererCSS3D.domElement )   
    
    // controls = new TrackballControls( camera, rendererCSS3D.domElement )
    // controls.noZoom = true
    // controls.panSpeed = 5
    // controls.rotateSpeed = 5
    // controls.dynamicDampingFactor = 0.1 // MAKE IT SO ONMOUSEDOWN THIS IS MORE, LIKE .1 or .15
    // // controls.target.set( 0, 2, 0 )
}

function animate() { // animate loop
    requestAnimationFrame( animate )
    update()
    render()
}
animate()

function update() {
    affixlabeltext(f, cube, 'f')
    affixlabeltext(r, cube, 'r')
    affixlabeltext(u, cube, 'u')
    affixlabeltext(b, cube, 'b')
    affixlabeltext(l, cube, 'l')
    affixlabeltext(d, cube, 'd')
    
    nameobj.lookAt(camera.position)
    nameobj.quaternion.copy(camera.quaternion)

    rotateAroundWorldAxis(cube, new THREE.Vector3(0, 1, 0), rotX);
    rotateAroundWorldAxis(cube, new THREE.Vector3(1, 0, 0), rotY);

    rotY = rotY * (1 - slowingFactor);
    rotX = rotX * (1 - slowingFactor);

    labels.lookAt(camera.position)
    // controls.update()
}

function render() {
    rendererWEBGL.render( scene, camera )
    rendererCSS3D.render( sceneCSS, camera )
}

// EVENTS //

document.addEventListener('mousedown', function(e) {

    e.preventDefault();
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
    document.addEventListener('mouseOut', mouseOut)

    mouseXinit = ( e.clientX / window.innerWidth ) * 2 - 1
    mouseYinit = - ( e.clientY / window.innerHeight ) * 2 + 1

    rotXinit = rotX
    rotYinit = rotY

    console.log("X = " + mouseXinit + "\nY = " + mouseYinit)    
})

function mouseMove(e) {
    if (mouseXinit != -2) {  // if mouse button is pressed (indicated by init not being -2),
                        // execute the following based on the position of the mouse
        mouseX = ( e.clientX / window.innerWidth ) * 2 - 1
        mouseY = - ( e.clientY / window.innerHeight ) * 2 + 1

        rotX = ( mouseX - mouseXinit ) * .025
        rotY = -( mouseY - mouseYinit ) * .025

        let testtext = "X = " + (mouseX - mouseXinit).toFixed(3) + "\nY = " + (mouseY - mouseYinit).toFixed(3)
        labelD.innerHTML = testtext

        // move to update tbh
        // labels.rotation.y = (mouseX - mouseXinit) * 20
        // labels.rotation.x = -(mouseY - mouseYinit) * 20
        // cube.rotation.y = (mouseX - mouseXinit) * 20
        // cube.rotation.x = -(mouseY - mouseYinit) * 20
    }
}

function mouseUp(e) {
    mouseXinit = -2
    mouseYinit = -2
    console.log("X = " + mouseXinit + "\nY = " + mouseYinit)

    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
    document.removeEventListener('mouseOut', mouseOut)
}

function mouseOut(e) {
    console.log("left")

    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
    document.removeEventListener('mouseOut', mouseOut)
}

window.addEventListener( 'resize', function(e) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    rendererWEBGL.setSize(window.innerWidth, window.innerHeight)
    rendererCSS3D.setSize(window.innerWidth, window.innerHeight)
})

// FUNCTIONS //

function resetView() {
    camera.up = new THREE.Vector3(0,0,1)
    camera.lookAt(new THREE.Vector3(0,0,0))
}

function rotateAroundWorldAxis( object, axis, radians ) {

    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.makeRotationAxis( axis.normalize(), radians );
    rotationMatrix.multiply( object.matrix );                       // pre-multiply
    object.matrix = rotationMatrix;
    object.rotation.setFromRotationMatrix( object.matrix );
}

function affixlabeltext(labelObj, blockObj, side, offsetunits) { // THIS IMPLIES NO CONTROLS CUZ IT SCREWS IT UP
    // get midpoint of front face
    let transformMatrix = blockObj.matrix
    let z = blockObj.geometry.parameters.depth * 1.25
    let y = blockObj.geometry.parameters.width * 1.25
    let x = blockObj.geometry.parameters.height * 1.25
    //let scaledBlockPos = new THREE.Vector3(blockObj.position.divideScalar(cssScale))
    
    switch(side) {
        case 'f':
            labelObj.position.set(0,0,(z) * cssScale)
            break
        case 'b':
            labelObj.position.set(0,0,(z) * -cssScale)
            break
        case 'u':
            labelObj.position.set(0,(y) * cssScale,0)
            break
        case 'd':
            labelObj.position.set(0,(y) * -cssScale,0)
            break
        case 'l':
            labelObj.position.set((x) * -cssScale,0,0)
            break
        case 'r':
            labelObj.position.set((x) * cssScale,0,0)
            break
    }
    //labelObj.position.addVectors(scaledBlockPos, labelObj.position)
    //labelObj.lookAt(camera.position) // this is now in the mousemove event

    labelObj.position.applyMatrix4(transformMatrix)
    labelObj.quaternion.copy(camera.quaternion)
}

function followMouse () {
    target.x += ( mouseX - target.x ) * .004 // FOLLOW MOUSE
    target.y += ( mouseY - target.y ) * .004
    //target.z = camera.position.z / 10 // assuming the camera is located at ( 0, 0, z )
    camera.lookAt(target)
}