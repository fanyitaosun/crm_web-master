<template>
  <div class="work-log-layout">
    <!-- PC 布局 -->
    <el-container v-if="!isMobile" class="work-log-layout-desktop">
      <el-header class="nav-container">
        <navbar
          nav-index="/workLog"
          @nav-items-click="navClick"/>
      </el-header>
      <el-container>
        <sidebar
          :items="workLogRouters"
          class="sidebar-container" />

        <el-main
          id="workLog-main-container"
          style="padding:15px;">
          <app-main/>
        </el-main>
      </el-container>
    </el-container>

    <!-- Mobile 布局 -->
    <div v-else class="responsive-layout-mobile work-log-layout-mobile">
      <navbar
        nav-index="/workLog"
        :is-mobile-layout="isMobile"
        :mobile-title="mobileLayoutTitle"
        @toggle-mobile-menu="mobileSidebarVisible = true"
      />

      <transition name="mobile-sidebar-panel">
        <div
          v-if="mobileSidebarVisible"
          class="mobile-sidebar-drawer">
          <div
            class="mobile-sidebar-drawer__mask"
            @click="closeMobileSidebar" />
          <div class="mobile-sidebar-drawer__panel">
            <div class="mobile-sidebar-drawer__header">
              <span>工作日志</span>
              <i class="el-icon-close mobile-sidebar-drawer__close" @click="closeMobileSidebar" />
            </div>
            <div class="mobile-sidebar-drawer__content">
              <sidebar
                :items="workLogRouters"
                class="mobile-sidebar-component"
                create-button-title=""
                @select="handleMobileSelect" />
            </div>
          </div>
        </div>
      </transition>

      <div class="responsive-layout-mobile__main responsive-layout-mobile__main--full">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import responsiveLayout from '@/mixins/responsiveLayout'
import { mapGetters } from 'vuex'

export default {
  name: 'WorkLogLayout',

  mixins: [responsiveLayout],

  components: {
    Navbar,
    Sidebar,
    AppMain
  },

  data() {
    return {
      mobileSidebarVisible: false
    }
  },

  computed: {
    ...mapGetters(['workLogRouters']),
    mobileLayoutTitle() {
      return (this.$route && this.$route.meta && this.$route.meta.title) || '工作日志'
    }
  },

  watch: {
    $route() {
      this.mobileSidebarVisible = false
    },
    isMobile(val) {
      if (!val) {
        this.mobileSidebarVisible = false
      }
    }
  },

  methods: {
    navClick(index) {},
    closeMobileSidebar() {
      this.mobileSidebarVisible = false
    },
    handleMobileSelect() {
      this.closeMobileSidebar()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './styles/common.scss';
  @import './styles/responsive.scss';

  .work-log-layout {
    height: 100%;
  }

  .work-log-layout-desktop {
    height: 100%;
  }

  .work-log-layout-mobile {
    min-height: 100%;

    ::v-deep .sidebar-container {
      width: 100%;
    }

    ::v-deep .el-menu-vertical:not(.el-menu--collapse) {
      width: 100%;
    }
  }

  .el-container {
    min-height: 0;
    height: 100%;
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
