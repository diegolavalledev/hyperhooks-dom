_Hyperhooks DOM_ is the renderer component for [Hyperhooks](https://github.com/hyperhooks/hyperhooks-core) which targets the web browser. It provides the `render` function which inserts a component into the document at the specified node.

# Usage

To use `hyperhooks-dom` just add it together with `hyperhooks-core` directly into your page using `<script>` tags. 

```html
<script src="https://github.com/hyperhooks/hyperhooks-core/releases/download/1.0.0/hyperhooks-core.js"></script>
<script src="https://github.com/hyperhooks/hyperhooks-dom/releases/download/1.0.0/hyperhooks-dom.js"></script>
```

From your _JavaScript_ entry-point create a component hierarchy and call `render` to connect it to the document. 

```javascript
// Define our app
let App = () => {
  const [count, setCount] = useState(0)

  return h(Div, {},
    `Total bananas: ${count}`,
     h(Button, { onClick: () => { setCount(count + 1) } }, 'Add one 🍌!'),
  )
}

// Render our app into the document
render(h(App), document.querySelector('#app'))
```

# Build

`hyperhooks-dom` is written in _Pure JavaScript_ with no transpiling needed.

# Test

Tests are located in the test folder. To run them, open `test/index.html` with your browser of choice and open the development console to see the results.
