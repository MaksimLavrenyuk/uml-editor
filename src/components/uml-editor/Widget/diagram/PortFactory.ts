import { DiagramEngine, PortModel } from '@projectstorm/react-diagrams';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';

export class PortFactory extends AbstractModelFactory<PortModel, DiagramEngine> {
   cb: () => PortModel;

   constructor(type: string, cb: () => PortModel) {
       super(type);
       this.cb = cb;
   }

   generateModel(): PortModel {
       return this.cb();
   }
}
