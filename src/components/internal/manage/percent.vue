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
      employeeId: {
        required: true,
      },
      hours: {
        type: Number,
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

        var workHours = this.$http().get('employee/findEmployeeById', {params: {'user_id': this.employeeId}}).then((response, err) => {
          if (err) console.log('err > ', err);
          return response.data.workHours;
        });

        var qtdBusinessDays = this.$http().get("period/calculateTotalBusinessDaysByActivePeriod").then((response, err) => {
          if (err) console.log('err > ', err);
          return response.data.data;
        });

        var reportingHours = this.$http().get('reporting/calculateTotalReportingHoursByUserIdAndPerActivePeriod', {params: {'user_id': this.employeeId}}).then((response, err) => {
          if (err) console.log('err > ', err);
          return response.data.data.totalHoursReportingByActivePeriod;
        });

        await workHours.then(async wHours => {
          await qtdBusinessDays.then(async qtdBussDays => {
            await reportingHours.then(async rHours => {
              var idealHours = wHours * qtdBussDays;
              var valorAConsiderar = await (rHours > idealHours ? rHours : idealHours);
              this.percent = (this.hours / valorAConsiderar) * 100;
            });
          });
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
