import mongoose from 'mongoose';



const ServiceSchema = new mongoose.Schema({
  titleEn: { type: String, required: true },
  titleHi: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  descriptionHi: { type: String, required: true },
  longDescriptionEn: { type: String },
  longDescriptionHi: { type: String },
  icon: { type: String },
  image: { type: String },
  category: { type: String },
  popular: { type: Boolean, default: false },
}, { timestamps: true });

const AboutSchema = new mongoose.Schema({
  titleEn: { type: String },
  titleHi: { type: String },
  descriptionEn: { type: String },
  descriptionHi: { type: String },
  missionEn: { type: String },
  missionHi: { type: String },
  visionEn: { type: String },
  visionHi: { type: String },
}, { timestamps: true });

const GalleryImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
  category: { type: String },
}, { timestamps: true });

const VideoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
}, { timestamps: true });

const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

const SettingsSchema = new mongoose.Schema({
  facebook: { type: String },
  instagram: { type: String },
  whatsapp: { type: String },
  phone: { type: String },
  email: { type: String },
  addressEn: { type: String },
  addressHi: { type: String },
}, { timestamps: true });

const HeaderSchema = new mongoose.Schema({
  headingEn: { type: String },
  headingHi: { type: String },
  subheadingEn: { type: String },
  subheadingHi: { type: String },
}, { timestamps: true });

const TestimonialSchema = new mongoose.Schema({
  nameEn: { type: String, required: true },
  nameHi: { type: String, required: true },
  locationEn: { type: String },
  locationHi: { type: String },
  textEn: { type: String, required: true },
  textHi: { type: String, required: true },
  rating: { type: Number, default: 5 },
}, { timestamps: true });


export const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export const About = mongoose.models.About || mongoose.model('About', AboutSchema);
export const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema);
export const Video = mongoose.models.Video || mongoose.model('Video', VideoSchema);
export const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
export const Settings = mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
export const Header = mongoose.models.Header || mongoose.model('Header', HeaderSchema);
export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
