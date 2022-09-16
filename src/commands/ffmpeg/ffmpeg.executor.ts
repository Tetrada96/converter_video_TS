import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommandExec } from "../../core/executor/command.types";
import { FileService } from "../../core/files/file.service";
import { IStreamLogger } from "../../core/handlers/stream-loggerInterface";
import { PromptService } from '../../core/prompt/prompt.service';
import { FfmpegBuilder } from "./ffmpeg.bullder";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types";
import { StreamLogger } from '../../core/handlers/stream.handler';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {

    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService()

    constructor(logger: IStreamLogger) {
        super(logger)
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', 'number')
        const height = await this.promptService.input<number>('Высота', 'number')
        const path = await this.promptService.input<string>('путь до файла', 'input')
        const name = await this.promptService.input<string>('Имя', 'input')
        return { width, height, path, name }

    }
    protected build({ width, height, path, name }: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4')

        const args = (new FfmpegBuilder()).input(path).setVideoSize(width, height).output(output)
        return { command: 'ffmpeg', args, output }
    }
    protected spawn({ command, args, output }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileExists(output);
        return spawn(command, args)
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamLogger(logger)
        handler.processOutput(stream)
    }

}