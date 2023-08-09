import { apiRoutes } from './utils/routes';

const getYa = async () => {
  await window.YaAuthSuggest.init(
    {
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: 'token',
      // redirect_uri: "http://localhost:3000/",
      // redirect_uri: "https://oauth.yandex.ru/verification_code",
      redirect_uri: apiRoutes.deploy(),
    },
    apiRoutes.deploy(),
    {
      view: 'button',
      parentId: 'container',
      buttonView: 'main',
      buttonTheme: 'light',
      buttonSize: 'm',
      buttonBorderRadius: 0,
    },
  )
    .then(async (result) => { await result.handler(); });
};

export default getYa;
