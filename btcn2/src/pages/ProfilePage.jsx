import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const profileSchema = z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    dob: z.string().refine((val) => new Date(val).toString() !== 'Invalid Date', {
        message: "Valid date of birth is required",
    }),
});

export default function ProfilePage() {
    const { user, token, isAuthenticated } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(profileSchema),
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return;
            try {
                setLoading(true);
                const data = await authService.getProfile(token);
                setProfile(data);
                // Pre-fill form with fetched data
                setValue("email", data.email || "");
                setValue("phone", data.phone || "");
                setValue("dob", data.dob ? new Date(data.dob).toISOString().split('T')[0] : "");
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
    }, [isAuthenticated, token, setValue]);

    const onSubmit = async (data) => {
        setError("");
        setSuccessMessage("");
        setSaving(true);
        try {
            const updatedProfile = await authService.updateProfile(token, data);
            setProfile(updatedProfile);
            setSuccessMessage("Profile updated successfully!");
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };


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

    if (error && !profile) { // Only show full page error if we couldn't load profile at all
        return (
            <div className="max-w-[800px] mx-auto p-6 text-center text-red-500">
                {error}
            </div>
        );
    }

    const displayUser = profile || user;

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
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="flex flex-col space-y-1.5">
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>View and edit your personal details.</CardDescription>
                        </div>
                        {!isEditing && (
                            <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                        )}
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-100 dark:border-red-800">
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="p-3 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm rounded-lg border border-green-100 dark:border-green-800">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" value={displayUser.username || ''} disabled className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        {...register("email")}
                                        className={isEditing ? (errors.email ? "border-red-500" : "") : "bg-gray-50 dark:bg-gray-900 border-none"}
                                        readOnly={!isEditing}
                                    />
                                    {isEditing && errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            {...register("phone")}
                                            className={isEditing ? (errors.phone ? "border-red-500" : "") : "bg-gray-50 dark:bg-gray-900 border-none"}
                                            readOnly={!isEditing}
                                        />
                                        {isEditing && errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="dob">Date of Birth</Label>
                                        <Input
                                            id="dob"
                                            type="date"
                                            {...register("dob")}
                                            className={isEditing ? (errors.dob ? "border-red-500" : "") : "bg-gray-50 dark:bg-gray-900 border-none"}
                                            readOnly={!isEditing}
                                        />
                                        {isEditing && errors.dob && <p className="text-xs text-red-500">{errors.dob.message}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="created_at">Joined</Label>
                                        <Input id="created_at" value={formatDate(displayUser.created_at)} disabled className="bg-gray-100 dark:bg-gray-800 cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end gap-2 mt-6">
                                    <Button type="button" variant="ghost" onClick={() => { setIsEditing(false); setError(""); setSuccessMessage(""); reset(); }}>Cancel</Button>
                                    <Button type="submit" disabled={saving}>
                                        {saving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : "Save Changes"}
                                    </Button>
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
