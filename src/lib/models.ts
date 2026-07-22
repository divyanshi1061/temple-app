import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Admin Schema
export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
}

const AdminSchema = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 2. Gallery Image Schema
export interface IGalleryImage extends Document {
  filename: string;
  caption?: string;
  url: string;
  uploadedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  filename: { type: String, required: true },
  caption: { type: String, default: '' },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// 3. Video Schema
export interface IVideo extends Document {
  title: string;
  videoId: string;
  url: string;
  uploadedAt: Date;
}

const VideoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  videoId: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// 4. Hero Image Schema
export interface IHeroImage extends Document {
  filename: string;
  url: string;
  uploadedAt: Date;
}

const HeroImageSchema = new Schema<IHeroImage>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// 5. Contact Config Schema
export interface IContactConfig extends Document {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  updatedAt: Date;
}

const ContactConfigSchema = new Schema<IContactConfig>({
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

// 6. Review Schema
export interface IReview extends Document {
  name: string;
  rating: number;
  comment: string;
  location?: string;
  approved: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  location: { type: String, default: '' },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Export models (prevent re-compilation model errors in Next.js hot reloading)
export const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
export const GalleryImage: Model<IGalleryImage> = mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
export const Video: Model<IVideo> = mongoose.models.Video || mongoose.model<IVideo>('Video', VideoSchema);
export const HeroImage: Model<IHeroImage> = mongoose.models.HeroImage || mongoose.model<IHeroImage>('HeroImage', HeroImageSchema);
export const ContactConfig: Model<IContactConfig> = mongoose.models.ContactConfig || mongoose.model<IContactConfig>('ContactConfig', ContactConfigSchema);
export const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
