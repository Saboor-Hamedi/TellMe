import { Link } from "@inertiajs/react";
import { PaginationLinks } from '../helper/types';


export  function Paginate({ links }: { links: PaginationLinks[] }) {
    return (
        <div className="mt-4 flex justify-center">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || '#'}
                    className={`mx-1 rounded border px-3 py-1 ${link.active ? 'bg-foreground text-background' : 'bg-gray-200 text-gray-700'}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </div>
    );
}