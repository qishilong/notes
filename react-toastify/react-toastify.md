# React-Toastify

🎉 React-Toastify allows you to add notifications to your app with ease. No more nonsense!

## Installation

```
$ npm install --save react-toastify
$ yarn add react-toastify
```

## Features

-   Easy to set up for real, you can make it work in less than 10sec!
-   Super easy to customize
-   RTL support
-   Swipe to close 👌
-   Can choose swipe direction
-   Super easy to use an animation of your choice. Works well with animate.css for example
-   Can display a react component inside the toast!
-   Has `onOpen` and `onClose` hooks. Both can access the props passed to the react component rendered inside the toast
-   Can remove a toast programmatically
-   Define behavior per toast
-   Pause toast when the window loses focus 👁
-   Fancy progress bar to display the remaining time
-   Possibility to update a toast
-   You can control the progress bar a la `nprogress` 😲
-   You can limit the number of toast displayed at the same time
-   Dark mode 🌒
-   And much more !

## The gist

```jsx
  import React from 'react';

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  function App(){
    const notify = () => toast("Wow so easy!");

    return (
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    );
  }
```

## Demo

[A demo is worth a thousand words](https://fkhadra.github.io/react-toastify/introduction)

## Documentation

Check the [documentation](https://fkhadra.github.io/react-toastify/introduction) to get you started!

## Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions are welcome! Take a look at the contributing guide.

You can also find me on [reactiflux](https://www.reactiflux.com/). My pseudo is Fadi.