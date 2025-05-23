
import * as THREE from 'three';

// Create a custom RoundedBoxGeometry class
class RoundedBoxGeometry extends THREE.BufferGeometry {
  constructor(width = 1, height = 1, depth = 1, segments = 2, radius = 0.1) {
    super();
    
    // Create a standard box geometry to start with
    const boxGeometry = new THREE.BoxGeometry(width, height, depth, segments, segments, segments);
    
    // Copy attributes from the box geometry
    this.copy(boxGeometry);
    
    // Process each vertex
    const position = this.getAttribute('position');
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

// Define the type extensions for TypeScript
declare global {
  namespace THREE {
    interface RoundedBoxGeometryClass {
      new (width?: number, height?: number, depth?: number, segments?: number, radius?: number): typeof THREE.BufferGeometry;
    }
  }
}

// Add the RoundedBoxGeometry to THREE namespace in a type-safe way
(THREE as any).RoundedBoxGeometry = RoundedBoxGeometry;
