<template>
  <div class="gallery-tab">
    <layout name="layout-full-width">
      <template #main>
        <template v-if="loading">
          <utility-block state="loading" class="mb-sm" />
        </template>
        <template v-else-if="media">
          <div class="bx--row">
            <div class="bx--col">
              <div class="toolbar-wrapper">
                <cv-button
                  v-if="user && user.uid"
                  @click="mediaUploadModalVisible = true"
                >
                  Upload
                </cv-button>
              </div>
            </div>
          </div>
          <div class="bx--row">
            <div class="bx--col">
              <image-gallery :images="media" @photoModified="loadMedia" />
            </div>
          </div>
          <div class="bx--row">
            <div class="bx--col">
              <table-pagination
                :number-of-items="pagination.total"
                :page="pagination.currentPage"
                :pagination="pagination"
                @change="loadMedia"
              />
            </div>
          </div>
        </template>
        <template v-else>
          <utility-block
            state="content"
            title="No Media"
            text="if you have media for this reach, please share"
            class="mb-sm"
          />
        </template>
      </template>
    </layout>
    <media-upload-modal
      :visible="mediaUploadModalVisible"
      section="GALLERY"
      @upload:cancelled="mediaUploadModalVisible = false"
      @form:success="uploadSuccess"
      @form:error="mediaUploadModalVisible = false"
    />
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import UtilityBlock from "@/app/global/components/utility-block/utility-block";
import ImageGallery from "@/app/views/river-detail/components/image-gallery/image-gallery.vue";
import { Layout } from "@/app/global/layout";
import { TablePagination } from "@/app/global/components";
export default {
  name: "gallery-tab",
  components: {
    UtilityBlock,
    Layout,
    ImageGallery,
    TablePagination,
    MediaUploadModal: () => import("./media-upload-modal"),
  },
  data: () => ({
    selectedRapids: [],
    mediaUploadModalVisible: false,
    currentlyLoadedImagesFor: null,
  }),
  computed: {
    ...mapState({
      loading: (state) => state.RiverGallery.loading,
      error: (state) => state.RiverGallery.error,
      photos: (state) => state.RiverGallery.data?.data,
      pagination: (state) => state.RiverGallery.pagination,
      rapids: (state) => state.RiverRapids.data,
      user: (state) => state.User.data,
    }),
    ...mapGetters({
      media: "RiverGallery/media",
    }),
    reachId() {
      return this.$route.params.id;
    },
  },
  methods: {
    loadRapids(routeId) {
      this.$store.dispatch("RiverRapids/getProperty", routeId);
    },
    uploadSuccess() {
      this.mediaUploadModalVisible = false;
      this.loadMedia();
    },
    loadMedia(val) {
      this.loadRapids(this.reachId);

      const data = {
        reach_id: this.reachId,
        per_page: val ? val.length : 10,
        page: val ? val.page : 1,
      };

      this.$store.dispatch("RiverGallery/getProperty", data);

      this.currentlyLoadedImagesFor = this.reachId;
    },
  },
  // this ensures that gallery images are retrieved when you move between
  // rivers even though the gallery tab component is cached
  activated() {
    if (this.reachId !== this.currentlyLoadedImagesFor) {
      this.loadMedia();
    }
  },
};
</script>
