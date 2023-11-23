<template>
  <div id="app">
    <Modal>
      <Center>
        <Loading />
      </Center>
    </Modal>
  </div>
</template>

<script>
import Loading from "./components/Loading";
import Center from "./components/Center";
import Modal from "./components/Modal";
export default {
  components: {
    Loading,
    Center,
    Modal,
  },
};
</script>
