import Link from 'next/link';
import React from 'react';
import { ChevronRight } from 'lucide-react';

type BreadcrumbProps = {
  items: {
    label: string;
    href: string;
  }[];
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav className="flex items-center space-x-1 text-sm">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-3 w-3 text-gray-500" />}
          {index === items.length - 1 ? (
            <span className="text-gray-800">{item.label}</span>
          ) : (
            <Link href={item.href} className="text-blue-600 hover:underline">
              {item.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;