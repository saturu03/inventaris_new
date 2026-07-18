import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/language-context';

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage();

    return (
        <DropdownMenu>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9 cursor-pointer">
                                <Languages className="!size-5 opacity-80 hover:opacity-100" />
                                <span className="sr-only">Toggle language</span>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{language === 'en' ? 'English' : 'Indonesia'}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'font-bold' : ''}
                >
                    English
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLanguage('id')}
                    className={language === 'id' ? 'font-bold' : ''}
                >
                    Indonesia
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
