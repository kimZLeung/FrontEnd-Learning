(function() {
  function setComponent() {
    var component = new Vue({
      template: '<div id="app">halo {{ count }} world</div>',
      data: {
        count: 0
      },
      created: function() {
        var vm = this
        setInterval(function() {
          vm.count += 2
        }, 1000)
      }
    })
    return component
  }
  if(typeof module !== 'undefined' && module.exports) {
    module.exports = setComponent
  } else {
    window.app = setComponent()
  }
})()
