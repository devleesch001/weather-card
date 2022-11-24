import { Document, model, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import _ from 'lodash';

const SALT_ROUNDS = 10;

export interface UserInformationInterface {
    username: string;
    email: string;
    favorites: string[];
}

export interface UserBaseInterface extends UserInformationInterface {
    password?: string;
}

export interface UserInterface extends UserBaseInterface {
    hashedPassword: string;
}

interface UserDocumentInterface extends UserInterface, Document {
    toUserInformation: () => UserInformationInterface;
    addFavorite: (station: string) => boolean;
    removeFavorite: (station: string) => boolean;
    setPassword: (password: string) => Promise<void>;
    checkPassword: (password: string) => Promise<boolean>;
}

interface UserModelInterface extends Model<UserDocumentInterface> {
    findByEmailOrUsername: (email?: string | null, username?: string | null) => Promise<UserDocumentInterface>;
}

const UserSchema: Schema<UserDocumentInterface> = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    email: { type: String, required: true, index: { unique: true } },
    favorites: { type: [String], required: true, default: [] },
    hashedPassword: { type: String, required: true },
});

UserSchema.methods.toUserInformation = function () {
    return { username: this.username, email: this.email, favorites: this.favorites } as UserInformationInterface;
};

UserSchema.methods.addFavorite = function (station: string) {
    if (this.favorites.includes(station)) return false;

    this.favorites.push(station);

    return true;
};

UserSchema.methods.removeFavorite = function (station: string) {
    if (!this.favorites.includes(station)) return false;

    this.favorites.pop(station);

    return true;
};

UserSchema.methods.setPassword = async function (password: string) {
    this.hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
};

UserSchema.methods.checkPassword = async function (password: string) {
    return await bcrypt.compare(password, this.hashedPassword);
};

UserSchema.statics.findByEmailOrUsername = function (email: string | null = null, username: string | null = null) {
    return this.findOne(_.omitBy({ email: email, username: username }, (v) => !v)).exec();
};

const User = model<UserDocumentInterface, UserModelInterface>('User', UserSchema);

export default User;
