<template>
  <div class="manager-navbar-wrapper">
    <!-- PC 布局导航 -->
    <div v-if="!isMobileLayout" class="navbar">
      <img
        v-src="logo"
        :key="logo"
        class="logo"
        @click="enterCustoemBoard" >
      <div class="nav-title">
        系统设置
      </div>
      <div
        class="back-home"
        @click="enterHome">返回首页</div>
      <div
        class="go-out"
        @click="enterLogin">退出系统</div>
    </div>

    <!-- Mobile 布局导航 -->
    <div v-else class="manager-navbar-mobile">
      <div class="mobile-left">
        <i class="wk wk-menu mobile-menu-icon" @click="$emit('toggle-mobile-menu')" />
        <img
          v-src="logo"
          :key="logo"
          class="logo"
          @click="enterCustoemBoard" >
      </div>
      <div class="mobile-title">{{ mobileTitle || '系统设置' }}</div>
      <div class="mobile-actions">
        <el-button size="mini" class="mobile-action" @click="enterHome">首页</el-button>
        <el-button size="mini" type="danger" class="mobile-action" @click="enterLogin">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  components: {},
  props: {
    navIndex: String,
    isMobileLayout: {
      type: Boolean,
      default: false
    },
    mobileTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['logo', 'crm'])
  },
  mounted() {},
  methods: {
    enterHome() {
      this.$router.replace({
        path: '/'
      })
    },
    enterLogin() {
      this.$confirm('退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var loading = Loading.service({
            target: document.getElementById('#app')
          })
          this.$store
            .dispatch('LogOut')
            .then(() => {
              loading.close()
              location.reload()
            })
            .catch(() => {
              loading.close()
              location.reload()
            })
        })
        .catch(() => {})
    },

    /**
     * 有客户权限点击logo 进入仪表盘
     */
    enterCustoemBoard() {
      if (this.crm) {
        this.$router.push('/crm/workbench')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.manager-navbar-wrapper {
  width: 100%;
}

.navbar {
  height: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 0 60px 0 30px;
  background-color: white;
  .logo {
    width: 150px;
    height: 40px;
    display: block;
    flex-shrink: 0;
    margin-right: 60px;
    cursor: pointer;
  }
  .nav-title {
    flex: 1;
    font-size: 16px;
    color: #333333;
  }
}

.back-home {
  width: 94px;
  height: 36px;
  line-height: 36px;
  background-color: #2362FB;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-right: 10px;
  cursor: pointer;
}

.go-out {
  width: 94px;
  height: 36px;
  line-height: 36px;
  background-color: #c2c2c2;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.manager-navbar-mobile {
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);

  .mobile-left {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .mobile-menu-icon {
      font-size: 24px;
      color: #2362fb;
      margin-right: 12px;
    }

    .logo {
      width: 120px;
      height: 32px;
      margin: 0;
    }
  }

  .mobile-title {
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .mobile-actions {
    display: flex;
    align-items: center;

    .mobile-action {
      margin-left: 8px;
    }
  }
}
</style>
