import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, User } from 'lucide-react';
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function Header() {
    const { darkMode, setDarkMode } = useTheme();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-[1200px] bg-[#f0dbda] dark:bg-[#281010] border border-[#d6c5c5] dark:border-[#4b2c1f] h-16 rounded-[10px] flex
            items-center justify-between px-6">
            <div>
                <p className="text-sm text-[#4b282d] dark:text-[#d29090]">&lt;23120328&gt;</p>
            </div>
            <div>
                <p className="text-2xl font-semibold text-[#4b282d] dark:text-[#d29090]">Movies info</p>
            </div>
            <div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Switch id="theme-mode"
                            className='focus-visible:border-ring-sky-600 dark:focus-visible:border-ring-sky-400 focus-visible:ring-sky-600/20 data-[state=checked]:bg-sky-600 dark:focus-visible:ring-sky-400/40 dark:data-[state=checked]:bg-sky-400'
                            checked={darkMode}
                            onCheckedChange={setDarkMode}
                        />
                        {darkMode ? <Moon color="#d29090" /> : <Sun color="#4b282d" />}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-auto flex items-center gap-2 rounded-full p-1 pr-3 border border-gray-200 dark:border-gray-700 hover:bg-transparent">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback className={`${user ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300"} font-semibold`}>
                                        {user ? (
                                            user.username
                                                ?.split(' ')
                                                .map((p) => p[0])
                                                .join('')
                                                .slice(0, 2)
                                                .toUpperCase() || "U"
                                        ) : (
                                            <User size={16} />
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium text-[#4b282d] dark:text-[#d29090]">
                                    {user ? user.username : "Guest"}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end">
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user ? user.username : "Guest User"}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user ? user.email : "Sign in to access features"}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => navigate(user ? "/profile" : "/login")}
                                >
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => navigate(user ? "/favorites" : "/login")}
                                >
                                    Favorites
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            {user ? (
                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 cursor-pointer"
                                    onClick={logout}
                                >
                                    Log out
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                                    Log in
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}