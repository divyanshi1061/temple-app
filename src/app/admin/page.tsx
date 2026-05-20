import connectToDatabase from "@/lib/db";
import { Service, ContactMessage, GalleryImage, Video, Testimonial } from "@/lib/models";
import { 
  Briefcase, 
  MessageSquare, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Star,
  ArrowRight,
  Clock,
  User,
  Phone,
  Layers
} from "lucide-react";

type ContactItem = {
  _id: string;
  name: string;
  createdAt: string;
  read?: boolean;
  service?: string;
  message?: string;
  phone?: string;
  email?: string;
};

export const revalidate = 0; // Disable caching to ensure real-time dashboard data

export default async function AdminDashboard() {
  await connectToDatabase();
  
  const totalServices = await Service.countDocuments();
  const totalMessages = await ContactMessage.countDocuments();
  const unreadMessages = await ContactMessage.countDocuments({ read: false });
  const totalGallery = await GalleryImage.countDocuments();
  const totalVideos = await Video.countDocuments();
  const totalTestimonials = await Testimonial.countDocuments();

  // Fetch the latest 5 messages
  const latestMessages = await ContactMessage.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const stats = [
    { name: "Puja Services", value: totalServices, href: "/admin/services", icon: Briefcase, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { name: "Devotee Inquiries", value: totalMessages, href: "/admin/messages", icon: MessageSquare, color: "text-orange-600 bg-orange-50 border-orange-100", highlight: unreadMessages > 0 ? `${unreadMessages} new` : null },
    { name: "Sacred Gallery", value: totalGallery, href: "/admin/gallery", icon: ImageIcon, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { name: "Live Videos", value: totalVideos, href: "/admin/videos", icon: VideoIcon, color: "text-red-600 bg-red-50 border-red-100" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gold via-orange-600 to-amber-700 rounded-3xl p-8 md:p-10 shadow-xl border border-orange-500/20 text-white">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
            ॐ जय माँ बगलामुखी ॐ
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-cinzel">
            Welcome Back, Acharya Ji
          </h1>
          <p className="text-white/80 max-w-xl text-sm md:text-base font-medium">
            Manage your sacred Pujas, client inquiries, galleries, and live testimonials from this master admin panel.
          </p>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <a
              key={stat.name}
              href={stat.href}
              className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100 hover:border-gold/50 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.color} transition-transform duration-300 group-hover:scale-105`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {stat.highlight && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 px-2.5 py-1 rounded-full animate-pulse">
                      {stat.highlight}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.name}</p>
                  <p className="text-3xl font-black text-gray-900 mt-1">{stat.value}</p>
                </div>
              </div>
              <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gold group-hover:text-gold-dim transition-colors">
                <span>Configure details</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Main Grid: Latest Messages & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Latest Inquiries Card list */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900 font-cinzel">Latest Devotee Inquiries</h2>
              <p className="text-xs text-gray-500">Most recent requests from devotees</p>
            </div>
            <a href="/admin/messages" className="text-xs font-bold text-gold hover:text-gold-dim flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-4">
            {latestMessages.length === 0 ? (
              <div className="text-center py-10 text-gray-500 text-sm">
                No devotee inquiries received yet.
              </div>
            ) : (
              latestMessages.map((msg: ContactItem) => (
                <div 
                  key={msg._id.toString()}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    msg.read 
                      ? "border-gray-100 bg-white" 
                      : "border-gold/20 bg-gold/5"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-xs">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{msg.name}</h4>
                        <span className="text-[10px] text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {msg.service && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white border border-gray-200 text-gray-700">
                          {msg.service}
                        </span>
                      )}
                      {!msg.read && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse">
                          New
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 line-clamp-2 italic mb-3">
                    &ldquo;{msg.message}&rdquo;
                  </p>

                  <div className="flex gap-4 text-[11px] font-bold text-gray-500 border-t border-gray-100/50 pt-2.5">
                    <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-gold" /> {msg.phone}</span>
                    <span className="flex items-center gap-1">✉ {msg.email}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions & Dynamic stats */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            <h2 className="text-lg font-bold text-gray-900 font-cinzel">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-3">
              <a 
                href="/admin/services" 
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gold/5 border border-gray-100 hover:border-gold/30 rounded-xl transition-all group font-bold text-xs"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-gold" />
                  <span className="text-gray-900">Manage Services</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="/admin/gallery" 
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gold/5 border border-gray-100 hover:border-gold/30 rounded-xl transition-all group font-bold text-xs"
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-4 h-4 text-gold" />
                  <span className="text-gray-900">Upload to Gallery</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="/admin/testimonials" 
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gold/5 border border-gray-100 hover:border-gold/30 rounded-xl transition-all group font-bold text-xs"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-gold" />
                  <span className="text-gray-900">Add Testimonial</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="/admin/settings" 
                className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gold/5 border border-gray-100 hover:border-gold/30 rounded-xl transition-all group font-bold text-xs"
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-gold" />
                  <span className="text-gray-900">Social Media Links</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Info Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 font-cinzel">Quick System Health</h3>
            <div className="space-y-3.5 text-xs font-semibold text-gray-600">
              <div className="flex justify-between">
                <span>Database Connection</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active
                </span>
              </div>
              <div className="flex justify-between">
                <span>Seeded Elements</span>
                <span className="text-gray-900 font-bold">{totalServices + totalGallery + totalVideos + totalTestimonials} items</span>
              </div>
              <div className="flex justify-between">
                <span>Unread Inquiries</span>
                <span className={`font-bold ${unreadMessages > 0 ? "text-orange-600" : "text-gray-500"}`}>
                  {unreadMessages}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
