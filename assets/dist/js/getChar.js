function setChar(scene, camera) {
    var mtlLoader = new THREE.MTLLoader();

    mtlLoader.setResourcePath('/assets/dist/object/char/');
    mtlLoader.setPath('/assets/dist/object/char/');
    mtlLoader.load("char.mtl", function (materials) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('/assets/dist/object/char/');
        objLoader.load("char.obj", function (mesh) {

            mesh.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            mesh.position.x = 1;
            mesh.position.y = 0.2;
            mesh.position.z = -0.75;
            mesh.name = "char";
            scene.add(mesh);
            // return mesh;
        });
    });

}   