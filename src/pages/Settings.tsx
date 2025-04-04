
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface SettingsFormValues {
  notifications: boolean;
  emailAlerts: boolean;
  dataRefreshRate: string;
  darkMode: boolean;
  apiKey: string;
}

const Settings = () => {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    defaultValues: {
      notifications: true,
      emailAlerts: false,
      dataRefreshRate: "5",
      darkMode: false,
      apiKey: "sk-energy-dashboard-xxxxx",
    },
  });

  const onSubmit = (data: SettingsFormValues) => {
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved successfully.",
    });
    console.log(data);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage how the dashboard looks and behaves.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="dataRefreshRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Refresh Rate (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            max="60"
                            placeholder="5"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          How often to refresh data on the dashboard.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Dark Mode</FormLabel>
                          <FormDescription>
                            Toggle dark mode for the dashboard.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to be notified about energy events.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Dashboard Notifications</FormLabel>
                          <FormDescription>
                            Receive notifications on the dashboard for important alerts.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="emailAlerts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Alerts</FormLabel>
                          <FormDescription>
                            Receive email alerts for critical energy events.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account information and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" value="admin@cityenergy.com" readOnly className="bg-muted" />
                      </div>
                      <div>
                        <FormLabel>Role</FormLabel>
                        <Input value="Administrator" readOnly className="bg-muted" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Security</h3>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Enable Two-Factor Authentication</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Manage API keys and access for integration with other systems.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="apiKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>API Key</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input
                              type="password"
                              {...field}
                              readOnly
                              className="font-mono bg-muted"
                            />
                            <Button 
                              type="button" 
                              variant="outline" 
                              className="ml-2"
                              onClick={() => {
                                toast({
                                  title: "API Key Regenerated",
                                  description: "A new API key has been generated successfully."
                                });
                              }}
                            >
                              Regenerate
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription>
                          This key grants access to the Energy Dashboard API.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
