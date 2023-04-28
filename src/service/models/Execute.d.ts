
export interface ResponseCommand {
    stdout: string,
    outputPath: string
};

export interface FunctionResponseCommand {
    (stdout: string, stderr: string): ResponseCommand
}
