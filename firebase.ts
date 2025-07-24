
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// !!! هام جداً !!!
// يجب استبدال هذا الكائن ببيانات تهيئة مشروع Firebase الحقيقي الخاص بك.
// يمكنك الحصول عليها من Firebase Console -> إعدادات المشروع (Project settings).
//
// !!! تحذير أمان !!!
// نشر مفاتيح API الخاصة بك في كود العميل (client-side) يمكن أن يشكل خطرًا أمنيًا.
// تأكد من تأمين مشروع Firebase الخاص بك باستخدام:
// 1.  قواعد أمان Firebase (Firestore/Storage Security Rules).
// 2.  قواعد مصادقة Firebase (Authentication Rules).
// 3.  تفعيل Firebase App Check لضمان أن الطلبات تأتي من تطبيقك فقط.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
