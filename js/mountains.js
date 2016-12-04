
var scene, camera, renderer;
var lightX = 0.0;
var rising = true;

//TODO: remove this test object
var obj = null;

function init () {
	//set the scene
	scene = new THREE.Scene();

	var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
	var viewAngle = 45, aspect = screenWidth / screenHeight, near = 0.1, far = 1000;
	camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	scene.add(camera);
	camera.position.set(1,2,40);
	camera.lookAt(scene.position);

	renderer = new THREE.WebGLRenderer( {
		antialias: true,
		alpha: true
	});

	renderer.setSize(screenWidth, screenHeight);
	var container = document.body;
	container.appendChild(renderer.domElement);

	// obj = createTorus();
	obj = CreateWorld();


	scene.add(obj);
	animate();
}

function CreateWorld() { // and he said, let there be light.
	var geometry = new THREE.PlaneGeometry(	10, // size in X (units?)
											10, // Y
											9,	// Resolution in X (Number of subdivisions)
											9);	// Resolution in Y
	var material = applyMaterial();

	var plane = new THREE.Mesh(geometry, material);

	for (var i = 0; i < plane.geometry.vertices.length; i++) {

		// In here you can adjust the z (and presumably the x, and y if you want, but we don't, for now)
		// vertices are accessed sequentially, fire your generated data here.
		plane.geometry.vertices[i].z = Math.random();
	}

	return plane;
}

function applyMaterial() {
	var uniforms = THREE.UniformsUtils.merge( 
		[ {
			step: { type: 'f', value: 5.0},
			divisor: { type: 'f', value: 6.0},
			colorRed: {type: 'c', value: new THREE.Color(0x004300)},
			lightDir: {value: new THREE.Vector3(0.0,9999.0,9999.0)} 
		}]);
	
	return new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: document.getElementById('VertexShader').text,
		fragmentShader: document.getElementById('ToonShader').text	
	}); 
}

function createTorus() {
	var geometry = new THREE.TorusGeometry(8,3,64,64);
	return new THREE.Mesh(geometry, applyMaterial());
}

function animate() {
	requestAnimationFrame(animate);
	obj.rotation.x += 0.005;
	obj.rotation.y += 0.01;
	var val = 0.01;
	if (rising) {
		lightX += val;
		rising = lightX < 1.0;
	} else {
		lightX -= val;
		rising = lightX <= -1.0;
	}
	// obj.material.uniforms.lightDir.value.x = lightX;
	// obj.material.uniforms.lightDir.value.y = -lightX;


	

	renderer.render(scene, camera);

	
}