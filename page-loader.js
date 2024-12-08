import axios from 'axios';
import { writeFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';

import { getFileName } from './helpers/get-file-name';

export const pageLoader = async (url, output) => {
  const { data, status } = await axios(url);

  if (status !== 200) {
    throw new Error('Что-то пошло не так c запросом');
  }
  const $ = cheerio.load('<h2 class="title">Hello world</h2>');

  const fileName = `${getFileName(url)}.html`;
  const dirname = output ?? process.cwd();

  const filePath = `${dirname}/${fileName}`;

  return writeFile(filePath, data);
};
