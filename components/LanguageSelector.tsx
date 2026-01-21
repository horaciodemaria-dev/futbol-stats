'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Language } from '@/lib/translations';

const languages = [
  { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
  { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
];

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = (searchParams.get('lang') as Language) || 'es';

  const handleLanguageChange = (lang: Language) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    router.refresh();
  };

  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            currentLang === lang.code
              ? 'bg-green-500/30 border-2 border-green-500 text-green-400'
              : 'bg-slate-700/50 border-2 border-slate-600 text-gray-400 hover:border-green-500/50'
          }`}
          title={lang.name}
        >
          <span className="text-xl">{lang.flag}</span>
        </button>
      ))}
    </div>
  );
}
