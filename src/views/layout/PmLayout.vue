<template>
  <div class="pm-layout">
    <!-- PC 布局 -->
    <el-container v-if="!isMobile" class="pm-layout-desktop">
      <el-header class="nav-container">
        <navbar
          nav-index="/project"
          @nav-items-click="navClick"/>
      </el-header>
      <el-container>
        <sidebar
          :items="projectRouters"
          :create-button-title="permissonProject ? '创建项目' : ''"
          create-button-icon="el-icon-plus"
          @quicklyCreate="quicklyCreate"
          @select="siderbarSelect"/>

        <el-main id="project-container">
          <app-main/>
          <project-board :visible.sync="projectBoardShow" />
          <tag-board :visible.sync="tagBoardShow" />
        </el-main>
      </el-container>
    </el-container>

    <!-- Mobile 布局 -->
    <div v-else class="responsive-layout-mobile pm-layout-mobile">
      <navbar
        nav-index="/project"
        :is-mobile-layout="isMobile"
        :mobile-title="mobileLayoutTitle"
        :show-mobile-quick-add="permissonProject"
        @toggle-mobile-menu="mobileSidebarVisible = true"
        @mobile-quick-add="quicklyCreate"
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
              <span>项目管理</span>
              <i class="el-icon-close mobile-sidebar-drawer__close" @click="closeMobileSidebar" />
            </div>
            <div class="mobile-sidebar-drawer__content">
              <sidebar
                :items="projectRouters"
                class="mobile-sidebar-component"
                create-button-title=""
                @select="handleMobileSelect" />
            </div>
          </div>
        </div>
      </transition>

      <div class="responsive-layout-mobile__main responsive-layout-mobile__main--full">
        <app-main />
        <project-board :visible.sync="projectBoardShow" />
        <tag-board :visible.sync="tagBoardShow" />
      </div>
    </div>

    <add-project
      v-if="isCreate"
      enter-detail
      @close="isCreate = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import AddProject from '@/views/pm/components/AddProject'
import ProjectBoard from '@/views/pm/project/ProjectBoard'
import TagBoard from '@/views/pm/tag/TagBoard'
import responsiveLayout from '@/mixins/responsiveLayout'

export default {
  name: 'PmLayout',
  mixins: [responsiveLayout],
  components: {
    Navbar,
    Sidebar,
    AppMain,
    AddProject,
    ProjectBoard,
    TagBoard
  },
  data() {
    return {
      isCreate: false,
      projectBoardShow: false,
      tagBoardShow: false,
      mobileSidebarVisible: false
    }
  },
  computed: {
    ...mapGetters(['project', 'projectRouters']),
    permissonProject() {
      return (
        this.project &&
        this.project.projectManage &&
        this.project.projectManage.save
      )
    },
    mobileLayoutTitle() {
      return (this.$route && this.$route.meta && this.$route.meta.title) || '项目管理'
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

    siderbarSelect(key, keyPath) {
      if (key == '/project-list/index') {
        this.tagBoardShow = false
        this.projectBoardShow = true
      } else if (key == '/tag-list/index') {
        this.projectBoardShow = false
        this.tagBoardShow = true
      } else {
        this.projectBoardShow = false
        this.tagBoardShow = false
      }
    },

    handleMobileSelect(key, keyPath) {
      this.siderbarSelect(key, keyPath)
      this.closeMobileSidebar()
    },

    closeMobileSidebar() {
      this.mobileSidebarVisible = false
    },

    quicklyCreate() {
      this.projectBoardShow = false
      this.tagBoardShow = false
      this.isCreate = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/common.scss';
@import './styles/responsive.scss';

.pm-layout {
  height: 100%;
}

.pm-layout-desktop {
  height: 100%;
}

.pm-layout-mobile {
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

#project-container {
  max-height: 100%;
  position: relative;
}

.el-container {
  overflow: hidden;
  height: 100%;;
}

@media (max-width: 1023px) {
  .nav-container {
    min-width: auto;
  }
}
</style>
