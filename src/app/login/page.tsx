'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  User,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center',
        'bg-gradient-to-br from-[#1e3a5f] via-[#1a3355] to-[#163050]',
        'font-[Sarabun] px-4'
      )}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className={cn(
                'mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4',
                'bg-[#1e3a5f]/10'
              )}
            >
              <GraduationCap size={48} className="text-[#1e3a5f]" />
            </div>
            <h1 className="text-2xl font-bold text-[#1e3a5f]">
              ระบบบริหารจัดการ
            </h1>
            <p className="text-sm text-gray-500 mt-1">โรงเรียนวัดบ้านดอน</p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              className={cn(
                'mb-6 p-3 bg-red-50 border border-red-200 rounded-lg',
                'flex items-center gap-2'
              )}
            >
              <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ชื่อผู้ใช้
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="กรอกชื่อผู้ใช้"
                  className={cn(
                    'w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg',
                    'focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]',
                    'outline-none transition-colors text-gray-900 placeholder-gray-400'
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="กรอกรหัสผ่าน"
                  className={cn(
                    'w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg',
                    'focus:ring-2 focus:ring-[#1e3a5f]/30 focus:border-[#1e3a5f]',
                    'outline-none transition-colors text-gray-900 placeholder-gray-400'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={cn(
                'w-full h-11 bg-[#1e3a5f] hover:bg-[#163050] disabled:opacity-60',
                'text-white font-medium rounded-lg transition-colors duration-200',
                'flex items-center justify-center gap-2 text-base'
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>กำลังเข้าสู่ระบบ...</span>
                </>
              ) : (
                <span>เข้าสู่ระบบ</span>
              )}
            </Button>
          </form>

          {/* Mobile-only LINE Login */}
          {isMobile && (
            <div className="mt-6">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-400">หรือ</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <Button
                type="button"
                onClick={() => alert('กำลังพัฒนา')}
                className={cn(
                  'w-full h-11 mt-4 bg-[#06c755] hover:bg-[#05b54c]',
                  'text-white font-medium rounded-lg transition-colors duration-200',
                  'flex items-center justify-center gap-2 text-base'
                )}
              >
                <span>เข้าสู่ระบบด้วย LINE</span>
              </Button>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-6">
            &copy; 2569 โรงเรียนวัดบ้านดอน
          </p>
        </div>
      </div>
    </div>
  );
}
