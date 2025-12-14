import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/context/ThemeContext";
import { Moon } from 'lucide-react';
import { Sun } from 'lucide-react';


export default function Header() {
    const { darkMode, setDarkMode } = useTheme();
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
                <div className="flex items-center space-x-2">
                    <Switch id="theme-mode"
                        className='focus-visible:border-ring-sky-600 dark:focus-visible:border-ring-sky-400 focus-visible:ring-sky-600/20 data-[state=checked]:bg-sky-600 dark:focus-visible:ring-sky-400/40 dark:data-[state=checked]:bg-sky-400'
                        checked={darkMode}
                        onCheckedChange={setDarkMode}
                    />
                    {darkMode ? <Moon color="#d29090"/> : <Sun color="#4b282d"/>}
                </div>
            </div>
        </div>
    )
}