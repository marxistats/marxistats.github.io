function computation(data) {
  ndata = {};
  ndata.year=data.year;

  if("GV" in data && "Co" in data && "De" in data && "Ca" in data) { 
    ndata.Rate_of_Profit_US = (data.GV - data.Co - data.De)/ data.Ca * 100;
  } else {
    ndata.US_Rate_of_Profit_US = -1000000000;
  }
  return ndata;
}


var front_page_chart = new
Multi_chart([["data/bea_usa/Gross_Value_Added_of_Domestic_Corporate_Business_in_Current_Dollars_and_Gross_Value_Added_of_Nonfinancial_Domestic_Corporate_Business_in_Current_and_Chained_Dollars/data.csv",[["Gross_value_added_of_corporate_business_1","GV"],["Compensation_of_employees","Co"]]],["data/bea_usa/Historical-Cost_Depreciation_of_Private_Nonresidential_Fixed_Assets_by_Industry_Group_and_Legal_Form_of_Organization/data.csv",[["By_legal_form_of_organization_Corporate","De"]]],["data/bea_usa/Historical-Cost_Net_Stock_of_Private_Fixed_Assets_by_Industry_Group_and_Legal_Form_of_Organization/data.csv",[["By_legal_form_of_organization_Corporate","Ca"]]]],computation,"#front_page","%",1940,2014);

