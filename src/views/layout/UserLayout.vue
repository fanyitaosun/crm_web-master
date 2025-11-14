<template>
  <div class="user-layout">
    <!-- PC 布局 -->
    <el-container v-if="!isMobile" class="user-layout-desktop">
      <el-header class="nav-container">
        <navbar
          :nav-index="navActiveIndex"
          @nav-items-click="navClick"/>
      </el-header>
      <el-container>
        <el-main
          id="crm-main-container"
          style="padding:15px;">
          <app-main/>
        </el-main>
      </el-container>
    </el-container>

    <!-- Mobile 布局 -->
    <div v-else class="responsive-layout-mobile user-layout-mobile">
      <navbar
        :nav-index="navActiveIndex"
        :is-mobile-layout="isMobile"
        :mobile-title="mobileLayoutTitle"
        @toggle-mobile-menu="noop"
      />

      <div class="responsive-layout-mobile__main">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import { mapGetters } from 'vuex'
import responsiveLayout from '@/mixins/responsiveLayout'

export default {
  name: 'UserLayout',
  mixins: [responsiveLayout],
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['navActiveIndex']),
    mobileLayoutTitle() {
      return (this.$route && this.$route.meta && this.$route.meta.title) || '个人中心'
    }
  },
  methods: {
    navClick(index) {},
    noop() {}
  }
}
</script>

<style lang="scss" scoped>
@import './styles/responsive.scss';

.user-layout {
  height: 100%;
}

.user-layout-desktop {
  height: 100%;
}

.user-layout-mobile {
  min-height: 100%;
}

.el-container {
        min-height: 0;
        height: 100%;
}

.aside-container {
        position: relative;
        background-color: #2d3037;
        box-sizing: border-box;
}

.nav-container {
        padding: 0;
        box-shadow: 0px 1px 2px #dbdbdb;
        z-index: 100;
        min-width: 1200px;
}

@media (max-width: 1023px) {
  .nav-container {
    min-width: auto;
  }
}
</style>
