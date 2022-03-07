<template>
  <div class="column">
    <!-- Input множно выделить в отдельный компонент по желанию -->
    <label v-show="this.searchEnable"
      >Search:
      <input @input="inputFilter()" type="text" v-model="inputSearchParams"
    /></label>

    <!-- Каждого юзера можно в отдельный компонент поместить, если есть необходимость
    так же можно создать UI-style компоненты, при необходимости -->
    <div class="users" v-for="user in this.usersArr" :key="user.id">
      <div class="users-head">
        <span>{{ user.filterFindCount }}</span>
        <span>{{ user.name }}</span>
        <button @click="moveToColumn(user._id, user)">
          {{ btnAction }}
        </button>
      </div>
      <div v-for="item in user.items" :key="item.id">
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputSearchParams: '',
      rightColumnArray: [],
      usersArr: this.usersData
    }
  },
  props: {
    searchEnable: {
      type: Boolean,
      default: false
    },
    usersData: {
      type: Array
    },
    btnAction: {
      type: String
    }
  },

  methods: {
    inputFilter () {
      if (
        this.inputSearchParams === '' &&
        this.$store.state.addedUsers.length === 0
      ) {
        // Возможна замена на мутации
        this.usersArr = this.$store.state.apiData
        this.$store.state.filteredData = this.$store.state.apiData
        return
      } else if (
        this.inputSearchParams === '' &&
        this.$store.state.addedUsers.length > 0
      ) {
        this.deleteUniq()
        return
      }
      if (this.$store.state.addedUsers.length > 0) {
        this.deleteUniq()
      }
      const filteredData = this.usersArr.map(value => {
        const searchStr = this.inputSearchParams.toLowerCase()
        let filterFindCount = 0
        let nameMatches = null
        if (value.name.toLowerCase().includes(searchStr)) {
          nameMatches = true
          filterFindCount = filterFindCount + 1
        }

        let oneItemMatches = null

        Array.from(value.items).forEach(element => {
          if (element.name.toLowerCase().includes(searchStr)) {
            oneItemMatches = true
            filterFindCount = filterFindCount + 1
          }
        })
        if (nameMatches || oneItemMatches) {
          return {
            ...value,
            filterFindCount
          }
        } else {
          return {
            ...value,
            filterFindCount: 0
          }
        }
      })

      const sortedArr = filteredData.sort((a, b) =>
        a.filterFindCount < b.filterFindCount
          ? 1
          : a.filterFindCount === b.filterFindCount
          ? a.name > b.name
            ? 1
            : -1
          : -1
      )
      const filteredArr = sortedArr.filter(user => user.filterFindCount > 0)
      this.usersArr = filteredArr
      this.$store.state.filteredData = filteredArr
    },
    moveToColumn (id, user) {
      this.$emit('move-to-column', id, user)
    },
    deleteUniq () {
      // eslint-disable-next-line no-debugger
      debugger
      const concatArr = this.$store.state.apiData.concat(
        this.$store.state.addedUsers
      )
      const res = concatArr.filter((el, _, concatArr) => {
        return concatArr.filter(el2 => el2._id === el._id).length === 1
      })
      this.usersArr = res
      this.$store.state.filteredData = res
    }
  },
  watch: {
    usersData () {
      this.usersArr = this.usersData
    }
  }
}
</script>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

input {
  width: 150px;
}

.users {
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  padding: 5px;
}

.users-head {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 15px;
  margin-bottom: 10px;
}
button {
  background: none;
  border-radius: 5px;
}
</style>
