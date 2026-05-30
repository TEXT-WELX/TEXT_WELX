import  { createContext, useContext, useState } from 'react'

const TranslationContext = createContext()

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}

const translations = {
  en: {
    // Navigation
    courses: 'Courses',
    playground: 'Playground',
    simulation: 'Simulation',
    careerPath: 'Career Path',
    contact: 'Contact',
    dashboard: 'Dashboard',
    teamManagement: 'Team Management',
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up',
    
    // Common
    welcome: 'Welcome',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    next: 'Next',
    previous: 'Previous',
    home: 'Home',
    about: 'About',
    
    // Course related
    enrollNow: 'Enroll Now',
    startCourse: 'Start Course',
    continueCourse: 'Continue Course',
    courseDetails: 'Course Details',
    instructor: 'Instructor',
    duration: 'Duration',
    level: 'Level',
    category: 'Category',
    
    // Dashboard
    myProgress: 'My Progress',
    assignedCourses: 'Assigned Courses',
    notifications: 'Notifications',
    
    // Landing page
    empoweringLearning: 'Empowering Learning & Professional Development',
    getStarted: 'Get Started',
    learnMore: 'Learn More'
  },
  ar: {
    // Navigation
    courses: 'الدورات',
    playground: 'ساحة التجريب',
    simulation: 'المحاكاة',
    careerPath: 'المسار المهني',
    contact: 'اتصل بنا',
    dashboard: 'لوحة التحكم',
    teamManagement: 'إدارة الفريق',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    signup: 'التسجيل',
    
    // Common
    welcome: 'مرحباً',
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    submit: 'إرسال',
    search: 'بحث',
    filter: 'تصفية',
    next: 'التالي',
    previous: 'السابق',
    home: 'الرئيسية',
    about: 'حول',
    
    // Course related
    enrollNow: 'سجل الآن',
    startCourse: 'ابدأ الدورة',
    continueCourse: 'أكمل الدورة',
    courseDetails: 'تفاصيل الدورة',
    instructor: 'المدرب',
    duration: 'المدة',
    level: 'المستوى',
    category: 'الفئة',
    
    // Dashboard
    myProgress: 'تقدمي',
    assignedCourses: 'الدورات المعينة',
    notifications: 'الإشعارات',
    
    // Landing page
    empoweringLearning: 'تمكين التعلم والتطوير المهني',
    getStarted: 'ابدأ الآن',
    learnMore: 'اعرف المزيد'
  }
}

export function TranslationProvider({ children }) {
  const [language, setLanguage] = useState('en')

  const t = (key) => {
    return translations[language][key] || key
  }

  const changeLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  return (
    <TranslationContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}
 