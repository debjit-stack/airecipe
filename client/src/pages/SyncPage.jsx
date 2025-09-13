import React, { useState, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SyncPage = () => {
  const [currentUserId, setCurrentUserId] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('recipeRemixerUserId') || 'No ID found';
    setCurrentUserId(id);
  }, []);

  const handleCopyToClipboard = () => {
    if (currentUserId && currentUserId !== 'No ID found') {
      navigator.clipboard.writeText(currentUserId);
      toast.success('User ID copied to clipboard!');
    } else {
      toast.error('No User ID to copy.');
    }
  };

  const handleSyncDevice = () => {
    if (newUserId.trim()) {
      localStorage.setItem('recipeRemixerUserId', newUserId.trim());
      toast.success('Device synced successfully! Your history will now be shared.');
      // Navigate to history to see the newly synced recipes
      navigate('/history');
      // Force a reload to ensure all components re-fetch with the new ID
      window.location.reload(); 
    } else {
      toast.error('Please paste a valid User ID to sync.');
    }
  };

  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#334155',
            color: '#fff',
          },
        }}
      />
      <div className="min-h-screen bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-4 sm:p-8 transition-colors duration-300">
        <div className="max-w-2xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-emerald-500 dark:text-emerald-400">
              Sync Devices
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Use the same recipe history across all your devices.
            </p>
          </header>

          {/* Section 1: Display Current User ID */}
          <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
              Step 1: Copy ID from your main device
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              This is the unique, anonymous ID for this browser. Copy it from the device that has the recipe history you want to see elsewhere.
            </p>
            <div className="flex items-center bg-white dark:bg-slate-800 p-3 rounded-md border border-slate-300 dark:border-slate-600">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-mono truncate flex-1" title={currentUserId}>
                {currentUserId}
              </span>
              <button 
                onClick={handleCopyToClipboard}
                className="ml-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md transition-transform duration-200 hover:scale-105"
              >
                Copy ID
              </button>
            </div>
          </div>

          {/* Section 2: Sync New Device */}
          <div className="bg-slate-100 dark:bg-slate-700 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-4">
              Step 2: Sync your new device
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              On your new device (e.g., your phone), paste the ID you copied from your main device into the field below and click "Sync".
            </p>
            <div className="flex flex-col sm:flex-row items-stretch gap-4">
              <input 
                type="text"
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                placeholder="Paste User ID here"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none flex-1"
              />
              <button 
                onClick={handleSyncDevice}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-md transition-transform duration-200 hover:scale-105"
              >
                Sync This Device
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SyncPage;
