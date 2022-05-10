import { ComponentI } from './components/Component';

export interface Formatter {
    serialize(component: ComponentI): string
    serialize(component: ComponentI[]): string
}
