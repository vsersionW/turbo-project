import React from '@mtfe/turbo/react';
import Loadable from 'react-loadable';
import { Spin, Alert } from 'antd';

const Loading = props => {
  const { pastDelay, timedOut, error, retry } = props;
  if (error) {
    console.error(error);
    return <Alert closable type="error" message={error.name} description={<div>{error.message}, <a onClick={ retry }>retry</a></div>}  />;
  } else if(timedOut) {
    return <Alert closable type="warning" message="Timeout" description={<div>Taking a long time..., <a onClick={ retry }>retry</a></div>}  />;
  } else if(pastDelay) {
    return <Spin tip="Loading ..." />;
  } else {
    return null;
  } 
};


export default [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../pages/index'),
      loading: Loading,
    })
  },
  {
    path: '/home',
    exact: true,
    component: Loadable({
      loader: () => import('./basic/index'),
      loading: Loading,
    })
  }
];