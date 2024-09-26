const cds = require('@sap/cds')  
  
module.exports = class BookshopService extends cds.ApplicationService {  
    init() {  
  
        this.before('READ', 'Books', (req) => {  
            console.log(req);  
        })  
  
        // 필수입력  
        return super.init()  
    }  
}