import { action, makeObservable, observable } from 'mobx';
import { Property as PropertyModel } from '../../../../../models/components/Property';
import Property from '../../Properties/Property';

type DefaultDataInterfaceProperty = {
    isOptional: PropertyModel['isOptional'],
};

const DEFAULT_INTERFACE_PROPERTY: DefaultDataInterfaceProperty = {
    isOptional: false,
};

class InterfaceProperty extends Property {
    @observable
    private propOptional: boolean;

    constructor(component?: PropertyModel) {
        super(component);

        this.propOptional = component?.isOptional !== undefined
            ? component.isOptional
            : DEFAULT_INTERFACE_PROPERTY.isOptional;

        makeObservable(this);
    }

    @action.bound
    toggleOptional(isOptional: boolean): void {
        this.propOptional = isOptional;

        this.events.emit('change');
    }

    isOptional = () => this.propOptional;

    returnType = () => this.propReturnType;

    content(): PropertyModel {
        const property = new PropertyModel(this.propName);

        property.isOptional = this.propOptional;
        property.returnType = this.propReturnType || 'any';

        return property;
    }
}

export default InterfaceProperty;
