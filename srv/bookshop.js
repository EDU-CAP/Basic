const cds = require('@sap/cds');

module.exports = class BookshopService extends cds.ApplicationService {
    async init() {

        const BusinessParterService = await cds.connect.to('Business.Partners');
        const NorthwindService = await cds.connect.to('northwind');

        this.before('READ', 'Books', (req) => {
            console.log(req.user);
        });

        this.on('testExternalService', async (req, next) => {
            // 이벤트 Publish  
            await this.emit('receiveEvent', {
                eventid: 'test01',
                message: 'Test Message'
            });
        });

        this.on('getCustomers', async (req, next) => {
            return await BusinessParterService.get('/customers');
        });

        this.on('READ', 'BookshopOrders', async (req, next) => {
            return await NorthwindService.run(req.query);
        });

        // 필수입력  
        return super.init()
    }
}