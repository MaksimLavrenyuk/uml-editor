import { i18n } from '@lingui/core';
import { en } from 'make-plural/plurals';
import messagesRu from '../../../../locales/ru/messages';
import messagesEn from '../../../../locales/en/messages';
import Diagram from '../index';
import ComponentType from '../../../../models/ComponentType';
import ComponentFactory from '../../../../models/factories/ComponentFactory';

beforeAll(() => {
    i18n.load({ ru: messagesRu.messages, en: messagesEn.messages });
    i18n.loadLocaleData('en', { plurals: en });
});

describe('Functionality of the root component of the diagram.', () => {
    it('Adding new class node.', () => {
        const diagram = new Diagram([], { i18n });

        const id = diagram.addNode({ type: ComponentType.CLASS });

        expect(diagram.engine()
            .getModel()
            .getNode(id))
            .not
            .toBeUndefined();
    });

    it('Adding new interface node.', () => {
        const diagram = new Diagram([], { i18n });
        const id = diagram.addNode({ type: ComponentType.INTERFACE });

        expect(diagram.engine()
            .getModel()
            .getNode(id))
            .not
            .toBeUndefined();
    });

    it('Extract data to a component class without extension.', () => {
        const diagram = new Diagram([], { i18n });
        const componentFactory = new ComponentFactory();
        const name = 'test';

        diagram.addNode({ type: ComponentType.CLASS, name });

        expect(diagram.content())
            .toEqual([componentFactory.createClass(name)]);
    });

    it('Extract data to a component class with extension.', () => {
        const diagram = new Diagram([], { i18n });
        const componentFactory = new ComponentFactory();
        const name = 'test';

        diagram.addNode({ type: ComponentType.CLASS, name });

        expect(diagram.content())
            .toEqual([componentFactory.createClass(name)]);
    });
});

describe('Filling the diagram with the list of nodes.', () => {
    it('Filling with classes without extension', () => {
        const componentFactory = new ComponentFactory();
        const components = [
            componentFactory.createClass('test_1', 'test_1'),
            componentFactory.createClass('test_2'),
        ];
        const diagram = new Diagram(components, { i18n });

        expect(diagram.content()).toEqual(components);
    });
});
