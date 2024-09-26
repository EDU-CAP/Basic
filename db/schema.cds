namespace edu03;  
  
using {cuid} from '@sap/cds/common';  
  
entity Books : cuid {  
    title  : String;  
    descr  : String;  
    genre  : Genre;  
    author : Association to Authors;  
}  
  
entity Authors : cuid {  
    name  : String;  
    books : Association to many Books  
                on books.author = $self;  
}  
  
type Genre : String enum {  
    Mystery;  
    Fiction;  
    Drama;  
}

type ProcedureReturn : array of {
	ID: String;
	name: String;
}