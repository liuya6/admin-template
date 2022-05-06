<template>
  <ConfigProvider :locale="getAntdLocale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts" setup>
  /**
   * 参考资料 https://vvbin.cn/doc-next/
   * Vue3.0 新特性以及使用经验总结 https://juejin.cn/post/6940454764421316644
   * ant design https://2x.antdv.com/components/overview-cn/
   * vxe table https://vxetable.cn/v4/#/table/start/install
   */
  import { ConfigProvider } from 'ant-design-vue';
  import { AppProvider } from '/@/components/Application';
  import { useTitle } from '/@/hooks/web/useTitle';
  import { useLocale } from '/@/locales/useLocale';

  // 多国语言
  const { getAntdLocale } = useLocale();

  // 监听页面变化和动态改变网站标题
  useTitle();
</script>
