<template>
  <div>
    <v-dialog v-if="modalDialog" class="modal_card" transition="dialog-top-transition" width="500">
      <Form
        @submit="updateHeadline"
        :validation-schema="schema"
        v-slot="{ errors }"
        id="user-manage-form"
      >
        <v-card>
          <v-card-title>Edit Headline</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <!--              <v-text-field v-model="headline" label="Headlines Titles"-->
                <!--                            max="10" variant="outlined"></v-text-field>-->
                <label class="form-control-label">Headlines Titles</label>
                <Field
                  type="text"
                  name="Headlines"
                  id="input-username"
                  :class="{ 'form-control': true, 'border-red-600': errors.headline }"
                  placeholder="Headlines Titles"
                  v-model.trim="headline"
                />
                <span class="text-red-600" v-if="errors.headline">{{ errors.headline }}</span>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="px-5 mb-4">
            <v-spacer></v-spacer>
            <v-btn color="#C62828" variant="flat" @click="false">Cancel</v-btn>
            <v-btn color="#008B2A" variant="flat" type="submit">Save</v-btn>
          </v-card-actions>
        </v-card>
      </Form>
    </v-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import { Field, Form } from 'vee-validate';
import * as yup from 'yup';

export default {
  props: {
    dialog: {
      type: Boolean,
    },
  },
  components: { Form, Field },
  data: () => ({
    headline: '',
    modalDialog: true,
  }),
  computed: {
    schema() {
      return yup.object({
        headline: yup
          .string()
          .required('Headline is a required field')
          .max(2, 'Headline must be at most 25 characters'),
      });
    },
  },
  watch: {
    dialog(val) {
      console.log(val, 'val');
      this.modalDialog = val;
    },
  },
  mounted() {
    console.log(this.dialog, 'dialog');
  },
  methods: {
    updateHeadline() {
      const { articles } = this.$store.state;
      articles[this.selectedIndex].title = this.headline;
      this.dialog = false;
    },
  },
};
</script>
