import playwright from 'playwright'

//This function scrapes all the data from the html report. It takes url of the report as an argument. It returns an array containing all the data.

export async function scrapeData(url) {

    const zgloszenie = {}
    const browser = await playwright.chromium.launch({
        headless: true // setting this to true will not run the UI
    });
    const page = await browser.newPage()
    
    try {
        await page.goto(url);

        const wykonawca = await page.locator('//*[@id="tabela1"]/tbody/tr[1]/td[1]/div/div[2]').textContent()
        const adres_wykonawcy = await page.locator('//*[@id="tabela1"]/tbody/tr[2]/td[1]/div[1]/div[2]').innerText()
        const obreb = await page.locator('//*[@id="tabela1"]/tbody/tr[7]/td/div/div[2]/b[1]').textContent()
        const idd = await page.locator('//*[@id="tabela1"]/tbody/tr[7]/td/div/div[2]/b[2]').innerHTML()
        const nr_zgloszenia = await page.locator('//*[@id="tabela1"]/tbody/tr[3]/td[2]/div/div[2]/span').textContent()
        const tablela_uslug = page.locator('//*[@id="tabelaCel"]')
        const usluga = tablela_uslug.locator('tr', { hasText: 'X'})
        const nazwa_Uslugi = await usluga.locator('td').nth(1).innerHTML()
        
        await page.waitForTimeout(2000); // wait for 5 seconds
        await browser.close();
        
        const obr_ewid = idd.split(".")[0] + "." + idd.split('.')[1]
        const ulica = adres_wykonawcy.split("\n")[0]
        const miejscowosc = adres_wykonawcy.split("\n")[1]

        zgloszenie.wykonawca = wykonawca
        zgloszenie.ulica = ulica
        zgloszenie.miejscowosc = miejscowosc
        zgloszenie.nr_zgloszenia = nr_zgloszenia
        zgloszenie.obreb = obreb.split("dz.")[0]
        zgloszenie.powiat = "Ostrołęcki"
        zgloszenie.woj = "Mazowieckie"
        zgloszenie.usluga = nazwa_Uslugi
        zgloszenie.obr_ewid = obr_ewid

        return zgloszenie

    } catch (error) {
        console.log(error)
    }
}