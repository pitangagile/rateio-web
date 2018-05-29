<template>
  <div>
    <b-button-group @click="removeCenter" class="icon-edit" size="lg" variant="link"></b-button-group>
  </div>
</template>

<script>
import * as moment from 'moment';

export default {
  components: {
    moment,
  },
  props: {
    row: {
      required: true,
    },
  },
  data() {
    return {
      closureDate: new Date(),
    };
  },
  methods: {
    removeCenter() {
      const url = 'period/closuredate';
      const closure = moment(this.closureDate).format('D M YYYY');
      this.$http().post(url, { id: this.row._id, closuredate: closure}).then(() => { //eslint-disable-line

      }).then(() => {
        this.$emit('allPeriods');
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
