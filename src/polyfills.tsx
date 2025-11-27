// Browser polyfills for wallet compatibility
// Note: Buffer and process are handled by vite-plugin-node-polyfills

declare global {
  interface Window {
      ethereum?: any;
  }
}

// Ensure global is defined
if (typeof globalThis !== 'undefined' && !globalThis.global) {
  globalThis.global = globalThis;
}

export default {}; 