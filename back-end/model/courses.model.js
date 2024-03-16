import mongoose from "mongoose";

const PlayerSchema = new mongoose.Schema({
  _id: { type: String },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "games",
    },
  ],
});

const Players = mongoose.model("players", PlayerSchema);

export default Players;
