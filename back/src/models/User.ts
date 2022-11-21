import { Schema, model } from 'mongoose';

export interface UserInterface {
    username: string;
    email: string;
    password: string;
}

export const UserSchema = new Schema<UserInterface>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

const User = model<UserInterface>('User', UserSchema);

export default User;
