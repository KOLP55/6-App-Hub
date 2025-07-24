import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const GoogleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C41.382 36.218 44 31.023 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const AuthModal: React.FC<AuthModalProps> = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { closeAuthModal, signUp, signIn } = useAuth();

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeAuthModal();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isSignUp && password !== confirmPassword) {
        setError('كلمتا المرور غير متطابقتين.');
        return;
    }
    
    setLoading(true);
    try {
        if (isSignUp) {
            await signUp(email, password);
        } else {
            await signIn(email, password);
        }
    } catch (err: any) {
        // Map common Firebase auth errors to Arabic
        switch (err.code) {
            case 'auth/invalid-email':
                setError('البريد الإلكتروني غير صالح.');
                break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
            case 'auth/invalid-credential':
                setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
                break;
            case 'auth/email-already-in-use':
                setError('هذا البريد الإلكتروني مسجل بالفعل.');
                break;
            case 'auth/weak-password':
                setError('كلمة المرور ضعيفة جدًا. يجب أن تكون 6 أحرف على الأقل.');
                break;
            default:
                setError('حدث خطأ ما. يرجى المحاولة مرة أخرى.');
        }
    } finally {
        setLoading(false);
    }
  }

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
        onClick={handleOverlayClick}
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto relative transform animate-scale-in">
        <button 
            onClick={closeAuthModal} 
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close dialog"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
            {isSignUp ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {isSignUp ? 'مرحبًا بك! يرجى ملء التفاصيل أدناه.' : 'مرحبًا بعودتك!'}
          </p>

          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg text-center mb-4 text-sm">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="email">البريد الإلكتروني</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="password">كلمة المرور</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
              />
            </div>
            {isSignUp && (
              <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="confirm-password">تأكيد كلمة المرور</label>
                <input 
                  type="password" 
                  id="confirm-password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1 block w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition"
                />
              </div>
            )}
             <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 disabled:bg-sky-300 disabled:cursor-not-allowed"
            >
              {loading ? 'الرجاء الانتظار...' : (isSignUp ? 'إنشاء الحساب' : 'تسجيل الدخول')}
            </button>
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300"/>
            <span className="mx-4 text-sm font-medium text-gray-500">أو</span>
            <hr className="flex-grow border-gray-300"/>
          </div>

          <button
              type="button"
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-300"
          >
              <GoogleIcon className="w-6 h-6"/>
              <span>{isSignUp ? 'التسجيل باستخدام Google' : 'المتابعة باستخدام Google'}</span>
          </button>
          
          <div className="text-center mt-6">
            <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="text-sm text-sky-600 hover:underline font-medium">
              {isSignUp ? 'هل لديك حساب بالفعل؟ تسجيل الدخول' : 'ليس لديك حساب؟ إنشاء حساب جديد'}
            </button>
          </div>

        </div>
      </div>
      <style>{`
          @keyframes fade-in-fast {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          .animate-fade-in-fast {
              animation: fade-in-fast 0.2s ease-out forwards;
          }
           @keyframes scale-in {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in {
              animation: scale-in 0.25s ease-out forwards;
          }
      `}</style>
    </div>
  );
};

export default AuthModal;
