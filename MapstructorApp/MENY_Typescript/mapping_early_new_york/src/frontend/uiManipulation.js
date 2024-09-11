const title = document.getElementById("title");

function titleOnChange(e) {
  window.updateDoc(doc(window.db, "projects", projectId), {
    name: e.target.value,
  });
}

window.getDoc(doc(window.db, "projects", projectId)).then((snapshot) => {
  title.value = snapshot.data().name;
});

document.getElementById("project-id").value = projectId;

function validateProjectIdInput(e) {
  const input = e.target;
  const button = document.getElementById("load-project-button");
  button.disabled = input.value.trim() === "";
}

function loadProjectById() {
  const input = document.getElementById("project-id-input").value;
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
    document.getElementById("feature-info-value").value = properties.info || ""
  }
  if(isVisible){
    const info = document.getElementById("feature-info-value").value
  console.log(info)
  document.getElementById("min-info-length").innerText = info.length
  }
}
const layerNameInput = document.getElementById("layer-name");
const layerTypeSelect = document.getElementById("layer-type");
const addLayerButton = document.getElementById("add-layer-button");

function updateButtonState() {
  const nameIsValid = layerNameInput.value.trim() !== "";
  const typeIsValid = layerTypeSelect.value !== "default";
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
  const layerName = layerNameInput.value;
  const layerType = layerTypeSelect.value;
  const id= generateRandomString(10)
  addLayer({
    name: layerName,
    type: layerType,
    id
  })
  layers.push({
    id,
    name: layerName,
    type: layerType,
    features: []
  })
  selectedType = layerType
  setCurrentLayer(id, layerType)
});

updateButtonState()

function populateDataTable(layer, isVisible){
  const recordsContainer = document.getElementById("data-table-entries");
  if(!isVisible) {
    document.getElementById("data-table").style.display = "none"
    return 
  }
  recordsContainer.innerHTML = ""
  document.getElementById("data-table").style.display = "block"
  layer.features.forEach((feature)=>{
    
    const record = `<tr class="cursor-pointer">
      <td>${feature.properties.label || ""}</td>
      <td>${feature.properties.info || ""}</td>
    </tr>`;
    recordsContainer.innerHTML += record
  })
}

function populateIdsTrayUnderLayers(){
  layers.forEach(layer => {
    const featuresTray = document.getElementById(layer.id + "-features");
    featuresTray.innerHTML = ``
    layer.features.forEach(feature => {
      const id = feature.id;
      const trELem = document.createElement("tr");
      trELem.classList.add("layer-feature")
      trELem.addEventListener("click", e => {
        // remove other higlighted features
        Array.from(document.getElementsByClassName("layer-feature")).forEach(elem => elem.classList.remove("selected-layer-feature"))
        drawControls.changeMode("simple_select", {
          featureIds: [id]
        })
        toggleFeatureEditor(true, feature.properties)
        trELem.classList.add("selected-layer-feature")
      })
      const nameCell = document.createElement("td");
      nameCell.innerText = feature.properties.label || "No Label";
      trELem.appendChild(nameCell)
      featuresTray.appendChild(trELem)
    })
  })
}
