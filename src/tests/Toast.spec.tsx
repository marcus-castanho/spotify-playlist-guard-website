import React from 'react';
import { render } from '@testing-library/react';
import { Toast } from '@/components/Toast';

const DEFAULT_MESSAGE = 'default message';

const TOAST_LABEL = 'toast-message';

describe('Toast', () => {
    it('should render when display prop is set to true', () => {
        const { getByLabelText } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="info" />,
        );

        const container = getByLabelText(TOAST_LABEL);

        expect(container).toBeDefined();
    });

    it('should not render when display prop is set to false', () => {
        const { queryByLabelText } = render(
            <Toast display={false} message={DEFAULT_MESSAGE} type="info" />,
        );

        const container = queryByLabelText(TOAST_LABEL);

        expect(container).toBeNull();
    });

    it('should render "Success" when type "success" is passed as prod', () => {
        const SUCCESS_TEXT = 'Success';
        const { getByText } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="success" />,
        );

        const paragraph = getByText(SUCCESS_TEXT);

        expect(paragraph.innerHTML).toBe(SUCCESS_TEXT);
    });

    it('should render "Warning" when type "warning" is passed as prod', () => {
        const WARNING_TEXT = 'Warning';
        const { getByText } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="warning" />,
        );

        const paragraph = getByText(WARNING_TEXT);

        expect(paragraph.innerHTML).toBe(WARNING_TEXT);
    });

    it('should render "Info" when type "info" is passed as prod', () => {
        const INFO_TEXT = 'Info';
        const { getByText } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="info" />,
        );

        const paragraph = getByText(INFO_TEXT);

        expect(paragraph.innerHTML).toBe(INFO_TEXT);
    });

    it('should render "Error" when type "error" is passed as prod', () => {
        const ERROR_TEXT = 'Error';
        const { getByText } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="error" />,
        );

        const paragraph = getByText(ERROR_TEXT);

        expect(paragraph.innerHTML).toBe(ERROR_TEXT);
    });

    it('should render CheckIcon when type "success" is passed as prod', () => {
        const CHECK_ICON_TITLE = 'check-icon';
        const { getByTitle } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="success" />,
        );

        const svgTitle = getByTitle(CHECK_ICON_TITLE);

        expect(svgTitle).toBeDefined();
    });

    it('should render WarningFilledIcon when type "warning" is passed as prod', () => {
        const WARNING_FILLED_ICON_TITLE = 'warning-filled-icon';
        const { getByTitle } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="warning" />,
        );

        const svgTitle = getByTitle(WARNING_FILLED_ICON_TITLE);

        expect(svgTitle).toBeDefined();
    });

    it('should render InfoIcon when type "info" is passed as prod', () => {
        const INFO_ICON_TITLE = 'info-icon';
        const { getByTitle } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="info" />,
        );

        const svgTitle = getByTitle(INFO_ICON_TITLE);

        expect(svgTitle).toBeDefined();
    });

    it('should render ErrorIcon when type "error" is passed as prod', () => {
        const ERROR_ICON_TITLE = 'error-icon';
        const { getByTitle } = render(
            <Toast display={true} message={DEFAULT_MESSAGE} type="error" />,
        );

        const svgTitle = getByTitle(ERROR_ICON_TITLE);

        expect(svgTitle).toBeDefined();
    });
});
