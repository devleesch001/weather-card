import mongoose from 'mongoose';
import config from '~/config';

export const init = async () => {
    await mongoose.connect(config.mongodbUrl);
};

export default { init };
