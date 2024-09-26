const cds = require('@sap/cds');
const LOG = cds.log('sql')

module.exports = class BookshopService extends cds.ApplicationService {
    async init() {

        let job = null;
        const BusinessParterService = await cds.connect.to('Business.Partners');
        const NorthwindService = await cds.connect.to('northwind');

        const { Authors } = this.entities;

        this.before('CREATE', 'Authors', (req) => {  
            const { name } = req.data;  
  
            if (!name) {  
                LOG.error('이름을 입력해주세요');
                req.reject(  
                    {  
                        code: 'A001',  
                        message: '이름을 입력해주세요',  
                        target: 'name',  
                        status: 400  
                    }  
                )  
            }  
        });

        // this.on('CREATE', 'Authors', async (req, next) => {  
        //     let { name } = req.data;  
  
        //     req.data.name = `${name}Test`;  
  
        //     return next();  
        // });

        this.after('READ', 'Authors', (results, req) => {  
            return results.map((result) => {  
                result.Address = 'Test';  
                return result;  
            });  
        })

        this.on('CREATE', 'Authors', async (req, next) => {  
            let { name } = req.data;  
        
            name = `${name}Test`;  
        
            const results = await INSERT.into(Authors).entries([  
                { name: name }  
            ]);  
        
            return SELECT.from(Authors).where`ID in ${[...results].map((result) => result.ID)}`;  
        });

        this.after('CREATE', 'Authors', (results, req) => {  
            cds.spawn({  
                after: 10000  
            }, async() => {  
                console.log(results);  
            })  
        });

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

        this.on('getProcedureResult', async (req, next) => {  

            let sQuery = `Call "procedure01"(OUTPUTTAB => ?)`;  
            const result = await cds.run(sQuery, {});  
            return result.OUTPUTTAB;  
        })

        // background  
        // job = cds.spawn({  
        //     every: 10000,  
        //     after: 60000  
        // }, async() => {  
        //     console.log(new Date().toString());  
        // });    
        
        this.on('stopJob', (req, next) => {  
            if (job) {  
                clearInterval(job.timer);  
            }  
        })

        // 필수입력  
        return super.init()
    }
}