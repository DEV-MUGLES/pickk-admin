import {createGlobalStyle} from 'styled-components';

import {palette} from '@pickk/design-token';

export const GlobalStyle = createGlobalStyle`
    .ant-layout-header, .ant-layout-sider, .ant-menu.ant-menu-dark, .ant-layout-sider-trigger {
        background: ${palette.gray6};
    }
    .ant-layout, .ant-layout-footer {
        background: ${palette.gray1};
    }
`;
