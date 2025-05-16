
import * as THREE from 'three';

// Create a custom RoundedBoxGeometry class
class RoundedBoxGeometry extends THREE.BoxGeometry {
  constructor(width = 1, height = 1, depth = 1, segments = 2, radius = 0.1) {
    super(width, height, depth, segments, segments, segments);
    
    // Process each vertex
    const position = this.attributes.position;
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
    
    this.computeVertexNormals();
  }
}

// Export the geometry for use in components
export { RoundedBoxGeometry };

// Extend THREE types
declare global {
  namespace THREE {
    class RoundedBoxGeometry extends THREE.BoxGeometry {
      constructor(width?: number, height?: number, depth?: number, segments?: number, radius?: number);
    }
  }
}

// Add the geometry to THREE namespace
THREE.RoundedBoxGeometry = RoundedBoxGeometry as any;
