import * as ApiService from '../ApiService';

describe('ApiService', () => {

    const fakeFetch = (data) => {
        return jest.fn().mockImplementation(() => {
            return Promise.resolve({
                json: () => Promise.resolve(data)
            });
        });
    };

    beforeEach(() => {
        global.fetch = fakeFetch({
            items: [
                {
                    id: 1,
                    name: 'repo1',
                    owner: {
                        login: 'owner1'
                    },
                    description: 'description1',
                    html_url: 'https://example.github.com/repo1',
                    stargazers_count: 100,
                    language: 'javascript',
                    topics: ['topic1', 'topic2']
                },
                {
                    id: 2,
                    name: 'repo2',
                    owner: {
                        login: 'owner2'
                    },
                    description: 'description2',
                    html_url: 'https://example.github.com/repo2',
                    stargazers_count: 200,
                    language: 'go',
                    topics: ['topic1', 'topic2']
                }
            ]
        });
    });

    afterEach(() => {
        global.fetch.mockClear();
        delete global.fetch;
    });

    describe('getTrendingRepos', () => {
        it('should return a list of repos', async () => {
            const repos = await ApiService.getTrendingRepos();
            expect(repos.length).toBe(2);
            expect(repos[0].id).toBe(1);
            expect(repos[0].name).toBe('repo1');
            expect(repos[0].owner).toBe('owner1');
            expect(repos[0].description).toBe('description1');
            expect(repos[0].url).toBe('https://example.github.com/repo1');
            expect(repos[0].stars).toBe(100);
            expect(repos[0].language).toBe('javascript');
            expect(repos[0].topics).toEqual(['topic1', 'topic2']);
        });

        it('should return an empty list if no repos are found', async () => {
            global.fetch = fakeFetch({
                items: []
            });
            const repos = await ApiService.getTrendingRepos();
            expect(repos.length).toBe(0);
        });

        it('should return an empty list if an error occurs', async () => {
            global.fetch = fakeFetch({
                message: 'Not Found'
            });
            const repos = await ApiService.getTrendingRepos();
            expect(repos.length).toBe(0);
        });

    });
});
