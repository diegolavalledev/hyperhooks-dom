;(() => {
  // return console.log('SKIP TEST 1')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  vNode = null
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.childNodes.length
  console.assert(result === 0)
})()

;(() => {
  // return console.log('SKIP TEST 2')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  Component = () => null
  vNode = h(Component)
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.firstChild.childNodes.length
  console.assert(result === 0)
})()

;(() => {
  // return console.log('SKIP TEST 1')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  Component = () => [null]
  vNode = h(Component)
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.firstChild.childNodes.length
  console.assert(result === 0)
})()

;(() => {
  // return console.log('SKIP TEST 1')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  Child = () => null
  Component = () => h(Child)
  vNode = h(Component)
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.firstChild.firstChild.childNodes.length
  console.assert(result === 0)
})()

;(() => {
  // return console.log('SKIP TEST 1')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  Child = () => ['foos', null, 'bars']
  Component = () => ['foo', h(Child), 'bar']
  vNode = h(Component)
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.firstChild.childNodes.length
  console.assert(result === 3) // foo foo bar bar
  result = containerNode.firstChild.childNodes[0].nodeValue
  console.assert(result === 'foo')
  result = containerNode.firstChild.childNodes[1].firstChild.nodeValue
  console.assert(result === 'foos')
  result = containerNode.firstChild.childNodes[1].childNodes[1].nodeValue
  console.assert(result === 'bars')
  result = containerNode.firstChild.childNodes[2].nodeValue
  console.assert(result === 'bar')
})()

;(() => {
  // return console.log('SKIP TEST 1')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  Component = () => () => document.createElement('div')
  vNode = h(Component)
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.querySelector('div')
  console.assert(result !== null)
})()

;(() => {
  // return console.log('SKIP TEST 1')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  Component = () => () => document.createElement('span')
  vNode = h(Component, {}, 'foo', 'bar', 'baz')
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.querySelector('span')
  console.assert(result !== null)
  result = result.childNodes.length
  console.assert(result === 3) // foo bar baz
  result = containerNode.querySelector('span').childNodes[0].nodeValue
  console.assert(result === 'foo')
  result = containerNode.querySelector('span').childNodes[1].nodeValue
  console.assert(result === 'bar')
  result = containerNode.querySelector('span').childNodes[2].nodeValue
  console.assert(result === 'baz')
})()

/*
Child = () => {
  const [ foo, setFoo ] = useState(false)
  if (!foo) setTimeout(() => { setFoo(true) }, 0)
  return foo
    ? [
      '2.1',
      '2.2',
      '2.3',
    ]
    : [
      'dos.uno',
      'dos.dos',
      'dos.tres',
    ]
}

Component = () => [
  'One',
   h(Child),
  'Three',
]
vNode = h(Component)
containerNode = document.createElement('div')
render(vNode, containerNode)
setTimeout(() => {
  resultNodeList = containerNode.childNodes
  console.assert(resultNodeList !== null)
  console.assert(resultNodeList.length === 5)
  console.assert(resultNodeList[1].nodeValue === '2.1')
}, 0)

/**/
/*

GrandChild = () => {
  const [ foo, setFoo ] = useState(false)
  if (!foo) setTimeout(() => { setFoo(true) }, 4000)
  return foo
    ? [
      'BBA] ',
      'BBB] ',
      'BBC] ',
    ]
    : [
      'bba]',
      'bbb]',
      'bbc] ',
    ]
}

Child = () => {
  const [ foo, setFoo ] = useState(false)
  if (!foo) setTimeout(() => { setFoo(true) }, 2000)
  return null
  return foo
    ? [
      h(GrandChild),
    ]
    : [
      'bb] ',
    ]
}

Component = () => {
  return h(Child)
}
vNode = h(Component)
containerNode = document.createElement('div')
render(vNode, document.body)
*/
