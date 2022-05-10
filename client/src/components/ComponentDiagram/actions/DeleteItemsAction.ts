import { KeyboardEvent } from 'react';
import { Action, ActionEvent, InputType } from '@projectstorm/react-canvas-core';
import isType from '../../../utils/guards/isType';

interface DeleteItemsActionOptions {
    keys?: string[];
}

class DeleteItemsAction extends Action {
    private defaultKeys = ['Delete', 'Backspace'];

    constructor(options: DeleteItemsActionOptions = {}) {
        super({
            type: InputType.KEY_DOWN,
            fire: (event) => {
                const actionOptions = {
                    keys: this.defaultKeys,
                    ...options,
                };

                if (
                    isType<ActionEvent<KeyboardEvent>>(event, 'event')
                    && event.event.key
                    && actionOptions.keys.includes(event.event.key)
                ) {
                    const selectedEntities = this.engine.getModel().getSelectedEntities();

                    if (selectedEntities.length > 0) {
                        selectedEntities.forEach((model) => {
                            // only delete items which are not locked
                            if (!model.isLocked()) {
                                model.remove();
                            }
                        });
                        this.engine.repaintCanvas();
                    }
                }
            },
        });
    }
}

export default DeleteItemsAction;
