function computation(data) {
  ndata = {};
  ndata.RoPM = data.RoPM/2;
  ndata.year=data.year; 
  return ndata;
}
multi_chart([["data/bea/Gross_Value_Added_of_Domestic_Corporate_Business_in_Current_Dollars_and_Gross_Value_Added_of_Nonfinancial_Domestic_Corporate_Business_in_Current_and_Chained_Dollars/data.csv",["Gross_value_added_of_corporate_business_1","Compensation_of_employees"]],["data/bea/Historical-Cost_Depreciation_of_Private_Nonresidential_Fixed_Assets_by_Industry_Group_and_Legal_Form_of_Organization/data.csv",[]]],computation,"#front_page","%");
