import { File } from "plantuml-parser";

type PlantObj = {
  plantString: string;
  fileName: string;
};

interface PlantFormatterI {
  toFile(obj: PlantObj): void;
  toPlant(file: File): PlantObj;
}

class Formatter implements PlantFormatterI {
  toFile(obj: PlantObj) {}

  toPlant(file: File): PlantObj {
    return {
      plantString: "dd",
      fileName: "sss",
    };
  }
}

export default Formatter;
