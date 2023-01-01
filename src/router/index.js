import fs from 'fs';
import path from 'path';

const __dirname = path.resolve() + '\\src\\router'

const useRoutes = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    import(`./${file}`).then(res => {
      // Object.keys(res)[0] => xxxRouter
      app.use(res[Object.keys(res)[0]].routes())
      app.use(res[Object.keys(res)[0]].allowedMethods())
    })
  })
}

export {useRoutes}