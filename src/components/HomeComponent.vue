<template>
  <div>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <v-card :loading="loading" class="headline_list mb-0 bg-green-darken-3">
          <v-card-title class="d-flex justify-space-between align-center">
            News Headlines
            <v-col lg="4" md="6" sm="12" cols="12" class="pa-0">
              <v-text-field
                v-model="search"
                label="Search"
                prepend-inner-icon="mdi-magnify"
                variant="solo"
                single-line
                hide-details
              ></v-text-field>
            </v-col>
          </v-card-title>
        </v-card>
      </v-col>
      <NewsCard :newsArray="articleArray" :type="'articles'" @update-dialog="openModel"></NewsCard>
    </v-row>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <v-card v-if="articleArray.length == 0 && !loading">
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                class="font-medium font-weight-normal position-relative mb-0 mt-0 pt-0 pb-0"
              >
                <span>No Record Found</span>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" class="modal_card" transition="dialog-top-transition" width="500">
      <Form @submit="updateHeadline" id="user-manage-form">
        <v-card>
          <v-card-title>Edit Headline</v-card-title>
          <v-card-text>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                class="font-medium font-weight-normal position-relative mb-0 mt-0 pt-0 pb-0"
              >
                <label class="form-control-label">Headlines Titles</label>
                <Field
                  name="headline"
                  type="text"
                  class="inputHeadline"
                  v-slot="{ field }"
                  :rules="validateHeadline"
                  v-model.trim="headline"
                >
                  <textarea v-bind="field" />
                </Field>
                <ErrorMessage name="headline" class="text-red-darken-3 text-caption" />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-5 mb-4">
            <v-spacer></v-spacer>
            <v-btn color="#C62828" variant="flat" @click="dialog = false">Cancel</v-btn>
            <v-btn color="#008B2A" variant="flat" type="submit">Update</v-btn>
          </v-card-actions>
        </v-card>
      </Form>
    </v-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import { ErrorMessage, Field, Form } from 'vee-validate';
import NewsCard from './NewsCard.vue';
const axios = require('axios');

export default {
  name: 'HomeComponent',
  components: { NewsCard, Form, Field, ErrorMessage },
  data: () => ({
    loading: false,
    dialog: false,
    headline: '',
    selectedIndex: 0,
    search: '',
    articleArray: [],
  }),
  computed: {
    articles() {
      return this.$store.state.articles;
    },
  },
  created() {
    if (this.$store.state.articles.length === 0) {
      this.getHeadlines();
    } else {
      this.setArticlesArray(this.$store.state.articles);
    }
  },
  watch: {
    search: {
      handler(newValue) {
        if (newValue) {
          this.articleArray = this.$store.state.articles.filter((o) =>
            o.title.toLowerCase().includes(newValue.toLowerCase()),
          );
        } else {
          this.articleArray = this.$store.state.articles;
        }
      },
      deep: true,
    },
  },
  methods: {
    getHeadlines() {
      this.loading = true;
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.VUE_APP_API_KEY}`,
        )
        .then((response) => {
          this.loading = false;
          this.$store.dispatch('setArticles', response.data.articles);
          this.setArticlesArray(response.data.articles);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    openModel(index) {
      this.selectedIndex = index;
      this.headline = this.articles[index].title;
      this.dialog = true;
    },
    updateHeadline() {
      const { articles } = this.$store.state;
      articles[this.selectedIndex].title = this.headline;
      this.dialog = false;
    },
    setArticlesArray(articles) {
      this.articleArray = articles.filter((v, i) => {
        v.articleIndex = i;
        return v;
      });
    },
    validateHeadline(value) {
      if (!value) {
        return 'This Headline is required';
      }
      if (value.length > 255) {
        return 'A headline must be less then 255 characters';
      }
      return true;
    },
  },
};
</script>
