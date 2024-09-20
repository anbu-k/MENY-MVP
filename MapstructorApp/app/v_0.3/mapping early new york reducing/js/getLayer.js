/**
 * Retrives a layer object from the layers array based on the provide layerId
 * @param {string} layerId - The unique identifier for the layer to be retrieved
 * @returns - The layer object that matches the given layerId
 */
function getLayer(layerId) {
    // uses the Array.prototype.find() method to search for a layer with a matching id
    return layers.find(({ id }) => id === layerId); //The find method iterates over the layers array and checks each layer's id property
}
