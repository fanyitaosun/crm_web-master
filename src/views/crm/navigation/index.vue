<template>
  <div ref="workbench" class="crm-workbench">
    <iframe :src="iframeUrl"/>
  </div>
</template>

<script>


/**
 * TODO 2、员工部门筛选选择，
 *      3、员工部门筛选后刷新销售简报数据
 */

export default {
  name: 'Nav',
  data() {
    return {
      iframeUrl: 'http://ng.easyagroup.com/'
    }
  }

}
</script>

<style scoped lang="scss">
  .crm-workbench {
    width: 100%;
    min-width: 1200px;
    height: 100%;
    padding: 15px 20px 20px;
    position: relative;

    &__body {
      height: 100%;
      overflow: auto;
      padding-top: 55px;
    }

    .head {
      position: absolute;
      padding: 15px 20px;
      top: 0;
      right: 0;
      left: 0;
      background: #f5f6f9;
      z-index: 1;

      &__body {
        position: relative;
        .user-box {
          width: unset;
          height: 36px;
          padding: 4px 7px;
          border: 1px solid #E1E1E1;
          border-radius: $xr-border-radius-base;
          background-color: white;
          margin-right: 20px;
          display: flex;
          cursor: pointer;
          .user-icon {
            background: $xr-color-primary;
            color: white;
            padding: 5px 6px;
            border-radius: 50%;
          }
          .username {
            font-size: 12px;
            margin: 0 8px;
          }
        }
      .el-radio-group {
        /deep/ .el-radio-button__inner {
            font-size: 12px;
            padding: 11px 12px;
          }
        }
        /deep/ .type-select {
          height: 36px;
        }

      .sort-btn {
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }

    .brief-box {
      width: 100%;
      background-color: white;
      border: 1px solid #e6e6e6;
      border-radius: $xr-border-radius-base;
      .brief-title {
        padding: 15px 20px 0;
        .icon {
          color: #50CF9E;
          font-size: 18px;
        }
        .text {
          font-size: 16px;
          font-weight: bold;
          margin-left: 5px;
        }
      }
      .brief {
        width: 100%;
        padding: 10px 10px 14px 10px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        .brief-item {
          cursor: pointer;
          width: calc(25% - 20px);
          height: 88px;
          box-shadow: 0 0 16px 0 rgba(0,0,0,0.08);
          border-radius: $xr-border-radius-base;
          margin: 10px;
          .brief-item__body {
            flex: 1;
            overflow: hidden;
            .icon-box {
              width: 36px;
              height: 36px;
              line-height: 36px;
              text-align: center;
              border-radius: 50%;
              margin-right: 10px;
              margin-left: 15px;
              flex-shrink: 0;

              .icon {
                color: white;
                font-size: 19px;
              }
            }
            .info {
              overflow: hidden;
              .title {
                font-size: 13px;
              }
              .number {
                font-size: 23px;
                font-weight: bold;
                line-height: 1;
                margin-top: 8px;
                margin-right: 5px;
                // white-space: nowrap;
                // text-overflow: ellipsis;
                overflow: hidden;
              }
            }
          }
          .brief-item__others {
            position: relative;
            width: 100px;
            text-align: center;
            padding: 0 3px;
            overflow: hidden;

            &:before {
              position: absolute;
              top: 7.5%;
              left: 0;
              content: '';
              width: 1px;
              height: 85%;
              background-color: #e6e6e6;
              display: block;
            }
            .text {
              font-size: 12px;
              margin-left: -5px;
            }
            .rate {
              font-size: 14px;
              color: #2BBF24;
              margin-top: 8px;

              .rate__icon {
                font-size: 12px;
              }
              &.bottom {
                color: #2BBF24;
              }
              &.top {
                color: #F24B4B;
              }
            }
          }
          &:hover {
            box-shadow: 0 0 16px 0 rgba(0,0,0,0.2);
          }
        }
      }
    }
    iframe{
      width: 100%;
      height: 800px;
    }

  }
</style>
