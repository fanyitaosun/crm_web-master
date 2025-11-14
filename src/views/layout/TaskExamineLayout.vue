<template>
  <div class="task-examine-layout">
    <!-- PC 布局 -->
    <el-container v-if="!isMobile" class="task-examine-layout-desktop">
      <el-header class="nav-container">
        <navbar
          nav-index="/taskExamine"
          @nav-items-click="navClick"/>
      </el-header>
      <el-container>
        <sidebar
          :items="taskExamineRouters"
          class="sidebar-container" />

        <el-main
          id="workLog-main-container"
          style="padding:15px;">
          <app-main/>
        </el-main>
      </el-container>
    </el-container>

    <!-- Mobile 布局 -->
    <div v-else class="responsive-layout-mobile task-examine-layout-mobile">
      <navbar
        nav-index="/taskExamine"
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
              <span>任务审批</span>
              <i class="el-icon-close mobile-sidebar-drawer__close" @click="closeMobileSidebar" />
            </div>
            <div class="mobile-sidebar-drawer__content">
              <sidebar
                :items="taskExamineRouters"
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
  name: 'TaskExamineLayout',

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
    ...mapGetters(['taskExamineRouters']),
    mobileLayoutTitle() {
      return (this.$route && this.$route.meta && this.$route.meta.title) || '任务审批'
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

  .task-examine-layout {
    height: 100%;
  }

  .task-examine-layout-desktop {
    height: 100%;
  }

  .task-examine-layout-mobile {
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
  .aside-container {
    position: relative;
    background-color: #2d3037;
    box-sizing: border-box;
    overflow: visible;
  }

  .nav-container {
    padding: 0;
    box-shadow: 0px 1px 2px #dbdbdb;
    z-index: 100;
    min-width: 1200px;
  }
  .quick-add {
    height: 178px;
  }

  @media (max-width: 1023px) {
    .nav-container {
      min-width: auto;
    }
  }
</style>
