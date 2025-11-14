<template>
  <div class="bi-layout">
    <!-- PC 布局 -->
    <el-container v-if="!isMobile" class="bi-layout-desktop">
      <el-header class="nav-container">
        <navbar
          nav-index="/bi"
          @nav-items-click="navClick"/>
      </el-header>
      <el-container>
        <sidebar
          :items="biRouters"
          class="sidebar-container"/>
        <el-main id="crm-main-container">
          <app-main/>
        </el-main>
      </el-container>
    </el-container>

    <!-- Mobile 布局 -->
    <div v-else class="responsive-layout-mobile bi-layout-mobile">
      <navbar
        nav-index="/bi"
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
              <span>商业智能</span>
              <i class="el-icon-close mobile-sidebar-drawer__close" @click="closeMobileSidebar" />
            </div>
            <div class="mobile-sidebar-drawer__content">
              <sidebar
                :items="biRouters"
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
import { Navbar, Sidebar, AppMain } from './components'
import responsiveLayout from '@/mixins/responsiveLayout'

export default {
  name: 'BiLayout',
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
    ...mapGetters(['biRouters']),
    mobileLayoutTitle() {
      return (this.$route && this.$route.meta && this.$route.meta.title) || '商业智能'
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

.bi-layout {
  height: 100%;
}

.bi-layout-desktop {
  height: 100%;
}

.bi-layout-mobile {
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
