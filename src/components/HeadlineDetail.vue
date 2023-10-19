<template>
  <div>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12" class="text-end">
        <router-link class="header_btn" color="#008B2A" size="small" to="/">
          <v-icon icon="mdi-arrow-left-thin" class="mr-2" color="#fff"></v-icon>
          Back
        </router-link>
      </v-col>
      <v-col lg="12" md="12" sm="12" cols="12">
        <v-card class="headline_list headline_detail">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>
          <v-card-item>
            <v-card-title class="text-wrap">
              <a :href="data.url" class="text-decoration-none" target="_blank">
                {{ data.title }}
              </a>
            </v-card-title>
            <v-card-subtitle class="d-flex publishedAt">
              <v-icon icon="mdi-calendar-month" class="mr-2" color="#008B2A"></v-icon>
              {{ formatDate(data.publishedAt) }}
            </v-card-subtitle>
          </v-card-item>

          <v-col lg="6" md="6" sm="12" cols="12" class="px-0">
            <a :href="data.url" target="_blank">
              <v-img
                cover
                class="headline_img"
                height="300"
                :src="data.urlToImage ?? '/assets/image/img1.png'"
              ></v-img>
            </a>
          </v-col>

          <v-card class="headline_list bg-transparent">
            <v-card-title>
              <v-list class="bg-transparent pa-0">
                <v-list-item class="bg-transparent pa-0" :title="data.author"></v-list-item>
              </v-list>
            </v-card-title>
          </v-card>

          <div class="hover_dispaly">
            <v-card-text>
              <p>{{ data.content }}</p>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from 'moment';
import _ from 'lodash';

export default {
  name: 'HeadlineDetail',
  data: () => ({
    loading: false,
    selection: 1,
    dialog: false,
    index: 0,
    data: {},
  }),
  mounted() {
    const { id } = this.$route.params;
    const { type } = this.$route.params;
    this.index = atob(id);
    const { articles } = this.$store.state;
    const { visitedHeadlines } = this.$store.state;
    if (articles.length === 0) {
      this.$router.push('/');
    }
    if (type === 'articles') {
      this.data = articles.length > 0 ? articles[this.index] : {};
    } else {
      this.data = visitedHeadlines.length > 0 ? visitedHeadlines[this.index] : {};
    }
    if (this.data && _.findIndex(visitedHeadlines, (o) => _.isMatch(o, this.data)) === -1) {
      this.$store.dispatch('setVisitedHeadlines', this.data);
    }
  },
  methods: {
    formatDate(date) {
      const dateParse = new Date(date);
      return moment(dateParse).format('DD-MM-YYYY');
    },
  },
};
</script>
