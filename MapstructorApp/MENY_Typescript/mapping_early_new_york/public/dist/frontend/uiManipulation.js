"use strict";
var title = document.getElementById("title");
function titleOnChange(e) {
    window.updateDoc(doc(window.db, "projects", projectId), {
        name: e.target.value,
    });
}
window.getDoc(doc(window.db, "projects", projectId)).then(function (snapshot) {
    title.value = snapshot.data().name;
});
document.getElementById("project-id").value = projectId;
function validateProjectIdInput(e) {
    var input = e.target;
    var button = document.getElementById("load-project-button");
    button.disabled = input.value.trim() === "";
}
function loadProjectById() {
    var input = document.getElementById("project-id-input").value;
    if (input.trim() !== "") {
        getProjectById(input.trim());
        document.getElementById("modal").style.display = "none";
    }
}
function toggleFeatureEditor(isVisible, properties) {
    document.getElementById("feature-editor").style.display = isVisible
        ? "block"
        : "none";
    // update properties
    if (properties) {
        document.getElementById("feature-label-value").value =
            properties.label || "";
        document.getElementById("feature-info-value").value = properties.info || "";
    }
    if (isVisible) {
        var info = document.getElementById("feature-info-value").value;
        console.log(info);
        document.getElementById("min-info-length").innerText = info.length;
    }
}
var layerNameInput = document.getElementById("layer-name");
var layerTypeSelect = document.getElementById("layer-type");
var addLayerButton = document.getElementById("add-layer-button");
function updateButtonState() {
    var nameIsValid = layerNameInput.value.trim() !== "";
    var typeIsValid = layerTypeSelect.value !== "default";
    addLayerButton.disabled = !(nameIsValid && typeIsValid);
}
layerNameInput.addEventListener("input", updateButtonState);
layerTypeSelect.addEventListener("change", function () {
    updateButtonState();
    if (layerTypeSelect.value !== "default") {
        layerTypeSelect.querySelector("option[value='default']").disabled = true;
    }
});
addLayerButton.addEventListener("click", function (e) {
    var layerName = layerNameInput.value;
    var layerType = layerTypeSelect.value;
    var id = generateRandomString(10);
    addLayer({
        name: layerName,
        type: layerType,
        id: id
    });
    layers.push({
        id: id,
        name: layerName,
        type: layerType,
        features: []
    });
    selectedType = layerType;
    setCurrentLayer(id, layerType);
});
updateButtonState();
function populateDataTable(layer, isVisible) {
    var recordsContainer = document.getElementById("data-table-entries");
    if (!isVisible) {
        document.getElementById("data-table").style.display = "none";
        return;
    }
    recordsContainer.innerHTML = "";
    document.getElementById("data-table").style.display = "block";
    layer.features.forEach(function (feature) {
        var record = "<tr class=\"cursor-pointer\">\n      <td>".concat(feature.properties.label || "", "</td>\n      <td>").concat(feature.properties.info || "", "</td>\n    </tr>");
        recordsContainer.innerHTML += record;
    });
}
function populateIdsTrayUnderLayers() {
    layers.forEach(function (layer) {
        var featuresTray = document.getElementById(layer.id + "-features");
        featuresTray.innerHTML = "";
        layer.features.forEach(function (feature) {
            var id = feature.id;
            var trELem = document.createElement("tr");
            trELem.classList.add("layer-feature");
            trELem.addEventListener("click", function (e) {
                // remove other higlighted features
                Array.from(document.getElementsByClassName("layer-feature")).forEach(function (elem) { return elem.classList.remove("selected-layer-feature"); });
                drawControls.changeMode("simple_select", {
                    featureIds: [id]
                });
                toggleFeatureEditor(true, feature.properties);
                trELem.classList.add("selected-layer-feature");
            });
            var nameCell = document.createElement("td");
            nameCell.innerText = feature.properties.label || "No Label";
            trELem.appendChild(nameCell);
            featuresTray.appendChild(trELem);
        });
    });
}
