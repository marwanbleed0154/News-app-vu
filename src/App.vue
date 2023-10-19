<template>
    <v-app id="app">
        <NavBarComponent></NavBarComponent>
        <v-main class="main_content">
            <v-container>
                <router-view/>
            </v-container>
        </v-main>
        <FooterComponent></FooterComponent>
    </v-app>
</template>

<script>
import NavBarComponent from './components/common/NavBarComponent.vue';
import FooterComponent from './components/common/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    NavBarComponent,
    FooterComponent,
  },
};
</script>
