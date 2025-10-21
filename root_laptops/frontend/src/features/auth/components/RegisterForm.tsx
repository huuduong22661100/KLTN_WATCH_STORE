'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegister } from '../hooks/useRegister';
import type { RegisterPayload } from '../types';
import styles from './RegisterForm.module.css';

export function RegisterForm() {
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
          Đăng ký tài khoản
        </h2>

        {error && (
          <div className={styles.error}>
            <span>{error.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="name" className={styles.label}>
              Họ và tên
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Nguyễn Văn A"
              required
              disabled={isPending}
            />
          </div>

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
              minLength={6}
              required
              disabled={isPending}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            {isPending ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        <div className={styles.footer}>
          Đã có tài khoản?{' '}
          <a href="/login" className={styles.footerLink}>
            Đăng nhập
          </a>
        </div>
      </div>
    </div>
  );
}