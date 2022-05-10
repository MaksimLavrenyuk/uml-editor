import PlantFormatter from "../../index";

const plant = `@startuml

title Interfaces - Class Diagram


class Car
ICar ()- Car
ICar2 ()-- Car
Car -() ICar3

@enduml`;

const file = [
  {
    name: "class-interfaces",
    diagrams: [
      {
        elements: [
          {
            name: "Car",
            title: "Car",
            isAbstract: false,
            members: [],
            extends_: [],
            implements_: [],
            generics: [],
            stereotypes: [],
          },
          {
            left: "ICar",
            right: "Car",
            leftType: "Unknown",
            rightType: "Unknown",
            leftArrowHead: "()",
            rightArrowHead: "",
            leftArrowBody: "-",
            rightArrowBody: "-",
            leftCardinality: "",
            rightCardinality: "",
            label: "",
            hidden: false,
          },
          {
            left: "ICar2",
            right: "Car",
            leftType: "Unknown",
            rightType: "Unknown",
            leftArrowHead: "()",
            rightArrowHead: "",
            leftArrowBody: "-",
            rightArrowBody: "-",
            leftCardinality: "",
            rightCardinality: "",
            label: "",
            hidden: false,
          },
          {
            left: "Car",
            right: "ICar3",
            leftType: "Unknown",
            rightType: "Unknown",
            leftArrowHead: "",
            rightArrowHead: "()",
            leftArrowBody: "-",
            rightArrowBody: "-",
            leftCardinality: "",
            rightCardinality: "",
            label: "",
            hidden: false,
          },
        ],
      },
    ],
  },
];

describe("class interfaces", () => {
  const formatter = new PlantFormatter();

  test("to plantuml", () => {
    expect(
            formatter.toFile({
                fileName: "class-interfaces",
              plantString: plant,
            })
        ).toEqual(file);
  });
});
