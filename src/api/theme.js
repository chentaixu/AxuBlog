import { join } from 'path';
import { Router } from 'express';
import fm from 'front-matter';
import fs from '../utils/fs';

// A folder with css theme configurations
const CONTENT_DIR = join(__dirname, './themes');

// Extract theme object from JSON file
const parseTheme = (themeContent) => JSON.parse(themeContent);

const router = new Router();

router.get('/', async (req, res, next) => {

  try {
    let path = req.query.path;
    if (!path || path === 'undefined') {
      res.status(400).send({error: `The 'path' query parameter cannot be empty.`});
      return;
    }

    let fileName = join(CONTENT_DIR, (path === '/' ? '/default' : path) + '.json');
    if (!await fs.exists(fileName)) {
      fileName = join(CONTENT_DIR, path + '/default.json');
    }

    if (!await fs.exists(fileName)) {
      res.status(404).send({error: `The theme '${path}' is not found.`});
    } else {
      const source = await fs.readFile(fileName);

      const content = parseTheme(source);
      res.status(200).send(content);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
