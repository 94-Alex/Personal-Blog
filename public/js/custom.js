// 这里编写自定义js脚本；将被静态引入到页面中

// /public/js/custom.js (爆炸追加以下代码)
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
      const createClickPetal = (angle) => {
        const petal = document.createElement('div')
        petal.className = 'click-sakura'
        petal.innerHTML = '🌸'
        const velocity = 1 + Math.random() * 2
        const rotation = angle + (Math.random() - 0.5) * Math.PI/3
        
        Object.assign(petal.style, {
          left: `${e.clientX}px`,
          top: `${e.clientY}px`,
          animation: `click-burst 0.8s ease-out`,
          '--vx': Math.cos(rotation) * velocity,
          '--vy': Math.sin(rotation) * velocity
        })
        
        petal.addEventListener('animationend', () => petal.remove())
        document.body.appendChild(petal)
      }

      // 生成8个方向的花瓣
      for(let i=0; i<8; i++) {
        createClickPetal((i * Math.PI)/4)
      }
    })
  })
}
