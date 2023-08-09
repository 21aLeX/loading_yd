import { apiRoutes } from './utils/routes';

const getYa = async (getData) => {
  await window.YaAuthSuggest.init(
    {
      client_id: process.env.REACT_APP_CLIENT_ID,
      response_type: 'token',
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
    .then((result) => result.handler())
    .then((data) => {
      getData(data);
    })
    .catch((error) => {
      console.log('Что-то пошло не так: ', error);
      document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(
        error,
      )}`;
    });
};
export default getYa;
