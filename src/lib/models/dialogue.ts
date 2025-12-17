import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDialogue extends Document {
  dialogue: string;
  speaker: string;
  deleteToken: string;
  createdAt: Date;
}

const DialogueSchema: Schema<IDialogue> = new Schema({
  dialogue: { type: String, required: true, trim: true },
  speaker: { type: String, required: true, trim: true },
  deleteToken: { type: String, required: true, length: 4 },
  createdAt: { type: Date, default: Date.now },
});

const Dialogue: Model<IDialogue> = mongoose.models.Dialogue || mongoose.model<IDialogue>('Dialogue', DialogueSchema);

export default Dialogue;
