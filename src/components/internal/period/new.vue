<template>
  <div>
    <b-btn @click="showModal" class="btn btn-danger" >Adicionar</b-btn>
        <b-modal ref ="datePickerModal"
             centered title="Excluir Centro de Custo"
             ok-title="Ok"
             cancel-title="Cancelar"
             v-on:ok= addDates>Adição de Centro de Custo
        <v-date-picker
        mode='range'
        v-model='selectedDate'
        show-caps>
        </v-date-picker>
    </b-modal>
  </div>
</template>

<script>
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
      selectedDate: {
        start: new Date(),
        end: new Date(),
      },
    };
  },
  mounted() {
    this.sugestedIncialDate();
    this.sugestedFinalDate();
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
      const url = 'period/create';
      this.$http().post(url, { initialdate: initialdate, finaldate: finaldate, description: this.selectedDate.end }).then(() => { //eslint-disable-line

      }).then(() => {
        this.$emit('allPeriods');
      });
    },
    sugestedIncialDate() {
      const sugestedIncialDate = new Date();
      const sugesteddate = moment(sugestedIncialDate).format('D M YYYY');
      const date = sugesteddate.split(' ');
      if (parseInt(date[0], 10) > 20 && parseInt(date[1], 10) < 12) {
        this.selectedDate.start = new Date(parseInt(date[2], 10), parseInt(date[1], 10), 21);
      } else
      if (parseInt(date[0], 10) > 20 && parseInt(date[1], 10) === 12) {
        this.selectedDate.start = new Date(parseInt(date[2], 10) + 1, 1, 21);
      } else {
        this.selectedDate.start = new Date(parseInt(date[2], 10), parseInt(date[1], 10) - 1, 21);
      }
    },
    sugestedFinalDate() {
      const sugesteddate = moment(this.selectedDate.start).format('D M YYYY');
      const date = sugesteddate.split(' ');
      if (parseInt(date[1], 10) === 1) {
        this.selectedDate.end = new Date(parseInt(date[2], 10) + 1, parseInt(date[1], 10), 20);
      } else
      if (parseInt(date[1], 10) !== 1) {
        this.selectedDate.end = new Date(parseInt(date[2], 10), parseInt(date[1], 10), 20);
      }
    },
  },
};
</script>
