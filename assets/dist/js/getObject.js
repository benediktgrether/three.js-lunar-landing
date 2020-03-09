function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/assets/dist/data/importObject.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

// function init() {
//     loadJSON(function (response) {
//         // Parse JSON string into object
//         var actual_JSON = JSON.parse(response);
//     });
// }


function getObject(scene) {
    var actual_JSON
    loadJSON(function (response) {
        actual_JSON = JSON.parse(response);

        for (let index = 0; index < actual_JSON.objects.length; index++) {

            var object = actual_JSON.objects[index]
            setObject(scene, object);
        }
    });
}

function setObject(scene, object) {
    var mtlLoader = new THREE.MTLLoader();

    mtlLoader.setResourcePath('/assets/dist/object/' + object.getObjects[0].path);
    mtlLoader.setPath('/assets/dist/object/' + object.getObjects[0].path);
    mtlLoader.load(object.getObjects[0].name + ".mtl", function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('/assets/dist/object/' + object.getObjects[0].path);
        objLoader.load(object.getObjects[0].name + ".obj", function (mesh) {

            mesh.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            mesh.position.x = object.getObjects[0].postionX;
            mesh.position.y = object.getObjects[0].postionY;
            mesh.position.z = object.getObjects[0].postionZ;
            mesh.name = object.getObjects[0].name;
            scene.add(mesh);

        });
    });

}

