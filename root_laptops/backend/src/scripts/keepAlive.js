/**
 * Keep-Alive Script for Render Free Tier
 * 
 * Render free tier puts services to sleep after 15 minutes of inactivity.
 * This script pings the server every 14 minutes to keep it awake.
 * 
 * NOTE: Chỉ sử dụng trong development hoặc nếu bạn cần service luôn online.
 * Cách tốt hơn là nâng cấp lên paid plan hoặc chấp nhận cold start.
 */

import fetch from 'node-fetch';

// URL của backend API trên Render (thay bằng URL thực tế của bạn)
const API_URL = process.env.API_URL || 'https://kltn-watch-store-api.onrender.com';

// Interval: 14 phút (14 * 60 * 1000 milliseconds)
const PING_INTERVAL = 14 * 60 * 1000;

async function ping() {
  try {
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    console.log(`✅ [${new Date().toISOString()}] Ping successful:`, data.status);
  } catch (error) {
    console.error(`❌ [${new Date().toISOString()}] Ping failed:`, error.message);
  }
}

// Ping ngay khi script chạy
ping();

// Ping định kỳ
setInterval(ping, PING_INTERVAL);

console.log(`🚀 Keep-alive script started. Pinging ${API_URL} every 14 minutes...`);
