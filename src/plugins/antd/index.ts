import { App } from 'vue';
import './index.less';

import { Tooltip, Empty, Button, Input, Pagination } from 'ant-design-vue';

function useAntd(app: App) {
  app.use(Tooltip).use(Empty).use(Button).use(Input).use(Pagination);
}

export { useAntd };
