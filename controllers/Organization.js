const OrgService = require("../services/Organization_Service")
const OrgServiceInstance = new OrgService();
// Display list of all Authors.
exports.OrganizationList = (req, res) => {
    //res.send("NOT IMPLEMENTED: Org List");
    console.log(OrgServiceInstance.getAllOrg());
  };
  
  // Display detail page for a specific Author.
  exports.OrganizationDetail = (req, res) => {
    //res.send(`NOT IMPLEMENTED: Organization: ${req.params.OrgId}`);
    try{
      console.log(OrgServiceInstance.getOrgById(1));
    }
    catch (err)
    {
      console.log('Error ' + err);
    }
    
    //res.send(OrgServiceInstance.getOrgById(1));
    //res.send('1');
    //Need to call service

  };