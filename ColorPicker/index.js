const pickerBtn = document.getElementById('picker-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const colorList = document.querySelector(".color-list");
const colorItems = document.querySelectorAll('.color-value')
let colorArr = [];

const renderColorList = ()=>{

  colorArr = JSON.parse(localStorage.getItem('color-list')) || []
  colorList.innerHTML = colorArr.map(item=>{
    return `
    <div class="color-item">
      <span class="color-block" style="background-color:${item}; border:1px solid ${item==='#ffffff'? '#eee' : item}"></span>
      <span class="color-value" data-color=${item}>${item}</span>
    </div>
    `
  }).join("")
  const arr = document.querySelectorAll('.color-item')
  copyColorValue(arr);
}

const copyColorValue = (_arr)=>{
  _arr.forEach(item=>{
    item.addEventListener('click', (e)=>{
      if(e.target.dataset.color){
        const rgb = e.target.dataset.color;
        navigator.clipboard.writeText(e.target.dataset.color);
        e.target.innerHTML = 'COPIED';
        setTimeout(()=>{
          e.target.innerHTML = rgb;
        }, 1000)
      }
    })
  })
}

clearAllBtn.addEventListener('click',()=>{
  localStorage.setItem('color-list','[]');
  renderColorList()
})

const pickerColor = (e)=>{
  const eyeDropper = new EyeDropper();
  eyeDropper.open().then(res=>{
    const exist = colorArr.find(item=>item===res.sRGBHex);
    // console.log("%c Line:46 🍇 exist", "color:#f5ce50", exist);
    if(!exist){
      colorArr.push(res.sRGBHex);
      localStorage.setItem('color-list', JSON.stringify(colorArr))
      renderColorList()
    }
  })
}

const init = ()=>{
  renderColorList()
}

init();
pickerBtn.addEventListener('click', pickerColor)