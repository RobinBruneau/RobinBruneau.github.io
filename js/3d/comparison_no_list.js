const modelViewerComparison1 = document.querySelector("model-viewer#modelViewerComparison1");
const modelViewerComparison2 = document.querySelector("model-viewer#modelViewerComparison2");

// Set the toggle buttons
toggleComparisonLeftButton = document.querySelector('#toggleTexturedComparison .toggle-left');
toggleComparisonRightButton = document.querySelector('#toggleTexturedComparison .toggle-right');

toggleComparisonLeftButton.addEventListener('click', function() {
    toggleComparisonLeftButton.classList.add('active');
    toggleComparisonRightButton.classList.remove('active');
    modelViewerComparison1.setTextured(false);
    modelViewerComparison2.setTextured(false);
});

toggleComparisonRightButton.addEventListener('click', function() {
    toggleComparisonLeftButton.classList.remove('active');
    toggleComparisonRightButton.classList.add('active');
    modelViewerComparison1.setTextured(true);
    modelViewerComparison2.setTextured(true);
});

// Fixed values for name and baseline
const fixedName = "viking"; // You can change this to any desired fixed name
const fixedBaseline = "colmap"; // You can change this to any desired fixed baseline



// Function to load models with given name and baseline
function loadComparisonModels(name, baseline) {
    const meshPath1 = `../assets/rnb_neus2/comparison/${name}/rnb/mesh.glb`;
    const texturePath = `../assets/rnb_neus2/comparison/${name}/rnb/texture.jpg`;

    const meshPath2 = `../assets/rnb_neus2/comparison/${name}/${baseline}/mesh.glb`;
    const texturePath2 = `../assets/rnb_neus2/comparison/${name}/${baseline}/texture.jpg`;

    modelViewerComparison1.src = meshPath1;
    modelViewerComparison1.texturePath = texturePath;
    modelViewerComparison1.resetView();
    modelViewerComparison1.showPoster();

    modelViewerComparison2.src = meshPath2;
    modelViewerComparison2.texturePath = texturePath2;
    modelViewerComparison2.resetView();
    modelViewerComparison2.showPoster();
}

// Sync the view of two model viewers
var syncViewWith = undefined;
var syncViewEnabled = true;

const syncView = (event) => {
    if (!syncViewEnabled || event.target !== syncViewWith)
        return;
    const source = syncViewWith;
    const target = source === modelViewerComparison1 ? modelViewerComparison2 : modelViewerComparison1;

    const sourceOrbit = source.getCameraOrbit();
    const sourceTarget = source.getCameraTarget();
    const sourceFoV = source.getFieldOfView();
    target.cameraOrbit = `${sourceOrbit.theta}rad ${sourceOrbit.phi}rad ${sourceOrbit.radius}m`;
    target.cameraTarget = `${sourceTarget.x}m ${sourceTarget.y}m ${sourceTarget.z}m`;
    target.fieldOfView = `${sourceFoV}deg`;
    target.jumpCameraToGoal();
}

modelViewerComparison1.addEventListener('camera-change', syncView)
modelViewerComparison1.addEventListener('mousedown', () => {syncViewWith = modelViewerComparison1;});
modelViewerComparison1.addEventListener('wheel', () => {syncViewWith = modelViewerComparison1;});

modelViewerComparison2.addEventListener('camera-change', syncView)
modelViewerComparison2.addEventListener('mousedown', () => {syncViewWith = modelViewerComparison2;});
modelViewerComparison2.addEventListener('wheel', () => {syncViewWith = modelViewerComparison2;});

// Fonction pour formater et logger l'orbite de la caméra
function logCameraOrbit(viewerId, event) {
    const orbit = event.target.getCameraOrbit();
    const target = event.target.getCameraTarget();
    // Le format de getCameraOrbit() est {theta: X, phi: Y, radius: Z} en radians pour theta/phi
    // On convertit en degrés pour une meilleure lisibilité
    const thetaDeg = (orbit.theta * 180 / Math.PI).toFixed(2);
    const phiDeg = (orbit.phi * 180 / Math.PI).toFixed(2);
    const radiusM = orbit.radius.toFixed(2);

    const targetX = target.x.toFixed(2);
    const targetY = target.y.toFixed(2);
    const targetZ = target.z.toFixed(2);

    console.log(
        `${viewerId} Camera Orbit: theta=${thetaDeg}deg, phi=${phiDeg}deg, radius=${radiusM}m`
    );
    console.log(
        `${viewerId} Camera Target: X=${targetX}m, Y=${targetY}m, Z=${targetZ}m` // <-- Et ici que le target est affiché !
    );
    console.log('---'); // Séparateur pour une meilleure lisibilité
}

// Écoutez l'événement 'camera-change' pour chaque model-viewer
modelViewerComparison1.addEventListener('camera-change', (event) => {
    logCameraOrbit("modelViewerComparison1", event);
});



// Initialize the model viewer with fixed model
$(document).ready(() => {
    // Load models with the fixed name and baseline on document ready
    loadComparisonModels(fixedName, fixedBaseline);


    // Définir la position initiale de la caméra pour modelViewerComparison1
    modelViewerComparison1.cameraOrbit = "324deg 92deg 1.21m"; // Exemple: vue de dessus, à 1.5m
    modelViewerComparison1.cameraTarget = "0m 0m 0m";    // Exemple: regarder un peu plus haut
    modelViewerComparison1.fieldOfView = "50deg";         // Exemple: champ de vision de 50 degrés

    // Vous pouvez faire de même pour modelViewerComparison2
    modelViewerComparison2.cameraOrbit = "324deg 92deg 1.21m"; // Exemple: vue diagonale
    modelViewerComparison2.cameraTarget = "0m 0m 0m";
    modelViewerComparison2.fieldOfView = "50deg";

    modelViewerComparison1.isTextured = false;
    modelViewerComparison2.isTextured = false;
});