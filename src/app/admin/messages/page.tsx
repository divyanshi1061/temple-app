"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Trash2, CheckCircle, Mail, Phone, Clock } from "lucide-react";
import { format } from "date-fns";

type Message = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesManager() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      await fetchMessages();
    };
    void loadMessages();
  }, []);

  const handleToggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      });

      if (res.ok) {
        setMessages(messages.map(m => m._id === id ? { ...m, read: !currentRead } : m));
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Message deleted");
        setMessages(messages.filter(m => m._id !== id));
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-cinzel">Contact Inquiries</h1>
        <p className="text-sm text-gray-500">View and manage messages from the website</p>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          Loading messages...
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
          No messages found.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {messages.map((msg) => (
              <li key={msg._id} className={`p-6 transition-colors ${!msg.read ? 'bg-gold/5' : 'bg-white hover:bg-gray-50'}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 font-cinzel">{msg.name}</h3>
                      {!msg.read && (
                        <span className="px-2 py-0.5 rounded-full bg-gold text-white text-[10px] font-bold uppercase tracking-wider">New</span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> <a href={`mailto:${msg.email}`} className="hover:text-gold">{msg.email}</a></div>
                      <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> <a href={`tel:${msg.phone}`} className="hover:text-gold">{msg.phone}</a></div>
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {format(new Date(msg.createdAt), 'PP p')}</div>
                    </div>

                    {msg.service && (
                      <p className="text-xs font-bold text-gold uppercase tracking-wider mb-2">Service Interest: {msg.service}</p>
                    )}
                    
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                  
                  <div className="ml-6 flex flex-col gap-2">
                    <button
                      onClick={() => handleToggleRead(msg._id, msg.read)}
                      className={`p-2 rounded-lg border flex items-center justify-center transition-colors ${msg.read ? 'bg-white border-gray-200 text-gray-400 hover:text-gray-600' : 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100'}`}
                      title={msg.read ? "Mark as unread" : "Mark as read"}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      className="p-2 bg-white border border-gray-200 text-red-600 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
