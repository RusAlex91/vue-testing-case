<template>
  <div>
    <span v-if="this.status === ''">All records</span>
    <span v-else>{{ this.status }} records</span>
    <div class="hello" v-for="record in historyData" :key="record.date">
      <hr />
      <span :class="record.status">{{ record.status }}</span>
      <span>Id: {{ record._id }}</span>
      <span>Name: {{ record.name }}</span>
      <span>{{
        `${record.recordActionData.getDate()}|${record.recordActionData.getMonth() +
          1}|${record.recordActionData.getFullYear()} ${record.recordActionData.getHours() +
          1}h:${record.recordActionData.getMinutes()}m:${record.recordActionData.getSeconds()}s`
      }}</span>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryList',
  props: {
    status: String,
    historyData: Array
  }
}
</script>

<style scoped>
div span {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
}

.Added {
  color: lightseagreen;
}
.Deleted {
  color: lightcoral;
}
</style>
