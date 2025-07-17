import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface Breadcrumb {
    label: string;
    href: string;
    isCurrent?: boolean;
}

export const Breadcrumbs = ({ items }: { items: Breadcrumb[] }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
                {items.map((item, index) => (
                    <li key={item.label}>
                        <div className="flex items-center">
                            <Link
                                href={item.href}
                                className={`text-sm font-medium ${item.isCurrent ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {item.label}
                            </Link>
                            {index < items.length - 1 && (
                                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}; 