import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';

function createBoxDefault(scene, store) {
  return createBox( scene, store, null, null, 0x808080);
}

function createBox( scene, store, size, position, colorHex ) {
  let geometry = new BoxGeometry( );

  return createMesh( scene, store, size, position, colorHex, geometry, 'box' );
}

function createMesh( scene, store, size, position, colorHex, geometry, type ) {
  let material = new MeshBasicMaterial( { color: colorHex } );
  let mesh = new Mesh( geometry, material );

  if (!size) {
    size = { x: 1, y: 1, z: 1 };
  }

  if (!position) {
    position = { x: 0, y: 0, z: 0 };
  }
  
  mesh.scale.set( size.x, size.y, size.z );
  mesh.position.set( position.x, position.y, position.z );

  scene.add( mesh );

  store.commit('addMeshObj', {
    id: mesh.id,
    type: type,
    location: position,
    scale: size,
    color: colorHex,
  });

  return mesh;  
}

function deleteMesh( scene, store, meshId ) {
  let id = parseInt( meshId, 10 );
  let meshObject = scene.getObjectById( id );

  scene.remove(meshObject);
  // meshObject.dispose();

  store.commit('deleteMeshObj', { id: meshId });
}

function reParent(object, newParent) {  
  newParent.add(object);
  return object;
}


export { createBox, createBoxDefault, createMesh, deleteMesh, reParent };