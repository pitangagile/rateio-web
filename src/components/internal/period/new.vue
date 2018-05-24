<template>
  <div>
    <b-btn @click="showModal" class="btn btn-danger" >Adicionar</b-btn>
        <b-modal ref ="datePickerModal"
             centered title="Excluir Centro de Custo"
             ok-title="Ok"
             cancel-title="Cancelar"
             v-on:ok= adicionarDatas>Adição de Centro de Custo
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
  methods: {
    showModal() {
      this.$refs.datePickerModal.show();
    },
    hideModal() {
      this.$refs.datePickerModal.hide();
    },
    adicionarDatas() {
      const initialdate = moment(this.selectedDate.start).format('D M YYYY');
      const finaldate = moment(this.selectedDate.end).format('D M YYYY');
      const url = 'period/create';
      this.$http().post(url, { initialdate: initialdate, finaldate: finaldate }).then(() => { //eslint-disable-line

      });
    },
    sugestedIncialDate() {

    },
    sugestedFinalDate() {

    },
  },
};
</script>
