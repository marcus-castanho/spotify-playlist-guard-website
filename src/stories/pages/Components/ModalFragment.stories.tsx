import React from 'react';
import type { Meta } from '@storybook/react';
import { ModalFragment } from '@/components/ModalFragment';

const meta = {
    title: 'Components/ModalFragment',
    component: ModalFragment,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ModalFragment>;

export default meta;

const ModalMock = () => (
    <div className="p-3.5">
        <div className="p-3.5">
            <div className="flex justify-center pb-3.5">
                Test modal component
            </div>
        </div>
    </div>
);

export const Modal = () => (
    <ModalFragment display closeModal={() => {}} content={<ModalMock />} />
);
