<template>
  <div class="admin-layout">
    <!-- PC 布局 -->
    <el-container v-if="!isMobile" class="admin-layout-desktop">
      <el-header class="nav-container">
        <manager-navbar />
      </el-header>
      <el-container>
        <sidebar
          :items="manageRouters"
          class="sidebar-container" />

        <el-main id="manager-main-container">
          <app-main />
        </el-main>
      </el-container>
    </el-container>

    <!-- Mobile 布局 -->
    <div v-else class="responsive-layout-mobile admin-layout-mobile">
      <manager-navbar
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
              <span>系统设置</span>
              <i class="el-icon-close mobile-sidebar-drawer__close" @click="closeMobileSidebar" />
            </div>
            <div class="mobile-sidebar-drawer__content">
              <sidebar
                :items="manageRouters"
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
import { mapGetters } from 'vuex'
import { ManagerNavbar, Sidebar, AppMain } from './components'
import responsiveLayout from '@/mixins/responsiveLayout'

export default {
  name: 'AdminLayout',
  mixins: [responsiveLayout],
  components: {
    ManagerNavbar,
    Sidebar,
    AppMain
  },
  data() {
    return {
      routerItems: [],
      mobileSidebarVisible: false
    }
  },

  computed: {
    ...mapGetters(['manage', 'manageRouters']),
    mobileLayoutTitle() {
      return (this.$route && this.$route.meta && this.$route.meta.title) || '系统设置'
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
@import './styles/responsive.scss';

.admin-layout {
  height: 100%;
}

.admin-layout-desktop {
  height: 100%;
}

.admin-layout-mobile {
  min-height: 100%;

  ::v-deep .sidebar-container {
    width: 100%;
  }

  ::v-deep .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
  }
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

#manager-main-container {
  max-height: 100%;
  padding: 0 0 15px;
}

.el-container {
  overflow: hidden;
  height: 100%;
}

@media (max-width: 1023px) {
  .nav-container {
    min-width: auto;
  }
}
</style>
