const modelViewerComparison1 = document.querySelector("model-viewer#modelViewerComparison1");
const modelViewerComparison2 = document.querySelector("model-viewer#modelViewerComparison2");

// Initialize the selection panel images
$('#comparisonSelectionPanel .selectable-image').each((i, img) => {
    img.src = `../assets/image.png`;
    img.src = `../assets/rnb_neus2/comparison/${img.getAttribute('name')}/view.png`;
})

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


// Click an image to select the case
const comparisonSelectionPanel = document.getElementById('comparisonSelectionPanel');
comparisonSelectionPanel.addEventListener('click', function(event) {
    const img = event.target.closest('.selectable-image'); 
    if (!img || img.classList.contains('selected')) 
        return;

    // Highlight the selected image
    comparisonSelectionPanel.querySelectorAll('.selectable-image').forEach(function(image) {
        image.classList.remove('selected');
    });
    img.classList.add('selected');

    // Load the corresponding model
    const name = img.getAttribute('name');
    const baseline = document.getElementById('comparisonBaselineSelection').value;

    const meshPath1 = `../assets/rnb_neus2/comparison/${name}/rnb/mesh.glb`;
    const texturePath = `../assets/rnb_neus2/comparison/${name}/rnb/texture.jpg`;

    meshPath2 = `../assets/rnb_neus2/comparison/${name}/${baseline}/mesh.glb`;
    texturePath2 = `../assets/rnb_neus2/comparison/${name}/${baseline}/texture.jpg`;

    
    modelViewerComparison1.src = meshPath1;
    modelViewerComparison1.texturePath = texturePath;
    modelViewerComparison1.resetView();
    modelViewerComparison1.showPoster();
    
    modelViewerComparison2.src = meshPath2;
    modelViewerComparison2.texturePath = texturePath2;
    modelViewerComparison2.resetView();
    modelViewerComparison2.showPoster();
});

// Dropdown to select the baseline method
document.getElementById('comparisonBaselineSelection').addEventListener('change', function (event) {
    const name = document.querySelector('#comparisonSelectionPanel .selectable-image.selected').getAttribute('name');
    const baseline = document.getElementById('comparisonBaselineSelection').value;
    

    meshPath2 = `../assets/rnb_neus2/comparison/${name}/${baseline}/mesh.glb`;
    texturePath2 = `../assets/rnb_neus2/comparison/${name}/${baseline}/texture.jpg`;

    modelViewerComparison2.src = meshPath2;
    modelViewerComparison2.texturePath = texturePath2;
    modelViewerComparison2.showPoster();
});

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


// Initialize the model viewer with selected model
$(document).ready(() => {
    const name = document.querySelector('#comparisonSelectionPanel .selectable-image.selected').getAttribute('name');
    const baseline = document.getElementById('comparisonBaselineSelection').value;
    
    const meshPath1 = `../assets/rnb_neus2/comparison/${name}/rnb/mesh.glb`;
    const texturePath = `../assets/rnb_neus2/comparison/${name}/rnb/texture.jpg`;

    meshPath2 = `../assets/rnb_neus2/comparison/${name}/${baseline}/mesh.glb`;
    texturePath2 = `../assets/rnb_neus2/comparison/${name}/${baseline}/texture.jpg`;
    
    modelViewerComparison1.src = meshPath1;
    modelViewerComparison1.texturePath = texturePath;
    modelViewerComparison1.isTextured = false;
    modelViewerComparison1.resetView();
    modelViewerComparison1.showPoster();
    
    modelViewerComparison2.src = meshPath2;
    modelViewerComparison2.texturePath = texturePath2;
    modelViewerComparison2.isTextured = false;
    modelViewerComparison2.resetView();
    modelViewerComparison2.showPoster(); 
});