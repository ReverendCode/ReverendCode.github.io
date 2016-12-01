
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

	obj = makeBox();
	scene.add(obj);
	animate();
}

function makeBox() {
	// var geometry = new THREE.BoxGeometry(1,1,1);

	var geometry = new THREE.TorusGeometry(8,3,64,64);
	// var geometry = new THREE.SphereGeometry(1,32,32);
	
	var uniforms = THREE.UniformsUtils.merge( 
		[ {
		colorRed: {type: 'c', value: new THREE.Color(0xfd0000)},
		lightDir: {value: new THREE.Vector3(0.0,9999.0,9999.0)} 
		}]);
	
	var material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: document.getElementById('VertexShader').text,
		fragmentShader: document.getElementById('ToonShader').text
	});
	return new THREE.Mesh(geometry, material);
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