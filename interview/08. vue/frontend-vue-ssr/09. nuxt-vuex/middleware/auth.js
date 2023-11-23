export default function ({ store, redirect, route }) {
  if (!store.state.user) {
    redirect({ path: '/login', query: { url: route.path } })
  }
}
