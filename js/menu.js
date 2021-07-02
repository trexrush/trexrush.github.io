import * as THREE from "https://threejs.org/build/three.module.js"

import { CSS3DRenderer, CSS3DObject } from 'https://threejs.org/examples/jsm/renderers/CSS3DRenderer.js'

//import { OBJLoader } from 'https://threejs.org/examples/jsm/loaders/OBJLoader.js'
//import { EffectComposer } from 'https://threejs.org/examples/jsm/postprocessing/EffectComposer.js'
//import { RenderPass } from 'https://threejs.org/examples/jsm/postprocessing/RenderPass.js'
//import { ShaderPass } from 'https://threejs.org/examples/jsm/postprocessing/ShaderPass.js'
//import { OutlinePass } from 'https://threejs.org/examples/jsm/postprocessing/OutlinePass.js'
//import { FXAAShader } from 'https://threejs.org/examples/jsm/shaders/FXAAShader.js'

// for page transitions use window.history

let scene, sceneCSS, camera, rendererWEBGL, rendererCSS3D

let cube, cubegeometry, basicmaterial
let labelF, labelR, labelU, labelB, labelL, labelD, name, labels
let f, r, u, b, l, d, nameobj

let pointerX, pointerY
let pointerXinit, pointerYinit
let rotX = 0
let rotY = 0
let rotXinit = 0
let rotYinit = 0
let slowingFactor = .03

init()
animate()

// INIT and ANIMATION LOOP //

function init() {
    // core THREE.js //

    scene = new THREE.Scene()
    sceneCSS = new THREE.Scene()
    scene.fog = new THREE.Fog( new THREE.Color( 0x1a1a1a), 0, 1000)

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    camera.position.z = 600

    rendererWEBGL = new THREE.WebGLRenderer( { alpha: true } )
    rendererWEBGL.setSize( window.innerWidth, window.innerHeight )
    document.getElementById('webgl').appendChild( rendererWEBGL.domElement )

    rendererCSS3D = new CSS3DRenderer()
    rendererCSS3D.setSize( window.innerWidth, window.innerHeight )
    rendererCSS3D.domElement.style.position = 'absolute'
    document.getElementById('css3d').appendChild( rendererCSS3D.domElement )


    // OBJECTS //

    // webgl //
    cubegeometry = new THREE.BoxGeometry(220, 220, 220) // CONTROL CUBE
    basicmaterial = new THREE.MeshBasicMaterial( { color: 0xbfc908 } ) //4d4d4d grey //bfc908 yellow
    cube = new THREE.Mesh( cubegeometry, basicmaterial )

    cube.rotation.y = Math.PI/4
    cube.rotation.x = Math.PI/4.5
    scene.add(cube)

    // css3d //

    // wrap all of these in a createLabel class or smth or use react
    labelF = document.createElement('a') // content same, name is labelS
    labelF.classList.add('html', 'label') // content same, name is labelS
    labelF.innerHTML = 'PROJECTS' // content varies, name is labelS
    labelF.href = 'projects.html'
    f = new CSS3DObject( labelF ) // name is s, content uses variable of name labelS
    //sceneCSS.add(f) // content uses variable of name s

    labelR = document.createElement('a')
    labelR.classList.add('html', 'label')
    labelR.innerHTML = 'GITHUB'
    labelR.href = 'https://github.com/trexrush'
    r = new CSS3DObject( labelR )

    labelU = document.createElement('a')
    labelU.classList.add('html', 'label')
    labelU.innerHTML = 'ABOUT ME'
    labelU.href = 'about.html'
    u = new CSS3DObject( labelU )

    labelB = document.createElement('a')
    labelB.classList.add('html', 'label')
    labelB.innerHTML = 'LINKEDIN'
    labelB.href = 'https://www.linkedin.com/in/edmazuera/'
    b = new CSS3DObject( labelB )

    labelL = document.createElement('a')
    labelL.classList.add('html', 'label')
    labelL.innerHTML = 'soon (links)'
    l = new CSS3DObject( labelL )

    labelD = document.createElement('a')
    labelD.classList.add('html', 'label')
    labelD.innerHTML = 'for debug rn'
    d = new CSS3DObject( labelD )

    name = document.createElement('div')
    name.classList.add('html', 'title')
    name.innerHTML = "Eduardo<br>Mazuera"
    nameobj = new CSS3DObject( name )
    sceneCSS.add(nameobj)

    // GROUPS //
    labels = new THREE.Group()
    labels.add( f )
    labels.add( r )
    labels.add( u )
    labels.add( b )
    labels.add( l )
    labels.add( d )
    sceneCSS.add(labels)

    document.addEventListener('pointerdown', pointerDown)
    window.addEventListener( 'resize', resize)
    setSceneScale()
}

function animate() { // animate loop
    requestAnimationFrame( animate )
    render()
}

