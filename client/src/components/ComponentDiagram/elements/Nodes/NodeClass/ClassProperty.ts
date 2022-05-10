import { action, makeObservable, observable } from 'mobx';
import { Modifier } from '../../../../../models/Modifier';
import { Property as PropertyModel } from '../../../../../models/components/Property';
import Property from '../../Properties/Property';

type DefaultDataClassProperty = {
    modifier: PropertyModel['modifier']
    isAbstract: PropertyModel['isAbstract'],
    isOptional: PropertyModel['isOptional'],
    isStatic: PropertyModel['isStatic'],
};

const DEFAULT_CLASS_PROPERTY: DefaultDataClassProperty = {
    modifier: 'public',
    isAbstract: false,
    isOptional: false,
    isStatic: false,
};

class ClassProperty extends Property {
    @observable
    private propModifier: Modifier;

    @observable
    private propAbstract: boolean;

    @observable
    private propOptional: boolean;

    @observable
    private propStatic: boolean;

    constructor(component?: PropertyModel) {
        super(component);

        this.propModifier = component?.modifier || DEFAULT_CLASS_PROPERTY.modifier;
        this.propAbstract = component?.isAbstract !== undefined
            ? component.isAbstract
            : DEFAULT_CLASS_PROPERTY.isAbstract;
        this.propOptional = component?.isOptional !== undefined
            ? component.isOptional
            : DEFAULT_CLASS_PROPERTY.isOptional;
        this.propStatic = component?.isStatic !== undefined
            ? component.isStatic
            : DEFAULT_CLASS_PROPERTY.isStatic;

        makeObservable(this);
    }

    @action.bound
    toggleAbstract(isAbstract: boolean): void {
        this.propAbstract = isAbstract;

        this.events.emit('change');
    }

    @action.bound
    toggleOptional(isOptional: boolean): void {
        this.propOptional = isOptional;

        this.events.emit('change');
    }

    @action.bound
    toggleStatic(isStatic: boolean): void {
        this.propStatic = isStatic;

        this.events.emit('change');
    }

    @action.bound
    changeModifier(modifier: Modifier): void {
        this.propModifier = modifier;

        this.events.emit('change');
    }

    isAbstract = () => this.propAbstract;

    isOptional = () => this.propOptional;

    isStatic = () => this.propStatic;

    modifier = () => this.propModifier;

    returnType = () => this.propReturnType;

    content(): PropertyModel {
        const property = new PropertyModel(this.propName);

        property.isAbstract = this.propAbstract;
        property.isOptional = this.propOptional;
        property.modifier = this.propModifier;
        property.isStatic = this.propStatic;
        property.returnType = this.propReturnType || 'any';

        return property;
    }
}

export default ClassProperty;
