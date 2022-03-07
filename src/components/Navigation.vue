<template>
  <div>
    <nav class="nav-menu">
      <router-link to="/">Home</router-link>
      <router-link
        :to="{
          path: '/history'
        }"
      >
        History records
      </router-link>
      <router-link
        :to="{
          path: '/history',
          query: { status: 'Added' }
        }"
      >
        Only added record
      </router-link>
      <router-link
        :to="{
          path: '/history',
          query: { status: 'Deleted' }
        }"
      >
        Only deleted records
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
nav {
  margin-top: 20px;
}
nav a {
  text-decoration: none;
  color: black;
  margin-left: 10px;
}

nav a:hover {
  color: brown;
}
</style>
