;(() => {
  // return console.log('SKIP TEST 2')
  let resultNode, component, containerNode
  component = h(Input, {})
  containerNode = document.createElement('div')
  render(component, containerNode)
  resultNode = containerNode.querySelector('input')
  console.assert(resultNode !== null)
  console.assert(resultNode.value === '')
})()

;(() => {
  // return console.log('SKIP TEST 2')
  let resultNode, component, containerNode
  // Value prop
  component = h(Input, { value: 'foo' })
  containerNode = document.createElement('div')
  render(component, containerNode)
  resultNode = containerNode.querySelector('input')
  console.assert(resultNode.value === 'foo')

  const App = () => {
    let inputRef = useRef()
    let [ text, setText ] = useState('foo')
    return h(Div, {},
      `Current text: ${text}`,
      h(Input, {
        ref: inputRef,
        value: text,
        onchange: event => {
          //e.preventDefault()
          setText(inputRef.current.getValue().toUpperCase())
          // Optionally: event.target.value.toUpperCase()
          //return false
        },
        oninput: e => {
          // TODO: this triggers re-render and loss of focus/cursor pos
          // setText(inputRef.current.getValue().toUpperCase())
          // console.log(e.data)
        }
      })
    )
  }

  // render(h(App), document.getElementById('app'))
})()
