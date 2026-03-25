import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Link as LinkIcon, Save, Settings, Camera, Trash2, UserCircle, CheckCircle, Phone, MapPin, AlignLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';

const UserProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profilePic: '',
    mobileNumber: '',
    bio: '',
    location: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        profilePic: user.profilePic || '',
        mobileNumber: user.mobileNumber || '',
        bio: user.bio || '',
        location: user.location || '',
      });
    }
  }, [user]);

  const getProfileUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    const baseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
    return `${baseUrl}${path}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large (max 5MB)');
      return;
    }

    const uploadData = new FormData();
    uploadData.append('profilePic', file);

    setUploading(true);
    try {
      const { data } = await api.post('/auth/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      updateUser(data);
      setFormData((prev) => ({ ...prev, profilePic: data.profilePic }));
      toast.success('Profile picture updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.put('/auth/update', formData);
      updateUser({ ...user, ...data });
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 lg:p-10 h-full">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight flex items-center gap-4">
              Profile <span className="text-green-500">Settings</span>
              <div className="p-2 bg-green-500/10 rounded-xl border border-green-500/20">
                <Settings className="text-green-500 animate-spin-slow" size={24} />
              </div>
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Update your personal info and account details</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 w-fit">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-sm font-medium text-slate-300">Active Account</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Main Profile Section */}
          <div className="glass-card p-1 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-500/10 rounded-full blur-3xl group-hover:bg-green-500/20 transition-all duration-700" />
            
            <div className="p-8 lg:p-12 flex flex-col items-center">
              
              {/* Profile Pic Anchor */}
              <div className="relative mb-10 group/img">
                <div className="w-40 h-40 rounded-[2.5rem] p-1 bg-gradient-to-br from-green-500 via-emerald-500 to-cyan-500 shadow-2xl shadow-green-500/20">
                  <div className="w-full h-full rounded-[2.3rem] bg-[#0a0a0f] overflow-hidden relative">
                    {formData.profilePic ? (
                      <img 
                        src={getProfileUrl(formData.profilePic)} 
                        alt="Profile" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
                        <UserCircle className="text-slate-800" size={100} />
                      </div>
                    )}
                    
                    {/* Interactive Selection Overlay */}
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      disabled={uploading}
                      className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer border-none"
                    >
                      {uploading ? (
                        <div className="spinner h-10 w-10 border-green-500" />
                      ) : (
                        <>
                          <Camera size={32} className="text-green-400 mb-2 transform group-hover/img:scale-110 transition-transform" />
                          <span className="text-xs font-bold text-white uppercase tracking-widest">Update Photo</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 p-2 rounded-2xl shadow-xl shadow-green-500/30 border-4 border-[#0a0a0f]">
                  <CheckCircle size={18} className="text-white" />
                </div>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              {/* Form Fields In Modern Grid */}
              <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Full Name</label>
                    <div className="relative group/input">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-green-500 transition-colors" size={20} />
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className="input-field pl-12 bg-white/[0.03] hover:bg-white/[0.05] border-white/5 focus:border-green-500/50" 
                        placeholder="Your Name" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="input-field pl-12 bg-white/5 border-white/5 cursor-not-allowed opacity-70" 
                        disabled
                        placeholder="email@example.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Mobile Number</label>
                    <div className="relative group/input">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-green-500 transition-colors" size={20} />
                      <input 
                        type="tel" 
                        name="mobileNumber" 
                        value={formData.mobileNumber} 
                        onChange={handleChange} 
                        className="input-field pl-12 bg-white/[0.03] hover:bg-white/[0.05] border-white/5 focus:border-green-500/50" 
                        placeholder="+91 00000 00000" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-400 ml-1">Location</label>
                    <div className="relative group/input">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-green-500 transition-colors" size={20} />
                      <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        className="input-field pl-12 bg-white/[0.03] hover:bg-white/[0.05] border-white/5 focus:border-green-500/50" 
                        placeholder="City, Country" 
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400 ml-1">About / Bio</label>
                  <div className="relative group/input">
                    <AlignLeft className="absolute left-4 top-4 text-slate-500 group-focus-within/input:text-green-500 transition-colors" size={20} />
                    <textarea 
                      name="bio" 
                      value={formData.bio} 
                      onChange={handleChange} 
                      rows="3"
                      className="input-field pl-12 pt-3 resize-none bg-white/[0.03] hover:bg-white/[0.05] border-white/5 focus:border-green-500/50" 
                      placeholder="Tell us a bit about yourself..." 
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 text-right px-1">Max 200 characters</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  <label className="text-sm font-semibold text-slate-400 ml-1">Profile Picture URL</label>
                  <div className="relative group/input">
                    <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-green-500 transition-colors" size={20} />
                    <input 
                      type="text" 
                      name="profilePic" 
                      value={formData.profilePic} 
                      onChange={handleChange} 
                      className="input-field pl-12 bg-white/[0.03] border-white/5" 
                      placeholder="Direct link to image (optional)" 
                    />
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                  <button type="submit" disabled={loading || uploading} className="btn-primary flex items-center justify-center gap-3 w-full sm:w-auto min-w-[200px] py-4 h-14">
                    {loading ? <div className="spinner h-5 w-5 border-white border-t-transparent animate-spin" /> : <Save size={20} />}
                    <span className="font-bold tracking-wide">{loading ? 'Saving...' : 'Save Profile'}</span>
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => window.location.reload()}
                    className="w-full sm:w-auto px-8 py-4 h-14 rounded-xl font-bold bg-white/5 text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 flex items-center justify-center gap-2 border border-white/5 hover:border-red-500/20"
                  >
                    <Trash2 size={18} />
                    Reset Changes
                  </button>
                </div>
              </form>

            </div>
          </div>

          {/* Account Info Footer */}
          <div className="flex items-center justify-center gap-6 py-8 border-t border-white/5">
            <div className="flex flex-col items-center">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Privacy</span>
              <span className="text-white font-medium mt-1">High</span>
            </div>
            <div className="w-[1px] h-8 bg-white/5" />
            <div className="flex flex-col items-center">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Auto-save</span>
              <span className="text-green-500 font-medium mt-1 uppercase">Enabled</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default UserProfilePage;
