let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// 用户是否在操作
let using = false

let actions = document.getElementById('actions')
let eraser = document.getElementById('eraser')
let brush = document.getElementById('brush')

let eraserEnable = false
eraser.addEventListener('click', () => {
  eraserEnable = true
  actions.className = 'actions active'
})

brush.addEventListener('click', () => {
  eraserEnable = false
  actions.className = 'actions'
})

// 画画
let lastPoint = {
  x: undefined,
  y: undefined
}

canvas.addEventListener('mousedown', (e) => {
  using = true
  let x = e.clientX
  let y = e.clientY
  if (eraserEnable) {
    context.clearRect(x - 5, y - 5, 10, 10)
  } else {
    lastPoint = {
      x,
      y
    }
    drawCircle(x, y, 2)
  }
})

// onmousemove 在内部有一个响应时间，如果我们画的太快
// 那么浏览器mousemove可能还没有触发，那么就会造成断层
// 通过用线将两点连起来的方式，将断层缝合起来，这样看起来
// 就不会有断连的感觉
canvas.addEventListener('mousemove', (e) => {
  if (using) {
    let x = e.clientX
    let y = e.clientY
    if (eraserEnable) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      let newPoint = {
        x,
        y
      }
      drawCircle(x, y, 2)
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }
})

canvas.addEventListener('mouseup', (e) => {
  using = false
})

// 画圆
function drawCircle(x, y, radius) {
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.closePath()
  context.fill()
}

// 画线 将上一个点和下一个点通过线连接起来
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.strokeStyle = 'black'
  context.lineWidth = 5
  // 笔的位置
  context.moveTo(x1, y1)
  // 往哪里画线
  context.lineTo(x2, y2)
  context.closePath()
  context.stroke()
}

// 监听浏览器窗口大小的变化
// window.onresize = function (e) {
//     let pageWidth = document.documentElement.clientWidth
//     let pageHeight = document.document   Element.clientHeight
//     resize(pageWidth, pageHeight)
// }

// 当窗口发送变化时，将旧画布的内容暂存下来，放到新画布上显示
// function resize(w, h) {
//     let imgData = context.getImageData(0, 0, canvas.width, canvas.height)
//     canvas.width = w
//     canvas.height = h
//     context.putImageData(imgData, 0, 0)
// }