import { File } from 'plantuml-parser';

const PLANT = `
@startuml

title Interfaces - Class Diagram


class Car
ICar ()- Car
ICar2 ()-- Car
Car -() ICar3

@enduml`;

const FILE = <File[]>[
    {
        name: 'class-interfaces',
        diagrams: [
            {
                elements: [
                    {
                        name: 'Car',
                        title: 'Car',
                        isAbstract: false,
                        members: [],
                        extends_: [],
                        implements_: [],
                        generics: [],
                        stereotypes: [],
                    },
                    {
                        left: 'ICar',
                        right: 'Car',
                        leftType: 'Unknown',
                        rightType: 'Unknown',
                        leftArrowHead: '()',
                        rightArrowHead: '',
                        leftArrowBody: '-',
                        rightArrowBody: '-',
                        leftCardinality: '',
                        rightCardinality: '',
                        label: '',
                        hidden: false,
                    },
                    {
                        left: 'ICar2',
                        right: 'Car',
                        leftType: 'Unknown',
                        rightType: 'Unknown',
                        leftArrowHead: '()',
                        rightArrowHead: '',
                        leftArrowBody: '-',
                        rightArrowBody: '-',
                        leftCardinality: '',
                        rightCardinality: '',
                        label: '',
                        hidden: false,
                    },
                    {
                        left: 'Car',
                        right: 'ICar3',
                        leftType: 'Unknown',
                        rightType: 'Unknown',
                        leftArrowHead: '',
                        rightArrowHead: '()',
                        leftArrowBody: '-',
                        rightArrowBody: '-',
                        leftCardinality: '',
                        rightCardinality: '',
                        label: '',
                        hidden: false,
                    },
                ],
            },
        ],
    },
];

export {
    PLANT,
    FILE,
};
