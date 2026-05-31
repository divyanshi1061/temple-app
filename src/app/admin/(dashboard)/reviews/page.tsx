"use client";

import React, { useState, useEffect } from "react";
import { fetchWithAuth, API_BASE } from "@/lib/adminApi";
import { 
  FaStar, 
  FaTrashAlt, 
  FaCheck, 
  FaTimes, 
  FaSpinner, 
  FaExclamationTriangle,
  FaCommentDots
} from "react-icons/fa";

interface ReviewItem {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  ipAddress: string;
  approved: boolean;
  submittedAt: string;
}

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchWithAuth(`${API_BASE}/admin/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      } else {
        setError("Failed to fetch reviews from backend.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reviews due to a network connection error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleApprove = async (id: string, currentApproved: boolean) => {
    try {
      setActionLoading(id);
      const res = await fetchWithAuth(`${API_BASE}/admin/reviews/${id}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved: !currentApproved }),
      });

      if (res.ok) {
        setReviews((prev) =>
          prev.map((r) => (r._id === id ? { ...r, approved: !currentApproved } : r))
        );
      } else {
        alert("Failed to update approval status.");
      }
    } catch (err) {
      alert("Error contacting the server.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;

    try {
      setActionLoading(id);
      const res = await fetchWithAuth(`${API_BASE}/admin/reviews/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setReviews((prev) => prev.filter((r) => r._id !== id));
      } else {
        alert("Failed to delete review.");
      }
    } catch (err) {
      alert("Error contacting the server.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6 flex-grow pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold font-cinzel tracking-wider text-amber-800 uppercase">
            Review Manager
          </h1>
          <p className="text-gray-500 text-xs md:text-sm font-semibold mt-1">
            Moderate, approve, or delete dynamic reviews submitted by devotees.
          </p>
        </div>
        <button
          onClick={loadReviews}
          disabled={loading}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl text-xs hover:bg-gray-50 transition-colors shadow-xs"
        >
          Refresh List
        </button>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <FaSpinner size={24} className="text-gold animate-spin" />
          <span className="text-sm font-semibold text-gray-500">Loading reviews...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex items-center gap-4 text-red-800 max-w-xl mx-auto shadow-xs">
          <FaExclamationTriangle size={24} className="shrink-0" />
          <div>
            <h4 className="font-bold">Error Loading Data</h4>
            <p className="text-xs font-semibold mt-1">{error}</p>
          </div>
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center text-center max-w-xl mx-auto shadow-xs gap-4 mt-6">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold">
            <FaCommentDots size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-gray-800 text-base">No reviews submitted</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs font-medium">
              Devotees have not submitted any dynamic reviews yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-55 border-b border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <th className="p-4 pl-6">Devotee</th>
                  <th className="p-4">Rating & Review</th>
                  <th className="p-4">Metadata</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
                {reviews.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/40 transition-colors">
                    {/* Devotee Info */}
                    <td className="p-4 pl-6 align-top max-w-[200px]">
                      <div className="font-bold text-gray-900 leading-tight">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1 font-medium">{item.location || "No Location Specified"}</div>
                    </td>

                    {/* Review text & rating */}
                    <td className="p-4 align-top max-w-md">
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar 
                            key={i} 
                            className={`text-xs ${i < item.rating ? "text-gold" : "text-gray-200"}`} 
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal whitespace-pre-wrap">
                        {item.text}
                      </p>
                    </td>

                    {/* Meta info */}
                    <td className="p-4 align-top text-xs text-gray-500 font-medium">
                      <div>IP: {item.ipAddress}</div>
                      <div className="mt-1">
                        Date: {new Date(item.submittedAt).toLocaleDateString()} {new Date(item.submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="p-4 align-top text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase shadow-2xs ${
                        item.approved 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-250" 
                          : "bg-amber-50 text-amber-700 border border-amber-250"
                      }`}>
                        {item.approved ? "Approved" : "Pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 pr-6 align-top text-right space-x-2">
                      <button
                        onClick={() => handleToggleApprove(item._id, item.approved)}
                        disabled={actionLoading === item._id}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border transition-colors shadow-2xs ${
                          item.approved
                            ? "bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700"
                            : "bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-750"
                        }`}
                        title={item.approved ? "Unapprove Review" : "Approve Review"}
                      >
                        {actionLoading === item._id ? (
                          <FaSpinner className="animate-spin text-xs" />
                        ) : item.approved ? (
                          <FaTimes className="text-xs" />
                        ) : (
                          <FaCheck className="text-xs" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleDeleteReview(item._id)}
                        disabled={actionLoading === item._id}
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg border bg-red-50 hover:bg-red-100 border-red-200 text-red-600 transition-colors shadow-2xs"
                        title="Delete Review"
                      >
                        {actionLoading === item._id ? (
                          <FaSpinner className="animate-spin text-xs" />
                        ) : (
                          <FaTrashAlt className="text-xs" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
