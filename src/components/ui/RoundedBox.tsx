
import * as THREE from 'three';

// Add RoundedBoxGeometry to THREE
THREE.RoundedBoxGeometry = function(
  width = 1, 
  height = 1, 
  depth = 1, 
  segments = 2, 
  radius = 0.1
) {
  const geometry = new THREE.BoxGeometry(width, height, depth, segments, segments, segments);
  
  // Process each vertex
  const position = geometry.attributes.position;
  const array = position.array;
  
  // Use radius to adjust corners
  const halfWidth = width / 2 - radius;
  const halfHeight = height / 2 - radius;
  const halfDepth = depth / 2 - radius;
  
  // Modify box geometry to create rounded corners
  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    
    // Normalize corner vectors
    const length = Math.sqrt(x * x + y * y + z * z);
    
    if (length > 0) {
      array[i] = Math.max(-halfWidth, Math.min(halfWidth, x));
      array[i + 1] = Math.max(-halfHeight, Math.min(halfHeight, y));
      array[i + 2] = Math.max(-halfDepth, Math.min(halfDepth, z));
    }
  }
  
  geometry.computeVertexNormals();
  
  return geometry;
};

// Declare type for the extended THREE
declare module 'three' {
  export class RoundedBoxGeometry extends THREE.BoxGeometry {
    constructor(width?: number, height?: number, depth?: number, segments?: number, radius?: number);
  }
}
