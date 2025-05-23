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


// Initialize the model viewer with fixed model
$(document).ready(() => {
    // Load models with the fixed name and baseline on document ready
    loadComparisonModels(fixedName, fixedBaseline);


    // Définir la position initiale de la caméra pour modelViewerComparison1
    modelViewerComparison1.cameraOrbit = "0deg 90deg 1.5m"; // Exemple: vue de dessus, à 1.5m
    modelViewerComparison1.cameraTarget = "0m 0.5m 0m";    // Exemple: regarder un peu plus haut
    modelViewerComparison1.fieldOfView = "50deg";         // Exemple: champ de vision de 50 degrés

    // Vous pouvez faire de même pour modelViewerComparison2
    modelViewerComparison2.cameraOrbit = "0deg 90deg 1.5m"; // Exemple: vue diagonale
    modelViewerComparison2.cameraTarget = "0m 0m 0m";
    modelViewerComparison2.fieldOfView = "50deg";

    modelViewerComparison1.isTextured = false;
    modelViewerComparison2.isTextured = false;
});