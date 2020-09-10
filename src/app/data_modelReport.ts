export class Report {
    id: number;
    category: string;
    relationship: string;
    memFirstname: string;
    memLastname: string;
    memPhone: string;
    memEmail: string;
    confirmMemEmail: string;
    memDOB: any;
    memMedID: string;
    memSSN: string;
    description: string;
    requestor: RequestorDto;
    createdBy: string;
    updatedBy: string;
    createdTime: any;
    updatedTime: any;
    categoryOther:any;
    relationshipOther:any;
    memAddr1: any;
    memAddr2: any;
    memCity: any;
    memState: any;
    memZipcode: any;
    documents:Array<DocumentRequestDto>;

}

export class RequestorDto {
    id: number;
    vaResident: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    confirmEmail: string;
    organizationName: string;
    requestorType: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipcode: string;
    fax: string;
    status: string;
    createdBy: string;
    updatedBy: string;
    createdTime: any;
    updatedTime: any;
    formID:number;
}
export class DocumentRequestDto{

	documentName;
	
    fileName;
}

