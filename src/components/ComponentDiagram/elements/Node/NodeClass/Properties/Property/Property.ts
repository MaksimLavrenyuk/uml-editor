import { action, makeObservable, observable } from 'mobx';
import { nanoid } from 'nanoid';
import EventEmitter from 'simple-typed-emitter';
import { debounce } from 'lodash';
import { Modifier } from '../../../../../../../models/Modifier';
import ComponentFactory from '../../../../../../../models/factories/ComponentFactory';
import { Property as PropertyModel } from '../../../../../../../models/components/Property';

export type ClassPropertyData = {
    name: string,
    modifier: Modifier,
    returnType: string
    isAbstract: boolean
    isOptional: boolean
    isStatic: boolean
};

type ClassPropertyEventMap = {
    change: (() => void)[]
};

interface IProperty {
    readonly events: EventEmitter<ClassPropertyEventMap>;
    readonly key: string
    changeName(name: string): void
    name(): string
    changeModifier(modifier: Modifier): void
    modifier(): Modifier
    changeReturnType(type: string): void
    returnType(): string
    toggleAbstract(isAbstract: boolean): void
    isAbstract(): boolean
    toggleOptional(isOptional: boolean): void
    isOptional(): boolean
    toggleStatic(isStatic: boolean): void
    isStatic(): boolean
}

const DEFAULT_PROPERTY: ClassPropertyData = {
    name: '',
    modifier: 'public',
    returnType: '',
    isAbstract: false,
    isOptional: false,
    isStatic: false,
};

class ClassProperty implements IProperty {
    readonly key: string;

    readonly events = new EventEmitter<ClassPropertyEventMap>();

    @observable
    private propName: string;

    @observable
    private propModifier: Modifier;

    @observable
    private propReturnType: string;

    @observable
    private propAbstract: boolean;

    @observable
    private propOptional: boolean;

    @observable
    private propStatic: boolean;

    private factory: ComponentFactory;

    constructor(config?: ClassPropertyData) {
        this.key = nanoid();
        this.propName = config?.name || DEFAULT_PROPERTY.name;
        this.propModifier = config?.modifier || DEFAULT_PROPERTY.modifier;
        this.propReturnType = config?.returnType || DEFAULT_PROPERTY.returnType;
        this.propAbstract = config?.isAbstract !== undefined ? config.isAbstract : DEFAULT_PROPERTY.isAbstract;
        this.propOptional = config?.isOptional !== undefined ? config.isOptional : DEFAULT_PROPERTY.isOptional;
        this.propStatic = config?.isStatic !== undefined ? config.isStatic : DEFAULT_PROPERTY.isStatic;
        this.factory = new ComponentFactory();

        makeObservable(this);
    }

    private debounceChangeEmit = debounce(() => {
        this.events.emit('change');
    }, 100);

    @action
    changeModifier(modifier: Modifier): void {
        this.propModifier = modifier;

        this.debounceChangeEmit();
    }

    @action
    changeName(name: string): void {
        this.propName = name;

        this.debounceChangeEmit();
    }

    @action
    changeReturnType(type: string): void {
        this.propReturnType = type;

        this.debounceChangeEmit();
    }

    isAbstract = () => this.propAbstract;

    isOptional = () => this.propOptional;

    isStatic = () => this.propStatic;

    modifier = () => this.propModifier;

    name = () => this.propName;

    returnType = () => this.propReturnType;

    @action
    toggleAbstract(isAbstract: boolean): void {
        this.propAbstract = isAbstract;

        this.debounceChangeEmit();
    }

    @action
    toggleOptional(isOptional: boolean): void {
        this.propOptional = isOptional;

        this.debounceChangeEmit();
    }

    @action
    toggleStatic(isStatic: boolean): void {
        this.propStatic = isStatic;

        this.debounceChangeEmit();
    }

    content(): PropertyModel {
        return this.factory.createProperty({
            name: this.propName,
            modifier: this.propModifier,
            returnType: this.propReturnType,
            isAbstract: this.propAbstract,
            isOptional: this.propOptional,
            isStatic: this.propStatic,
        });
    }
}

export default ClassProperty;
