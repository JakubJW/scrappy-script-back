import * as cheerio from "cheerio";
import axios from "axios";
import iconv from 'iconv-lite'

axios.get('https://powiatpultuski.geoportal2.pl/map/osrodek/skan.php?Z=1&GUID=57335cd1bb86c4495eb5b28c2c71411f&ID=342655', {
    headers: {
        'Content-Type': 'text/html'
    }
}).then((res) => {
    //const str = iconv.encode(buf, "win1250")
    const result = iconv.decode(Buffer.from(res.data), "utf8")
    //console.log(str)
    console.log(result)
})
