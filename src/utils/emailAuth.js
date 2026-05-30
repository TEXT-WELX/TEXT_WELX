// Import necessary modules (if using Node.js, otherwise skip)
// const fetch = require('node-fetch'); // Uncomment if running in Node.js

import { ThermometerSnowflake } from "lucide-react";

export const sendVerificationEmail = async (email, code) => {
  try {
    // Replace these with your Mailgun credentials (store in .env!)
    const MAILGUN_DOMAIN = 'YOUR_MAILGUN_DOMAIN'; // e.g., 'mg.yourdomain.com'
    const MAILGUN_API_KEY = 'YOUR_MAILGUN_API_KEY';

    const url = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // Basic Auth: base64 encode "api:YOUR_API_KEY"
        'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        from: 'noreply@welx.com',
        to: email,
        subject: 'Wel.x Email Verification',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1e40af;">Welcome to Wel.x!</h2>
            <p>Your verification code is:</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
              <h1 style="color: #1e40af; font-size: 36px; margin: 0; letter-spacing: 8px;">${code}</h1>
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
      }),
    });

    return response.ok; // Returns true if email sent successfully
  } catch (error) {
    console.error('Mailgun email send error:', error);
    return false;
  }
};

// Other functions (unchanged)
export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeVerificationCode = (email, code) => {
  const data = {
    code,
    timestamp: Date.now(),
    email
  };
  localStorage.setItem(`verification_${email}`, JSON.stringify(data));
};

export const verifyCode = (email, inputCode) => {
  const stored = localStorage.getItem(`verification_${email}`);
  if (!stored) return false;
  
  const data = JSON.parse(stored);
  const isExpired = Date.now() - data.timestamp > 10 * 60 * 1000; // 10 minutes
  
  if (isExpired) {
    localStorage.removeItem(`verification_${email}`);
    return false;
  }
  
  return data.code === inputCode;
};

export const clearVerificationCode = (email) => {
  localStorage.removeItem(`verification_${email}`);
};