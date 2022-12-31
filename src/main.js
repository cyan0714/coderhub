import app from './app/index.js'
import { envVar } from './app/config.js';
import './app/database.js'

app.listen(envVar.APP_PORT, () => {
  console.log(`服务启动成功${envVar.APP_PORT}`);
})