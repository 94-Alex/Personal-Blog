// 这里编写自定义js脚本；将被静态引入到页面中
// /public/js/custom.js
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    class SakuraTracker {
      constructor() {
        this.petals = []
        this.initMouseTracking()
        this.createAutoPetals()
      }

      initMouseTracking() {
        let lastMove = 0
        document.addEventListener('mousemove', (e) => {
          const now = Date.now()
          if (now - lastMove > 100) { // 控制花瓣生成频率
            this.createTrailPetals(e.clientX, e.clientY)
            lastMove = now
          }
        })
      }

      createTrailPetals(x, y) {
        for(let i=0; i<2; i++) { // 每次生成2片花瓣
          const petal = this.createPetalElement()
          const offsetX = (Math.random()-0.5)*30
          const offsetY = (Math.random()-0.5)*20
          Object.assign(petal.style, {
            left: `${x + offsetX}px`,
            top: `${y + offsetY}px`,
            animation: `sakura-drift ${3+Math.random()*2}s cubic-bezier(0.4,0,0.6,1)`
          })
          document.body.appendChild(petal)
          this.petals.push(petal)
        }
      }

      createAutoPetals() {
        setInterval(() => {
          if(this.petals.length < 50) { // 控制总花瓣数
            const petal = this.createPetalElement()
            Object.assign(petal.style, {
              left: `${Math.random()*window.innerWidth}px`,
              top: `-30px`,
              animation: `sakura-drift ${8+Math.random()*4}s linear`
            })
            document.body.appendChild(petal)
            this.petals.push(petal)
          }
        }, 1000)
      }

      createPetalElement() {
        const petal = document.createElement('div')
        petal.className = 'sakura-petal'
        petal.innerHTML = '🌸'
        petal.addEventListener('animationend', () => {
          petal.remove()
          this.petals = this.petals.filter(p => p !== petal)
        })
        return petal
      }
    }
    
    new SakuraTracker()
  })
}
