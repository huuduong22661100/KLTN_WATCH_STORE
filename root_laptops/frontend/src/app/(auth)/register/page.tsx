'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useRegister } from '@/features/auth/hooks/useRegister'; 
import { RegisterPayload } from '@/features/auth/types';
import styles from './page.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const { mutate: register, isPending, error } = useRegister();
  
  const [formData, setFormData] = useState<RegisterPayload>({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    register(formData, {
      onSuccess: () => {
        toast.success('Đăng ký thành công!');
        router.push('/'); // ✅ AUTO LOGIN + REDIRECT
      },
      onError: (err) => {
        toast.error(err.message || 'Đăng ký thất bại');
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
            Đăng ký tài khoản mới
          </h2>
          <p className={styles.subtitle}>
            Hoặc{' '}
            <a href="/login" className={styles.registerLink}>
              đăng nhập nếu đã có tài khoản
            </a>
          </p>
        </div>

        <div className={styles.formCard}>
          {error && (
            <div className={styles.errorAlert}>
              <div className={styles.errorContent}>
                <span className={styles.errorText}>{error.message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Họ và tên
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Nguyễn Văn A"
                required
                disabled={isPending}
              />
            </div>

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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="••••••••"
                minLength={6}
                required
                disabled={isPending}
              />
              <p className={styles.subtitle} style={{ marginTop: '0.25rem' }}>
                Mật khẩu phải có ít nhất 6 ký tự
              </p>
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
                    Đang đăng ký...
                  </span>
                ) : (
                  'Đăng ký'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}