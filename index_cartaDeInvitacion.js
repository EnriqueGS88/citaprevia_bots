const puppeteer = require('puppeteer');
const urls = require('./urls');
require('dotenv').config();


async function submitTimesheet() {

    const browser = await puppeteer.launch(
        {
            headless: false,
            defaultViewport: {
                width: 1400,
                height: 900,
                deviceScaleFactor: 1,
            },
            slowMo: 70
        }    
    );

    const selectorAcceptButton = 'input[id="btnAceptar"]';
    const selectorOfficeMenu = 'select[id="sede"]';
    const selectorTramiteMenu = 'select[id="tramiteGrupo[0]"]';
    const selectorEntrarButton = 'input[id="btnEntrar"]';
    const selectorPassportButton = 'input[value="PASAPORTE"]';
    const selectorPassportField = 'input[id="txtIdCitado"]';
    const selectorNameField = 'input[id="txtDesCitado"]';
    const selectorEnviarButton = 'input[id="btnEnviar"]';
    
    const PASSPORT_NUMBER = process.env.PASSPORT_NUMBER;
    const NAME = process.env.NAME;
    
    // Start on Page 1
    const page = await browser.newPage();
    await page.goto( urls.cartaDeInvitacion );
    await page.waitForTimeout( 1000 );

    await page.waitForSelector( selectorAcceptButton );

    await page.select( selectorOfficeMenu, "48" );
    await page.waitForTimeout( 3000 );

    await page.select( selectorTramiteMenu, "4037" );
    await page.waitForTimeout( 2000 );

    await page.click( selectorAcceptButton );
    await page.waitForTimeout( 2000 );

    // Move to Page 2
    await page.click( selectorEntrarButton );
    await page.waitForTimeout( 2000 );

    // Move to Page 3
    await page.click( selectorPassportButton );
    await page.waitForTimeout( 1000 );

    await page.focus( selectorPassportField );
    await page.keyboard.type( PASSPORT_NUMBER );
    await page.waitForTimeout( 1000 );
    
    await page.focus( selectorNameField );
    await page.keyboard.type( NAME );
    await page.waitForTimeout( 1000 );

    await page.click( selectorEnviarButton );
    await page.waitForTimeout( 2000 );

    await page.click( selectorEnviarButton );
    await page.waitForTimeout( 29000 );

    // await page.close();


}

submitTimesheet();


