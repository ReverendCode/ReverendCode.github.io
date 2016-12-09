var scene, camera, renderer;


function init() {
	scene = new THREE.Scene();
	var screenWidth = window.innerWidth, screenHeight = window.innerHeight;
	var viewAngle = 45, aspect = screenWidth / screenHeight, near = 0.1, far = 2000;
	camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	camera.lookAt(scene.position);
	renderer = new THREE.WebGLRenderer( {
		antialias: true,
		alpha: true
	});

	renderer.setSize(screenWidth, screenHeight);
	var container = document.body;
	container.appendChild(renderer.domElement);
	var obj = dummySkybox();
	scene.add(obj);
	scene.add(camera);

	animate();

}

function dummySkybox() {
	// var material = new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide});
	var material = applySkyShader();
    var skybox = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000), material);
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


function animate() {
	requestAnimationFrame(animate);
	camera.rotation.x += 0.01;
	camera.rotation.y += 0.002;

	renderer.render(scene, camera);
}