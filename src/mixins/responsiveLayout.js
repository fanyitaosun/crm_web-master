export default {
  data() {
    return {
      isMobile: false
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      this.updateDeviceMode()
      window.addEventListener('resize', this.updateDeviceMode)
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateDeviceMode)
    }
  },
  methods: {
    updateDeviceMode() {
      if (typeof window === 'undefined') return
      this.isMobile = window.innerWidth < 1024
    }
  }
}
