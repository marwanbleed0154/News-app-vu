<template>
  <div>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <v-card :loading="loading" class="headline_list mb-0 bg-green-darken-3">
          <v-card-title> Visited Headlines </v-card-title>
        </v-card>
      </v-col>
      <NewsCard
        :newsArray="visitedHeadlines"
        :type="'visitedHeadlines'"
        @update-dialog="openModel"
      ></NewsCard>
    </v-row>
    <v-dialog v-model="dialog" class="modal_card" transition="dialog-top-transition" width="500">
      <v-card>
        <v-card-title>Edit Headline</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="headline"
                label="Headlines Titles"
                max="10"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="px-5 mb-4">
          <v-spacer></v-spacer>
          <v-btn color="#C62828" variant="flat" @click="dialog = false">Cancel</v-btn>
          <v-btn color="#008B2A" variant="flat" @click="updateHeadline">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import NewsCard from './NewsCard.vue';

export default {
  name: 'VisitedHeadline',
  components: { NewsCard },
  data: () => ({
    loading: false,
    selection: 1,
    dialog: false,
    headline: '',
    selectedIndex: 0,
  }),
  computed: {
    visitedHeadlines() {
      return this.$store.state.visitedHeadlines;
    },
  },
  methods: {
    openModel(index) {
      this.selectedIndex = index;
      this.headline = this.visitedHeadlines[index].title;
      this.dialog = true;
    },
    updateHeadline() {
      const { visitedHeadlines } = this.$store.state;
      visitedHeadlines[this.selectedIndex].title = this.headline;
      this.dialog = false;
    },
  },
};
</script>
