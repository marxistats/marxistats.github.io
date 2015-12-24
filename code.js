function computation(data) {
  ndata = {};
  ndata.RoPM = data.RoPM/2;
  ndata.year=data.year; 
  return ndata;
}
multi_chart([["analyses/Ezequiel_Maito/data.csv",["RoPM"]]],computation,"#front_page","%");
