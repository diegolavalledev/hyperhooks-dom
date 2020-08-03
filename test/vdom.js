;(() => {
  // return console.log('SKIP TEST 1')

  const Parent = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return h(Div, {},
      foo ? 'foo' : 'FOO',
    )
  }

  const parent = h(Parent)
  const $container = document.createElement('section')
  render(parent, $container)
  let $div = $container.querySelector('div')
  console.assert($div !== null)
  let $text = $div.childNodes[0].nodeValue
  console.assert($text === 'FOO')
  setTimeout(() => {
    $div = $container.querySelector('div')
    console.assert($div !== null)
    $text = $div.childNodes[0].nodeValue
    console.assert($text === 'foo')
  }, 0)
})()

;(() => {
  // return console.log('SKIP TEST 2')

  const Child = () => {
    const [ bar, setBar ] = useState(false)
    //if (!bar) setTimeout(() => { setBar(true) }, 0)
    return h(Span, {},
      bar ? 'bar' : 'BAR'
    )
  }

  const Parent = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return h(Div, {},
      foo ? 'foo' : 'FOO',
      h(Child)
    )
  }

  const parent = h(Parent)
  const $container = document.createElement('section')
  render(parent, $container)
  let $div = $container.querySelector('div')
  console.assert($div !== null)
  let $text = $div.childNodes[0].nodeValue
  console.assert($text === 'FOO')
  let $span = $div.querySelector('span')
  console.assert($span !== null)
  $text = $span.childNodes[0].nodeValue
  console.assert($text === 'BAR')
  setTimeout(() => {
    $div = $container.querySelector('div')
    console.assert($div !== null)
    $text = $div.childNodes[0].nodeValue
    console.assert($text === 'foo')
    $span = $container.querySelector('span')
    console.assert($span !== null)
    $text = $span.childNodes[0].nodeValue
    console.assert($text === 'BAR')
  }, 0)
})()

;(() => {
  // return console.log('SKIP TEST 3')

  const Child = () => {
    const [ bar, setBar ] = useState(false)
    if (!bar) setTimeout(() => { setBar(true) }, 0)
    return bar ? 'bar' : 'BAR'
  }

  const Parent = () => {
    const [ foo, setFoo ] = useState(false)
    //if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return [
      'foo',
      h(Child),
    ]
  }

  const parent = h(Parent)
  const $container = document.createElement('section')
  render(parent, $container)
  console.assert($container.firstChild.childNodes.length > 0)
  $text = $container.firstChild.childNodes[0].nodeValue
  console.assert($text === 'foo')
  console.assert($container.firstChild.childNodes.length > 1)
  $text = $container.firstChild.childNodes[1].childNodes[0].nodeValue
  console.assert($text === 'BAR')
  setTimeout(() => {
    console.assert($container.firstChild.childNodes.length > 0)
    $text = $container.firstChild.childNodes[0].nodeValue
    console.assert($text === 'foo')
    console.assert($container.firstChild.childNodes.length > 1)
    $text = $container.firstChild.childNodes[1].childNodes[0].nodeValue
    console.assert($text === 'bar')
  }, 0)
})()

