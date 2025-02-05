// Initialisation de la scène, de la caméra et du rendu
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajouter des lumières
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Ajouter les contrôles de navigation
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Ajoute un effet d'inertie
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 10;

// Charger GLTFLoader
const loader = new THREE.GLTFLoader();

// Charger le premier modèle
loader.load('../assets/render.glb', function(gltf) {
    const model1 = gltf.scene;
    model1.position.set(-1.5, 0, 0); // Position à gauche
    scene.add(model1);
}, undefined, function(error) {
    console.error('Erreur lors du chargement du modèle 1', error);
});

// Charger le deuxième modèle
loader.load('../assets/render.glb', function(gltf) {
    const model2 = gltf.scene;
    model2.position.set(1.5, 0, 0); // Position à droite
    scene.add(model2);
}, undefined, function(error) {
    console.error('Erreur lors du chargement du modèle 2', error);
});

// Position initiale de la caméra
camera.position.set(0, 1, 5);

// Animation
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Met à jour les contrôles
    renderer.render(scene, camera);
}
animate();

// Ajuster la taille du canvas en cas de redimensionnement
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
