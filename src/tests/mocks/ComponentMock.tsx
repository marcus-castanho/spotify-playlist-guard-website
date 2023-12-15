import React from 'react';

export const TEST_COMPONENT_INNER_TEXT = 'TEST';

export const TEST_COMPONENT_ID = 'component-test-id';

export const ComponentMock = () => {
    return (
        <div data-testid={TEST_COMPONENT_ID}>{TEST_COMPONENT_INNER_TEXT}</div>
    );
};
