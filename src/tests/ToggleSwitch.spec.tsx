import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { ToggleSwitch } from '@/components/ToggleSwitch';

const DEFAULT_CHECKED = false;

const INPUT_LABEL = 'toggle-checkbox-input';

const MEDIUM_SIZE_CLASSES = 'scale-75';

describe('ToggleSwitch', () => {
    it('should render', () => {
        const { getByLabelText } = render(
            <ToggleSwitch
                size="small"
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);

        expect(input).toBeDefined();
    });

    it('should render with disabled attribute set to false as default', () => {
        const { getByLabelText } = render(
            <ToggleSwitch
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);

        expect(input).not.toBeDisabled();
    });

    it('should render as disabled', () => {
        const { getByLabelText } = render(
            <ToggleSwitch
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
                disabled
            />,
        );

        const input = getByLabelText(INPUT_LABEL);

        expect(input).toBeDisabled();
    });

    it('should render with given defaultChecked value', () => {
        const GIVEN_DEFAULT_CHECKED = true;
        const { getByLabelText } = render(
            <ToggleSwitch
                defaultChecked={GIVEN_DEFAULT_CHECKED}
                onChange={() => {}}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);

        expect(input).toBeChecked();
    });

    it('should render with medium size as default', () => {
        const { getByLabelText } = render(
            <ToggleSwitch
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);
        const container = input.parentElement;
        const wrapper = container?.parentElement;

        expect(wrapper).toHaveClass(MEDIUM_SIZE_CLASSES);
    });

    it('should render with small size', () => {
        const SMALL_SIZE_CLASSES = 'scale-50';
        const { getByLabelText } = render(
            <ToggleSwitch
                size="small"
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);
        const container = input.parentElement;
        const wrapper = container?.parentElement;

        expect(wrapper).toHaveClass(SMALL_SIZE_CLASSES);
    });

    it('should render with medium size as default', () => {
        const { getByLabelText } = render(
            <ToggleSwitch
                size="medium"
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);
        const container = input.parentElement;
        const wrapper = container?.parentElement;

        expect(wrapper).toHaveClass(MEDIUM_SIZE_CLASSES);
    });

    it('should render with large size', () => {
        const LARGE_SIZE_CLASSES = 'scale-100';
        const { getByLabelText } = render(
            <ToggleSwitch
                size="large"
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);
        const container = input.parentElement;
        const wrapper = container?.parentElement;

        expect(wrapper).toHaveClass(LARGE_SIZE_CLASSES);
    });

    it('should check when click toggle', () => {
        const { getByLabelText } = render(
            <ToggleSwitch
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
            />,
        );

        const inputBefore = getByLabelText(INPUT_LABEL);

        expect(inputBefore).not.toBeChecked();

        fireEvent.click(inputBefore);

        const inputAfter = getByLabelText(INPUT_LABEL);

        expect(inputAfter).toBeChecked();
    });

    it('should call onClick passed as prop', () => {
        const onClick = jest.fn();
        const { getByLabelText } = render(
            <ToggleSwitch
                defaultChecked={DEFAULT_CHECKED}
                onChange={() => {}}
                onClick={onClick}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);
        fireEvent.click(input);

        expect(onClick).toHaveBeenCalled();
    });

    it('should call onChange passed as prop', () => {
        const onChange = jest.fn();
        const { getByLabelText } = render(
            <ToggleSwitch
                defaultChecked={DEFAULT_CHECKED}
                onChange={onChange}
            />,
        );

        const input = getByLabelText(INPUT_LABEL);
        fireEvent.click(input);

        expect(onChange).toHaveBeenCalled();
    });
});
