;(() => {
  // return console.log('SKIP TEST 1')
  let result, vdom, container, Comp
  vdom = h(Span, {}, 'hello span')
  container = document.createElement('div')
  render(vdom, container)
  result = container.querySelector('span')
  console.assert(result !== null)
})()

;(() => {
  // return console.log('SKIP TEST 2')
  // Issue #4
  let result, vdom, container, Comp
  Comp = () => [null]
  vdom = h(Comp)
  container = document.createElement('div')
  render(vdom, container)
  result = container.firstChild.childNodes
  console.assert(result.length === 0)
})()
