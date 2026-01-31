import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { netlifyService } from '../services/netlifyService';

export function NetlifyCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Connecting to Netlify...');

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setMessage('Failed to connect to Netlify. Please try again.');
        setTimeout(() => navigate('/simple-editor'), 3000);
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received.');
        setTimeout(() => navigate('/simple-editor'), 3000);
        return;
      }

      try {
        // Exchange code for access token
        const redirectUri = `${window.location.origin}/netlify/callback`;
        const accessToken = await netlifyService.exchangeCodeForToken(code, redirectUri);

        // Store the token
        netlifyService.storeAccessToken(accessToken);

        setStatus('success');
        setMessage('Successfully connected to Netlify!');

        // Redirect back to editor after success
        setTimeout(() => {
          const returnUrl = localStorage.getItem('netlify_return_url') || '/simple-editor';
          localStorage.removeItem('netlify_return_url');
          navigate(returnUrl);
        }, 2000);
      } catch (error) {
        console.error('Netlify OAuth error:', error);
        setStatus('error');
        setMessage('Failed to authenticate with Netlify.');
        setTimeout(() => navigate('/simple-editor'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 mx-auto mb-6 text-blue-600 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Connecting to Netlify
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Success!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Redirecting you back...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 mx-auto mb-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Connection Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{message}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Redirecting you back...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
