export async function getUserInfo(token: string) {
    const userInfo = {
        id: '31ronlkcdosn3x3kkuvez6vo2jyi',
        country: 'BR',
        display_name: 'Guard Bot',
        email: 'devmail755@gmail.com',
        external_url:
            'https://open.spotify.com/user/31ronlkcdosn3x3kkuvez6vo2jyi',
        followers: 0,
        href: 'https://api.spotify.com/v1/users/31ronlkcdosn3x3kkuvez6vo2jyi',
        images: [
            'https://i.scdn.co/image/ab67757000003b82bfe7a695e552f14d237185c2',
            'https://i.scdn.co/image/ab6775700000ee85bfe7a695e552f14d237185c2',
        ],
        product: 'free',
        type: 'user',
        uri: 'spotify:user:31ronlkcdosn3x3kkuvez6vo2jyi',
        createdAt: '2023-07-05T02:23:25.238Z',
        updatedAt: '2023-07-07T01:54:01.379Z',
    };

    return new Promise<typeof userInfo>((resolve) => resolve(userInfo));
}
