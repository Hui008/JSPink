let that
class Tab {
  constructor(id) {
    that = this
    // 获取元素
    this.main = document.querySelector(id)
    this.tabadd = this.main.querySelector('.tabadd')
    this.ul = this.main.querySelector('.fisrstnav ul:nth-child(1)')
    this.tabscon = this.main.querySelector('.tabscon')

    this.init()
  }
  updateNode() {
    this.lis = this.main.querySelectorAll('li')
    this.sectios = this.main.querySelectorAll('section')

    this.guanBis = this.main.querySelectorAll('.icon-guanbi')
    this.spans = this.main.querySelectorAll('.fisrstnav li span:nth-child(1)')
  }
  init() {
    this.updateNode()
    // 初始化操作  让相关元素绑定事件
    this.tabadd.onclick = this.addTab
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.guanBis[i].index = i
      this.spans[i].index = i
      // console.log(this.index);
      this.lis[i].onclick = this.toggleTab
      this.guanBis[i].onclick = this.removeTab
      this.spans[i].ondblclick = this.editTab
      this.sectios[i].ondblclick = this.editTab
    }

  }
  // 切换功能
  toggleTab() {
    that.clearClass()
    this.classList = 'liactive'
    that.sectios[this.index].classList = 'conactive'
  }

  clearClass() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].classList = ''
      this.sectios[i].classList = ''
    }
  }

  // 添加功能
  addTab() {
    that.clearClass()
    let li = `<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>`
    that.ul.insertAdjacentHTML('beforeend', li)
    let section = `<section class="conactive">选项卡${Math.random()}</section>`
    that.tabscon.insertAdjacentHTML('beforeend', section)

    that.init()
  }
  // 删除功能
  removeTab(e) {
    // 阻止冒泡  防止触发li的切换点击事件
    e.stopPropagation();
    that.ul.removeChild(that.lis[this.index])
    that.tabscon.removeChild(that.sectios[this.index])

    that.init()

    if (document.querySelector('.liactive')) {
      return
    }


    that.lis[--this.index] && that.lis[--this.index].click()

  }
  // 修改功能
  editTab() {
    var str = this.innerHTML
    // 双击禁止选定文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = `<input type="text" selected/>`


    let input = this.children[0]
    input.value = str

    input.select() // 文字处于选中状态
    input.onblur = function () {
      this.parentNode.innerHTML = this.value
    }

    input.onkeyup = function (e) {
      // if(e.keyCode === 13) {
      //   console.log(e);
      //   this.blur()
      // }
      if (e.key === 'Enter') {
        this.blur()
      }
    }
  }
}


let tab = new Tab('#tab')