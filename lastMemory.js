(function (window) {
  const STORAGE_KEY = "__lastMemory__"

  const lastMemory = {
    remember(options = {}) {
      let data = {
        url: options.url || window.location.href,
        time: Date.now(),
        expires: options.expires || 10 * 60 * 1000, // default 10 mins
        once: options.once !== false
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    },

    has() {
      const data = this._get()
      if (!data) return false
      if (Date.now() - data.time > data.expires) {
        this.clear()
        return false
      }
      return true
    },

    goBack({ fallback = "/" } = {}) {
      const data = this._get()
      if (!data) {
        window.location.href = fallback
        return
      }

      this.clear()
      window.location.href = data.url
    },

    clear() {
      localStorage.removeItem(STORAGE_KEY)
    },

    _get() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY))
      } catch {
        return null
      }
    }
  }

  window.lastMemory = lastMemory
})(window)


```js
window.$last = window.lastMemory

