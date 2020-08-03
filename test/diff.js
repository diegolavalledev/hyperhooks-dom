;(() => {
  // return console.log('SKIP TEST 1')

  const SimpleText = () => {
    const [ foo, setFoo ] = useState(false)
    if (!foo) setTimeout(() => { setFoo(true) }, 0)
    return foo ? 'foo' : 'bar'
  }

  const component = h(SimpleText)
  const $container = document.createElement('section')
  render(component, $container)
  let $firstChild = $container.firstChild.childNodes[0]
  let $text = $container.firstChild.childNodes[0].nodeValue
  console.assert($text === 'bar')

  setTimeout(() => {
     $text = $container.firstChild.childNodes[0].nodeValue
     console.assert($text === 'foo')

     // Additionally the node itself should remain untouched, not replaced with a new one with the same content
     //console.assert($firstChild === $container.childNodes[0])
  }, 0)
})()
