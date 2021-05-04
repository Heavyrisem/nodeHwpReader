import fs from 'fs';
import zlib from 'zlib';

// let hexdata = fs.readFileSync('./target1.hwp', {encoding: "hex"});

let hexdata = "7362686014676060601626620624d28cc47c7d56333038b33c60626248494e2d6680226204cc9c94f46f0fd18fc1914183c18c21921878195c581a6052cae2ce4c30f6b668e2e28a8a8c43210c9c6e0cef281966471ec819cef22037e019e1cd4c1d2f1818ee78303258283280b18a183c31c148612f8e370b33481c6fe78220667326694646466cf23ff41f3080e4814e08b7b733c03ba693152198912716761604514b924b9c8041df41f38849819205e8459edccb8f47e9c3cb1137b203ab0e1f440e262996ac7100";
let Bin = Buffer.from(hexdata, "hex");
console.log(Bin);
let udata = zlib.inflateRawSync(Bin, {windowBits: 15});
console.log(udata.toString("utf16le"), udata.length);