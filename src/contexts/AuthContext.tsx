
import React, { createContext, useState, useEffect, ReactNode, FC } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/compat/app';

export interface AuthContextType {
  currentUser: firebase.User | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const signUp = async (email: string, password: string) => {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    // You might want to automatically sign out the user until they verify
    await auth.signOut(); 
    // Send verification email
    // if (userCredential.user) {
    //   await userCredential.user.sendEmailVerification();
    // }
    closeAuthModal();
    alert('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.');
  };

  const signIn = async (email: string, password: string) => {
    await auth.signInWithEmailAndPassword(email, password);
    closeAuthModal();
  };

  const signOut = async () => {
    await auth.signOut();
  };

  const value: AuthContextType = {
    currentUser,
    loading,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
