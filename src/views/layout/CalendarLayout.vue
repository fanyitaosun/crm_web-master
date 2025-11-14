<template>
  <div class="calendar-layout">
    <!-- PC 布局 -->
    <el-container v-if="!isMobile" class="calendar-layout-desktop">
      <el-header class="nav-container">
        <navbar
          nav-index="/calendar/index"
          @nav-items-click="navClick"/>
      </el-header>
      <el-container>
        <sidebar
          :items="calendarRouters"
          class="sidebar-container" />

        <el-main
          id="workLog-main-container"
          style="padding:15px;">
          <app-main/>
        </el-main>
      </el-container>
    </el-container>

    <!-- Mobile 布局 -->
    <div v-else class="responsive-layout-mobile calendar-layout-mobile">
      <navbar
        nav-index="/calendar/index"
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
              <span>日历</span>
              <i class="el-icon-close mobile-sidebar-drawer__close" @click="closeMobileSidebar" />
            </div>
            <div class="mobile-sidebar-drawer__content">
              <sidebar
                :items="calendarRouters"
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
import calendarRouter from '@/router/modules/calendar'

export default {
  name: 'CalendarLayout',

  mixins: [responsiveLayout],

  components: {
    Navbar,
    Sidebar,
    AppMain
  },

  data() {
    return {
      calendarRouters: calendarRouter,
      mobileSidebarVisible: false
    }
  },

  computed: {
    mobileLayoutTitle() {
      return (this.$route && this.$route.meta && this.$route.meta.title) || '日历'
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

.calendar-layout {
  height: 100%;
}

.calendar-layout-desktop {
  height: 100%;
}

.calendar-layout-mobile {
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
