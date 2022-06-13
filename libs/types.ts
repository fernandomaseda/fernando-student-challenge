export type StudentInfo = {
  id: string | null
    first_name: string | null
    last_name: string | null
    guardian: {
        id: string | null,
       first_name: string | null,
        last_name: string | null,
        email: string | null,
        phone: string | null,
        tax_id: string | null
    },
    cohort: string | null,
    school: {
        id: string | null,
        name: string | null,
        logo: string |  null,
        country: string | null,
        city: string | null,
        address: string | null,
        zip_code: string | null
    },
    monthly_grant_type: string | null,
    monthly_grant_value: string | null,
    inscription_grant_value: string | null,
    inscription_grant_type: string | null,
} 



export type ListStudentOrders =  [StudentOrderObject
  ] 

  export type StudentOrderObject =  
    {
      id: string | null,
      concept: string | null,
      name: string | null,
      price: string,
      price_currency: string | null,
      due: string ,
      status: "PAID" | "DUE" | "OUTSTANDING" | string,
      interest: string | null,
      payin: {
          id: string,
          created: string
      } | null
  }



  export type ResponseList = {
    action: number,
    data: ListStudentOrders | null
  }

  
  export type ResponseInfo = {
    action: number,
    data: StudentInfo | null
  }

  export type CartObject = {
    id: string;
    price: number
  }

  