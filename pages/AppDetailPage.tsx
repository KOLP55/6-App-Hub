
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { apps } from '../data/apps';
import Rating from '../components/Rating';
import Button from '../components/Button';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const AppDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const app = apps.find(a => a.id === id);

  if (!app) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">التطبيق غير موجود</h2>
        <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">العودة إلى الصفحة الرئيسية</Link>
      </div>
    );
  }

  const InfoChip = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="text-center">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className="font-bold text-gray-800 dark:text-white">{value}</div>
    </div>
  );

  return (
    <div className="container mx-auto max-w-5xl">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 mb-6 transition-colors">
            <ArrowRightIcon />
            <span>العودة إلى القائمة</span>
        </Link>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <img src={app.icon} alt={app.name} className="w-32 h-32 rounded-3xl object-cover shadow-md mx-auto md:mx-0 flex-shrink-0" />
            <div className="flex-1 text-center md:text-right">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{app.name}</h1>
              <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold mt-1">{app.developer}</p>
              <div className="mt-2 text-gray-600 dark:text-gray-300">
                <span>{app.category}</span>
                {app.isEditorChoice && <span className="ms-3 bg-green-100 text-green-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded-full dark:bg-green-200 dark:text-green-900">اختيار المحررين</span>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-gray-200 dark:border-gray-700 my-8 py-6">
            <InfoChip label="التقييم" value={<div className="flex items-center justify-center gap-1">{app.rating.toFixed(1)} <Rating value={app.rating} /></div>} />
            <InfoChip label="المراجعات" value={app.reviews} />
            <InfoChip label="الحجم" value={app.size} />
            <InfoChip label="التنزيلات" value={app.downloads} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <a href={app.apkUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button className="w-full">تحميل APK</Button>
            </a>
            <Button variant="secondary" className="w-full sm:w-auto">إضافة إلى قائمة الرغبات</Button>
          </div>
        </div>
        
        <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50">
           <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">لقطات الشاشة</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6">
                {app.images.map((image, index) => (
                    <img key={index} src={image} alt={`Screenshot ${index + 1}`} className="h-48 rounded-xl object-cover snap-center" />
                ))}
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">الوصف</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{app.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AppDetailPage;
