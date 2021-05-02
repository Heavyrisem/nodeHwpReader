import fs from 'fs';
import {CompoundFile} from 'compound-binary-file-js';


const cfb = CompoundFile.fromUint8Array(toUint8Array(fs.readFileSync('./target.hwp')));

const rootStorage = cfb.getRootStorage();
const subStorages = rootStorage.storages();
const subStreams = rootStorage.streams();

for (const stream of subStreams) {

    switch (stream.getDirectoryEntryName()) {
        case "FileHeader": {
            console.log("Reading FileHeader");
            break;
        }
        case "PrvImage": {
            console.log("Header Signature", Buffer.from(stream.getStreamData()).slice(0, 4), Buffer.from(stream.getStreamData()).slice(0, 4).toString());
            fs.writeFile('./pervimg.png', Buffer.from(stream.getStreamData()), () => {console.log("PervImg saved to ./pervimg.png");});
            break;
        }
        case "PrvText": {
            console.log("PrvText");
            console.log(Buffer.from(stream.getStreamData()));
            console.log('========= Preview Text ==========');
            process.stdout.write(Buffer.from(stream.getStreamData()).toString('utf16le'));
            console.log('========== End of data ==========');
        }
        default : {
            break;
        }
    }
}

console.log('======================= Storage ========================')

for (const stream of subStorages) {
    console.log(stream.getDirectoryEntryName());

    switch (stream.getDirectoryEntryName()) {
        case "BodyText": {
            for (const Section of stream.streams()) {
                console.log("====== Reading", Section.getDirectoryEntryName(), "======");
                console.log(Buffer.from(Section.getStreamData()).toString('utf16le'))
            }
            break;
        }
    }
}

function toUint8Array(buf: Buffer) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return view;
}