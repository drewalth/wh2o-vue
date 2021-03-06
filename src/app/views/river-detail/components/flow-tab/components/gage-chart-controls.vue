<template>
  <div class="gage-chart-controls">
    <template v-if="metrics">
      <cv-dropdown
          v-if="gages && gages.length > 1"
          v-model="formData.gauge_id"
          :placeholder="$titleCase(formData.gauge_name)"
          label="Selected Gage"
          class="mb-spacing-md"
          @change="changeGauge"
      >
        <cv-dropdown-item
            v-for="(g, index) in gages"
            :key="index"
            :value="g.gauge.id"
        >
          {{ $titleCase(g.gauge.name) }}
        </cv-dropdown-item>
      </cv-dropdown>

      <cv-dropdown
          v-model="formData.timeScale"
          label="Data Timespan"
          :disabled="loading"
          class="mb-spacing-md"
          @change="fetchReadings"
      >
        <cv-dropdown-item value="day">
          Day
        </cv-dropdown-item>
        <cv-dropdown-item value="week">
          Week
        </cv-dropdown-item>
        <cv-dropdown-item value="month">
          Month
        </cv-dropdown-item>
        <cv-dropdown-item value="year">
          Year
        </cv-dropdown-item>
      </cv-dropdown>

      <cv-dropdown
          v-if="availableMetrics"
          v-model.trim="formData.metric_id"
          label="Data Metric"
          :disabled="availableMetrics.length === 1"
          class="mb-spacing-md"
          @change="changeMetric"
      >
        <cv-dropdown-item
            v-for="(g, index) in availableMetrics"
            :key="index"
            :value="String(g.id)"
        >
          {{ g.label }}
        </cv-dropdown-item>
      </cv-dropdown>
      <cv-toolbar>
        <cv-overflow-menu class="bx--toolbar-action">
          <template slot="trigger">
            <Settings32 class="bx--overflow-menu__icon bx--toolbar-settings-icon"/>
          </template>
          <cv-toolbar-title title="View Mode"/>
          <cv-toolbar-option>
            <cv-radio-button
                v-model="viewMode"
                name="chart"
                label="Chart"
                value="chart"
            />
          </cv-toolbar-option>
          <cv-toolbar-option>
            <cv-radio-button
                v-model="viewMode"
                name="table"
                label="Table"
                value="table"
            />
          </cv-toolbar-option>
        </cv-overflow-menu>
      </cv-toolbar>
    </template>
  </div>
</template>
<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'gage-chart-controls',
  props: {
    gaugeId: {
      type: String,
      required: true
    },
    metricId: {
      type: Number,
      required: true
    },
    gages: {
      type: Array,
      required: true,
      default: ()=>[]
    },
    metrics: {
      type: Array,
      required: true,
    }
  },
  data: () => ({
    /**
     * toggles the flow chart view or table view
     * @values chart, table
     * @todo need to make UI elements for this more noticable
     *
     */
    viewMode: 'chart',
    /**
     * Values needed to make flow reading request
     *
     */
    formData: {
      gauge_id: '',
      gauge_name: '',
      metric_id: '2',
      timeStart: null,
      timeEnd: null,
      resolution: null,
      timeScale: 'week'
    },
    currentGage: null,
  }),

  computed: {
    ...mapState({
      loading: state => state.GageReadings.loading,
      error: state => state.GageReadings.error,
    }),
    /**
     * @description look through the readings response to find
     * the metrics/units we have available, then show them as options
     * in metrics dropdown
     *
     * ie. only cfs, or ft, or both or any
     *
     */
    availableMetrics () {
      if (this.currentGage && this.currentGage.gauge.updates) {
        if (this.metrics) {
          return this.currentGage.gauge.updates.map(m => (
              {
                id: m.metric.id,
                label: m.metric.name === 'Flow' ? 'CFS' : m.metric.name
              }))
        }
      }
      return null
    }
  },
  watch: {
    /**
     * @event viewModeChange tells $parent that the user has changed view mode
     * @values chart, table
     *
     */
    viewMode (mode) {
      this.$emit('viewModeChange', mode)
    },

    gaugeId: {
      immediate: true,
      handler () {
        this.formData.gauge_id = this.gaugeId
        this.currentGage = this.gages?.find(x=>x?.gauge?.id == this.gaugeId);
        this.fetchReadings()
      }
    },
    metricId: {
      immediate: true,
      handler () {
        this.formData.metric_id = String(this.metricId)
        this.fetchReadings()

      }
    }

  },
  methods: {
    /**
     * @returns {number} the starting point for the chart xaxis formatted by moment
     * @event timescaleChange sends date format required by chartjs and moment so flow chart knows to rerender
     * @todo Unsure about how/why resolution calculated this way.
     *
     */
    setTimeScale () {
      let start
      switch (this.formData.timeScale) {
        case 'year':
          this.$emit('timescaleChange', 'MMM YYYY')
          this.formData.resolution = 60 * 60 * 48
          this.formData.timeScale = 'year'
          start = moment()
              .subtract(1, 'year')
              .unix()
          break
        case 'month':
          this.$emit('timescaleChange', 'll')
          this.formData.resolution = 60 * 60 * 24
          this.formData.timeScale = 'month'
          start = moment()
              .subtract(1, 'month')
              .unix()
          break

        case 'week':
          this.$emit('timescaleChange', 'll')
          this.formData.resolution = 60 * 60 * 6
          this.formData.timeScale = 'week'
          start = moment()
              .subtract(1, 'week')
              .unix()
          break
        case 'day':
        default:
          this.$emit('timescaleChange', 'h:mm a')
          this.formData.timeScale = 'day'
          this.formData.resolution = 1
          start = moment()
              .subtract(1, 'day')
              .unix()
          break
      }
      this.formData.timeStart = Math.floor(start)
      this.formData.timeEnd = Math.floor(moment(new Date()).unix())
    },


    changeGauge()
    {
      if(this.gaugeId != this.formData.gauge_id)
      {
      this.$emit('gage-change', this.formData.gauge_id)

      }


    },

    changeMetric()
    {
      if(this.metricId != this.formData.metric_id)
      {

        this.$emit('metric-change', this.formData.metric_id)

      }
    },

    async fetchReadings () {
      if (this.formData.gauge_id && this.formData.metric_id) {
        await this.setTimeScale()
        this.$store.dispatch(
            'GageReadings/getProperty',
            this.formData
        )

      }
    }
  },
  beforeMount () {

  }
}
</script>
