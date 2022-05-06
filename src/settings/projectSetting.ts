import type { ProjectConfig } from '/#/config';
import {
  ContentEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from '/@/enums/appEnum';
import { MenuModeEnum, MenuTypeEnum, MixSidebarTriggerEnum, TriggerEnum } from '/@/enums/menuEnum';

const setting: ProjectConfig = {
  // 是否显示配置按钮
  showSettingButton: false,
  // 是否显示主题切换按钮
  showDarkModeToggle: false,
  // `设置`按钮位置
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 权限相关的缓存存储在 sessionStorage 或 localStorage
  permissionCacheType: 1,
  // 会话超时处理
  sessionTimeoutProcessing: 0,
  // 主题色
  themeColor: '#0960bd',
  // 网站灰色模式，打开可能的哀悼日期
  grayMode: false,
  // 色弱模式
  colorWeak: false,
  // 是否取消菜单、置顶、多标签页显示，以备其他系统可能嵌入
  fullContent: false,
  // 内容模式
  contentMode: ContentEnum.FULL,
  // 是否显示logo
  showLogo: true,
  // 是否显示页尾
  showFooter: false,
  // 头部配置
  headerSetting: {
    // 背景
    bgColor: '#001529',
    // 是否固定
    fixed: true,
    // 是否显示
    show: true,
    // 主题色
    theme: ThemeEnum.DARK,
    // 锁屏
    useLockPage: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示通知按钮
    showNotice: true,
    // 是否显示搜索
    showSearch: true,
  },
  // slider菜单配置
  menuSetting: {
    // 背景
    bgColor: '#001529',
    // 是个固定
    fixed: true,
    // 菜单折叠
    collapsed: false,
    // 折叠菜单时是否显示菜单名称
    collapsedShowTitle: false,
    // 是否可以拖放排序选项卡
    canDrag: true,
    // 是否显示
    show: true,
    // 是否显示dom
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.MIX,
    // 菜单主题
    theme: ThemeEnum.DARK,
    // 拆分菜单
    split: true,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // Fold trigger position
    trigger: TriggerEnum.FOOTER,
    // 打开手风琴模式，只显示一个菜单
    accordion: true,
    // 切换页面以关闭菜单
    closeMixSidebarOnChange: false,
    // 模块打开方式‘点击’|‘悬停’
    mixSideTrigger: MixSidebarTriggerEnum.CLICK,
    // 固定扩展菜单
    mixSideFixed: false,
  },
  // 标签设置
  multiTabsSetting: {
    // 是狗缓存
    cache: false,
    // 是否显示
    show: true,
    // 拖拽
    canDrag: false,
    // 打开快速操作
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    // 是否显示折叠按钮
    showFold: true,
  },
  // 页面跳转配置
  transitionSetting: {
    // 是否开启页面切换动画 禁用状态也会禁用页面loading
    enable: true,
    // 路由基本切换动画
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    // 页面loading
    openPageLoading: true,
    // 页面跳转上方进度条
    openNProgress: true,
  },
  // 是否开启KeepAlive缓存最好在开发时关闭，否则每次都需要清空缓存
  openKeepAlive: false,
  // 锁屏时间
  lockTime: 0,
  // 是否显示面包屑
  showBreadCrumb: false,
  // 是否显示面包屑icon
  showBreadCrumbIcon: false,
  // 使用错误处理程序
  useErrorHandle: false,
  // 是否打开回到顶部
  useOpenBackTop: true,
  // 是否可以嵌入 iframe 页面
  canEmbedIFramePage: true,
  // 切换界面时是否删除未关闭的消息并通知
  closeMessageOnSwitch: true,
  // 切换接口时是否取消已经发送但没有响应的http请求。如果启用，想覆盖单个界面，可以在单独的界面中设置
  removeAllHttpPending: false,
};

export default setting;
