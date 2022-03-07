<template>
  <div class="about">
    <h1>This is a history page</h1>
    <HistoryList
      :status="status"
      :historyData="this.$store.getters.getFilteredHistory(this.status)"
    ></HistoryList>
  </div>
</template>

<script>
import HistoryList from '@/components/HistoryList.vue'

export default {
  name: 'History',
  components: {
    HistoryList
  },
  props: {
    status: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>
