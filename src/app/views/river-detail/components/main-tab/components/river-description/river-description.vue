<template>
  <main class="mb-xl">
    <hr>
    <h2 class="mb-spacing-md">
      River Description
    </h2>
    <template v-if="loading || updatePending">
      <cv-skeleton-text
        class="cv-skeleton-text"
        paragraph
        :line-count="3"
      />
    </template>
    <template v-else-if="river">
      <template v-if="!editMode">
        <template v-if="sanitizedDescription">
          <div
            v-if="!descriptionExpanded && sanitizedDescription.length > 2000"
            ref="description"
            class="description-content"
            v-html="sanitizedDescription.slice(0, 2000) + '...'"
          />
          <div
            v-else
            ref="description"
            class="description-content"
            v-html="sanitizedDescription"
          />
          <cv-button
            v-if="sanitizedDescription.length > 2000"
            class="mt-spacing-md"
            size="small"
            kind="tertiary"
            @click.exact="descriptionExpanded = !descriptionExpanded"
            @keydown.enter="descriptionExpanded = !descriptionExpanded"
          >
            {{ descriptionExpanded ? 'Show Less' : 'Show More' }}
          </cv-button>
        </template>
        <template v-else>
          <PageDescription
            description="This reach does not have a description. If you know about this reach, please tell us about it!"
          >
            <cv-button
              kind="tertiary"
              size="small"
              @click.exact="toggleEditMode"
              @keydown.enter="toggleEditMode"
            >
              Add Description
            </cv-button>
          </PageDescription>
        </template>
      </template>
      <template v-else>
        <content-editor
          :content="
            sanitizedDescription ? sanitizedDescription : 'start typing...'
          "
          show-control-bar
          @content:updated="handleUpdate"
          @editor:destroyed="handleEditorDestroy"
        />
        <cv-button
          class="mt-spacing-sm"
          @click.exact="submitForm"
          @keydown.enter="submitForm"
        >
          Submit
        </cv-button>
      </template>
    </template>
    <template v-else>
      <cv-skeleton-text
        class="cv-skeleton-text"
        paragraph
        :line-count="3"
      />
    </template>
  </main>
</template>
<script>
import { mapState } from 'vuex'
// the content editor needs to be directly imported?
import ContentEditor from '@/app/global/components/content-editor/content-editor.vue'
import http from '@/app/http'
import PageDescription from '@/app/global/components/page-description/page-description'

export default {
  name: 'river-description',
  components: {
    'content-editor': ContentEditor,
    PageDescription
  },
  data: () => ({
    updatePending: false,
    error: false,
    refreshedDescription: '',
    updatedDescription: null,
    formData: {
      description: 'lorem ipsum.'
    },
    descriptionExpanded: false
  }),
  computed: {
    ...mapState({
      river: state => state.RiverDetail.data,
      loading: state => state.RiverDetail.loading,
      riverDescription: state =>
        state.RiverDetail.data.description,
      editMode: state => state.Global.editMode
    }),
    sanitizedDescription () {
      if (this.refreshedDescription) {
        return this.refreshedDescription
      } else if (this.riverDescription) {
        return this.$cleanContent(this.riverDescription)
      }
      return null
    },
    reachId () {
      return this.$route.params.id
    }
  },
  methods: {
    toggleEditMode () {
      this.$store.dispatch('Global/toggleEditMode', !this.editMode)
    },
    submitForm () {
      if (this.updatedDescription) {
        this.updatePending = true

        http.post('/graphql', {
          query: `
          mutation  {
            reachUpdate(id: ${this.reachId}, reach:{ description: "${this.$cleanContent(this.updatedDescription)}"}) {
              description
            }
          }
        `
        }).then(r => {
          this.refreshedDescription = r.data.data.reachUpdate.description
          this.updatePending = false
          this.$store.dispatch('Global/sendToast', {
            title: 'Description Updated',
            kind: 'success',
            override: true,
            contrast: false,
            action: false,
            autoHide: true
          })
        }).catch(() => {
          this.updatePending = false
          this.error = true
          this.$store.dispatch('Global/sendToast', {
            title: 'Update Failed',
            kind: 'error',
            override: true,
            contrast: false,
            action: false,
            autoHide: true
          })
        })
      }
    },
    handleUpdate (v) {
      this.updatedDescription = v
    },
    handleEditorDestroy () {
      this.updatedDescription = ''
    },
  },
  mounted () {
    this.formData.id = this.reachId
    this.formData.reachid = this.reachId
  }
}
</script>
