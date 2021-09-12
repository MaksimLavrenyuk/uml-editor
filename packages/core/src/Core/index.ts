import ts from 'typescript';
import { Element } from '../types/AbstractElement';

class Core {
    static generateDoc(
        fileNames: string[],
        options: ts.CompilerOptions = ts.getDefaultCompilerOptions(),
    ) {
        // Build a program using the set of root file names in fileNames
        const program: ts.Program = ts.createProgram(fileNames, options);
        // Get the checker, we will use it to find more about classes
        const checker: ts.TypeChecker = program.getTypeChecker();
        const result: Element[] = [];

        program.getSourceFiles()
            .forEach((sourceFile: ts.SourceFile): void => {
                console.log(sourceFile);
            });
    }
}

export default Core;
