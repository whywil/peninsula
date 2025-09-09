// Performance test example: DocumentExplorer.perf.test.tsx
// import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect } from '@jest/globals';
import DocumentExplorer from './DocumentExplorer';

describe('DocumentExplorer Performance', () => {
  it('renders within acceptable time', () => {
    const start = performance.now();
    render(<DocumentExplorer />);
    const end = performance.now();
    
    // Should render in less than 100ms
    expect(end - start).toBeLessThan(100);
  });
  
  it('handles multiple folder expansions efficiently', () => {
    const { fireEvent, screen } = require('@testing-library/react');
    render(<DocumentExplorer />);
    
    const start = performance.now();
    
    // Expand all folders
    const folders = screen.getAllByText(/FOLDER \(Clickable\)/);
    folders.forEach((folder: Element) => {
      const clickableElement = folder.closest('.cursor-pointer');
      if (clickableElement) fireEvent.click(clickableElement);
    });
    
    const end = performance.now();
    
    // Should handle expansions quickly, less than 80ms.
    expect(end - start).toBeLessThan(80);
  });
});
