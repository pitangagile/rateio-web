<template>
  <div>
    <b-button-group @click="removePeriod" class="icon-trash" size="lg" variant="link"></b-button-group>
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
    removePeriod() {
      const url = 'period/delete';
      this.$http().post(url, { id: this.row._id }).then(() => { //eslint-disable-line

      }).then(() => {
        this.$emit('allPeriods');
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
