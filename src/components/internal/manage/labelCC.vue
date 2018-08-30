<template>
  <label>{{description | toUpper}}</label>
</template>

<script>
  /* eslint-disable */
  export default {
    props: {
      id: {
        required: true
      },
    },
    data() {
      return {
        description: '',
      }
    },
    mounted() {
      this.findCostCenterById();
    },
    methods: {
      findCostCenterById(){
        this.$http().get('costcenter/findById', {params: {'_id': this.id}}).then((response, err) => {
          if (err) console.log('err > ', err);
          console.log('response > ', response);
          this.description = response.data.description;
        })
      },
    }, filters : {
      toUpper(value){
        if (value){
          return value.toUpperCase();
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
