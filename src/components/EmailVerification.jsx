import  { useState, useEffect } from 'react';
import { Mail, RefreshCw, Check } from 'lucide-react';
import { sendVerificationEmail, generateVerificationCode, storeVerificationCode, verifyCode, clearVerificationCode } from '../utils/emailAuth';

export default function EmailVerification({ email, onVerified, onCancel }) {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    sendInitialCode();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const sendInitialCode = async () => {
    setIsLoading(true);
    const verificationCode = generateVerificationCode();
    storeVerificationCode(email, verificationCode);
    
    const sent = await sendVerificationEmail(email, verificationCode);
    if (sent) {
      setCountdown(60);
    } else {
      setError('Failed to send verification email. Please try again.');
    }
    setIsLoading(false);
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    setError('');
    const verificationCode = generateVerificationCode();
    storeVerificationCode(email, verificationCode);
    
    const sent = await sendVerificationEmail(email, verificationCode);
    if (sent) {
      setCountdown(60);
    } else {
      setError('Failed to resend verification email.');
    }
    setIsLoading(false);
  };

  const handleVerify = () => {
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    const isValid = verifyCode(email, code);
    if (isValid) {
      setSuccess(true);
      clearVerificationCode(email);
      setTimeout(() => onVerified(), 1000);
    } else {
      setError('Invalid or expired code. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-green-600 mb-2">Email Verified!</h3>
        <p className="text-gray-600">Redirecting you now...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Your Email</h3>
        <p className="text-gray-600">We sent a verification code to:</p>
        <p className="font-medium text-gray-900">{email}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter 6-digit code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
              setError('');
            }}
            className="w-full p-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="000000"
            maxLength={6}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={handleVerify}
          disabled={code.length !== 6}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Verify Email
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={countdown > 0 || isLoading}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
          </button>
        </div>

        <button
          onClick={onCancel}
          className="w-full text-gray-600 hover:text-gray-800 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
 