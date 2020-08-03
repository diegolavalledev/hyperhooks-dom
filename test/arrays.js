;(() => {
  // return console.log('SKIP TEST 1')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  vNode = [null]
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.childNodes.length
  console.assert(result === 0)
})()

;(() => {
  // return console.log('SKIP TEST 1')

  const containerNode = document.createElement('div')
  render([null, null], containerNode)
  const result = containerNode.childNodes.length
  console.assert(result === 0)
})()

;(() => {
  // return console.log('SKIP TEST 1')

  const containerNode = document.createElement('div')
  render(['a'], containerNode)
  const result = containerNode.childNodes.length
  console.assert(result === 1)
})()

;(() => {
  // return console.log('SKIP TEST 1')

  const containerNode = document.createElement('div')
  render(['a', null, 'b'], containerNode)
  let result = containerNode.childNodes.length
  console.assert(result === 2)
  result = containerNode.childNodes[0].nodeValue
  console.assert(result === 'a')
  result = containerNode.childNodes[1].nodeValue
  console.assert(result === 'b')
})()

;(() => {
  // return console.log('SKIP TEST 1')

  const containerNode = document.createElement('div')
  render(['a', [null, 'b']], containerNode)
  let result = containerNode.childNodes.length
  console.assert(result === 2)
  result = containerNode.childNodes[0].nodeValue
  console.assert(result === 'a')
  result = containerNode.childNodes[1].nodeValue
  console.assert(result === 'b')
})()

;(() => {
  // return console.log('SKIP TEST 1')

  const containerNode = document.createElement('div')
  render(['a', h(() => 'foo'), 'b'], containerNode)
  const result = containerNode.childNodes.length
  console.assert(result === 3)
})()

console.log("Array tests done.")
