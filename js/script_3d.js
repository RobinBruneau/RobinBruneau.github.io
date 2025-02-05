function initViewer(modelPath) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Orbit Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // Load the model
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        scene.add(gltf.scene);
    }, undefined, function(error) {
        console.error('Error loading model', error);
    });

    // Listen for camera data from the parent window
    window.addEventListener('message', (event) => {
        if (event.data.type === 'syncCamera') {
            const cameraData = event.data.camera;
            camera.position.copy(cameraData.position);
            camera.rotation.copy(cameraData.rotation);
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
