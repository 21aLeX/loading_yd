export const routes = {
  auxiliary: () => '/auxiliary',
  home: () => '/',
};
export const apiRoutes = {
  sendDisk: (name) => `https://cloud-api.yandex.net/v1/disk/resources/upload?path=/${name}&overwrite=true`,
  deploy: () => 'https://loading-yd.vercel.app/auxiliary',
};
