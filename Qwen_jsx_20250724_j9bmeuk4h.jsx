// App.jsx
import React, { useState, useEffect } from 'react';
import { Search, Download, Star, Calendar, Users, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

// Mock data for apps
const mockApps = [
  {
    id: "1",
    name: "لعبة الع tuần",
    version: "2.1.5",
    size: "45 MB",
    description: "لعبة مغامرات مذهلة في عالم خيالي مليء بالتحديات والمكافآت. استكشف عوالم مختلفة واحصل على مكافآت فريدة.",
    iconUrl: "https://placehold.co/80x80/4f46e5/ffffff?text=Game1",
    imageUrl: "https://placehold.co/800x400/4f46e5/ffffff?text=Featured+Game",
    downloadUrls: ["https://example.com/download1", "https://example.com/download2"]
  },
  {
    id: "2",
    name: "تطبيق الإنتاجية",
    version: "1.8.2",
    size: "32 MB",
    description: "أداة قوية لزيادة الإنتاجية وإدارة المهام اليومية. تتضمن ميزات التقويم والملاحظات والتذكيرات.",
    iconUrl: "https://placehold.co/80x80/10b981/ffffff?text=App2",
    imageUrl: "https://placehold.co/800x400/10b981/ffffff?text=Productivity+App",
    downloadUrls: ["https://example.com/download3"]
  },
  {
    id: "3",
    name: "تطبيق الطقس",
    version: "3.0.1",
    size: "18 MB",
    description: "توقعات الطقس الدقيقة مع تفاصيل دقيقة عن درجات الحرارة والأمطار والرياح. تحديثات فورية وتنبيهات ذكية.",
    iconUrl: "https://placehold.co/80x80/0ea5e9/ffffff?text=App3",
    imageUrl: "https://placehold.co/800x400/0ea5e9/ffffff?text=Weather+App",
    downloadUrls: ["https://example.com/download4", "https://example.com/download5"]
  },
  {
    id: "4",
    name: "تطبيق الصحة",
    version: "1.5.0",
    size: "28 MB",
    description: "تتبع صحتك ولياقتك البدنية مع ميزات تتبع الخطوات والنوم والتغذية. تقارير مفصلة وتحليلات شخصية.",
    iconUrl: "https://placehold.co/80x80/f97316/ffffff?text=App4",
    imageUrl: "https://placehold.co/800x400/f97316/ffffff?text=Health+App",
    downloadUrls: ["https://example.com/download6"]
  },
  {
    id: "5",
    name: "تطبيق التواصل",
    version: "4.2.3",
    size: "52 MB",
    description: "منصة تواصل اجتماعي متكاملة مع ميزات الدردشة الفيديو والمكالمات الصوتية. خاصية البث المباشر والمشاركة.",
    iconUrl: "https://placehold.co/80x80/ec4899/ffffff?text=App5",
    imageUrl: "https://placehold.co/800x400/ec4899/ffffff?text=Social+App",
    downloadUrls: ["https://example.com/download7", "https://example.com/download8"]
  },
  {
    id: "6",
    name: "تطبيق التعليم",
    version: "2.7.1",
    size: "39 MB",
    description: "منصة تعليمية شاملة مع دورات تفاعلية ومحاضرات مباشرة. مكتبة ضخمة من المحتوى التعليمي.",
    iconUrl: "https://placehold.co/80x80/8b5cf6/ffffff?text=App6",
    imageUrl: "https://placehold.co/800x400/8b5cf6/ffffff?text=Education+App",
    downloadUrls: ["https://example.com/download9"]
  }
];

const AppStore = () => {
  const [apps, setApps] = useState(mockApps);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Filter apps based on search term
  const filteredApps = apps.filter(app => 
    app.name.includes(searchTerm) || 
    app.description.includes(searchTerm)
  );

  // Featured app for banner
  const featuredApp = apps[0];

  // Auto-rotate banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % apps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [apps.length]);

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  const openAppDetails = (app) => {
    setSelectedApp(app);
  };

  const closeAppDetails = () => {
    setSelectedApp(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white rtl" dir="rtl">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              متجر التطبيقات
            </h1>
          </div>
          
          <div className="relative w-1/3">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن تطبيقات..."
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-indigo-300 transition-colors">الرئيسية</a>
            <a href="#" className="hover:text-indigo-300 transition-colors">الألعاب</a>
            <a href="#" className="hover:text-indigo-300 transition-colors">التطبيقات</a>
            <a href="#" className="hover:text-indigo-300 transition-colors">المجانية</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Featured Banner */}
        <section className="mb-12 relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-gray-700">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
          <img 
            src={featuredApp.imageUrl} 
            alt={featuredApp.name} 
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="container mx-auto px-8">
              <div className="max-w-lg">
                <div className="inline-flex items-center bg-indigo-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Star className="w-4 h-4 mr-1" />
                  لعبة الأسبوع
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">{featuredApp.name}</h2>
                <p className="text-gray-300 mb-6">{featuredApp.description}</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => openAppDetails(featuredApp)}
                    className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Download className="w-5 h-5 ml-2" />
                    تحميل الآن
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                    <Heart className="w-5 h-5 ml-2" />
                    إضافة للمفضلة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apps Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">جميع التطبيقات</h2>
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">الترتيب حسب:</span>
              <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>الأحدث</option>
                <option>الأكثر تقييماً</option>
                <option>الأكثر تحميلاً</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {filteredApps.map((app) => (
              <div 
                key={app.id} 
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-indigo-500 transition-all duration-300 cursor-pointer group"
                onClick={() => openAppDetails(app)}
              >
                <div className="relative">
                  <img 
                    src={app.iconUrl} 
                    alt={app.name} 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Download className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{app.name}</h3>
                  <div className="flex items-center text-gray-400 text-sm mb-2">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>4.8</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">{app.size}</span>
                    <span className="text-indigo-400">{app.version}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* App Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="relative">
              <img 
                src={selectedApp.imageUrl} 
                alt={selectedApp.name} 
                className="w-full h-48 md:h-64 object-cover rounded-t-2xl"
              />
              <button 
                onClick={closeAppDetails}
                className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-4 right-4 bg-indigo-600 rounded-lg px-3 py-1 text-sm font-medium">
                لعبة الأسبوع
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                <img 
                  src={selectedApp.iconUrl} 
                  alt={selectedApp.name} 
                  className="w-20 h-20 rounded-xl border-2 border-gray-700 -mt-12 mb-4 md:mb-0 md:ml-6"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{selectedApp.name}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 mr-1" />
                      <span>4.8 (2,458 تقييم)</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-indigo-400 mr-1" />
                      <span>+100 ألف تحميل</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-green-400 mr-1" />
                      <span>تم التحديث: قبل 3 أيام</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">{selectedApp.version}</span>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">{selectedApp.size}</span>
                    <span className="bg-indigo-900/50 px-3 py-1 rounded-full text-sm text-indigo-300">مجاني</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">الوصف</h3>
                <p className="text-gray-300 leading-relaxed">
                  {selectedApp.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {selectedApp.downloadUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => handleDownload(url)}
                    className="flex-1 min-w-[200px] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center"
                  >
                    <Download className="w-5 h-5 ml-2" />
                    تحميل من المصدر {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-800/50 border-t border-gray-700 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">متجر التطبيقات</h3>
              </div>
              <p className="text-gray-400">
                أكبر متجر للتطبيقات والألعاب في المنطقة العربية. اكتشف تطبيقات جديدة يومياً.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">التصفح</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-indigo-300 transition-colors">الألعاب</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">التطبيقات</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">الأكثر تحميلاً</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">المجانية</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-indigo-300 transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">الإبلاغ عن مشكلة</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">طلب تطبيق</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">التوافق</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-indigo-300 transition-colors">تويتر</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">فيسبوك</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">إنستغرام</a></li>
                <li><a href="#" className="hover:text-indigo-300 transition-colors">يوتيوب</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
            <p>© 2023 متجر التطبيقات. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppStore;