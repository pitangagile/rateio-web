<template>
  <div>
    <b-button-group @click="removeCenter" class="icon-trash" size="lg" variant="link"></b-button-group>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    row: {
      required: true,
    },
  },
  data() {
    return {
      code: '',
      description: '',
    };
  },
  methods: {
    removeCenter() {
      const url = 'period/delete';
      this.$http().post(url, { id: this.row._id }).then(() => { //eslint-disable-line

      }).then(() => {

      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
