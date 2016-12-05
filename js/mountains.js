
var scene, camera, renderer;
var  sunlight;
var rising = true;

//TODO: remove this test object
var obj = null;

function init (draw) {
	//set the scene
	scene = new THREE.Scene();
	var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
	var viewAngle = 45, aspect = screenWidth / screenHeight, near = 0.1, far = 1000;
	camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	// camera.position.set(100,100,80);
	camera.lookAt(scene.position);
	renderer = new THREE.WebGLRenderer( {
		antialias: true,
		alpha: true
	});

	renderer.setSize(screenWidth, screenHeight);
	var container = document.body;
	container.appendChild(renderer.domElement);

	// obj = createTorus();
	obj = draw;
	obj.position.set(0,-50,0);

	// obj.add(camera);
	camera.add(obj);
	scene.add(camera);
	// scene.add(obj);
	animate();
}



function CreateWorld(detail = 5) { // and he said, let there be light.
	
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
	var uniforms = THREE.UniformsUtils.merge( 
		[ {
			step: { type: 'f', value: 10.0},
			divisor: { type: 'f', value: 6.0},
			colorRed: {type: 'c', value: new THREE.Color(0x0060ff)}
		}]);
	
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
	// obj.rotation.x += 0.005;
	camera.rotation.y += 0.01;
	// camera.position.y += .001;

	renderer.render(scene, camera);

	
}