<template>
  <div class="crm-layout">
    <!-- PC 布局 -->
    <el-container v-if="!isMobile" class="crm-layout-desktop">
      <el-header class="nav-container">
        <navbar
          nav-index="/crm"
          @nav-items-click="navClick"/>
      </el-header>
      <el-container>
        <sidebar
          :items="crmRouters"
          :add-offset="quickAddOffset"
          create-button-title="快速创建"
          main-router="crm"
          @select="handleSelect">
          <div
            slot="add"
            class="quick-add">
            <div class="quick-add-content">
              <p
                v-for="(item, index) in quickAddList"
                :key="index"
                @click="addSkip(item)">
                <i
                  :class="['wk', 'wk-' + item.icon]"/><span>{{ item.label }}</span></p>
            </div>
          </div>
        </sidebar>

        <el-main
          id="crm-main-container"
          style="padding: 0;">
          <app-main/>
        </el-main>
      </el-container>
    </el-container>

    <!-- Mobile 布局 -->
    <div v-else class="responsive-layout-mobile crm-layout-mobile">
      <navbar
        nav-index="/crm"
        :is-mobile-layout="isMobile"
        :mobile-title="mobileLayoutTitle"
        :show-mobile-quick-add="quickAddList.length > 0"
        @toggle-mobile-menu="mobileSidebarVisible = true"
        @mobile-quick-add="openMobileQuickAdd"/>

      <transition name="mobile-sidebar-panel">
        <div
          v-if="mobileSidebarVisible"
          class="mobile-sidebar-drawer">
          <div
            class="mobile-sidebar-drawer__mask"
            @click="closeMobileSidebar" />
          <div class="mobile-sidebar-drawer__panel">
            <div class="mobile-sidebar-drawer__header">
              <span>客户管理</span>
              <i class="el-icon-close mobile-sidebar-drawer__close" @click="closeMobileSidebar" />
            </div>
            <div class="mobile-sidebar-drawer__content">
              <sidebar
                :items="crmRouters"
                :add-offset="quickAddOffset"
                class="mobile-sidebar-component"
                create-button-title=""
                main-router="crm"
                @select="handleMobileSelect" />
            </div>
          </div>
        </div>
      </transition>

      <div class="responsive-layout-mobile__main responsive-layout-mobile__main--full">
        <app-main />
      </div>

      <el-dialog
        :visible.sync="mobileQuickAddVisible"
        append-to-body
        custom-class="mobile-quick-add-dialog"
        title="快速创建">
        <div class="mobile-quick-add-list">
          <el-button
            v-for="(item, index) in quickAddList"
            :key="index"
            type="primary"
            plain
            class="mobile-quick-add-item"
            @click="handleMobileQuickAddOption(item)">
            <i :class="['wk', 'wk-' + item.icon]" />
            <span>{{ item.label }}</span>
          </el-button>
          <div v-if="quickAddList.length === 0" class="mobile-quick-add-empty">暂无可快速创建的内容</div>
        </div>
      </el-dialog>
    </div>

    <c-r-m-all-create
      v-if="isCreate"
      :crm-type="createCRMType"
      :action="createAction"
      @save-success="createSaveSuccess"
      @close="isCreate=false"
    />
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import CRMAllCreate from '@/views/crm/components/CRMAllCreate'
import responsiveLayout from '@/mixins/responsiveLayout'

import { mapGetters } from 'vuex'

