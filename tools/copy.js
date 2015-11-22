/**
 * React Starter Kit (http://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import path from 'path';
import replace from 'replace';
import Promise from 'bluebird';
import watch from './lib/watch';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  const ncp = Promise.promisify(require('ncp'));

  await Promise.all([
    ncp('src/public', 'build/public'),
    ncp('src/contents', 'build/contents'),
    ncp('src/themes', 'build/themes'),
    ncp('package.json', 'build/package.json')
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false
  });

  if (global.WATCH) {
    const contentsWatcher = await watch('src/contents/**/*.*');
    contentsWatcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/contents/').length);
      await ncp(`src/contents/${relPath}`, `build/contents/${relPath}`);
    });

    const themesWatcher = await watch('src/themes/**/*.*');
    themesWatcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/themes/').length);
      await ncp(`src/themes/${relPath}`, `build/themes/${relPath}`);
    });

  }
}

export default copy;
