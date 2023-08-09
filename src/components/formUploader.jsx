import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth.jsx';
import useSpiner from '../hooks/useSpiner.jsx';
import { getUnique, renderImgs } from '../utils/auxiliaryFunctions.js';
import { apiRoutes } from '../utils/routes.js';

const FormUploader = () => {
  const [files, setFiles] = useState([]);
  const [textAlert, setTextAlert] = useState('');
  const auth = useAuth();
  const spiner = useSpiner();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { names } = useSelector((state) => state.files);

  useEffect(() => {
    const containerFiles = document.querySelector("[data-id='containerFiles']");
    containerFiles.replaceChildren(...renderImgs(files));
  }, [files]);
  // загрузка файлов на диск
  const sendFiles = () => {
    spiner.loading();
    const arrRequests = files.map(async (file) => {
      const { name } = file;
      const answer = await axios.get(apiRoutes.sendDisk(name), auth.getAuthHeader());
      return axios.put(answer.data.href, file);
    });
    Promise.all(arrRequests).then(() => {
      setTextAlert(t('sendSucsessful'));
      setFiles([]);
      spiner.loaded();
      spiner.loadingStop();
      setTimeout(() => setTextAlert(''), 10000);
    });
  };
  // загрузка файлов на страницу
  const handleUploadFile = async (event) => {
    const countFile = event.target.files.length;
    if (countFile > 100) {
      setTextAlert(t('over100'));
      setTimeout(() => setTextAlert(''), 10000);
    } else {
      spiner.loading();
      const newFiles = [];
      for (let i = 0; i < event.target.files.length; i += 1) {
        newFiles.push(event.target.files[i]);
      }
      setFiles(getUnique(files, newFiles, names, dispatch));
      spiner.loaded();
    }
    document.querySelector('input').value = '';
  };

  return (
    <div className="App">
      {textAlert && (
        <Alert
          variant={textAlert === t('sendSucsessful') ? 'success' : 'danger'}
          className="myAlert"
        >
          {textAlert}
        </Alert>
      )}
      <div data-id="spinner" />
      <header className="App-header">
        <input type="file" multiple onChange={handleUploadFile} />
        {spiner.spiner === 'loaded' && (
          <Button variant="primary" type="submit" onClick={sendFiles}>
            {t('send')}
          </Button>
        )}
      </header>
      <div data-id="containerFiles" />
    </div>
  );
};

export default FormUploader;
