import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
    const { user, token, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                setLoading(true);
                const data = await authService.getProfile(token);
                setProfile(data);
            } catch (err) {
                console.error("Failed to fetch profile:", err);
                setError("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchProfile();
        }
    }, [isAuthenticated, token]);


    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-[800px] mx-auto p-6 text-center text-red-500">
                {error}
            </div>
        );
    }

    // Use profile data if available, fall back to context user data
    const displayUser = profile || user;

    // Helper to format date if needed, assuming ISO string
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
    };

    return (
        <div className="max-w-[800px] mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Avatar & Basic Info */}
                <Card className="h-fit">
                    <CardHeader className="flex flex-col items-center text-center">
                        <Avatar className="h-32 w-32 mb-4">
                            <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                                {displayUser.username
                                    ?.split(' ')
                                    .map((p) => p[0])
                                    .join('')
                                    .slice(0, 2)
                                    .toUpperCase() || "U"
                                }
                            </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl">{displayUser.username}</CardTitle>
                        <CardDescription>{displayUser.email}</CardDescription>
                        <div className="mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                            {displayUser.role || "User"}
                        </div>
                    </CardHeader>
                </Card>

                {/* Right Column: Detailed Info Form */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>View your personal details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" value={displayUser.username || ''} readOnly className="bg-gray-50 dark:bg-gray-900" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={displayUser.email || ''} readOnly className="bg-gray-50 dark:bg-gray-900" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" value={displayUser.phone || 'N/A'} readOnly className="bg-gray-50 dark:bg-gray-900" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dob">Date of Birth</Label>
                                    <Input id="dob" value={formatDate(displayUser.dob)} readOnly className="bg-gray-50 dark:bg-gray-900" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="created_at">Joined</Label>
                                    <Input id="created_at" value={formatDate(displayUser.created_at)} readOnly className="bg-gray-50 dark:bg-gray-900" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
