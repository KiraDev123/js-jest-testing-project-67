import axios from 'axios';
import { writeFile } from 'node:fs/promises';

export const pageLoader = async (url, output) => {
  const { data, status } = await axios(url);
  console.log('status', status);

  if (status !== 200) {
    throw new Error('Что-то пошло не так c запросом');
  }

  const [_protocol, urlWithoutProtocol] = url.split('https://');

  const fileName = urlWithoutProtocol.replace(/[^a-zA-Z0-9]/g, '-');
  const filePath = `${output ?? process.cwd()}/${fileName}.html`;

  return writeFile(filePath, data);
};
