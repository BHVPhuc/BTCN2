import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Moon } from 'lucide-react';
import { Sun } from 'lucide-react';
import { useState } from "react";

export default function Header() {
    const [darkMode, setDarkMode] = useState(false);
    return (
        <div className="w-full max-w-[1200px] bg-[#f0dbda] border border-[#d6c5c5] h-16 rounded-[10px] flex
            items-center justify-between px-6">
            <div>
                <p className="text-sm text-[#4b282d]">&lt;23120328&gt;</p>
            </div>
            <div>
                <p className="text-2xl font-semibold text-[#4b282d]">Movies info</p>
            </div>
            <div>
                <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode"
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                    />
                    {darkMode ? <Moon color="#4b282d"/> : <Sun color="#4b282d"/>}
                </div>
            </div>
        </div>
    )
}