let uid = 0
class Dep {
  constructor() {
    this.id = uid++
    this.subs = []
  }
  depend() {
    Dep.target.addDep(this)
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null

class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  walk(value) {
    Object.keys(value).forEach(key => this.covert(key, value[key]))
  }
  convert(key, val) {
    defineReactive(this.value, ley, val)
  }
}

function defineReactive(obj, key, val) {
  const dep = new Dep()
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
    set: newVal => {
      if (val === newVal) return
      val = newVal
      childOb = observe(newVal)
      dep.notify()
    }
  })
}

function observe(value) {
  if (!value || typeof value !== 'object') return
  return new Observer(value)
}

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.depIds = {}
    this.vm = vm
    this.cb = cb
    this.expOrFn = expOrFn
    this.val = this.get()
  }
  update() {
    this.run()
  }
  addDep(dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }
  run() {
    const val = this.get()
    if (val !== this.val) {
      this.val = val
      this.cb.call(this.vm, val)
    }
  }
  get() {
    Dep.target = this
    this.val = this.vm._data[this.expOrFn]
    Dep.target = null
    return val
  }
}

class Vue {
  constructor(options = {}) {
    this.$options = options
    let data = (this._data = this.$options.data)
    Object.keys(data).forEach(key => this._proxy(key))
    observe(data)
  }
  $watch(expOrFn, cb) {
    new Watcher(this, expOrFn, cb)
  }
  _proxy(key) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: () => { this._data[key] }
      set: val => { this._data[key] = val }
    })
  }
}
