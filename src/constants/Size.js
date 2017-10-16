
export function getSize () {
  let clWid = document.body.clientWidth
  let cellSize = 100
  let cellMargin = 10
  
  if (clWid < 450) {
    cellSize = Math.floor(10 / 45 * clWid)
    cellMargin = Math.floor(cellSize / 10)
  }
  return {
    cellSize,
    cellMargin
  }
} 

// for PC
