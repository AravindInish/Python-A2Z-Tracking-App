import React, { useState } from 'react';
import { Smartphone, Download, X, Check, ArrowRight, Share } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showAndroidGuide, setShowAndroidGuide] = useState(false);

  if (isInstalled || dismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowAndroidGuide(true);
    }
  };

  return (
    <>
      {/* Sleek Bottom/Floating Install Notification on Mobile */}
      <aside aria-label="Mobile app installation banner" className="fixed bottom-18 md:bottom-5 right-3 left-3 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700/80 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
              <span>Install Android / Mobile App</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 text-[10px] font-mono rounded">PWA</span>
            </h4>
            <p className="text-[11px] text-slate-300 truncate">
              Fast offline access, study reminders & full-screen UI
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={handleInstallClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>

          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            title="Dismiss banner"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Manual Android / iOS Install Instructions Modal */}
      {showAndroidGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {isIOS ? 'Install on iPhone / iPad' : 'Install on Android'}
                  </h3>
                  <p className="text-[11px] text-slate-500">Run as a native home-screen app</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAndroidGuide(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              {isIOS ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">1</span>
                    <span>Tap the Safari <strong>Share</strong> button <Share className="w-3.5 h-3.5 inline text-blue-600" /></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">2</span>
                    <span>Scroll down and select <strong>&quot;Add to Home Screen&quot;</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">3</span>
                    <span>Tap <strong>Add</strong> in the top-right corner</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">1</span>
                    <span>Tap the Chrome menu (<strong>⋮</strong> three dots)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">2</span>
                    <span>Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">3</span>
                    <span>Confirm to add the DSA Tracker to your Android apps drawer!</span>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowAndroidGuide(false)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
};
