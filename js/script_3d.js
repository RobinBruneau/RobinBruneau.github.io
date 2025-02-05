function initViewer(modelPath) {
    // Initialisation de la scène, caméra et rendu
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Lumières
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Contrôles de navigation
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2;
    controls.maxDistance = 10;

    // Charger le modèle
    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, function(gltf) {
        const model = gltf.scene;
        scene.add(model);
    }, undefined, function(error) {
        console.error('Erreur lors du chargement du modèle', error);
    });

    // Position initiale de la caméra
    camera.position.set(0, 1, 5);

    // Fonction pour envoyer les mises à jour de caméra
    function syncCamera() {
        window.parent.postMessage({
            type: 'syncCamera',
            position: camera.position.toArray(),
            quaternion: camera.quaternion.toArray()
        }, '*');
    }

    // Recevoir les mises à jour de caméra
    window.addEventListener('message', (event) => {
        if (event.data.type === 'syncCamera') {
            camera.position.fromArray(event.data.position);
            camera.quaternion.fromArray(event.data.quaternion);
        }
    });

    // Animation
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);

        // Synchroniser seulement si la caméra a bougé
        if (controls.update) {
            syncCamera();
        }
    }
    animate();

    // Ajuster la taille si la fenêtre change
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
