using edu03 from '../db/schema';
using {Business.Partners_types as BusinessPartnerType} from './external/BusinessPartner_APIs';
using {northwind.Orders as northwindOrders} from './external/northwind';

service BookshopService @(requires: 'authenticated-user') {
    entity Books          as projection on edu03.Books;

    entity Authors        as
        projection on edu03.Authors {
            *,
            '' as Address
        };

    entity BookshopOrders as projection on northwindOrders;
    action   testExternalService();
    action   stopJob();
    function getCustomers() returns BusinessPartnerType.customers;
    function getProcedureResult() returns edu03.ProcedureReturn;

    event receiveEvent : {
        eventid : String(50);
        message : String;
    }
}
