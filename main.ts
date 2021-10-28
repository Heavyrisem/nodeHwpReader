import fs from 'fs';
import zlib from 'zlib';
import {CompoundFile} from 'compound-binary-file-js';
import { HWP_Header_T } from './Types';

// let HWP_: HWP_Header_T = {
//     signature: "d",
//     version: [1,1,1,1],
//     isCompressed: false,
//     isLocked: false,
//     isPublic: false
// }


const cfb = CompoundFile.fromUint8Array(toUint8Array(fs.readFileSync('./target.hwp')));

const rootStorage = cfb.getRootStorage();
const subStorages = rootStorage.storages();
const subStreams = rootStorage.streams();

for (const stream of subStreams) {

    // process.stdout.write(stream.getDirectoryEntryName() + " ");
    // for (const binary of Buffer.from(stream.getStreamData()).slice(0, 8)) {
    //     process.stdout.write(binary.toString(2) + " ");
    // }
    // console.log()

    switch (stream.getDirectoryEntryName()) {
        case "FileHeader": {
            console.log("Reading FileHeader");
            const HeaderBuffer = Buffer.from(stream.getStreamData());
            let Cursor = 0;

            console.log(HeaderBuffer.slice(Cursor, (Cursor+=32)).toString());
            Cursor++;
            console.log("HWP Version:", [...HeaderBuffer.slice(Cursor, (Cursor+=4))].join("."));
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
            break;
        }
        case "DocInfo": {
            break;
        }
        case "HwpSummaryInformation": {
            break;
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
                console.log("====== Reading", Section.getDirectoryEntryName(), "======\n");
                for (const Hex of Buffer.from(Section.getStreamData())) {
                    process.stdout.write(Hex.toString(16));
                }
                fs.writeFileSync(`./${Section.getDirectoryEntryName()}`, Buffer.from(Section.getStreamData()), {encoding: 'binary'});
                // let UData = zlib.unzipSync(Buffer.from(Section.getStreamData()).slice(0, 22));

                // console.log("Section Header", UData.slice(0, 22), "\n");

                // const Data = UData;
                // for (let i = 0; i < Data.length; i++) {
                //     if (Data[i+1] == undefined) break;
                //     console.log(String.fromCodePoint(parseInt(`${Data[i+1].toString(16)}${Data[i].toString(16)}`, 16)), Data[i+1].toString(16), Data[i].toString(16));
                // }
                // console.log(UData.toString('utf16le'))
                console.log("\n\n====== End", Section.getDirectoryEntryName(), "======");
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