import ts from 'typescript';

export default class DiagramValidator {
    validate() {
        // // Build a program using the set of root file names in fileNames
        const program: ts.Program = ts.createProgram(
            ['./example.ts'],
            ts.getDefaultCompilerOptions(),
        );

        // Get the checker, we will use it to find more about classes
        const checker: ts.TypeChecker = program.getTypeChecker();

        // Visit every sourceFile in the program
        program.getSourceFiles()
            .forEach((sourceFile: ts.SourceFile): void => {
                // console.log(sourceFile);
            });
    }
}
