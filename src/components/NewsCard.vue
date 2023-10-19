<template>
  <v-col v-for="(data, index) in newsArray" :key="index" lg="4" md="4" sm="6" cols="12">
    <v-card :loading="loading" class="headline_list">
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
      <v-card-item>
        <v-card-title>
          <router-link :to="generateRoute(index)" class="text-decoration-none">
            {{ data.title }}
          </router-link>
        </v-card-title>
        <v-card-subtitle class="d-flex">
          <v-icon class="mr-2" color="#008B2A" icon="mdi-calendar-month"></v-icon>
          {{ formatDate(data.publishedAt) }}
          <v-spacer></v-spacer>
          <v-icon
            color="#008B2A"
            icon="mdi-pencil"
            v-if="type === 'articles'"
            @click="updateHeadline(data.articleIndex)"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>

      <router-link :to="generateRoute(index)">
        <v-img
          :src="data.urlToImage ?? '/assets/image/img1.png'"
          class="headline_img"
          cover
          height="180"
        ></v-img>
      </router-link>

      <div class="hover_dispaly">
        <v-card-text class="ellipsis">
          <div>{{ data.content }}</div>
        </v-card-text>

        <v-card-actions class="pa-0 justify-end" style="min-height: auto">
          <v-btn :to="generateRoute(index)" color="#008B2A" class="read_more" size="x-small"
            >Read More
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-col>
</template>
<script>
import moment from 'moment/moment';

export default {
  name: 'NewsCard',
  props: {
    newsArray: {
      type: Array,
    },
    type: {
      type: String,
    },
  },
  data() {
    return {
      loading: false,
      dialog: false,
      selectedIndex: '',
      headline: '',
    };
  },
  methods: {
    formatDate(date) {
      const dateParse = new Date(date);
      return moment(dateParse).format('MM-DD-YYYY');
    },
    generateRoute(index) {
      return `/headline-details/${this.type}/${btoa(index)}`;
    },
    updateHeadline(index) {
      this.$emit('updateDialog', index);
    },
  },
};
</script>
