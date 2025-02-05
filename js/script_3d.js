function initViewer(modelPath) {
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
    loader.load(modelPath, function (gltf) {
        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error('Erreur de chargement', error);
    });

    // Position initiale
    camera.position.set(0, 1, 5);

    // Empêcher les mises à jour en boucle
    let lastSent = { position: [], quaternion: [] };
    let lastReceived = { position: [], quaternion: [] };

    function syncCamera() {
        const positionArray = camera.position.toArray();
        const quaternionArray = camera.quaternion.toArray();

        // Envoyer seulement si la caméra a réellement bougé
        if (!arraysEqual(positionArray, lastSent.position) || !arraysEqual(quaternionArray, lastSent.quaternion)) {
            lastSent = { position: positionArray, quaternion: quaternionArray };

            window.parent.postMessage({
                type: 'syncCamera',
                position: positionArray,
                quaternion: quaternionArray
            }, '*');
        }
    }

    // Éviter d'écraser une mise à jour locale avec une mise à jour distante
    window.addEventListener('message', (event) => {
        if (event.data.type === 'syncCamera') {
            const newPosition = event.data.position;
            const newQuaternion = event.data.quaternion;

            if (!arraysEqual(newPosition, lastReceived.position) || !arraysEqual(newQuaternion, lastReceived.quaternion)) {
                lastReceived = { position: newPosition, quaternion: newQuaternion };

                camera.position.fromArray(newPosition);
                camera.quaternion.fromArray(newQuaternion);
            }
        }
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        syncCamera();
    }
    animate();

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Fonction utilitaire pour comparer les tableaux
    function arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
    }
}
