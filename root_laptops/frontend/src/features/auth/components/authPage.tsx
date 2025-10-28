import React from 'react';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import { LoginForm } from '../components/LoginForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui/breadcrumb';
import styles from './authPage.module.css';

const AuthPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Customer Login</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className={styles.pageTitle}>Customer Login</h2>
      </div>
      <section className={styles.contentSection}>
        <div className={styles.loginCard}>
          <h3 className={styles.cardTitle}>Registered Customers</h3>
          <p className={styles.cardDescription}>If you have an account, sign in with your email address.</p>
          <LoginForm />
        </div>
        <div className={styles.registerCard}>
            <h3 className={styles.cardTitle}>New Customers</h3>
            <p className={styles.cardDescription}>Creating an account has many benefits:</p>
            <ul className={styles.benefitsList}>
                <li>Order history</li>
                <li>Track orders</li>
                <li>Faster checkout</li>
                <li>Save multiple shipping addresses</li>
            </ul>
            <Link href="/register">
              <Button className={styles.createAccountButton}>Create an Account</Button>
            </Link>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;