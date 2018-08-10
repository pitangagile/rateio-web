<template>
  <div>
    <b-button @click="showModal" class="btn-success">Adicionar</b-button>
    <b-modal ref="datePickerModal"
             centered title="Novo Período"
             ok-title="Ok"
             cancel-title="Cancelar"
             v-on:ok=addDates>Início - Término
      <v-date-picker
        mode='range'
        v-model='selectedDate'
        is-double-paned
        :min-date=this.minimal
        show-caps>
      </v-date-picker>
    </b-modal>
  </div>
</template>

<script>
  /* eslint-disable */
  import Vue from 'vue';
  import * as moment from 'moment';
  import VCalendar from 'v-calendar';
  import 'v-calendar/lib/v-calendar.min.css';

  Vue.use(VCalendar, {
    firstDayOfWeek: 1,
    popoverVisibility: 'focus',
    formats: {
      title: 'MMMM',
      weekdays: 'W',
      navMonths: 'MMM',
      input: ['L', 'YYYY-MM-DD', 'YYYY/MM/DD'],
      dayPopover: 'L',
    },
  });

  export default {

    components: {
      moment,
    },
    data() {
      return {
        minimal: new Date(),
        selectedDate: {
          start: new Date(),
          end: new Date(),
        },
      };
    },
    mounted() {
      this.sugestedIncialDate();
      this.sugestedFinalDate();
      this.getMinimalDate();
    },
    methods: {
      showModal() {
        this.$refs.datePickerModal.show();
      },
      hideModal() {
        this.$refs.datePickerModal.hide();
      },
      addDates() {
        const initialdate = moment(this.selectedDate.start).format('D M YYYY');
        const finaldate = moment(this.selectedDate.end).format('D M YYYY');
        const url = 'period';
        this.$http().post(url, {
          initialdate: initialdate,
          finaldate: finaldate,
          description: this.selectedDate.end
        }).then(() => { //eslint-disable-line

        }).then(() => {
          this.$emit('allPeriods');
        }).catch(err => { //eslint-disable-line
          this.$swal(
            'Erro',
            '',
            'error',
          );
        });
      },
      sugestedIncialDate() {
        const sugestedIncialDate = new Date();
        const sugesteddate = moment(sugestedIncialDate).format('D M YYYY');
        const date = sugesteddate.split(' ');
        if (parseInt(date[0], 10) > 20 && parseInt(date[1], 10) < 12) {
          this.selectedDate.start = new Date(parseInt(date[2], 10), parseInt(date[1], 10), 21);
        } else if (parseInt(date[0], 10) > 20 && parseInt(date[1], 10) === 12) {
          this.selectedDate.start = new Date(parseInt(date[2], 10) + 1, 1, 21);
        } else {
          this.selectedDate.start = new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, 21);
        }
      },
      sugestedFinalDate() {
        const sugestedFinaldate = moment(this.selectedDate.start).format('D M YYYY');
        const date = sugestedFinaldate.split(' ');
        if (parseInt(date[1], 10) === 1) {
          this.selectedDate.end = new Date(parseInt(date[2], 10) + 1, parseInt(date[1], 10), 20);
        } else if (parseInt(date[1], 10) !== 1) {
          this.selectedDate.end = new Date(parseInt(date[2], 10), parseInt(date[1], 10), 20);
        }
      },
      getMinimalDate() {
        const date = new Date();
        const minDate = moment(date).format('D M YYYY');
        const minimalspltDate = minDate.split(' ');
        this.minimal = new Date(parseInt(minimalspltDate[2], 10), parseInt((minimalspltDate[1] - 1), 10), 20); //eslint-disable-line
      },
    },
  };
</script>
