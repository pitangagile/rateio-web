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
    data() {
      return {
        percent: 0,
      }
    },
    mounted() {
      this.convertHoursToPercent();
    },
    methods: {
      async convertHoursToPercent() {

        var workHours = this.$http().get('employee/findEmployeeById', {params: {'user_id': this.reporting.employee._id}}).then((response, err) => {
          if (err) console.log('err > ', err);
          return response.data.workHours;
        });

        var qtdBusinessDays = this.$http().get("period/calculateTotalBusinessDaysByActivePeriod").then((response, err) => {
          if (err) console.log('err > ', err);
          return response.data.data;
        });

        var reportingHours = this.$http().get('reporting/calculateTotalReportingHoursByUserIdAndPerActivePeriod', {params: {'user_id': this.reporting.employee._id}}).then((response, err) => {
          if (err) console.log('err > ', err);
          return response.data.data.totalHoursReportingByActivePeriod;
        });

        await workHours.then(async wHours => {
          await qtdBusinessDays.then(async qtdBusDay => {
            await reportingHours.then(async rHours => {
              var idealHours = await qtdBusDay * wHours;
              var valorAConsiderar = await (rHours > idealHours ? rHours : idealHours);
              this.percent = ((this.reporting.totalHoursCostCenter / valorAConsiderar) * 100);
            });
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
