import ts from 'typescript';
import { createSystem } from './system';

export default class TypeChecker {
    private readonly compilerOptions: ts.CompilerOptions;

    constructor() {
        this.compilerOptions = {
            ...ts.getDefaultCompilerOptions(),
            strict: false,
            target: ts.ScriptTarget.Latest,
            esModuleInterop: true,
            module: ts.ModuleKind.None,
            suppressOutputPathCheck: true,
            skipLibCheck: true,
            skipDefaultLibCheck: true,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
        };
    }

    check(code: string) {
        const dummyFilename = 'file.ts';
        const files: { [name: string]: string } = {
            [dummyFilename]: code,
        };

        const sys = createSystem({
            ...files,
        });

        const sourceFiles: { [name: string]: ts.SourceFile } = {};

        Object.keys(files).forEach((name) => {
            sourceFiles[name] = ts.createSourceFile(
                name,
                files[name],
                this.compilerOptions.target || ts.ScriptTarget.Latest,
            );
        });

        const compilerHost: ts.CompilerHost = {
            ...sys,
            getCanonicalFileName: (fileName) => fileName,
            getDefaultLibFileName: () => '/lib.es2015.d.ts',
            getDirectories: () => [],
            getNewLine: () => sys.newLine,
            getSourceFile: (filename) => sourceFiles[filename],
            useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
        };

        const languageServiceHost: ts.LanguageServiceHost = {
            ...compilerHost,
            getCompilationSettings: () => this.compilerOptions,
            getScriptFileNames: () => Object.keys(files),
            getScriptSnapshot: (filename) => {
                const contents = sys.readFile(filename);
                if (contents) {
                    return ts.ScriptSnapshot.fromString(contents);
                }

                return undefined;
            },
            getScriptVersion: (fileName) => '0',
            writeFile: sys.writeFile,
        };

        const languageService = ts.createLanguageService(languageServiceHost);

        return languageService.getSemanticDiagnostics(dummyFilename);
    }
}
