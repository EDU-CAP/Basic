using edu03 from '../db/schema';  
  
service BookshopService {  
    entity Books   as projection on edu03.Books;  
    entity Authors as projection on edu03.Authors;  
}