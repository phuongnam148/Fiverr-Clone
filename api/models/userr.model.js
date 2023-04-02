import mongoose from "mongoose";
const { Schema } = mongoose;

const userrSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    phone: {
      unique: true,
      type: String,
      require: true,
    },
    trungthuong: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Userr", userrSchema);
