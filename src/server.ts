import mongoose from 'mongoose';

import app from './app';
import config from './app/config';

const main = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL as string);

    app.listen(config.PORT, () => {
      console.log(`Server is runing in this port ${config.PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

main();
