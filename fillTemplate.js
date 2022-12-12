import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import fs  from "fs";
import path from "path";
import json from './contentTemplates.json' assert{ type: 'json' }

//This function generates docx documents, based on templates in templated folder. As arguments it takes an array containing all the data, wchich is generated by scrapeData() function, json file with json templates and an array containing file names, which are about to be generated. For loop iterates over array with names and based on given name, it takes appropriate json template. Then it fills it with data from scraping function and generates docx document.

export async function fillTemplate(scrapedData, requestedDocs) {

    for(var i = 0; i < requestedDocs.length; i++) {

        const templateDoc = fs.readFileSync(
            path.resolve("./templates/" + requestedDocs[i].docType + "Tmpl.docx"),
            "binary"
        );
        const zip = new PizZip(templateDoc);
        const finalDoc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        switch (requestedDocs[i].docType) {
            case 'titleDoc':
                const titleDoc = json.titleDoc
                
                titleDoc.nr_dzialki = scrapedData.nr_dzialki
                titleDoc.obreb = scrapedData.obreb
                titleDoc.powiat = "Ostrołęcki"
                titleDoc.woj = "Mazowieckie"
                titleDoc.nr_zgloszenia = scrapedData.nr_zgloszenia
                titleDoc.usluga = scrapedData.usluga
            
                finalDoc.render(
                    titleDoc
                );
                
                break;
                
            case 'reportDoc':
                const reportDoc = json.reportDoc
                        
                reportDoc.usluga = scrapedData.usluga,
                reportDoc.obreb = scrapedData.obreb,
                reportDoc.nr_dzialki = scrapedData.nr_dzialki,
                reportDoc.nr_zgloszenia = scrapedData.nr_zgloszenia,
                reportDoc.wykonawca = scrapedData.wykonawca,
                reportDoc.rozpoczecie = scrapedData.rozpoczecie,
                reportDoc.zakonczenie = reportDoc.zakonczenie
            
                finalDoc.render(
                    reportDoc
                );
                break;

            default:
                break;
        }

        const buf = finalDoc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
    
        fs.writeFileSync(path.resolve("./rendered/", requestedDocs[i].docName), buf)

    }
}