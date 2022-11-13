// services/PostService.js

const DAL = require( "../DAL/data-access" ); // Data Access Layer
//const Organization = require("../models/organization.model");
const Organizationmodel = require( "../models/organization.model" ); // Database Model

class GetOrganization {
  /**
   * @description get organization by Id
   */
  constructor () {
    // Create instance of Data Access layer using our desired model
   // this.GetOrganization = new DAL(Organizationmodel);
  }

  /**
   * @description Attempt to get organization by Id
   * @param OrgId {object} Object containing all required fields to
   * create post
   * @returns {Promise<{success: boolean, error: *}|{success: boolean, body: *}>}
   */
  async getOrgById (OrgId)
  {
    try {
      console.log(OrgId);
      const result = await DAL.query(`SELECT * FROM Organization WHERE OrgId = @OrgId`, [
      { name: 'OrgId', value: OrgId }]);
      console.log('result'+ result);
      //return { success: true, body: result };  
      const Org = result.recordset.length ? result.recordset[0] : null;
      if (Org) {
        res.json(Org);
    } else {
        res.status(404).json({
            message: 'Record not found'
        });
    }
      //const Org = result.recordset;
      return(Org);
    } catch ( err ) {
      console.log(err);
      return { success: false, error: err };
    }
  }

  
  async getAllOrg () {
    try {
      const result = await DAL.query(`SELECT * FROM Employee ORDER BY Id DESC`);
      const Organizations = result.recordset;
      console.log('result');
      res.json(Organizations);
    } catch ( err ) {
      return { success: false, error: err };
    }
  }
}
module.exports = GetOrganization;
