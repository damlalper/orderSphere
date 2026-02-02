"use client";

import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function SettingsPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="space-y-6">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your account settings and set e-mail preferences.
                </p>
            </div>

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 pl-4">
                        <Button
                            variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                            className="justify-start"
                            onClick={() => setActiveTab('profile')}
                        >
                            Profile
                        </Button>
                        <Button
                            variant={activeTab === 'integrations' ? 'secondary' : 'ghost'}
                            className="justify-start"
                            onClick={() => setActiveTab('integrations')}
                        >
                            Integrations
                        </Button>
                        <Button
                            variant={activeTab === 'notifications' ? 'secondary' : 'ghost'}
                            className="justify-start"
                            onClick={() => setActiveTab('notifications')}
                        >
                            Notifications
                        </Button>
                    </nav>
                </aside>

                <div className="flex-1 lg:max-w-2xl">
                    {activeTab === 'profile' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Email</label>
                                    <Input value={user?.email} disabled />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Role</label>
                                    <Input value={user?.role} disabled />
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>
                    )}

                    {activeTab === 'integrations' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Integrations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <label className="text-base font-medium">Shopify</label>
                                        <p className="text-sm text-muted-foreground">Sync orders from Shopify store</p>
                                    </div>
                                    <Button variant="outline" size="sm">Configure</Button>
                                </div>
                                <div className="flex items-center justify-between rounded-lg border p-4 opacity-50">
                                    <div className="space-y-0.5">
                                        <label className="text-base font-medium">WooCommerce</label>
                                        <p className="text-sm text-muted-foreground">Coming Soon</p>
                                    </div>
                                    <Button variant="outline" size="sm" disabled>Connect</Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
