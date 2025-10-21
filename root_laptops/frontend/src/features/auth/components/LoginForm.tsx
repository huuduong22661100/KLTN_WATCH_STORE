'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useLogin';
import type { LoginCredentials } from '../types';
import styles from './LoginForm.module.css';

export function LoginForm() {
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
        router.push('/');
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
    <div className={styles.wrapper}>
      <div className={styles.formCard}>
        <h2 className={styles.title}>
          Đăng nhập
        </h2>

        {error && (
          <div className={styles.error}>
            <div className={styles.errorContent}>
              <span>⚠️</span>
              <span className={styles.errorMessage}>{error.message}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="your@email.com"
              required
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="password" className={styles.label}>
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="••••••••"
              required
              disabled={isPending}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <div className={styles.footer}>
          Chưa có tài khoản?{' '}
          <a href="/register" className={styles.footerLink}>
            Đăng ký ngay
          </a>
        </div>
      </div>
    </div>
  );
}