;(() => {
  // return console.log('SKIP TEST 4')

  // Fails because after children are re-rendered, all references to nodes that need to be removed/replaced become wrong.

  const Child = () => {
    const [ bar, setBar ] = useState(false)
    if (!bar) setTimeout(() => { setBar(true) }, 0)
    return bar ? 'bar' : 'notbar'
  }

  const Parent = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 10)
    return [
      foo ? 'foo' : 'notfoo',
      h(Child),
    ]
  }

  const parent = h(Parent)
  const $container = document.createElement('section')
  //const $container = document.querySelector('#app')
  render(parent, $container)
  let $componentElem = $container.firstChild
  console.assert($componentElem !== null)
  console.assert($componentElem.childNodes.length > 0)
  $text = $componentElem.childNodes[0].nodeValue
  console.assert($text === 'notfoo')

  $componentElem = $componentElem.childNodes[1]
  console.assert($componentElem !== undefined)
  console.assert($componentElem !== null)
  console.assert($componentElem.childNodes.length > 0)
  $text = $componentElem.childNodes[0].nodeValue
  console.assert($text === 'notbar')

  setTimeout(() => {
    let $componentElem = $container.firstChild
    console.assert($componentElem !== null)
    console.assert($componentElem.childNodes.length > 0)
    $text = $componentElem.childNodes[0].nodeValue
    console.assert($text === 'notfoo')
    $componentElem = $componentElem.childNodes[1]
    console.assert($componentElem !== undefined)
    console.assert($componentElem !== null)
    console.assert($componentElem.childNodes.length > 0)
    $text = $componentElem.childNodes[0].nodeValue
    console.assert($text === 'bar')
  }, 0)
  setTimeout(() => {
    let $componentElem = $container.firstChild
    console.assert($componentElem !== null)
    console.assert($componentElem.childNodes.length > 0)
    $text = $componentElem.childNodes[0].nodeValue
    console.assert($text === 'foo')
    $componentElem = $componentElem.childNodes[1]
    console.assert($componentElem !== undefined)
    console.assert($componentElem !== null)
    console.assert($componentElem.childNodes.length > 0)
    $text = $componentElem.childNodes[0].nodeValue
    console.assert($text === 'bar')
  }, 100)
})()


;(() => {
  // return console.log('SKIP TEST 5')

  const Child = () => {
    const [ bar, setBar ] = useState(false)
    if (!bar) setTimeout(() => { setBar(true) }, 0)
    return h(Div, {},
      bar ? 'bar' : 'BAR'
    )
  }

  const Parent = () => {
    const [ foo, setFoo ] = useState(false)
    // if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return [
      foo ? 'foo' : 'FOO',
      h(Child)
    ]
  }

  const parent = h(Parent)
  const $container = document.createElement('section')
  render(parent, $container)
  console.assert($container.childNodes.length > 0)
  $text = $container.firstChild.childNodes[0].nodeValue
  console.assert($text === 'FOO')
  let $div = $container.querySelector('div')
  console.assert($div !== null)
  $text = $div.childNodes[0].nodeValue
  console.assert($text === 'BAR')
  setTimeout(() => {
    console.assert($container.firstChild.childNodes.length > 0)
    $text = $container.firstChild.childNodes[0].nodeValue
    console.assert($text === 'FOO')
    let $div = $container.querySelector('div')
    console.assert($div !== null)
    $text = $div.childNodes[0].nodeValue
    console.assert($text === 'bar')
  }, 0)
})()

;(() => {
  // return console.log('SKIP TEST 6')

  const Child = () => {
    const [ bar, setBar ] = useState(false)
    if (!bar) setTimeout(() => { setBar(true) }, 0)
    return h(Span, {},
      bar ? 'bar' : 'BAR'
    )
  }

  const Parent = () => {
    const [ foo, setFoo ] = useState(false)
    // if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return h(Div, {},
      foo ? 'foo' : 'FOO',
      h(Child)
    )
  }

  const parent = h(Parent)
  const $container = document.createElement('section')
  render(parent, $container)
  let $div = $container.querySelector('div')
  console.assert($div !== null)
  let $text = $div.childNodes[0].nodeValue
  console.assert($text === 'FOO')
  let $span = $div.querySelector('span')
  console.assert($span !== null)
  $text = $span.childNodes[0].nodeValue
  console.assert($text === 'BAR')
  setTimeout(() => {
    $div = $container.querySelector('div')
    console.assert($div !== null)
    $text = $div.childNodes[0].nodeValue
    console.assert($text === 'FOO')
    $span = $container.querySelector('span')
    console.assert($span !== null)
    $text = $span.childNodes[0].nodeValue
    console.assert($text === 'bar')
  }, 0)
})()

;(() => {
  // return console.log('SKIP TEST 7')
  const $container = document.createElement('section')

  let SecondChild = () => 'I am the second child'
  let Child = () => 'I am child'
  let Parent = () => ['Parent', h(Child), h(SecondChild)]
  let instance = h(Parent)
  render(instance, $container)
})()
