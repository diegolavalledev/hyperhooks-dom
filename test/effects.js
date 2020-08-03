;(() => {
  // return console.log('SKIP TEST 1')

  let Component, containerNode, effectRan
  containerNode = document.createElement('div')
  Component = () => {
    useEffect(() => {
      effectRan = true
    })
    return null
  }
  render(h(Component), containerNode)
  console.assert(effectRan === true)
})()

;(() => {
  // return console.log('SKIP TEST 2')

  let Component, containerNode, effectRan
  let cleanupRan
  containerNode = document.createElement('div')

  Component = () => {
    useEffect(() => {
      // do nothing
      return () => {
        cleanupRan = true
      }
    })

    const [ foo, setFoo ] = useState(true)
    setTimeout(() => { setFoo(false) }, 0)
    return foo ? 'bar' : 'baz'
  }
  render(h(Component), containerNode)
  setTimeout(() => { console.assert(cleanupRan === true) }, 0)
})()

;(() => {
  // return console.log('SKIP TEST 3')

  let Component, containerNode, effectRan
  let cleanupRan = false
  containerNode = document.createElement('div')

  Component = () => {
    useEffect(() => {
      // do nothing
      return () => {
        cleanupRan = true
      }
    }, [])

    const [ foo, setFoo ] = useState(true)
    setTimeout(() => { setFoo(false) }, 0)
    return foo ? 'bar' : 'baz'
  }
  render(h(Component), containerNode)
  // hasnt been unmounted so it should NOT run cleanup!
  setTimeout(() => { console.assert(cleanupRan === false) }, 0)
})()

;(() => {
  // return console.log('SKIP TEST 4')

  let Component, containerNode, effectRan
  let childRan, childCleanupRan

  containerNode = document.createElement('div')
  let Child = () => {
    useEffect(() => {
      childRan = true
      return () => {
        childCleanupRan = true
      }
    }, [])
    return null
  }
  let Parent = () => {
    const [ includeChild, setIncludeChild ] = useState(true)
    setTimeout(() => { setIncludeChild(false) }, 0)
    return includeChild ? h(Child) : null
  }

  render(h(Parent), containerNode)

  setTimeout(() => {
    console.assert(childRan === true)
    console.assert(childCleanupRan === true)
  }, 0)
})()
