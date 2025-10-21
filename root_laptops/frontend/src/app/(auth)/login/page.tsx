'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useLogin } from '@/features/auth/hooks/useLogin'; 
import { useAuthStore } from '@/store/authStore';
import { LoginCredentials } from '@/features/auth/types';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { mutate: login, isPending, error } = useLogin();
  
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    login(formData, {
      onSuccess: () => {
        toast.success('Đăng nhập thành công!');
        router.push('/'); // ✅ REDIRECT VỀ TRANG CHỦ
      },
      onError: (err) => {
        toast.error(err.message || 'Đăng nhập thất bại');
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Đăng nhập vào tài khoản
          </h2>
          <p className={styles.subtitle}>
            Hoặc{' '}
            <a href="/register" className={styles.registerLink}>
              đăng ký tài khoản mới
            </a>
          </p>
        </div>

        <div className={styles.formCard}>
          {error && (
            <div className={styles.errorAlert}>
              <div className={styles.errorContent}>
                <span>⚠️</span>
                <span className={styles.errorText}>{error.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="your@email.com"
                required
                disabled={isPending}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
                required
                disabled={isPending}
              />
            </div>

            <div className={styles.rememberRow}>
              <div className={styles.rememberCheck}>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className={styles.checkbox}
                />
                <label htmlFor="remember-me" className={styles.checkboxLabel}>
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div>
                <a href="/forgot-password" className={styles.forgotLink}>
                  Quên mật khẩu?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isPending}
                className={styles.submitButton}
              >
                {isPending ? (
                  <span className={styles.loadingContent}>
                    <svg className={styles.spinner} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang đăng nhập...
                  </span>
                ) : (
                  'Đăng nhập'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}