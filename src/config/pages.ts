export const publicPages = ['/', '/signin', '/500', '400'] as const;
export type PublicPage = (typeof publicPages)[number];

export const privatePages = ['/home', '/profile', '/playlist'] as const;
export type PrivatePage = (typeof privatePages)[number];

export const isPublicPage = (path: string) => {
    return publicPages.some((page) => {
        if (page === '/') return path === page;
        return path.startsWith(page);
    });
};

export const isPrivatePage = (path: string) => {
    return privatePages.some((page) => {
        return path.startsWith(page);
    });
};