export default {
  name: 'CrmLayout',

  mixins: [responsiveLayout],

  components: {
    Navbar,
    Sidebar,
    AppMain,
    CRMAllCreate
  },

  data() {
    return {
      isCreate: false,
      createAction: null,
      createCRMType: '',
      mobileSidebarVisible: false,
      mobileQuickAddVisible: false
    }
  },

  computed: {
    ...mapGetters(['crm', 'crmRouters']),
    // 快捷添加
    quickAddList() {
      var addItems = []
      if (this.crm.leads && this.crm.leads.save) {
        addItems.push({
          icon: 'leads',
          index: 'leads',
          label: '线索'
        })
      }
      if (this.crm.customer && this.crm.customer.save) {
        addItems.push({
          icon: 'customer',
          index: 'customer',
          label: '客户'
        })
      }
      if (this.crm.contacts && this.crm.contacts.save) {
        addItems.push({
          icon: 'contacts',
          index: 'contacts',
          label: '联系人'
        })
      }
      if (this.crm.business && this.crm.business.save) {
        addItems.push({
          icon: 'business',
          index: 'business',
          label: '商机'
        })
      }

      if (this.crm.contract && this.crm.contract.save) {
        addItems.push({
          icon: 'contract',
          index: 'contract',
          label: '合同'
        })
      }
      if (this.crm.receivables && this.crm.receivables.save) {
        addItems.push({
          icon: 'receivables',
          index: 'receivables',
          label: '回款'
        })
      }
      if (this.crm.invoice && this.crm.invoice.save) {
        addItems.push({
          icon: 'invoice',
          index: 'invoice',
          label: '发票'
        })
      }
      if (this.crm.visit && this.crm.visit.save) {
        addItems.push({
          icon: 'house',
          index: 'visit',
          label: '回访'
        })
      }
      if (this.crm.product && this.crm.product.save) {
        addItems.push({
          icon: 'product',
          index: 'product',
          label: '产品'
        })
      }
      return addItems
    },
    quickAddOffset() {
      return Math.round(this.quickAddList.length / 2) * 25
    },
    mobileLayoutTitle() {
      return (this.$route && this.$route.meta && this.$route.meta.title) || '客户管理'
    }
  },

  watch: {
    $route() {
      this.mobileSidebarVisible = false
      this.mobileQuickAddVisible = false
    },
    isMobile(val) {
      if (!val) {
        this.mobileSidebarVisible = false
        this.mobileQuickAddVisible = false
      }
    }
  },

  created() {
    this.getcrmMessagNum()
  },

  methods: {
    navClick(index) {},

    addSkip(item) {
      this.createAction = {
        type: 'save',
        id: '',
        data: {}
      }
      this.createCRMType = item.index
      this.isCreate = true
    },

    openMobileQuickAdd() {
      if (this.quickAddList.length === 0) return
      this.mobileQuickAddVisible = true
    },

    handleMobileQuickAddOption(item) {
      this.mobileQuickAddVisible = false
      this.addSkip(item)
    },

    closeMobileSidebar() {
      this.mobileSidebarVisible = false
    },

    /**
     * 获取消息数
     */
    getcrmMessagNum() {
      this.$store
        .dispatch('GetMessageNum')
        .then(res => {})
        .catch(() => {})
    },

    /**
     * 菜单钢鞭
     */
    handleSelect() {
      this.$store.dispatch('GetMessageNum')
    },

    handleMobileSelect() {
      this.handleSelect()
      this.closeMobileSidebar()
    },

    /**
     * 新建客户同时新建联系人
     */
    // 创建数据页面 保存成功
    createSaveSuccess(data) {
      if (data && data.createContacts) {
        if (data.type == 'customer') {
          this.createCRMType = 'contacts'
          this.createAction = {
            type: 'relative',
            crmType: 'customer',
            data: {
              customer: data.data
            }
          }
          this.isCreate = true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './styles/common.scss';
@import './styles/responsive.scss';

.crm-layout {
  height: 100%;
}

.crm-layout-desktop {
  height: 100%;
}

.crm-layout-mobile {
  min-height: 100%;
  background-color: #f6f7fb;

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

.mobile-quick-add-dialog {
  width: 90% !important;
  max-width: 320px;
}

.mobile-quick-add-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-quick-add-item {
  justify-content: flex-start;
  display: flex;
  align-items: center;

  i {
    margin-right: 8px;
  }
}

.mobile-quick-add-empty {
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>
