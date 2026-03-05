import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle } from '@/components/ui-primitives';
import { Zap, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // For demo purposes, registration just simulates a successful login if credentials match admin/admin
      // In a real app, registration would create a new user.
      // Here we just guide the user to use the dummy credentials.
      
      if (!isLogin) {
        // Registration simulation
        if (username === 'admin' && password === 'admin') {
           // Auto login after "registration"
           await login(username, password);
           navigate('/dashboard');
           return;
        } else {
           // For this demo, we only accept admin/admin even for registration to keep it simple as requested
           // or we could allow any input for registration and just log them in.
           // Let's stick to the requested credentials for simplicity or allow any for "registration" mock.
           // The prompt said "login should ask for registration and login the dummy login credentials should be admin admin".
           // I'll enforce admin/admin for both to ensure they see the "protected" state.
           if (username !== 'admin' || password !== 'admin') {
             setError('For this demo, please use username: admin and password: admin');
             setIsLoading(false);
             return;
           }
           await login(username, password);
           navigate('/dashboard');
        }
      } else {
        const success = await login(username, password);
        if (success) {
          navigate('/dashboard');
        } else {
          setError('Invalid credentials. Try admin / admin');
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="font-bold text-2xl tracking-tight text-gray-900">Sendify</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-gray-200 shadow-xl">
          <CardHeader className="space-y-1 text-center pb-8">
            <CardTitle className="text-2xl font-bold">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Enter your information to get started'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-11 text-base shadow-lg shadow-indigo-100" 
                isLoading={isLoading}
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-gray-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline transition-all"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Demo Credentials: <span className="font-mono text-gray-600">admin</span> / <span className="font-mono text-gray-600">admin</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