function render() {
    let distFromCube = 1.4
    affixlabeltext(f, cube, 'f', distFromCube)
    affixlabeltext(r, cube, 'r', distFromCube)
    affixlabeltext(u, cube, 'u', distFromCube)
    affixlabeltext(b, cube, 'b', distFromCube)
    affixlabeltext(l, cube, 'l', distFromCube)
    affixlabeltext(d, cube, 'd', distFromCube)
    
    nameobj.lookAt(camera.position)
    nameobj.quaternion.copy(camera.quaternion)

    rotateAroundWorldAxis(cube, new THREE.Vector3(0, 1, 0), rotX);
    rotateAroundWorldAxis(cube, new THREE.Vector3(1, 0, 0), rotY);

    rotY = rotY * (1 - slowingFactor);
    rotX = rotX * (1 - slowingFactor);

    labels.lookAt(camera.position)

    //let testtext = "X = " + (pointerX - pointerXinit).toFixed(3) + "\nY = " + (pointerY - pointerYinit).toFixed(3)
    //labelD.innerHTML = testtext
    shadeLabels(f, labelF)
    shadeLabels(r, labelR)
    shadeLabels(u, labelU)
    shadeLabels(b, labelB)
    shadeLabels(l, labelL)
    shadeLabels(d, labelD)

    rendererWEBGL.render( scene, camera )
    rendererCSS3D.render( sceneCSS, camera )
}

// EVENTS //

function pointerDown(e) {

    e.preventDefault();
    document.addEventListener('pointermove', pointerMove)
    document.addEventListener('pointerup', pointerUp)
    document.addEventListener('pointerOut', pointerOut)

    pointerXinit = ( e.clientX / window.innerWidth ) * 2 - 1
    pointerYinit = - ( e.clientY / window.innerHeight ) * 2 + 1

    rotXinit = rotX
    rotYinit = rotY

    console.log("X = " + pointerXinit + "\nY = " + pointerYinit)    
}

function pointerMove(e) {
    pointerX = ( e.clientX / window.innerWidth ) * 2 - 1
    pointerY = - ( e.clientY / window.innerHeight ) * 2 + 1

    rotX = ( pointerX - pointerXinit ) * .03
    rotY = -( pointerY - pointerYinit ) * .03
}

function pointerUp(e) {
    console.log("X = " + pointerXinit + "\nY = " + pointerYinit)

    document.removeEventListener('pointermove', pointerMove)
    document.removeEventListener('pointerup', pointerUp)
    document.removeEventListener('pointerOut', pointerOut)
}

function pointerOut(e) {
    console.log("left")

    document.removeEventListener('pointermove', pointerMove)
    document.removeEventListener('pointerup', pointerUp)
    document.removeEventListener('pointerOut', pointerOut)
}

function resize(e) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    rendererWEBGL.setSize(window.innerWidth, window.innerHeight)
    rendererCSS3D.setSize(window.innerWidth, window.innerHeight)

    setSceneScale()
}

// FUNCTIONS //

function rotateAroundWorldAxis( object, axis, radians ) {

    var rotationMatrix = new THREE.Matrix4();

    rotationMatrix.makeRotationAxis( axis.normalize(), radians );
    rotationMatrix.multiply( object.matrix );
    object.matrix = rotationMatrix;
    object.rotation.setFromRotationMatrix( object.matrix );
}

function affixlabeltext(labelObj, blockObj, side, distFromObj) {
    // get midpoint of front face
    let transformMatrix = blockObj.matrix
    let z = blockObj.geometry.parameters.depth * distFromObj
    let y = blockObj.geometry.parameters.width * distFromObj
    let x = blockObj.geometry.parameters.height * distFromObj
    
    switch(side) {
        case 'f':
            labelObj.position.set(0,0,z)
            break
        case 'b':
            labelObj.position.set(0,0,-z)
            break
        case 'u':
            labelObj.position.set(0,y,0)
            break
        case 'd':
            labelObj.position.set(0,-y,0)
            break
        case 'l':
            labelObj.position.set(-x,0,0)
            break
        case 'r':
            labelObj.position.set(x,0,0)
            break
    }

    labelObj.position.applyMatrix4(transformMatrix)
    labelObj.quaternion.copy(camera.quaternion)
}

function shadeLabels(labelObj, domElement) {
    let dist = camera.position.distanceTo(labelObj.position)

    let far = 800
    let near = 300
    let targetOpacity = .6

    if (dist < near) {
        domElement.style.opacity = targetOpacity
    }
    else if (dist > far) {
        domElement.style.opacity = 0
        domElement.classList.add('hiddenlink')
    }
    else {
        domElement.style.opacity = targetOpacity - (((dist - near) / (far - near)) * targetOpacity)
        domElement.classList.remove('hiddenlink')
    }
}

function setSceneScale() {
    if (window.innerWidth/window.innerHeight < 1) { // if screen taller than wide
        console.log('gotta resize')
        let scalefactor = Math.abs(window.innerWidth/window.innerHeight)
        console.log(scalefactor)
        sceneCSS.scale.set(scalefactor,scalefactor,scalefactor)
        scene.scale.set(scalefactor,scalefactor,scalefactor)
    }
    //1400px max
}