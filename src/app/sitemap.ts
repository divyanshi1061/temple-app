import { MetadataRoute } from 'next';
import mongoose from 'mongoose';
import connectToDatabase from '@/lib/db';
import { Service } from '@/lib/models';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://rudrakshbaglamukhi.com';

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/gallery`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/book`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  let dynamicRoutes: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: string;
    priority: number;
  }> = [];
  try {
    await connectToDatabase();
    const services = await Service.find({}, '_id updatedAt').lean<{
      _id: mongoose.Types.ObjectId;
      updatedAt?: Date;
    }[]>();
    dynamicRoutes = services.map((s) => ({
      url: `${baseUrl}/services/${s._id.toString()}`,
      lastModified: s.updatedAt ? new Date(s.updatedAt) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Sitemap dynamic routes fetch failed:", error);
  }

  return [...staticRoutes, ...dynamicRoutes] as MetadataRoute.Sitemap;
}
