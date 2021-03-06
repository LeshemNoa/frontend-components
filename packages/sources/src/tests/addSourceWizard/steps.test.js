import React from 'react';
import toJson from 'enzyme-to-json';
import { Button, EmptyStateBody, Title } from '@patternfly/react-core';

import FinishedStep from '../../addSourceWizard/steps/FinishedStep';
import LoadingStep from '../../addSourceWizard/steps/LoadingStep';
import ErroredStep from '../../addSourceWizard/steps/ErroredStep';
import TimeoutStep from '../../addSourceWizard/steps/TimeoutStep';

import mount from '../__mocks__/mount';

describe('Steps components', () => {
    let initialProps;
    let spyFunction;
    let spyFunctionSecond;

    beforeEach(() => {
        spyFunction = jest.fn();
        spyFunctionSecond = jest.fn();
    });

    afterEach(() => {
        spyFunction.mockReset();
        spyFunctionSecond.mockReset();
    });

    describe('FinishedStep', () => {
        beforeEach(() => {
            initialProps = {
                onClose: spyFunction,
                successfulMessage: 'Here I Am',
                hideSourcesButton: false,
                returnButtonTitle: 'Go back to my application'
            };
        });

        it('renders correctly', () => {
            const wrapper = mount(<FinishedStep { ...initialProps }/>);
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('a[href="/hybrid/settings/sources"]').length).toBe(1);
            expect(wrapper.find(EmptyStateBody).html().includes('Here I Am')).toBe(true);
        });

        it('renders withou takemetosources button', () => {
            const wrapper = mount(<FinishedStep { ...initialProps } hideSourcesButton={ true }/>);
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find('a[href="/hybrid/settings/sources"]').length).toBe(0);
        });

        it('calls onClose function', () => {
            const wrapper = mount(<FinishedStep { ...initialProps }/>);
            wrapper.find(Button).first().simulate('click');
            expect(spyFunction).toHaveBeenCalled();
        });
    });

    describe('LoadingStep', () => {
        beforeEach(() => {
            initialProps = {
                onClose: spyFunction,
                customText: 'Here I Am'
            };
        });

        it('renders correctly with custom props', () => {
            const wrapper = mount(<LoadingStep { ...initialProps }/>);
            expect(toJson(wrapper)).toMatchSnapshot();
            expect(wrapper.find(Title).html().includes('Here I Am')).toBe(true);
        });

        it('renders correctly', () => {
            const wrapper = mount(<LoadingStep />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('calls onClose function', () => {
            const wrapper = mount(<LoadingStep { ...initialProps }/>);
            wrapper.find(Button).first().simulate('click');
            expect(spyFunction).toHaveBeenCalled();
        });
    });

    describe('ErroredStep', () => {
        beforeEach(() => {
            initialProps = {
                onClose: spyFunction,
                returnButtonTitle: 'Go back to my application'
            };
        });

        it('renders correctly', () => {
            const wrapper = mount(<ErroredStep { ...initialProps }/>);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('renders correctly with message', () => {
            const ERROR_MESSAGE = 'I am a little error, nice to meet you';
            const wrapper = mount(<ErroredStep { ...initialProps } message={ERROR_MESSAGE}/>);

            expect(wrapper.find(EmptyStateBody).text()).toEqual(ERROR_MESSAGE);
        });

        it('calls onClose function', () => {
            const wrapper = mount(<ErroredStep { ...initialProps }/>);
            wrapper.find(Button).first().simulate('click');
            expect(spyFunction).toHaveBeenCalled();
        });

        it('calls primaryAction function', () => {
            const wrapper = mount(<ErroredStep { ...initialProps } primaryAction={spyFunctionSecond}/>);
            wrapper.find(Button).simulate('click');
            expect(spyFunctionSecond).toHaveBeenCalled();
        });
    });

    describe('TimeoutStep', () => {
        beforeEach(() => {
            initialProps = {
                onClose: spyFunction,
                returnButtonTitle: 'go back'
            };
        });

        it('renders correctly', () => {
            const wrapper = mount(<TimeoutStep { ...initialProps }/>);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('renders correctly customized', () => {
            const wrapper = mount(<TimeoutStep
                { ...initialProps }
                title="pekny nadpis"
                secondaryActions={<button>some button here</button>}
            />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('calls onClose function', () => {
            const wrapper = mount(<TimeoutStep { ...initialProps }/>);
            wrapper.find(Button).simulate('click');
            expect(spyFunction).toHaveBeenCalled();
        });
    });
});
