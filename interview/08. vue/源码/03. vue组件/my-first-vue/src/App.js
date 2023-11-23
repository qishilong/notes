import UserInfo from "./components/UserInfo.js";

var template = `<div id="app">
<UserInfo v-for="(item,i) in users" :key="i" :name="item.name" :age="item.age" />
</div>`;

export default {
  template,
  components: {
    UserInfo,
  },
  data() {
    return {
      users: [
        { name: "成哥", age: 18 },
        { name: "邓哥", age: 68 },
        { name: "monica", age: 16 },
      ],
    };
  },
};
