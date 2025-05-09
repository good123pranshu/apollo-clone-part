import mongoose, { Schema, Document } from 'mongoose';

const doctorSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, default: null }, // ✅ Image field added
  specialty: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  consultationFee: { type: Number, required: true },
  languages: { type: [String], required: true },
  rating: { type: Number, default: null },
  totalRatings: { type: Number, required: true },
  hospital: { type: String, default: null },
  location: { type: String, required: true },
  state: { type: String, required: true },
  consultationMode: { type: [String], required: true },
  availableSlots: { type: Number, required: true },
}, { timestamps: true });

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

export default Doctor;
