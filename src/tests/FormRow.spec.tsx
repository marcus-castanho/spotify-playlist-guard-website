import React from 'react';
import { render } from '@testing-library/react';
import { FormRow } from '@/components/FormRow';
import { FormFieldMock } from './mocks/FormFieldMock';

const LABEL = 'form-row';

describe('FormRow', () => {
    it('should render', () => {
        const { getByLabelText } = render(
            <FormRow columns={1}>
                <FormFieldMock />
            </FormRow>,
        );

        const container = getByLabelText(LABEL);

        expect(container).toBeDefined();
    });
});
