# clsx

>   A tiny (234B) utility for constructing `className` strings conditionally.
>   Also serves as a [faster](https://github.com/lukeed/clsx/blob/HEAD/bench) & smaller drop-in replacement for the `classnames` module.

This module is available in three formats:

-   **ES Module**: `dist/clsx.m.js`
-   **CommonJS**: `dist/clsx.js`
-   **UMD**: `dist/clsx.min.js`

## Install

```
$ npm install --save clsx
```

## Usage

```js
import clsx from 'clsx';
// or
import { clsx } from 'clsx';

// Strings (variadic)
clsx('foo', true && 'bar', 'baz');
//=> 'foo bar baz'

// Objects
clsx({ foo:true, bar:false, baz:isTrue() });
//=> 'foo baz'

// Objects (variadic)
clsx({ foo:true }, { bar:false }, null, { '--foobar':'hello' });
//=> 'foo --foobar'

// Arrays
clsx(['foo', 0, false, 'bar']);
//=> 'foo bar'

// Arrays (variadic)
clsx(['foo'], ['', 0, false, 'bar'], [['baz', [['hello'], 'there']]]);
//=> 'foo bar baz hello there'

// Kitchen sink (with nesting)
clsx('foo', [1 && 'bar', { baz:false, bat:null }, ['hello', ['world']]], 'cya');
//=> 'foo bar hello world cya'
```

## API

### clsx(...input)

Returns: `String`

#### input

Type: `Mixed`

The `clsx` function can take ***any*** number of arguments, each of which can be an Object, Array, Boolean, or String.

>   **Important:** *Any* falsey values are discarded!
>   Standalone Boolean values are discarded as well.

```js
clsx(true, false, '', null, undefined, 0, NaN);
//=> ''
```

## Benchmarks

For snapshots of cross-browser results, check out the [`bench`](https://github.com/lukeed/clsx/blob/HEAD/bench) directory~!

## Support

All versions of Node.js are supported.

All browsers that support [`Array.isArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Browser_compatibility) are supported (IE9+).

>   **Note:** For IE8 support and older, please install `clsx@1.0.x` and beware of [#17](https://github.com/lukeed/clsx/issues/17).

## Tailwind Support

Here some additional (optional) steps to enable classes autocompletion using `clsx` with Tailwind CSS.

<details open="" style="box-sizing: border-box; display: block; color: rgb(51, 51, 51); font-family: &quot;Source Sans Pro&quot;, &quot;Lucida Grande&quot;, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; white-space: normal; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><summary xt-marked="ok" style="box-sizing: border-box; display: list-item;">Visual Studio Code</summary><ol style="box-sizing: border-box; padding-left: 17px; padding-top: 0px; margin-top: 0px; list-style-position: outside; font-weight: 600; margin-bottom: 20px; margin-left: 16px;"><li style="box-sizing: border-box; font-weight: 400; color: rgb(51, 51, 51); margin-bottom: 2px; font-size: 1em;"><p style="box-sizing: border-box; color: rgb(51, 51, 51); font-size: 18px; margin-top: 0px; margin-bottom: 16px; line-height: 1.65; letter-spacing: 0.1px;"><a href="https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss" rel="nofollow" xt-marked="ok" style="box-sizing: border-box; background-color: transparent; color: rgb(203, 56, 55); text-decoration: none; font-size: 1em; font-weight: 600;">Install the "Tailwind CSS IntelliSense" Visual Studio Code extension</a></p></li><li style="box-sizing: border-box; font-weight: 400; color: rgb(51, 51, 51); margin-bottom: 2px; font-size: 1em;"><p xt-marked="ok" style="box-sizing: border-box; color: rgb(51, 51, 51); font-size: 18px; margin-top: 0px; margin-bottom: 16px; line-height: 1.65; letter-spacing: 0.1px;">Add the following to your<span>&nbsp;</span><a href="https://code.visualstudio.com/docs/getstarted/settings" rel="nofollow" style="box-sizing: border-box; background-color: transparent; color: rgb(203, 56, 55); text-decoration: none; font-size: 1em; font-weight: 600;"><code style="box-sizing: border-box; font-family: var(--code); font-size: 0.8em; border-radius: 2px; background: rgb(247, 247, 247); padding: 0px 5px; font-variant-ligatures: none; letter-spacing: var(--code-ls); line-height: var(--code-lh);">settings.json</code></a>:</p></li></ol><div class="highlight highlight-source-json" style="box-sizing: border-box; background-color: rgb(240, 240, 240); color: rgb(0, 0, 0); margin-bottom: 16px; border-radius: 6px;"><pre tabindex="0" style="box-sizing: border-box; font-family: monospace, monospace; font-size: 1em; margin-top: 0px; margin-bottom: 24px; padding: 13px 15px; background: rgb(247, 247, 247); border-radius: 2px; overflow-x: auto;"> {
  <span class="pl-ent" style="box-sizing: border-box; color: rgb(34, 134, 58);">"tailwindCSS.experimental.classRegex"</span>: [
    [<span class="pl-s" style="box-sizing: border-box; color: rgb(3, 47, 98);"><span class="pl-pds" style="box-sizing: border-box; color: rgb(3, 47, 98);">"</span>clsx<span class="pl-cce" style="box-sizing: border-box;">\\</span>(([^)]*)<span class="pl-cce" style="box-sizing: border-box;">\\</span>)<span class="pl-pds" style="box-sizing: border-box; color: rgb(3, 47, 98);">"</span></span>, <span class="pl-s" style="box-sizing: border-box; color: rgb(3, 47, 98);"><span class="pl-pds" style="box-sizing: border-box; color: rgb(3, 47, 98);">"</span>(?:'|<span class="pl-cce" style="box-sizing: border-box;">\"</span>|`)([^']*)(?:'|<span class="pl-cce" style="box-sizing: border-box;">\"</span>|`)<span class="pl-pds" style="box-sizing: border-box; color: rgb(3, 47, 98);">"</span></span>]
  ]
 }</pre></div></details>