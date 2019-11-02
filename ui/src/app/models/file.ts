import { Resource } from './common';

export class UploadedFile extends Resource {

    userId: string;
    fileName: string;
    relativePath: string;

    constructor(cfg: Partial<UploadedFile> = {}) {
        super();
        Object.entries(cfg).map(e => this[e[0]] = e[1]);
    }
}
