import mongoose from 'mongoose';

export const init = async () => {
    await mongoose.connect('mongodb://root:example@127.0.0.1:27017');
};

export default { init };
