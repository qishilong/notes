# KeyboardEvent.code

`KeyboardEvent.code`属性表示键盘上的物理键（与按键生成的字符相对）。换句话说，此属性返回一个值，该值不会被键盘布局或修饰键的状态改变。

如果输入设备不是物理键盘，而是虚拟键盘或辅助功能设备，则浏览器将设置返回值，以尽可能地匹配物理键盘所发生的情况，从而最大限度地提高物理和虚拟输入设备之间的兼容性。

当您想要根据输入设备上的物理位置处理键而不是与这些键相关联的字符时，此属性非常有用;这在编写代码来处理游戏输入时尤为常见，这些游戏使用键盘上的键来模拟类似游戏板的环境。但请注意，您无法使用 `KeyboardEvent.code`报告的值来确定击键生成的字符，因为键码的名称可能与按键上打印的实际字符或按下键时计算机生成的字符不匹配。

例如，QWERTY 布局键盘上的“q”键返回的`code`是“`KeyQ`”，但 Dvorak 键盘上的“'”键和 AZERTY 键盘上的“a”键也返回的相同`code`值。这使得如果用户没有使用预期的键盘布局，则无法使用`code`值来确定用户按键的名称。

要确定哪个字符与键事件对应，请改用[`KeyboardEvent.key`](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key)属性。

## [示例](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#示例)

### [练习 KeyboardEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#练习_keyboardevent)

#### HTML

```html
<p>Press keys on the keyboard to see what the KeyboardEvent's key and code
   values are for each one.</p>
<div id="output">
</div>
```

#### CSS

```css
#output {
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid black;
}
```

#### JavaScript

```js
window.addEventListener("keydown", function(event) {
  let str = "KeyboardEvent: key='" + event.key + "' | code='" +
            event.code + "'";
  let el = document.createElement("span");
  el.innerHTML = str + "<br/>";

  document.getElementById("output").appendChild(el);
}, true);
```

#### Try it out

To ensure that keystrokes go to the sample, click in the output box below before pressing keys.

<iframe class="sample-code-frame" title="练习 KeyboardEvent sample" id="frame_练习_keyboardevent" width="600" height="300" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/KeyboardEvent/code/_sample_.%E7%BB%83%E4%B9%A0_keyboardevent.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

### [Handle keyboard events in a game](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/code#handle_keyboard_events_in_a_game)

This example establishes an event listener for [`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event) events which handles keyboard input for a game which uses the typical "WASD" keyboard layout for steering forward, left, backward, and right. This will use the same four keys physically regardless of what the actual corresponding characters are, such as if the user is using an AZERTY keyboard.

#### HTML

```html
<p>Use the WASD (ZQSD on AZERTY) keys to move and steer.</p>
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="world">
  <polygon id="spaceship" points="15,0 0,30 30,30"/>
</svg>
<script>refresh();</script>
```

#### CSS

```css
.world {
  margin: 0px;
  padding: 0px;
  background-color: black;
  width: 400px;
  height: 400px;
}

#spaceship {
  fill: orange;
  stroke: red;
  stroke-width: 2px;
}
```

#### JavaScript

The first section of the JavaScript code establishes some variables we'll be using. `shipSize` contains the size of the ship the player is moving around, for convenience. `position` is used to track the position of the ship within the play field. `moveRate` and `turnRate` are the number of pixels forward and backward each keystroke moves the ship and how many degrees of rotation the left and right steering controls apply per keystroke. angle is the current amount of rotation applied to the ship, in degrees; it starts at 0° (pointing straight up). Finally, `spaceship` is set to refer to the element with the ID `"spaceship"`, which is the SVG polygon representing the ship the player controls.

```js
let shipSize = {
  width: 30,
  height: 30
};

let position = {
  x: 200,
  y: 200
};

let moveRate = 9;
let turnRate = 5;

let angle = 0;

let spaceship = document.getElementById("spaceship");
```

Next comes the function `updatePosition()`. This function takes as input the distance the ship is to be moved, where positive is a forward movement and negative is a backward movement. This function computes the new position of the ship given the distance moved and the current direction the ship is facing. It also handles ensuring that the ship wraps across the boundaries of the play field instead of vanishing.

```js
function updatePosition(offset) {
  let rad = angle * (Math.PI/180);
  position.x += (Math.sin(rad) * offset);
  position.y -= (Math.cos(rad) * offset);

  if (position.x < 0) {
    position.x = 399;
  } else if (position.x > 399) {
    position.x = 0;
  }

  if (position.y < 0) {
    position.y = 399;
  } else if (position.y > 399) {
    position.y = 0;
  }
}
```

The `refresh()` function handles applying the rotation and position by using an [SVG transform](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/transform).

```js
function refresh() {
  let x = position.x - (shipSize.width/2);
  let y = position.y - (shipSize.height/2);
  let transform = "translate(" + x + " " + y + ") rotate(" + angle + " 15 15) ";

  spaceship.setAttribute("transform", transform);
}
```

Finally, the `addEventListener()` method is used to start listening for [`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event) events, acting on each key by updating the ship position and rotation angle, then calling `refresh()` to draw the ship at its new position and angle.

```js
window.addEventListener("keydown", function(event) {
  if (event.preventDefaulted) {
    return; // Do nothing if event already handled
  }

  switch(event.code) {
    case "KeyS":
    case "ArrowDown":
      // Handle "back"
      updatePosition(-moveRate);
      break;
    case "KeyW":
    case "ArrowUp":
      // Handle "forward"
      updatePosition(moveRate);
      break;
    case "KeyA":
    case "ArrowLeft":
      // Handle "turn left"
      angle -= turnRate;
      break;
    case "KeyD":
    case "ArrowRight":
      // Handle "turn right"
      angle += turnRate;
      break;
  }

  refresh();

  // Consume the event so it doesn't get handled twice
  event.preventDefault();
}, true);
```

#### Try it out

To ensure that keystrokes go to the sample code, click inside the black game play field below before pressing keys.

<iframe class="sample-code-frame" title="Handle keyboard events in a game sample" id="frame_handle_keyboard_events_in_a_game" width="420" height="460" src="https://live-samples.mdn.mozilla.net/zh-CN/docs/Web/API/KeyboardEvent/code/_sample_.handle_keyboard_events_in_a_game.html" loading="lazy" style="box-sizing: content-box; border: 1px solid var(--border-primary); max-width: 100%; width: calc((100% - 2rem) - 2px); background: rgb(255, 255, 255); border-radius: var(--elem-radius); padding: 1rem;"></iframe>

There are several ways this code can be made better. Most real games would watch for [`keydown`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keydown_event) events, start motion when that happens, and stop the motion when the corresponding [`keyup`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/keyup_event) occurs, instead of relying on key repeats. That would allow both smoother and faster movement, but would also allow the player to be moving and steering at the same time. Transitions or animations could be used to make the ship's movement smoother, too.