import appConfig from '@config/app.config';
import app from './app';

app.listen(appConfig.port, () => console.log('server running'));
