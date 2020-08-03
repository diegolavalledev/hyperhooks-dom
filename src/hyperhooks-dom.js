'use strict'
const Span = props => () => {
  let $elem = document.createElement('span')
  if (props.color)
    $elem.style.color = props.color
  return $elem
}

const Input = props => {

  // hooks and effect should be outside the native implementation
  useEffect(() => {
    // console.log('Mounting')
    return () => {
      // console.log('Unmounting')
    }
  }, [])

  let elRef = useRef() // useRef could also be in the native implementation

  return () => {
    let $elem = elRef.current || document.createElement('input')
    if (!elRef.current) {
      elRef.current = $elem
      if (props.ref) {
        props.ref.current = {
          getValue: () => $elem.value
        }
      }
    }
    let { selectionStart, selectionEnd } = $elem

    // TODO: implement button/submit types
    $elem.type = props.type ? props.type : 'text'
    if (props.placeholder) {
      $elem.placeholder = props.placeholder
    }
    if (props.onChange) {
      $elem.onchange = () => {
        props.onChange($elem.value)
      }
    }
    if (props.onInput) {
      $elem.oninput = () => {
        props.onInput($elem.value)
      }
    }
    if (props.value) {
      $elem.value = props.value
    }
    if (document.activeElement === $elem) {
      $elem.selectionStart = selectionStart
      $elem.selectionEnd = selectionEnd
      setTimeout(() => { $elem.focus() }, 0)
    }
    return $elem
  }
}

const Div = props => () => {
  let $elem = document.createElement('div')
  if (props.style) {
    $elem.style.border = props.style.border
  }
  if (props.onclick) {
    $elem.onclick = props.onclick
  }
  return $elem
}

const Button = props => () => {
  // TODO: implement more of the button html/dom/react interface
  let $elem = document.createElement('button')
  $elem.type = 'button'
  if (props.onClick) {
    $elem.onclick = props.onClick
  }
  return $elem
}

const render = makeRender((virtualNode, payload) => {
  // We are now inside an invokation of `render()`
  // We will generate our DOM and also provide:
  //   - Payload to be included with our child virtual nodes render invokation
  //   - Payload to be included with new re-renderings of this very same virtual node

  // Let's decode our payload
  let {
    $parent,
    $replaceNode,
  } = payload instanceof Node ? { $parent: payload } : payload

  // Either this is the initial render call with a DOM node to attach to
  // Or we could be mounting for the first time or updating
  let $newNode
  if (typeof virtualNode === 'string') {
    $newNode = document.createTextNode(virtualNode)
  } else {
    const { nativeComponent } = virtualNode
    if (nativeComponent) {
      $newNode = nativeComponent()
    } else {
      // TODO: Remove the following line once $children and $siblings are implemented properly
      $newNode = document.createElement(`_hyperhooks--${virtualNode.component.name}`)
    }
  }

  return {
    childPayload: { $parent: $newNode },

    childrenDidRender: () => {
      if ($replaceNode) {
        $replaceNode.parentNode.replaceChild($newNode, $replaceNode)
      } else {
        $parent.appendChild($newNode)
      }
      return {
        rerenderPayload: { $replaceNode: $newNode }
      }
    }
  }
})

const _render_flatten_custom_components = makeRender((virtualNode, payload) => {

  let {
    $parent,
    $siblings,
    $insertAfter = null,
    $removeNodes,
  } = payload instanceof Node ? { $parent: payload } : payload

  let $newNode, $children
  if (typeof virtualNode === 'string') {
    $newNode = document.createTextNode(virtualNode)
  } else {
    const { nativeComponent } = virtualNode
    if (nativeComponent) {
      $newNode = nativeComponent()
    } else {
      // This is a custom component, let's provide a container to aggregate our children
      $children = []
    }
  }

  return {

    childPayload: {
      $parent: $newNode ? $newNode : $parent,
      ...$children ? { $siblings: $children } : {},
      $insertAfter: $newNode ? null : $insertAfter,
    },

    childrenDidRender: () => {
      if ($removeNodes) {
        $removeNodes.flat(Infinity).forEach($child => {
          $parent.removeChild($child)
        })
      }

      if ($newNode) { // We are a new element
      
        // Figure out where to insert ourselves
        let $insertBefore = null
        if ($insertAfter) {
          $insertBefore = $insertAfter.nextSibling
        }
        if ($siblings) {
          for(const $sibling of $siblings) {
            if ($insertBefore && $insertBefore.nextSibling) {
              $insertBefore = $insertBefore.nextSibling
            }
          }
        }
        // Insert ourselves
        $parent.insertBefore($newNode, $insertBefore)
        
        if ($siblings) {
          // We have other DOM Nodes that are our siblings
          $siblings.push($newNode)
        }
      } else if ($children && $siblings) {
        $siblings.push($children)
      }
      
      return {
        rerenderPayload: {
          $parent,
          $removeNodes: $newNode ? [ $newNode ] : $children,
          $insertAfter: $parent.lastChild,
        }
      }
    }
  }
})
