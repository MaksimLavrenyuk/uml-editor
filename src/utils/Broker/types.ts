enum ElementType {
    class = 'class',
    enum = 'enum',
    enumValue = 'enumValue',
    interface = 'interface',
    method = 'method',
    namespace = 'namespace',
    parameter = 'parameter',
    property = 'property',
    typeProperty = 'typeProperty',
}

interface ElementStruct {
    readonly type: ElementType
    readonly name: string
}

export abstract class Element implements ElementStruct {
    public abstract readonly type: ElementType;

    public readonly name: string;

    protected constructor(name: string) {
        this.name = name;
    }
}
