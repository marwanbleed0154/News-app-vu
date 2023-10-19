<template>
  <div class="navigation_bar">
    <v-navigation-drawer v-model="sidebar" app>
      <v-list class="navbar_menu">
        <v-list-item v-for="item in menuItems" :key="item.title">
          <router-link
            to="/"
            class="text-decoration-none text-capitalize hover:text-green-darken-3"
          >
            {{ item.title }}
          </router-link>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="white" density="compact">
      <v-container class="py-0">
        <div class="d-flex align-center">
          <span class="d-md-none">
            <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
          </span>
          <v-app-bar-title class="font-weight-bold text-green-darken-3"> News App </v-app-bar-title>
          <v-spacer></v-spacer>
          <v-list class="d-flex navbar_menu" color="primary">
            <v-list-item v-for="item in menuItems" :key="item.title" class="pa-0">
              <router-link
                to="/"
                class="text-decoration-none text-capitalize hover:text-green-darken-3"
              >
                {{ item.title }}
              </router-link>
            </v-list-item>
          </v-list>
          <router-link class="header_btn" color="#008B2A" size="small" to="/visited-headline">
            Visited Headlines
          </router-link>
        </div>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appTitle: 'Awesome App',
      sidebar: false,
      menuItems: [{ title: 'Home' }, { title: 'FAQ' }, { title: 'Contact Us' }],
    };
  },
};
</script>
