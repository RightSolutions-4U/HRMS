class  Organization{
    constructor(OrgId,OrgName,Logo,ContactNo,EmailAddress,CountryId){
      this.OrgId = OrgId;
      this.OrgName = OrgName;
      this.Logo = Logo;
      this.ContactNo = ContactNo;
      this.EmailAddress = EmailAddress;
      this.CountryId = CountryId;
    }
  }
  
  module.exports = Organization;