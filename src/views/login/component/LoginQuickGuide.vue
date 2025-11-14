<template>
  <div class="login-quick-guide">
    <section class="guide-card">
      <h3 class="guide-card__title">推荐使用的浏览器</h3>
      <p class="guide-card__desc">为了获得更佳的系统体验，建议在以下浏览器中访问易优CRM：</p>
      <ul class="guide-card__list">
        <li>Google Chrome（最新版本）</li>
        <li>Mozilla Firefox（最新版本）</li>
        <li>Safari 浏览器（MacOS 系统）</li>
        <li>360、搜狗、QQ 等浏览器的极速模式</li>
      </ul>
    </section>

    <section class="guide-card">
      <h3 class="guide-card__title">登录遇到问题？</h3>
      <p class="guide-card__desc">请检查网络连接是否稳定，并确认账号密码输入准确无误。仍有疑问时，可联系系统管理员协助处理。</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LoginQuickGuide'
}
</script>

<style scoped lang="scss">
.login-quick-guide {
  padding: 0 40px 30px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .guide-card {
    background-color: #f8f9ff;
    border-radius: 6px;
    padding: 18px 20px;
    color: #4c4c4c;
    box-shadow: 0 6px 16px rgba(62, 107, 234, 0.08);

    &__title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #2b51d9;
    }

    &__desc {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 1.6;
    }

    &__list {
      padding-left: 18px;
      margin: 0;
      font-size: 14px;
      line-height: 1.8;
      list-style: disc;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0 20px 20px;

    .guide-card {
      padding: 16px;

      &__title {
        font-size: 15px;
      }

      &__desc,
      &__list {
        font-size: 13px;
      }
    }
  }
}
</style>
