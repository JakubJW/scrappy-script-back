import PizZip from 'pizzip';
import fs from 'fs'
import path from "path";

// This function zips generated documents. As an argumetnt it accepts an array, which contains document's names,
// then loops through them and adds to zip archive one by one.

export async function zipFiles(filesToZip){
    
    var zip = new PizZip();

    zip.folder("rendered"); //creates folder in a zip file

    for(var i = 0; i < filesToZip.length; i++) {
        zip.file('rendered/siema.txt', 'miau') //appends docx files to folder created above
    }

    var content = zip.generate({ type: "nodebuffer", platform: process.platform });
    console.log(content)

    return {zipName: "mydocuments.zip", binaryData: content}
}