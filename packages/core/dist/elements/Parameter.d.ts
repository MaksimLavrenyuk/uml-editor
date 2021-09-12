import { AbstractElement } from '../types/AbstractElement';
import { ElementType } from '../types/ElementType';
export declare class Parameter extends AbstractElement {
    readonly type = ElementType.parameter;
    hasInitializer: boolean;
    isOptional: boolean;
    parameterType: string;
}
