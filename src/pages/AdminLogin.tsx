
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ADMIN_PASSWORD } from '@/constants/authConstants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import TopNavbar from '@/components/TopNavbar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ArrowLeft, InfoIcon, CheckCircle } from "lucide-react";

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isSmallScreen = useMediaQuery('(max-width: 1000px)');

  useEffect(() => {
    setIsLoggingIn(false);
    setLoginError(null);
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(`Hint: The admin password is "${ADMIN_PASSWORD}"`);
    }
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/admin/case-studies" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError(null);
    
    try {
      const success = await login(password);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel"
        });
        navigate('/admin/case-studies');
      } else {
        setLoginError(`Login failed. Please check your password and try again.`);
        toast({
          title: "Login Failed",
          description: "Incorrect password or authentication error",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setLoginError(`Authentication error: ${error.message || 'Unknown error'}`);
      toast({
        title: "Login Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {isSmallScreen ? (
        <TopNavbar className="fixed top-0 left-0 right-0 z-50" />
      ) : (
        <Navbar className="fixed top-0 left-0 right-0 z-50 bg-white" />
      )}
      
      <div className="pt-20 px-4 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
              <Button 
                variant="ghost" 
                asChild 
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              >
                <Link to="/">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Website
                </Link>
              </Button>
            </div>
            <CardDescription>
              Enter password to access the admin panel
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {loginError && (
                <Alert variant="destructive">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              
              <Alert variant="info" className="bg-green-50 border-green-200">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  Email confirmation is disabled. New accounts will be activated immediately.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  disabled={isLoggingIn}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
