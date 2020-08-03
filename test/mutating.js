;(() => { // Test
  // return console.log('SKIP TEST 1')

  let resultNode, Component, Child, GrandChild, vNode, containerNode, result
  Component = () => () => document.createElement('div')
  vNode = h(Component)
  containerNode = document.createElement('div')
  render(vNode, containerNode)
  result = containerNode.querySelector('div')
  console.assert(result !== null)
})()

;(() => { // Test
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

;(() => { // Test 9
  // return console.log('SKIP TEST 1')

  const Component = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return () => document.createElement(foo ? 'div' : 'span')
  }
  const vNode = h(Component)
  const containerNode = document.createElement('section')
  render(vNode, containerNode)
  let result = containerNode.querySelector('span')
  console.assert(result !== null)
  setTimeout(() => {
    result = containerNode.querySelector('div')
    console.assert(result !== null)
  }, 0)
})()

;(() => { // Test 10
  // return console.log('SKIP TEST 1')

  const Component = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return () => document.createElement(foo ? 'span' : 'div')
  }
  const vNode = h(Component)
  const containerNode = document.createElement('section')
  render(vNode, containerNode)
  let result = containerNode.querySelector('div')
  console.assert(result !== null)
  setTimeout(() => {
    result = containerNode.querySelector('span')
    console.assert(result !== null)
  }, 0)
})()

;(() => { // Test 11
  // return console.log('SKIP TEST 1')

  const Component = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return () => document.createElement(foo ? 'span' : 'div')
  }
  const Parent = () => ['foo', h(Component), 'bar']
  const vNode = h(Parent)
  const containerNode = document.createElement('section')
  render(vNode, containerNode)
  let result = containerNode.querySelector('div')
  console.assert(result !== null)
  result = containerNode.firstChild.childNodes[0].nodeValue
  console.assert(result === 'foo')
  result = containerNode.firstChild.childNodes[2].nodeValue
  console.assert(result === 'bar')
  setTimeout(() => {
    result = containerNode.querySelector('span')
    console.assert(result !== null)
    result = containerNode.firstChild.childNodes.length
    console.assert(result === 3)
    result = containerNode.firstChild.childNodes[0].nodeValue
    console.assert(result === 'foo')
    result = containerNode.firstChild.childNodes[2].nodeValue
    console.assert(result === 'bar')
  }, 0)
})()

;(() => {
  // return console.log('SKIP TEST 1')

  // Test component that mutates from native to non-native
  // https://github.com/hyperhooks/hyperhooks/issues/6
  const Component = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return foo
      ? 'baz'
      : () => document.createElement('span')
  }
  const Parent = () => h(Component)
  const vNode = h(Parent)
  const containerNode = document.createElement('section')
  render(vNode, containerNode)
  let result = containerNode.querySelector('span')
  console.assert(result !== null)
  setTimeout(() => {
    result = containerNode.querySelector('span')
    console.assert(result === null)
    result = containerNode.firstChild.childNodes.length
    console.assert(result === 1)
    result = containerNode.firstChild.firstChild.childNodes.length
    console.assert(result === 1)
    result = containerNode.firstChild.firstChild.childNodes[0].nodeValue
    console.assert(result === 'baz')
  }, 0)
})()


;(() => { // Test 13
  // return console.log('SKIP TEST 1')

  const Component = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return foo
      ? () => document.createElement('div')
      : 'baz'
  }
  const Parent = () => h(Component)
  const vNode = h(Parent)
  const containerNode = document.createElement('section')
  render(vNode, containerNode)
  let result = containerNode.querySelector('div')
  console.assert(result === null)
  result = containerNode.firstChild.childNodes.length
  console.assert(result === 1)
  result = containerNode.firstChild.firstChild.childNodes.length
  console.assert(result === 1)
  result = containerNode.firstChild.firstChild.childNodes[0].nodeValue
  console.assert(result === 'baz')
  setTimeout(() => {
    result = containerNode.querySelector('div')
    console.assert(result !== null)
  }, 0)
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
  resultNodeList = containerNode.firstChild.childNodes
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
