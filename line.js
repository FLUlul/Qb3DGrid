/* const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 50 );
camera.lookAt( 0, 0, 0 );

const scene = new THREE.Scene();
const material = new THREE.LineBasicMaterial( { color: 'white' } );

const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
points.push( new THREE.Vector3( 20, 30, 6 ) );

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints( points );

const line = new THREE.Line( geometry, material );

scene.add( line );
renderer.render( scene, camera ); */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let json = [];
// fetch("./data.json")
// .then(response => {
//    return response.json();
// })
// .then(jsondata => json.push(jsondata));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// let lastPoint = {};
// async function fetchMoviesJSON() {
//     const response = await fetch('./data.json');
//     const data = await response.json();
//     return data;
// }
// fetchMoviesJSON().then(data => {
//     data; // fetched datas

//     lastPoint = data.slice(-1)[0];
//     console.log(lastPoint.x, lastPoint.y, lastPoint.z);

//     var scene, camera, renderer, points, line, amountToAdd = 0.01;

//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);
//     camera.position.z = 20;

//     points = [];
//     points.push(lastPoint.x +2, lastPoint.y+10, lastPoint.z+2)
//     points.push(lastPoint.x +5, lastPoint.y+5, lastPoint.z+5)
//     points.push(lastPoint.x, lastPoint.y, lastPoint.z)

//     line = new MeshLine();
//     line.setPoints(points.flat());

//     var material = new MeshLineMaterial({ color: new THREE.Color(0xffff00), lineWidth: .5});
//     material.transparent = false;
//     mesh = new THREE.Mesh(line, material);

//     scene.add(mesh);
//     renderer.render(scene, camera);
//     // animate();


//     // function animate() {
//     // line.setPoints(points.flat());

//     // renderer.render(scene, camera);
//     // requestAnimationFrame(animate);
//     // }

// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////
let lastPoint = {};
async function fetchDataJSON() {
    const response = await fetch('./data.json');
    const data = await response.json();
    return data;
}

fetchDataJSON().then(data => {
    console.log(data);
    lastPoint = data.slice(-1)[0];
    var scene, renderer, cam, mesh;

    // linear interpolation function
    function lerp(a, b, t) {return a + (b - a) * t}

    var t = 0, dt = 0.01,                   // t (dt delta for demo)
        a = {x: 0, y: 0, z: 0},             // start position
        b = lastPoint;                      // end position

    function loop() {
    var newX = lerp(a.x, b.x, ease(t));   // interpolate between a and b where
    var newY = lerp(a.y, b.y, ease(t));   // t is first passed through a easing
    var newZ = lerp(a.z, b.z, ease(t));   // function in this example.
    mesh.position.set(newX, newY, newZ);  // set new position
    t += dt;
    if (t <= 0 || t >=1) dt = -dt;        // ping-pong for demo
    renderer.render(scene, cam);
    requestAnimationFrame(loop)
    }

    // example easing function (quadInOut, see link above)
    function ease(t) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t}

    // setup scene
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    cam = new THREE.PerspectiveCamera(40, innerWidth / innerHeight, 1, 50);
    mesh = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshBasicMaterial());
    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(innerWidth, innerHeight);
    cam.position.z = 20;
    document.body.appendChild(renderer.domElement);
    scene.add(mesh);
    loop();

})