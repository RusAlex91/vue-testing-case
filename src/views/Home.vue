<template>
  <div class="home" v-if="this.$store.state.apiDataLoaded">
    <div class="columns">
      <UserList
        :searchEnable="true"
        :usersData="this.$store.state.filteredData"
        @move-to-column="toRightColumn"
        btnAction="Add"
      ></UserList>
      <UserList
        class="right-column"
        :usersData="this.$store.state.addedUsers"
        @move-to-column="toLeftColumn"
        btnAction="Remove"
      ></UserList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UserList from '@/components/UserList.vue'
export default {
  name: 'Home',
  data () {
    return {}
  },
  components: { UserList },

  methods: {
    toRightColumn (id, user) {
      const findedItem = this.$store.state.filteredData.find(
        user => user._id === id
      )
      this.$store.state.addedUsers.push(findedItem)
      this.$store.state.filteredData = this.$store.state.filteredData.filter(
        user => user._id !== id
      )
      this.$store.dispatch('addToHisthory', {
        ...user,
        status: 'Added',
        recordActionData: new Date()
      })
    },
    toLeftColumn (id, user) {
      const findedItem = this.$store.state.addedUsers.find(
        user => user._id === id
      )
      this.$store.state.filteredData.push(findedItem)
      this.$store.state.addedUsers = this.$store.state.addedUsers.filter(
        user => user._id !== id
      )
      this.$store.dispatch('addToHisthory', {
        ...user,
        status: 'Deleted',
        recordActionData: new Date()
      })
    }
  }
}
</script>

<style scoped>
.column {
  width: 500px;
}

.columns {
  display: flex;
  column-gap: 50px;
}
.data div {
  margin: 5px;
}

.data div span {
  border: 1px solid tomato;
}

.right-column {
  margin-top: 40px;
}
</style>
