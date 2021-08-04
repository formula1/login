import { model, Model, Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  created: Date;
}

const UserSchema = new Schema({
  name: String,
  created: { type: Number, default: Date.now },
});

const UserModel: Model<Document> = model('User', UserSchema);

export {
  IUser,
  UserModel
}
