describe('Three.js Canvas', () => {
  beforeEach(() => {
    // Visit the page in your Vue3 app that mounts the Three.js scene
    cy.visit('/')
  })

  it('should render the three.js canvas', () => {
    cy.get('canvas')
      .should('exist')
      .and('be.visible')
      .and(($canvas) => {
        const canvas = $canvas[0] as HTMLCanvasElement
        expect(canvas.width).to.be.greaterThan(0)
        expect(canvas.height).to.be.greaterThan(0)
      })
  })

  it('should render pixels on the canvas (not just blank)', () => {
    cy.get('canvas').then(($canvas) => {
      const canvas = $canvas[0] as HTMLCanvasElement

      const gl = canvas.getContext('webgl')
      if (!gl) {
        throw new Error('WebGL context not available')
      }

      const width = gl.drawingBufferWidth
      const height = gl.drawingBufferHeight
      const pixels = new Uint8Array(width * height * 4)

      gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

      const hasColor = pixels.some((v) => v !== 0)
      cy.wrap(hasColor).should('be.true')
    })
  })
})
