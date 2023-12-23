import { renderHook, act } from '@testing-library/react';
import { usePagination } from '@/hooks/usePagination';

describe('usePagination', () => {
    it('should initialize hook', () => {
        const { result } = renderHook(() => usePagination());

        expect(result.current.page).toBe(1);
        expect(typeof result.current.changePage).toBe('function');
        expect(typeof result.current.getPagesIndexes).toBe('function');
    });

    it('should change page to next page', () => {
        const NEXT_PAGE = 2;
        const { result } = renderHook(() => usePagination());

        act(() => {
            result.current.changePage('next');
        });

        expect(result.current.page).toBe(NEXT_PAGE);
    });

    it('should change page to previous page', () => {
        const PREVIOUS_PAGE = 1;
        const { result } = renderHook(() => usePagination());

        act(() => {
            result.current.changePage(2);
        });
        act(() => {
            result.current.changePage('previous');
        });

        expect(result.current.page).toBe(PREVIOUS_PAGE);
    });

    it('should maintain page value as 1 when call changePage and page is first page', () => {
        const PREVIOUS_PAGE = 1;
        const { result } = renderHook(() => usePagination());

        act(() => {
            result.current.changePage('previous');
        });

        expect(result.current.page).toBe(PREVIOUS_PAGE);
    });

    it('should change page to given page', () => {
        const GIVEN_PAGE = 10;
        const { result } = renderHook(() => usePagination());

        act(() => {
            result.current.changePage(GIVEN_PAGE);
        });

        expect(result.current.page).toBe(GIVEN_PAGE);
    });

    it('should get pages indexes when call getPagesIndexes with numPages smaller than maxVisiblePages', () => {
        const NUM_PAGES = 1;
        const MAX_VISIBLE_PAGES = 5;
        const INDEXES_ARR = [1];
        const INDEXES_STR = '1';
        const returnValues: {
            indexesArr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesArr'];
            indexesStr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesStr'];
        } = { indexesArr: [], indexesStr: '' };
        const { result } = renderHook(() => usePagination());

        act(() => {
            const { indexesArr, indexesStr } = result.current.getPagesIndexes(
                NUM_PAGES,
                MAX_VISIBLE_PAGES,
            );
            returnValues.indexesArr = indexesArr;
            returnValues.indexesStr = indexesStr;
        });

        expect(JSON.stringify(returnValues.indexesArr)).toBe(
            JSON.stringify(INDEXES_ARR),
        );
        expect(returnValues.indexesStr).toBe(INDEXES_STR);
    });

    it('should get pages indexes when call getPagesIndexes with numPages equal maxVisiblePages', () => {
        const NUM_PAGES = 5;
        const MAX_VISIBLE_PAGES = 5;
        const INDEXES_ARR = [1, 2, 3, 4, 5];
        const INDEXES_STR = '1, 2, 3, 4, 5';
        const returnValues: {
            indexesArr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesArr'];
            indexesStr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesStr'];
        } = { indexesArr: [], indexesStr: '' };
        const { result } = renderHook(() => usePagination());

        act(() => {
            const { indexesArr, indexesStr } = result.current.getPagesIndexes(
                NUM_PAGES,
                MAX_VISIBLE_PAGES,
            );
            returnValues.indexesArr = indexesArr;
            returnValues.indexesStr = indexesStr;
        });

        expect(JSON.stringify(returnValues.indexesArr)).toBe(
            JSON.stringify(INDEXES_ARR),
        );
        expect(returnValues.indexesStr).toBe(INDEXES_STR);
    });

    it('should get pages indexes when call getPagesIndexes with numPages greater than maxVisiblePages and it is on first page', () => {
        const NUM_PAGES = 20;
        const MAX_VISIBLE_PAGES = 5;
        const INDEXES_ARR = [1, 2, 3, 4, 5, null, NUM_PAGES];
        const INDEXES_STR = `1, 2, 3, 4, 5...${NUM_PAGES}`;
        const returnValues: {
            indexesArr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesArr'];
            indexesStr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesStr'];
        } = { indexesArr: [], indexesStr: '' };
        const { result } = renderHook(() => usePagination());

        act(() => {
            const { indexesArr, indexesStr } = result.current.getPagesIndexes(
                NUM_PAGES,
                MAX_VISIBLE_PAGES,
            );
            returnValues.indexesArr = indexesArr;
            returnValues.indexesStr = indexesStr;
        });

        expect(JSON.stringify(returnValues.indexesArr)).toBe(
            JSON.stringify(INDEXES_ARR),
        );
        expect(returnValues.indexesStr).toBe(INDEXES_STR);
    });

    it('should get pages indexes when call getPagesIndexes with numPages greater than maxVisiblePages and it is on middle page', () => {
        const NUM_PAGES = 20;
        const MAX_VISIBLE_PAGES = 5;
        const GIVEN_PAGE = 6;
        const INDEXES_ARR = [1, null, 6, 7, 8, 9, 10, null, NUM_PAGES];
        const INDEXES_STR = `1...6, 7, 8, 9, 10...${NUM_PAGES}`;
        const returnValues: {
            indexesArr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesArr'];
            indexesStr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesStr'];
        } = { indexesArr: [], indexesStr: '' };
        const { result } = renderHook(() => usePagination());

        act(() => {
            result.current.changePage(GIVEN_PAGE);
        });
        act(() => {
            const { indexesArr, indexesStr } = result.current.getPagesIndexes(
                NUM_PAGES,
                MAX_VISIBLE_PAGES,
            );
            returnValues.indexesArr = indexesArr;
            returnValues.indexesStr = indexesStr;
        });

        expect(JSON.stringify(returnValues.indexesArr)).toBe(
            JSON.stringify(INDEXES_ARR),
        );
        expect(returnValues.indexesStr).toBe(INDEXES_STR);
    });

    it('should get pages indexes when call getPagesIndexes with numPages greater than maxVisiblePages and it is on last but one page', () => {
        const NUM_PAGES = 20;
        const MAX_VISIBLE_PAGES = 5;
        const GIVEN_PAGE = NUM_PAGES - 1;
        const INDEXES_ARR = [1, null, 16, 17, 18, 19, 20];
        const INDEXES_STR = '1...16, 17, 18, 19, 20';
        const returnValues: {
            indexesArr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesArr'];
            indexesStr: ReturnType<
                typeof result.current.getPagesIndexes
            >['indexesStr'];
        } = { indexesArr: [], indexesStr: '' };
        const { result } = renderHook(() => usePagination());

        act(() => {
            result.current.changePage(GIVEN_PAGE);
        });
        act(() => {
            const { indexesArr, indexesStr } = result.current.getPagesIndexes(
                NUM_PAGES,
                MAX_VISIBLE_PAGES,
            );
            returnValues.indexesArr = indexesArr;
            returnValues.indexesStr = indexesStr;
        });

        expect(JSON.stringify(returnValues.indexesArr)).toBe(
            JSON.stringify(INDEXES_ARR),
        );
        expect(returnValues.indexesStr).toBe(INDEXES_STR);
    });
});
