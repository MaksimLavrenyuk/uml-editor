import EventEmitter from 'simple-typed-emitter';
import { nanoid } from 'nanoid';
import { action, makeObservable, observable } from 'mobx';
import { Property as PropertyModel } from '../../../../models/components/Property';

export type PropertyEventsMap = {
    change: ((property: PropertyBasic) => void)[]
};

const DEFAULT_PROPERTY = {
    name: '',
    returnType: undefined,
};

abstract class PropertyBasic {
    public readonly key: string;

    public events: EventEmitter<PropertyEventsMap>;

    @observable
    protected propName: string;

    @observable
    protected propReturnType: string | undefined;

    protected constructor(component?: PropertyModel) {
        this.key = nanoid();
        this.events = new EventEmitter<PropertyEventsMap>();

        this.propName = component?.name || DEFAULT_PROPERTY.name;
        this.propReturnType = component?.returnType || DEFAULT_PROPERTY.returnType;

        makeObservable(this);
    }

    @action.bound
    changeName(name: string) {
        this.propName = name;

        this.events.emit('change', this);
    }

    name = () => this.propName;

    @action.bound
    changeReturnType(type: string | undefined) {
        this.propReturnType = type;

        this.events.emit('change', this);
    }

    returnType = () => this.propReturnType;

    abstract content(): PropertyModel;
}

export default PropertyBasic;
