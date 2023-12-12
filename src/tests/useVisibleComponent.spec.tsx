import React from 'react';
import { renderHook, render, fireEvent } from '@testing-library/react';
import { useVisibleComponent } from '@/hooks/useVisibleComponent';

describe('useVisibleComponent', () => {
    it('should initialize hook', () => {
        const { result } = renderHook(() => useVisibleComponent(true));

        expect(result.current.isVisible).toBe(true);
        expect(result.current.ref.current).toBeNull();
        expect(typeof result.current.setIsVisible).toBe('function');
        expect(typeof result.current.switchVisibility).toBe('function');
    });

    it('should initialize hook with isVisible set to false', () => {
        const { result } = renderHook(() => useVisibleComponent(false));

        expect(result.current.isVisible).toBe(false);
    });

    it('should change isVisible to false click outside ref', () => {
        const BUTTON_TEST_ID = 'switch-visibility-button';
        const OUTSIDE_COMPONENT_ID = 'outside-of-ref-component';
        const { result } = renderHook(() =>
            useVisibleComponent<HTMLDivElement>(true),
        );
        const { getByTestId } = render(
            <div>
                <div ref={result.current.ref}>
                    <button
                        data-testid={BUTTON_TEST_ID}
                        onClick={() => result.current.switchVisibility()}
                    />
                </div>
                <div
                    data-testid={OUTSIDE_COMPONENT_ID}
                    onClick={() => result.current.setIsVisible(false)}
                />
            </div>,
        );

        const outsideComponent = getByTestId(OUTSIDE_COMPONENT_ID);
        fireEvent.click(outsideComponent);

        expect(result.current.isVisible).toBe(false);
    });

    it('should switch isVisible value when click button multiple times', () => {
        const BUTTON_TEST_ID = 'switch-visibility-button';
        const OUTSIDE_COMPONENT_ID = 'outside-of-ref-component';
        const { result } = renderHook(() =>
            useVisibleComponent<HTMLDivElement>(false),
        );
        const { getByTestId } = render(
            <div>
                <div ref={result.current.ref}>
                    <button
                        data-testid={BUTTON_TEST_ID}
                        onClick={() => result.current.switchVisibility()}
                    />
                </div>
                <div
                    data-testid={OUTSIDE_COMPONENT_ID}
                    onClick={() => result.current.setIsVisible(false)}
                />
            </div>,
        );

        const button = getByTestId(BUTTON_TEST_ID);
        const initiaState = result.current.isVisible;
        fireEvent.click(button);
        const middleState = result.current.isVisible;
        fireEvent.click(button);
        const endState = result.current.isVisible;

        expect(initiaState).toBe(false);
        expect(middleState).toBe(true);
        expect(endState).toBe(false);
    });
});
