export class Request {
    requestType: string;
    description: string;
    requestor: RequestorDto;
    createdBy: string;
    updatedBy: string;
    createdTime: any;
    updatedTime: any;
}

export class RequestorDto {
    id:number;
    vaResident: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    confirmEmail: string;
    preferredContact: string;
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