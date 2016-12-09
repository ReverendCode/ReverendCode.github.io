
var scene, camera, renderer;
// var  sunlight;
// var rising = true;

//TODO: remove this test object
var obj = null;

function init (draw) {
	//set the scene

	scene = new THREE.Scene();
	var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
	var viewAngle = 45, aspect = screenWidth / screenHeight, near = 0.1, far = 10000;
	camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	camera.lookAt(scene.position);
	renderer = new THREE.WebGLRenderer( {
		antialias: true,
		alpha: true
	});

	renderer.setSize(screenWidth, screenHeight);
	var container = document.body;
	container.appendChild(renderer.domElement);


	obj = draw;
	var sky = MakeSkybox();
	scene.add(sky);

	obj.position.set(0,0,-200);
	camera.add(obj);
	scene.add(camera);



	animate();
}
function MakeSkybox() {
	// var material = new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide});
	var material = applySkyShader();
    var skybox = new THREE.Mesh(new THREE.CubeGeometry(2000, 2000, 2000), material);
        // var skybox = new THREE.Mesh(new THREE.CubeGeometry(1,1,1), material);

    return skybox;

}
function applySkyShader() {
	var img = new THREE.Texture(skyBox);
	img.needsUpdate = true;
	var uniforms = Object.assign(
			{skyTexture: {type: 't', value: img}}
		);
	
	return new THREE.ShaderMaterial({
		side: THREE.DoubleSide,
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexSkyShader').text,
		fragmentShader: document.getElementById('fragmentSkyShader').text	
	}); 
}

function CreateWorld() { // and he said, let there be light.
	
	var xS = 63, yS = 63;

	return THREE.Terrain({
    easing: THREE.Terrain.Linear, 
    frequency: 2.5,
    heightmap: THREE.Terrain.Fault, //input terrain generator here.
    material: applyMaterial(),
    maxHeight: 100,
    minHeight: -100,
    steps: 1,
    useBufferGeometry: false,
    xSegments: xS,
    xSize: 1024,
    ySegments: yS,
    ySize: 1024,
});
}

function applyMaterial() {
// hardCut or groundTexture are your choices
	var img = new THREE.Texture(groundTexture);
	img.needsUpdate = true;
	var uniforms = Object.assign(
			{snowLevel: {type: 'f', value: 400.0}},
			{step: { type: 'f', value: 8.0}},
			{divisor: { type: 'f', value: 6.0}},
			{texture: {type: 't', value: img}}
		);
	
	return new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: document.getElementById('VertexShader').text,
		fragmentShader: document.getElementById('ToonShader').text	
	}); 
}


function CreateTorus() {
	var geometry = new THREE.TorusGeometry(8,3,64,64);
	return new THREE.Mesh(geometry, applyMaterial());
}

function animate() {
	requestAnimationFrame(animate);
	camera.rotation.x += 0.005;
	camera.rotation.y += 0.0001;
	// camera.position.y += .001;

	renderer.render(scene, camera);
}