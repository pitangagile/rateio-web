<template>
  <b-progress :value="percent"
              :max="100"
              show-progress animated
              variant="success"
              style="width: 15em;">
  </b-progress>
</template>

<script>
  /* eslint-disable */
  export default {
    props: {
      reporting: {
        type: Object,
        required: true
      },
    },
    data(){
      return{
        percent : 0,
      }
    },
    mounted(){
      this.convertHoursToPercent();
    },
    methods: {
      async convertHoursToPercent() {

        var idealHours = this.$http().get("period/calculateTotalBusinessDaysByActivePeriod").then((response, err) => {
          if (err) console.log('err > ', err);
          return this.reporting.employee.workHours * response.data.data;
        });

        var reportingHours = this.$http().get('reporting/calculateTotalReportingHoursByUserIdAndPerActivePeriod', {params: {'user_id': this.reporting.employee._id}}).then((response, err) => {
          if (err) console.log('err > ', err);
          return response.data.data.totalHoursReportingByActivePeriod;
        });

        await idealHours.then(async iHours => {
          await reportingHours.then(async rHours => {
            var valorAConsiderar = await (rHours > iHours ? rHours : iHours);
            this.percent = ((this.reporting.totalHoursCostCenter / valorAConsiderar) * 100);
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
