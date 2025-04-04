
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">City Energy Vision</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monitor and optimize your city's energy consumption with our comprehensive dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Energy Dashboard</CardTitle>
              <CardDescription>View real-time energy consumption data</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Access comprehensive analytics and visualizations of your city's energy usage patterns.</p>
              <Button asChild>
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Energy Efficiency</CardTitle>
              <CardDescription>Optimize consumption across districts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Identify opportunities to reduce energy waste and improve efficiency across your city.</p>
              <Button asChild>
                <Link to="/efficiency">Explore</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Configure your account and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Update your account information and customize the application to suit your needs.</p>
              <Button asChild>
                <Link to="/settings">Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="mt-16 py-6 bg-gray-200 text-center">
        <p className="text-gray-600">© 2025 City Energy Vision. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
