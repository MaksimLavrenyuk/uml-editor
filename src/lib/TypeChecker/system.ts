import * as ts from 'typescript';

/**
 * Create custom typescript System.
 * Using for run compilerHost.
 *
 * @see ts.System
 * @see ts.CompilerHost
 */
export function createSystem(files: { [name: string]: string }): ts.System {
    return {
        args: [],
        createDirectory: () => {
            throw new Error('createDirectory not implemented');
        },
        directoryExists: (directory) => Object.keys(files).some((path) => path.startsWith(directory)),
        exit: () => {
            throw new Error('exit not implemented');
        },
        fileExists: (fileName) => files[fileName] != null,
        getCurrentDirectory: () => '/',
        getDirectories: () => [],
        getExecutingFilePath: () => {
            throw new Error('getExecutingFilePath not implemented');
        },
        readDirectory: (directory) => (directory === '/' ? Object.keys(files) : []),
        readFile: (fileName) => files[fileName],
        resolvePath: (path) => path,
        newLine: '\n',
        useCaseSensitiveFileNames: true,
        write: () => {
            throw new Error('write not implemented');
        },
        writeFile: (fileName, contents) => {
            // eslint-disable-next-line no-param-reassign
            files[fileName] = contents;
        },
    };
}
