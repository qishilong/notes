# Vie-property-decorator

## Usage

There are several decorators and 1 function (Mixin):

-   [`@Prop`](https://www.npmjs.com/package/vue-property-decorator#Prop)
-   [`@PropSync`](https://www.npmjs.com/package/vue-property-decorator#PropSync)
-   [`@Model`](https://www.npmjs.com/package/vue-property-decorator#Model)
-   [`@ModelSync`](https://www.npmjs.com/package/vue-property-decorator#ModelSync)
-   [`@Watch`](https://www.npmjs.com/package/vue-property-decorator#Watch)
-   [`@Provide`](https://www.npmjs.com/package/vue-property-decorator#Provide)
-   [`@Inject`](https://www.npmjs.com/package/vue-property-decorator#Provide)
-   [`@ProvideReactive`](https://www.npmjs.com/package/vue-property-decorator#ProvideReactive)
-   [`@InjectReactive`](https://www.npmjs.com/package/vue-property-decorator#ProvideReactive)
-   [`@Emit`](https://www.npmjs.com/package/vue-property-decorator#Emit)
-   [`@Ref`](https://www.npmjs.com/package/vue-property-decorator#Ref)
-   [`@VModel`](https://www.npmjs.com/package/vue-property-decorator#VModel)
-   `@Component` (**provided by** [vue-class-component](https://github.com/vuejs/vue-class-component))
-   `Mixins` (the helper function named `mixins` **provided by** [vue-class-component](https://github.com/vuejs/vue-class-component))

## See also

[vuex-class](https://github.com/ktsn/vuex-class/)

### `@Prop(options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```
import { Vue, Component, Prop } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @Prop(Number) readonly propA: number | undefined
  @Prop({ default: 'default value' }) readonly propB!: string
  @Prop([String, Boolean]) readonly propC: string | boolean | undefined
}
```

is equivalent to

```
export default {
  props: {
    propA: {
      type: Number,
    },
    propB: {
      default: 'default value',
    },
    propC: {
      type: [String, Boolean],
    },
  },
}
```

**Note that:**

## If you'd like to set `type` property of each prop value from its type definition, you can use [reflect-metadata](https://github.com/rbuckton/reflect-metadata).

1.  Set `emitDecoratorMetadata` to `true`.
2.  Import `reflect-metadata` **before** importing `vue-property-decorator` (importing `reflect-metadata` is needed just once.)

```
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'
 
@Component
export default class MyComponent extends Vue {
  @Prop() age!: number
}
```

## Each prop's default value need to be defined as same as the example code shown in above.

It's **not** supported to define each `default` property like `@Prop() prop = 'default value'` .

### `@PropSync(propName: string, options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```
import { Vue, Component, PropSync } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @PropSync('name', { type: String }) syncedName!: string
}
```

is equivalent to

```
export default {
  props: {
    name: {
      type: String,
    },
  },
  computed: {
    syncedName: {
      get() {
        return this.name
      },
      set(value) {
        this.$emit('update:name', value)
      },
    },
  },
}
```

[`@PropSync`](https://www.npmjs.com/package/vue-property-decorator#PropSync) works like [`@Prop`](https://www.npmjs.com/package/vue-property-decorator#Prop) besides the fact that it takes the propName as an argument of the decorator, and also creates a computed getter and setter behind the scenes. This way you can interface with the property as if it was a regular data property whilst making it as easy as appending the `.sync` modifier in the parent component.

### `@Model(event?: string, options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```
import { Vue, Component, Model } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @Model('change', { type: Boolean }) readonly checked!: boolean
}
```

is equivalent to

```
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
}
```

`@Model` property can also set `type` property from its type definition via `reflect-metadata` .

### `@ModelSync(propName: string, event?: string, options: (PropOptions | Constructor[] | Constructor) = {})` decorator

```
import { Vue, Component, ModelSync } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @ModelSync('checked', 'change', { type: Boolean })
  readonly checkedValue!: boolean
}
```

is equivalent to

```
export default {
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    checked: {
      type: Boolean,
    },
  },
  computed: {
    checkedValue: {
      get() {
        return this.checked
      },
      set(value) {
        this.$emit('change', value)
      },
    },
  },
}
```

`@ModelSync` property can also set `type` property from its type definition via `reflect-metadata` .

### `@Watch(path: string, options: WatchOptions = {})` decorator

```
import { Vue, Component, Watch } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @Watch('child')
  onChildChanged(val: string, oldVal: string) {}
 
  @Watch('person', { immediate: true, deep: true })
  onPersonChanged1(val: Person, oldVal: Person) {}
 
  @Watch('person')
  onPersonChanged2(val: Person, oldVal: Person) {}
}
```

is equivalent to

```
export default {
  watch: {
    child: [
      {
        handler: 'onChildChanged',
        immediate: false,
        deep: false,
      },
    ],
    person: [
      {
        handler: 'onPersonChanged1',
        immediate: true,
        deep: true,
      },
      {
        handler: 'onPersonChanged2',
        immediate: false,
        deep: false,
      },
    ],
  },
  methods: {
    onChildChanged(val, oldVal) {},
    onPersonChanged1(val, oldVal) {},
    onPersonChanged2(val, oldVal) {},
  },
}
```

### `@Provide(key?: string | symbol)` / `@Inject(options?: { from?: InjectKey, default?: any } | InjectKey)` decorator

```
import { Component, Inject, Provide, Vue } from 'vue-property-decorator'
 
const symbol = Symbol('baz')
 
@Component
export class MyComponent extends Vue {
  @Inject() readonly foo!: string
  @Inject('bar') readonly bar!: string
  @Inject({ from: 'optional', default: 'default' }) readonly optional!: string
  @Inject(symbol) readonly baz!: string
 
  @Provide() foo = 'foo'
  @Provide('bar') baz = 'bar'
}
```

is equivalent to

```
const symbol = Symbol('baz')
 
export const MyComponent = Vue.extend({
  inject: {
    foo: 'foo',
    bar: 'bar',
    optional: { from: 'optional', default: 'default' },
    baz: symbol,
  },
  data() {
    return {
      foo: 'foo',
      baz: 'bar',
    }
  },
  provide() {
    return {
      foo: this.foo,
      bar: this.baz,
    }
  },
})
```

### `@ProvideReactive(key?: string | symbol)` / `@InjectReactive(options?: { from?: InjectKey, default?: any } | InjectKey)` decorator

These decorators are reactive version of `@Provide` and `@Inject`. If a provided value is modified by parent component, then the child component can catch this modification.

```
const key = Symbol()
@Component
class ParentComponent extends Vue {
  @ProvideReactive() one = 'value'
  @ProvideReactive(key) two = 'value'
}
 
@Component
class ChildComponent extends Vue {
  @InjectReactive() one!: string
  @InjectReactive(key) two!: string
}
```

### `@Emit(event?: string)` decorator

The functions decorated by `@Emit` `$emit` their return value followed by their original arguments. If the return value is a promise, it is resolved before being emitted.

If the name of the event is not supplied via the `event` argument, the function name is used instead. In that case, the camelCase name will be converted to kebab-case.

```
import { Vue, Component, Emit } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  count = 0
 
  @Emit()
  addToCount(n: number) {
    this.count += n
  }
 
  @Emit('reset')
  resetCount() {
    this.count = 0
  }
 
  @Emit()
  returnValue() {
    return 10
  }
 
  @Emit()
  onInputChange(e) {
    return e.target.value
  }
 
  @Emit()
  promise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(20)
      }, 0)
    })
  }
}
```

is equivalent to

```
export default {
  data() {
    return {
      count: 0,
    }
  },
  methods: {
    addToCount(n) {
      this.count += n
      this.$emit('add-to-count', n)
    },
    resetCount() {
      this.count = 0
      this.$emit('reset')
    },
    returnValue() {
      this.$emit('return-value', 10)
    },
    onInputChange(e) {
      this.$emit('on-input-change', e.target.value, e)
    },
    promise() {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(20)
        }, 0)
      })
 
      promise.then((value) => {
        this.$emit('promise', value)
      })
    },
  },
}
```

### `@Ref(refKey?: string)` decorator

```
import { Vue, Component, Ref } from 'vue-property-decorator'
 
import AnotherComponent from '@/path/to/another-component.vue'
 
@Component
export default class YourComponent extends Vue {
  @Ref() readonly anotherComponent!: AnotherComponent
  @Ref('aButton') readonly button!: HTMLButtonElement
}
```

is equivalent to

```
export default {
  computed() {
    anotherComponent: {
      cache: false,
      get() {
        return this.$refs.anotherComponent as AnotherComponent
      }
    },
    button: {
      cache: false,
      get() {
        return this.$refs.aButton as HTMLButtonElement
      }
    }
  }
}
```

### `@VModel(propsArgs?: PropOptions)` decorator

```
import { Vue, Component, VModel } from 'vue-property-decorator'
 
@Component
export default class YourComponent extends Vue {
  @VModel({ type: String }) name!: string
}
```

is equivalent to

```
export default {
  props: {
    value: {
      type: String,
    },
  },
  computed: {
    name: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
```

## 例子

```ts
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component({
	name: 'NewConsumerDiscount',
	components: {},
})
export default class NewConsumerDiscount extends Vue {
	@Prop({}) discountData: any;
	@Watch('discountData', { deep: true, immediate: false })
	onDataChange(val: any, oldVal: any) {
		this.discountData = val;
		this.countDown = this.discountData.countDownTime;
		this.timerId = setInterval(() => {
			this.countDown -= 1000;
		}, 1000);
		this.handleCouponData();
		this.handleTicket();
		this.handleComponentClient();
	}
	countDown: number = 0;
	@Watch('countDown', { immediate: true, deep: true })
	onTimeChange(val: number, oldVal: number) {
		if (val <= 0) {
			clearInterval(this.timerId);
		}
		this.handleDate();
	}

	@Prop() statusTextClick: Function;

	private dayTime = 1000 * 60 * 60 * 24;
	day: number = 0;
	hour: number | string = 0;
	minutes: number | string = 0;
	seconds: number | string = 0;
	timerId: number | null = null;
	couponImg: string = '';
	descTextFontSize: number = 0;
	ticketData: any[] = [];
	ticketWidth: string = '';
	componentClient: any = {};
	// 得到 rpx 单位的窗口高度
	rpxHeight: number = 0;
	// 屏幕 rpx 比率
	rpxRatio: number = 0;

	// 按钮状态
	isShow: boolean = false;

	handleDate() {
		const date = new Date(this.countDown);
		this.day = Math.floor(this.countDown / this.dayTime);
		this.hour = String(date.getUTCHours()).padStart(2, '0');
		this.minutes = String(date.getUTCMinutes()).padStart(2, '0');
		this.seconds = String(date.getUTCSeconds()).padStart(2, '0');
	}

	handleCouponData() {
		const couponData = this.discountData.couponNodeList;
		if (couponData.length >= 4) {
			this.couponImg = 'https://techimg.ziroom.com/f0181cd5-d89e-4414-909e-3beda18a306c.png';
		} else {
			this.couponImg = 'https://techimg.ziroom.com/0f9897dc-bf10-475c-b79c-a13e7b58f84c.png ';
		}
	}

	// 处理按钮状态和字体
	handleStatusText(flag: string, status: number | string) {
		if (flag == 'class') {
			switch (status) {
				case 0:
					return 'status-text-open';
				case 1:
					return 'status-text-close';
				case 2:
					return 'status-text-close';
				default:
					return 'status-text-open';
			}
		} else {
			switch (status) {
				case 0:
					return '未使用';
				case 1:
					return '已使用';
				case 2:
					return '已过期';
				default:
					return '已使用';
			}
		}
	}

	handleComponentClient() {
		const query = uni.createSelectorQuery();
		query
			.select('.wrapper')
			.boundingClientRect((res) => {
				this.componentClient = res;
				console.log(res);
				this.handleDescText();
			})
			.exec();
		const res = uni.getSystemInfoSync();
		const h = res.windowHeight;
		const w = res.windowWidth;
		this.rpxHeight = h * (750 / w);
		this.rpxRatio = 750 / w;
	}
	handleTicket() {
		this.ticketData = this.discountData.couponNodeList;
		const length = this.ticketData.length >= 4 ? 4 : this.ticketData.length;
		this.ticketWidth = `${String(100 / length).substring(0, 1)}2`;
	}

	handleDescText() {
		const descTextWidth =
			((this.componentClient.width - 46 / this.rpxRatio) * Number(this.ticketWidth)) / 100;
		this.descTextFontSize = descTextWidth * this.rpxRatio;
	}
}
```

在使用 `@Prop` 获取参数后，一般要使用 `@Watch` 监听函数监听和获取参数参数

<img src="https://qiniucloud.qishilong.space/images/image-20231107100527011.png" alt="image-20231107100527011" style="zoom:50%;" />