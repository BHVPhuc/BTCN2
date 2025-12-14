import { House } from 'lucide-react';

export default function NavBar() {

    return (
        <div className="w-full max-w-[1200px] bg-[#d3e0fc] dark:bg-[#0b1b39] border border-[#c2d4e9] dark:border-[#122d5f] h-15 rounded-[10px] flex
            items-center justify-between px-6 my-1">
            <div className='cursor-pointer'>
                <House className="dark:text-white"/>               
            </div>
            <div className='flex'>
                <input type="text" id="first_name" 
                    className="bg-white dark:bg-background rounded-[10px] border border-default-medium text-heading text-sm rounded-base focus:border-brand block w-full px-3 py-2 shadow-xs placeholder:text-body mr-3" 
                    placeholder="Search" />
                <button
                    type='button'
                    className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                    >Search</button>
            </div>
        </div>
    )
}