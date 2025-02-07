const modelViewerComparison3_1 = document.querySelector("model-viewer#modelViewerComparison3_1");
const modelViewerComparison3_2 = document.querySelector("model-viewer#modelViewerComparison3_2");
const modelViewerComparison3_3 = document.querySelector("model-viewer#modelViewerComparison3_3");


// Initialize the selection panel images
$('#comparisonSelectionPanel3 .selectable-image').each((i, img) => {
    img.src = `../assets/rnb_neus2/comparison3/${img.getAttribute('name')}/view.png`;
})

// Click an image to select the case
const comparisonSelectionPanel3 = document.getElementById('comparisonSelectionPanel3');
comparisonSelectionPanel3.addEventListener('click', function(event) {
    const img = event.target.closest('.selectable-image'); 
    if (!img || img.classList.contains('selected')) 
        return;

    // Highlight the selected image
    comparisonSelectionPanel3.querySelectorAll('.selectable-image').forEach(function(image) {
        image.classList.remove('selected');
    });
    img.classList.add('selected');

    // Load the corresponding model
    const name = img.getAttribute('name');

    const meshPath1 = `../assets/rnb_neus2/comparison3/${name}/mesh_rnb_v2.glb`;
    const meshPath2 = `../assets/rnb_neus2/comparison3/${name}/mesh_rnb_v1.glb`;
    const meshPath3 = `../assets/rnb_neus2/comparison3/${name}/mesh_neus.glb`;
    
    modelViewerComparison3_1.src = meshPath1;
    modelViewerComparison3_1.isTextured = false;
    modelViewerComparison3_1.resetView();
    modelViewerComparison3_1.showPoster();
    
    modelViewerComparison3_2.src = meshPath2;
    modelViewerComparison3_2.isTextured = false;
    modelViewerComparison3_2.resetView();
    modelViewerComparison3_2.showPoster(); 

    modelViewerComparison3_3.src = meshPath3;
    modelViewerComparison3_3.isTextured = false;
    modelViewerComparison3_3.resetView();
    modelViewerComparison3_3.showPoster();
});


// Sync the view of two model viewers
var syncViewWith = undefined;
var syncViewEnabled = true;
const viewers = [modelViewerComparison3_1, modelViewerComparison3_2, modelViewerComparison3_3];

const syncView3 = (event) => {
    if (!syncViewEnabled || event.target !== syncViewWith)
        return;
    const source = syncViewWith;
    const targets = viewers.filter(viewer => viewer !== source);

    const sourceOrbit = source.getCameraOrbit();
    const sourceTarget = source.getCameraTarget();
    const sourceFoV = source.getFieldOfView();

    // Apply transformations to all targets
    for (const target of targets) {
        target.cameraOrbit = `${sourceOrbit.theta}rad ${sourceOrbit.phi}rad ${sourceOrbit.radius}m`;
        target.cameraTarget = `${sourceTarget.x}m ${sourceTarget.y}m ${sourceTarget.z}m`;
        target.fieldOfView = `${sourceFoV}deg`;
        target.jumpCameraToGoal();
    }
}

modelViewerComparison3_1.addEventListener('camera-change', syncView3)
modelViewerComparison3_1.addEventListener('mousedown', () => {syncViewWith = modelViewerComparison3_1;});
modelViewerComparison3_1.addEventListener('wheel', () => {syncViewWith = modelViewerComparison3_1;});

modelViewerComparison3_2.addEventListener('camera-change', syncView3)
modelViewerComparison3_2.addEventListener('mousedown', () => {syncViewWith = modelViewerComparison3_2;});
modelViewerComparison3_2.addEventListener('wheel', () => {syncViewWith = modelViewerComparison3_2;});

modelViewerComparison3_3.addEventListener('camera-change', syncView3)
modelViewerComparison3_3.addEventListener('mousedown', () => {syncViewWith = modelViewerComparison3_3;});
modelViewerComparison3_3.addEventListener('wheel', () => {syncViewWith = modelViewerComparison3_3;});


// Initialize the model viewer with selected model
$(document).ready(() => {
    const name = document.querySelector('#comparisonSelectionPanel3 .selectable-image.selected').getAttribute('name');
    
    const meshPath1 = `../assets/rnb_neus2/comparison3/${name}/mesh_rnb_v2.glb`;
    const meshPath2 = `../assets/rnb_neus2/comparison3/${name}/mesh_rnb_v1.glb`;
    const meshPath3 = `../assets/rnb_neus2/comparison3/${name}/mesh_neus.glb`;
    
    modelViewerComparison3_1.src = meshPath1;
    modelViewerComparison3_1.isTextured = false;
    modelViewerComparison3_1.resetView();
    modelViewerComparison3_1.showPoster();
    
    modelViewerComparison3_2.src = meshPath2;
    modelViewerComparison3_2.isTextured = false;
    modelViewerComparison3_2.resetView();
    modelViewerComparison3_2.showPoster(); 

    modelViewerComparison3_3.src = meshPath3;
    modelViewerComparison3_3.isTextured = false;
    modelViewerComparison3_3.resetView();
    modelViewerComparison3_3.showPoster();
});